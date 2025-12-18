import { prisma } from "@/lib/prisma"
import { DocumentQAStatus } from "@prisma/client"
import pdf from "pdf-parse"
import { 
  TextractClient, 
  AnalyzeDocumentCommand,
  FeatureType,
  Block,
  BlockType
} from "@aws-sdk/client-textract"

// ============================================================================
// Types
// ============================================================================

export interface QACheckResult {
  passed: boolean
  issues: QAIssue[]
  confidenceScore: number
  recommendation: "APPROVE" | "REVIEW" | "REJECT"
}

export interface QAIssue {
  type: QAIssueType
  severity: "ERROR" | "WARNING" | "INFO"
  field?: string
  page?: number
  description: string
  suggestion?: string
}

export type QAIssueType =
  | "MISSING_SIGNATURE"
  | "MISSING_INITIAL"
  | "MISSING_DATE"
  | "WRONG_DATE"
  | "MISSING_PAGE"
  | "POOR_SCAN_QUALITY"
  | "INVALID_FILENAME"
  | "INCOMPLETE_FIELD"
  | "ILLEGIBLE_TEXT"
  | "DOCUMENT_CORRUPTED"

export interface DocumentAnalysis {
  pageCount: number
  textContent: string
  signatures: SignatureField[]
  initials: InitialField[]
  dates: DateField[]
  formFields: FormField[]
  scanQuality: ScanQualityMetrics
  metadata: DocumentMetadata
}

export interface SignatureField {
  page: number
  location: BoundingBox
  signed: boolean
  confidence: number
  signerType?: "BORROWER" | "CO_BORROWER" | "NOTARY" | "WITNESS"
}

export interface InitialField {
  page: number
  location: BoundingBox
  initialed: boolean
  confidence: number
}

export interface DateField {
  page: number
  location: BoundingBox
  value: string | null
  isValid: boolean
  expectedDate?: string
}

export interface FormField {
  name: string
  page: number
  value: string | null
  required: boolean
  filled: boolean
}

export interface BoundingBox {
  left: number
  top: number
  width: number
  height: number
}

export interface ScanQualityMetrics {
  overallScore: number       // 0-100
  contrast: number           // 0-100
  clarity: number            // 0-100
  alignment: number          // 0-100
  blankPages: number[]       // Page numbers that appear blank
  skewedPages: number[]      // Page numbers with significant skew
}

export interface DocumentMetadata {
  filename: string
  fileSize: number
  mimeType: string
  createdAt?: Date
  orderNumber?: string
  documentType?: string
}

export interface QAReport {
  documentId: string
  orderId: string
  analyzedAt: Date
  status: DocumentQAStatus
  overallPassed: boolean
  confidenceScore: number
  recommendation: "APPROVE" | "REVIEW" | "REJECT"
  completenessCheck: CompletenessResult
  signatureCheck: SignatureCheckResult
  qualityCheck: QualityCheckResult
  namingCheck: NamingCheckResult
  issues: QAIssue[]
  summary: string
}

export interface CompletenessResult {
  passed: boolean
  allPagesPresent: boolean
  expectedPages: number
  actualPages: number
  allSignaturesFound: boolean
  signatureCount: { expected: number; found: number }
  allInitialsFound: boolean
  initialCount: { expected: number; found: number }
  allDatesFilled: boolean
  dateCount: { expected: number; found: number }
}

export interface SignatureCheckResult {
  passed: boolean
  totalSignatures: number
  validSignatures: number
  missingSignatures: string[]
  suspiciousSignatures: string[]
}

export interface QualityCheckResult {
  passed: boolean
  overallScore: number
  issues: string[]
}

export interface NamingCheckResult {
  passed: boolean
  expectedFormat: string
  actualFilename: string
  issues: string[]
}

// ============================================================================
// Configuration
// ============================================================================

const QA_THRESHOLDS = {
  AUTO_APPROVE: 95,
  REVIEW: 85,
  REJECT: 0,
  MIN_SCAN_QUALITY: 70,
  SIGNATURE_CONFIDENCE: 80,
} as const

const DOCUMENT_NAMING_PATTERN = /^([A-Z0-9]+)_([A-Z_]+)_(\d{8})\.pdf$/i

// Expected signature/initial counts by document type
const SIGNATURE_REQUIREMENTS: Record<string, { signatures: number; initials: number; dates: number }> = {
  LOAN_PACKAGE: { signatures: 4, initials: 20, dates: 4 },
  DEED: { signatures: 2, initials: 0, dates: 2 },
  MORTGAGE: { signatures: 2, initials: 10, dates: 2 },
  NOTE: { signatures: 2, initials: 5, dates: 2 },
  DISCLOSURE: { signatures: 2, initials: 15, dates: 2 },
  POWER_OF_ATTORNEY: { signatures: 3, initials: 2, dates: 2 },
  AFFIDAVIT: { signatures: 2, initials: 0, dates: 1 },
  DEFAULT: { signatures: 2, initials: 5, dates: 2 },
}

// ============================================================================
// AWS Textract Client
// ============================================================================

const textractClient = new TextractClient({
  region: process.env.AWS_REGION ?? "us-east-1",
  credentials: process.env.AWS_ACCESS_KEY_ID ? {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? "",
  } : undefined,
})

// ============================================================================
// Main Functions
// ============================================================================

/**
 * Analyze a document and generate a full QA report
 */
export async function analyzeDocument(
  documentBuffer: Buffer,
  metadata: DocumentMetadata,
  expectedPageCount?: number
): Promise<DocumentAnalysis> {
  // Parse PDF to get basic info
  const pdfData = await pdf(documentBuffer)
  
  // Use AWS Textract for OCR and form analysis
  let textractBlocks: Block[] = []
  try {
    textractBlocks = await analyzeWithTextract(documentBuffer)
  } catch (error) {
    console.error("Textract analysis failed, falling back to basic PDF parsing:", error)
  }

  // Extract signatures, initials, and dates
  const signatures = extractSignatureFields(textractBlocks, pdfData.numpages)
  const initials = extractInitialFields(textractBlocks, pdfData.numpages)
  const dates = extractDateFields(textractBlocks, pdfData.text)
  const formFields = extractFormFields(textractBlocks)

  // Analyze scan quality
  const scanQuality = analyzeScanQuality(textractBlocks, pdfData)

  return {
    pageCount: pdfData.numpages,
    textContent: pdfData.text,
    signatures,
    initials,
    dates,
    formFields,
    scanQuality,
    metadata,
  }
}

/**
 * Check all signatures in the document
 */
export function checkSignatures(analysis: DocumentAnalysis, documentType: string): SignatureCheckResult {
  const requirements = SIGNATURE_REQUIREMENTS[documentType] ?? SIGNATURE_REQUIREMENTS.DEFAULT
  const expectedSignatures = requirements.signatures

  const validSignatures = analysis.signatures.filter(
    s => s.signed && s.confidence >= QA_THRESHOLDS.SIGNATURE_CONFIDENCE
  )

  const missingSignatures: string[] = []
  const suspiciousSignatures: string[] = []

  // Check for unsigned signature fields
  analysis.signatures.forEach((sig, index) => {
    if (!sig.signed) {
      missingSignatures.push(`Signature ${index + 1} on page ${sig.page}`)
    } else if (sig.confidence < QA_THRESHOLDS.SIGNATURE_CONFIDENCE) {
      suspiciousSignatures.push(`Signature ${index + 1} on page ${sig.page} (confidence: ${sig.confidence}%)`)
    }
  })

  // Check if we have enough signatures
  if (validSignatures.length < expectedSignatures) {
    const missing = expectedSignatures - validSignatures.length
    for (let i = 0; i < missing; i++) {
      if (!missingSignatures.some(m => m.includes(`Signature ${validSignatures.length + i + 1}`))) {
        missingSignatures.push(`Expected signature ${validSignatures.length + i + 1} not found`)
      }
    }
  }

  return {
    passed: missingSignatures.length === 0 && suspiciousSignatures.length === 0,
    totalSignatures: analysis.signatures.length,
    validSignatures: validSignatures.length,
    missingSignatures,
    suspiciousSignatures,
  }
}

/**
 * Validate document completeness
 */
export function validateCompleteness(
  analysis: DocumentAnalysis,
  documentType: string,
  expectedPageCount?: number
): CompletenessResult {
  const requirements = SIGNATURE_REQUIREMENTS[documentType] ?? SIGNATURE_REQUIREMENTS.DEFAULT

  // Check pages
  const allPagesPresent = expectedPageCount 
    ? analysis.pageCount >= expectedPageCount 
    : analysis.scanQuality.blankPages.length === 0

  // Check signatures
  const validSignatures = analysis.signatures.filter(
    s => s.signed && s.confidence >= QA_THRESHOLDS.SIGNATURE_CONFIDENCE
  ).length
  const allSignaturesFound = validSignatures >= requirements.signatures

  // Check initials
  const validInitials = analysis.initials.filter(
    i => i.initialed && i.confidence >= QA_THRESHOLDS.SIGNATURE_CONFIDENCE
  ).length
  const allInitialsFound = validInitials >= requirements.initials

  // Check dates
  const validDates = analysis.dates.filter(d => d.isValid && d.value !== null).length
  const allDatesFilled = validDates >= requirements.dates

  return {
    passed: allPagesPresent && allSignaturesFound && allInitialsFound && allDatesFilled,
    allPagesPresent,
    expectedPages: expectedPageCount ?? analysis.pageCount,
    actualPages: analysis.pageCount,
    allSignaturesFound,
    signatureCount: { expected: requirements.signatures, found: validSignatures },
    allInitialsFound,
    initialCount: { expected: requirements.initials, found: validInitials },
    allDatesFilled,
    dateCount: { expected: requirements.dates, found: validDates },
  }
}

/**
 * Generate comprehensive QA report
 */
export async function generateQAReport(
  documentId: string,
  orderId: string,
  documentBuffer: Buffer,
  metadata: DocumentMetadata,
  documentType: string,
  expectedPageCount?: number,
  signingDate?: Date
): Promise<QAReport> {
  const analyzedAt = new Date()
  const issues: QAIssue[] = []

  // Analyze document
  const analysis = await analyzeDocument(documentBuffer, metadata, expectedPageCount)

  // Check naming convention
  const namingCheck = validateNamingConvention(metadata.filename, orderId, documentType)
  if (!namingCheck.passed) {
    namingCheck.issues.forEach(issue => {
      issues.push({
        type: "INVALID_FILENAME",
        severity: "WARNING",
        description: issue,
        suggestion: `Rename to format: ${namingCheck.expectedFormat}`,
      })
    })
  }

  // Check completeness
  const completenessCheck = validateCompleteness(analysis, documentType, expectedPageCount)
  if (!completenessCheck.allPagesPresent) {
    issues.push({
      type: "MISSING_PAGE",
      severity: "ERROR",
      description: `Expected ${completenessCheck.expectedPages} pages, found ${completenessCheck.actualPages}`,
    })
  }
  if (!completenessCheck.allSignaturesFound) {
    issues.push({
      type: "MISSING_SIGNATURE",
      severity: "ERROR",
      description: `Missing signatures: expected ${completenessCheck.signatureCount.expected}, found ${completenessCheck.signatureCount.found}`,
    })
  }
  if (!completenessCheck.allInitialsFound) {
    issues.push({
      type: "MISSING_INITIAL",
      severity: "ERROR",
      description: `Missing initials: expected ${completenessCheck.initialCount.expected}, found ${completenessCheck.initialCount.found}`,
    })
  }
  if (!completenessCheck.allDatesFilled) {
    issues.push({
      type: "MISSING_DATE",
      severity: "ERROR",
      description: `Missing dates: expected ${completenessCheck.dateCount.expected}, found ${completenessCheck.dateCount.found}`,
    })
  }

  // Check signatures
  const signatureCheck = checkSignatures(analysis, documentType)
  signatureCheck.missingSignatures.forEach(msg => {
    issues.push({
      type: "MISSING_SIGNATURE",
      severity: "ERROR",
      description: msg,
    })
  })
  signatureCheck.suspiciousSignatures.forEach(msg => {
    issues.push({
      type: "MISSING_SIGNATURE",
      severity: "WARNING",
      description: `Low confidence signature: ${msg}`,
      suggestion: "Manual review recommended",
    })
  })

  // Check dates against signing date
  if (signingDate) {
    const signingDateStr = formatDate(signingDate)
    analysis.dates.forEach((dateField, index) => {
      if (dateField.value && dateField.value !== signingDateStr) {
        const dateDiff = getDateDifference(dateField.value, signingDateStr)
        if (Math.abs(dateDiff) > 1) {
          issues.push({
            type: "WRONG_DATE",
            severity: "ERROR",
            page: dateField.page,
            description: `Date field ${index + 1} shows "${dateField.value}" but signing date was "${signingDateStr}"`,
          })
        }
      }
    })
  }

  // Check scan quality
  const qualityCheck = validateScanQuality(analysis.scanQuality)
  if (!qualityCheck.passed) {
    qualityCheck.issues.forEach(issue => {
      issues.push({
        type: "POOR_SCAN_QUALITY",
        severity: qualityCheck.overallScore < 50 ? "ERROR" : "WARNING",
        description: issue,
        suggestion: "Request rescan of documents",
      })
    })
  }

  // Check for blank pages
  if (analysis.scanQuality.blankPages.length > 0) {
    issues.push({
      type: "MISSING_PAGE",
      severity: "WARNING",
      description: `Blank pages detected: ${analysis.scanQuality.blankPages.join(", ")}`,
      suggestion: "Verify these pages should be blank",
    })
  }

  // Calculate confidence score
  const confidenceScore = calculateConfidenceScore(
    completenessCheck,
    signatureCheck,
    qualityCheck,
    namingCheck,
    issues
  )

  // Determine recommendation
  let recommendation: "APPROVE" | "REVIEW" | "REJECT"
  let status: DocumentQAStatus
  
  if (confidenceScore >= QA_THRESHOLDS.AUTO_APPROVE) {
    recommendation = "APPROVE"
    status = DocumentQAStatus.APPROVED
  } else if (confidenceScore >= QA_THRESHOLDS.REVIEW) {
    recommendation = "REVIEW"
    status = DocumentQAStatus.NEEDS_REVIEW
  } else {
    recommendation = "REJECT"
    status = DocumentQAStatus.REJECTED
  }

  const overallPassed = issues.filter(i => i.severity === "ERROR").length === 0

  // Generate summary
  const summary = generateSummary(issues, confidenceScore, recommendation)

  return {
    documentId,
    orderId,
    analyzedAt,
    status,
    overallPassed,
    confidenceScore,
    recommendation,
    completenessCheck,
    signatureCheck,
    qualityCheck,
    namingCheck,
    issues,
    summary,
  }
}

/**
 * Process and save QA report to database
 */
export async function processDocumentQA(
  documentId: string,
  documentBuffer: Buffer,
  signingDate?: Date
): Promise<QAReport> {
  // Get document and order info
  const document = await prisma.document.findUnique({
    where: { id: documentId },
    include: { order: true },
  })

  if (!document) {
    throw new Error(`Document ${documentId} not found`)
  }

  const metadata: DocumentMetadata = {
    filename: document.name,
    fileSize: document.fileSize ?? 0,
    mimeType: document.mimeType ?? "application/pdf",
    orderNumber: document.order.orderNumber,
    documentType: document.type,
  }

  // Generate report
  const report = await generateQAReport(
    documentId,
    document.orderId,
    documentBuffer,
    metadata,
    document.type,
    document.pageCount ?? undefined,
    signingDate ?? document.order.scheduledDatetime ?? undefined
  )

  // Update document with QA results
  await prisma.document.update({
    where: { id: documentId },
    data: {
      qaStatus: report.status,
      qaReviewedAt: new Date(),
      qaNotes: report.summary,
    },
  })

  // Log QA result
  await prisma.auditLog.create({
    data: {
      action: "QA_CHECK",
      entityType: "Document",
      entityId: documentId,
      newData: {
        status: report.status,
        confidenceScore: report.confidenceScore,
        recommendation: report.recommendation,
        issueCount: report.issues.length,
        errorCount: report.issues.filter(i => i.severity === "ERROR").length,
      },
    },
  })

  return report
}

// ============================================================================
// AWS Textract Integration
// ============================================================================

async function analyzeWithTextract(documentBuffer: Buffer): Promise<Block[]> {
  const command = new AnalyzeDocumentCommand({
    Document: {
      Bytes: documentBuffer,
    },
    FeatureTypes: [
      FeatureType.FORMS,
      FeatureType.SIGNATURES,
      FeatureType.TABLES,
    ],
  })

  const response = await textractClient.send(command)
  return response.Blocks ?? []
}

// ============================================================================
// Extraction Functions
// ============================================================================

function extractSignatureFields(blocks: Block[], pageCount: number): SignatureField[] {
  const signatures: SignatureField[] = []

  // Find signature blocks from Textract
  const signatureBlocks = blocks.filter(b => b.BlockType === BlockType.SIGNATURE)

  signatureBlocks.forEach(block => {
    if (block.Geometry?.BoundingBox) {
      signatures.push({
        page: block.Page ?? 1,
        location: {
          left: block.Geometry.BoundingBox.Left ?? 0,
          top: block.Geometry.BoundingBox.Top ?? 0,
          width: block.Geometry.BoundingBox.Width ?? 0,
          height: block.Geometry.BoundingBox.Height ?? 0,
        },
        signed: true,
        confidence: block.Confidence ?? 0,
      })
    }
  })

  // Also look for signature-related form fields
  const formBlocks = blocks.filter(
    b => b.BlockType === BlockType.KEY_VALUE_SET && 
    b.EntityTypes?.includes("KEY")
  )

  formBlocks.forEach(block => {
    const text = getBlockText(block, blocks).toLowerCase()
    if (text.includes("signature") || text.includes("sign here") || text.includes("borrower sign")) {
      // Find the corresponding value
      const valueBlock = findValueBlock(block, blocks)
      const isSigned = valueBlock ? hasContent(valueBlock, blocks) : false

      if (block.Geometry?.BoundingBox) {
        signatures.push({
          page: block.Page ?? 1,
          location: {
            left: block.Geometry.BoundingBox.Left ?? 0,
            top: block.Geometry.BoundingBox.Top ?? 0,
            width: block.Geometry.BoundingBox.Width ?? 0,
            height: block.Geometry.BoundingBox.Height ?? 0,
          },
          signed: isSigned,
          confidence: isSigned ? (block.Confidence ?? 0) : 0,
          signerType: determinSignerType(text),
        })
      }
    }
  })

  return signatures
}

function extractInitialFields(blocks: Block[], pageCount: number): InitialField[] {
  const initials: InitialField[] = []

  const formBlocks = blocks.filter(
    b => b.BlockType === BlockType.KEY_VALUE_SET && 
    b.EntityTypes?.includes("KEY")
  )

  formBlocks.forEach(block => {
    const text = getBlockText(block, blocks).toLowerCase()
    if (text.includes("initial") || text.includes("init.") || text.includes("init here")) {
      const valueBlock = findValueBlock(block, blocks)
      const isInitialed = valueBlock ? hasContent(valueBlock, blocks) : false

      if (block.Geometry?.BoundingBox) {
        initials.push({
          page: block.Page ?? 1,
          location: {
            left: block.Geometry.BoundingBox.Left ?? 0,
            top: block.Geometry.BoundingBox.Top ?? 0,
            width: block.Geometry.BoundingBox.Width ?? 0,
            height: block.Geometry.BoundingBox.Height ?? 0,
          },
          initialed: isInitialed,
          confidence: isInitialed ? (block.Confidence ?? 0) : 0,
        })
      }
    }
  })

  return initials
}

function extractDateFields(blocks: Block[], fullText: string): DateField[] {
  const dates: DateField[] = []
  
  // Date patterns to look for
  const datePatterns = [
    /(\d{1,2}\/\d{1,2}\/\d{2,4})/g,
    /(\d{1,2}-\d{1,2}-\d{2,4})/g,
    /([A-Z][a-z]+ \d{1,2},? \d{4})/g,
  ]

  const formBlocks = blocks.filter(
    b => b.BlockType === BlockType.KEY_VALUE_SET && 
    b.EntityTypes?.includes("KEY")
  )

  formBlocks.forEach(block => {
    const text = getBlockText(block, blocks).toLowerCase()
    if (text.includes("date") || text.includes("dated")) {
      const valueBlock = findValueBlock(block, blocks)
      const valueText = valueBlock ? getBlockText(valueBlock, blocks) : ""
      
      let dateValue: string | null = null
      let isValid = false

      // Try to extract date from value
      for (const pattern of datePatterns) {
        const match = valueText.match(pattern)
        if (match) {
          dateValue = match[0]
          isValid = isValidDate(dateValue)
          break
        }
      }

      if (block.Geometry?.BoundingBox) {
        dates.push({
          page: block.Page ?? 1,
          location: {
            left: block.Geometry.BoundingBox.Left ?? 0,
            top: block.Geometry.BoundingBox.Top ?? 0,
            width: block.Geometry.BoundingBox.Width ?? 0,
            height: block.Geometry.BoundingBox.Height ?? 0,
          },
          value: dateValue,
          isValid,
        })
      }
    }
  })

  return dates
}

function extractFormFields(blocks: Block[]): FormField[] {
  const fields: FormField[] = []

  const formBlocks = blocks.filter(
    b => b.BlockType === BlockType.KEY_VALUE_SET && 
    b.EntityTypes?.includes("KEY")
  )

  formBlocks.forEach(block => {
    const keyText = getBlockText(block, blocks)
    const valueBlock = findValueBlock(block, blocks)
    const valueText = valueBlock ? getBlockText(valueBlock, blocks) : ""

    if (keyText) {
      fields.push({
        name: keyText,
        page: block.Page ?? 1,
        value: valueText || null,
        required: isRequiredField(keyText),
        filled: valueText.trim().length > 0,
      })
    }
  })

  return fields
}

function analyzeScanQuality(blocks: Block[], pdfData: { numpages: number; text: string }): ScanQualityMetrics {
  const blankPages: number[] = []
  const skewedPages: number[] = []

  // Calculate average confidence as a proxy for quality
  const confidences = blocks
    .filter(b => b.Confidence !== undefined)
    .map(b => b.Confidence ?? 0)
  
  const avgConfidence = confidences.length > 0
    ? confidences.reduce((a, b) => a + b, 0) / confidences.length
    : 50

  // Detect blank pages by looking at text content per page
  const textByPage = new Map<number, number>()
  blocks.forEach(block => {
    if (block.Page && block.BlockType === BlockType.LINE) {
      const current = textByPage.get(block.Page) ?? 0
      textByPage.set(block.Page, current + 1)
    }
  })

  for (let i = 1; i <= pdfData.numpages; i++) {
    const lineCount = textByPage.get(i) ?? 0
    if (lineCount < 5) {
      blankPages.push(i)
    }
  }

  // Detect skewed pages (simplified - would need image analysis for accuracy)
  blocks.forEach(block => {
    if (block.Geometry?.Polygon && block.Page) {
      const polygon = block.Geometry.Polygon
      if (polygon.length >= 4) {
        const topLeftY = polygon[0].Y ?? 0
        const topRightY = polygon[1].Y ?? 0
        const skew = Math.abs(topLeftY - topRightY)
        if (skew > 0.02) { // More than 2% skew
          if (!skewedPages.includes(block.Page)) {
            skewedPages.push(block.Page)
          }
        }
      }
    }
  })

  const overallScore = Math.round(avgConfidence)
  const contrast = Math.round(avgConfidence * 0.9) // Proxy
  const clarity = Math.round(avgConfidence)
  const alignment = Math.round(100 - (skewedPages.length / pdfData.numpages) * 100)

  return {
    overallScore,
    contrast,
    clarity,
    alignment,
    blankPages,
    skewedPages,
  }
}

// ============================================================================
// Validation Functions
// ============================================================================

function validateNamingConvention(
  filename: string,
  orderId: string,
  documentType: string
): NamingCheckResult {
  const issues: string[] = []
  const date = new Date()
  const expectedFormat = `${orderId}_${documentType}_${formatDateCompact(date)}.pdf`

  const match = filename.match(DOCUMENT_NAMING_PATTERN)
  
  if (!match) {
    issues.push(`Filename does not match expected pattern: [OrderNumber]_[DocumentType]_[YYYYMMDD].pdf`)
    return { passed: false, expectedFormat, actualFilename: filename, issues }
  }

  const [, orderNum, docType, dateStr] = match

  if (orderNum.toUpperCase() !== orderId.toUpperCase()) {
    issues.push(`Order number mismatch: expected ${orderId}, found ${orderNum}`)
  }

  if (docType.toUpperCase() !== documentType.toUpperCase()) {
    issues.push(`Document type mismatch: expected ${documentType}, found ${docType}`)
  }

  if (!isValidDateString(dateStr)) {
    issues.push(`Invalid date in filename: ${dateStr}`)
  }

  return {
    passed: issues.length === 0,
    expectedFormat,
    actualFilename: filename,
    issues,
  }
}

function validateScanQuality(metrics: ScanQualityMetrics): QualityCheckResult {
  const issues: string[] = []

  if (metrics.overallScore < QA_THRESHOLDS.MIN_SCAN_QUALITY) {
    issues.push(`Overall scan quality is low: ${metrics.overallScore}%`)
  }

  if (metrics.contrast < 60) {
    issues.push(`Low contrast detected: ${metrics.contrast}%`)
  }

  if (metrics.clarity < 60) {
    issues.push(`Poor clarity/readability: ${metrics.clarity}%`)
  }

  if (metrics.alignment < 80) {
    issues.push(`Document alignment issues detected on ${metrics.skewedPages.length} pages`)
  }

  return {
    passed: issues.length === 0,
    overallScore: metrics.overallScore,
    issues,
  }
}

// ============================================================================
// Helper Functions
// ============================================================================

function getBlockText(block: Block, allBlocks: Block[]): string {
  if (block.Text) return block.Text

  // Get text from child blocks
  const childIds = block.Relationships
    ?.filter(r => r.Type === "CHILD")
    ?.flatMap(r => r.Ids ?? []) ?? []

  const childBlocks = allBlocks.filter(b => childIds.includes(b.Id ?? ""))
  return childBlocks.map(b => b.Text ?? "").join(" ")
}

function findValueBlock(keyBlock: Block, allBlocks: Block[]): Block | null {
  const valueIds = keyBlock.Relationships
    ?.filter(r => r.Type === "VALUE")
    ?.flatMap(r => r.Ids ?? []) ?? []

  return allBlocks.find(b => valueIds.includes(b.Id ?? "")) ?? null
}

function hasContent(block: Block, allBlocks: Block[]): boolean {
  const text = getBlockText(block, allBlocks).trim()
  return text.length > 0
}

function determinSignerType(text: string): "BORROWER" | "CO_BORROWER" | "NOTARY" | "WITNESS" | undefined {
  const lower = text.toLowerCase()
  if (lower.includes("co-borrower") || lower.includes("co borrower")) return "CO_BORROWER"
  if (lower.includes("borrower")) return "BORROWER"
  if (lower.includes("notary")) return "NOTARY"
  if (lower.includes("witness")) return "WITNESS"
  return undefined
}

function isRequiredField(fieldName: string): boolean {
  const requiredPatterns = ["signature", "date", "initial", "name", "address", "ssn", "loan"]
  return requiredPatterns.some(p => fieldName.toLowerCase().includes(p))
}

function isValidDate(dateStr: string): boolean {
  const date = new Date(dateStr)
  return !isNaN(date.getTime())
}

function isValidDateString(dateStr: string): boolean {
  // Validate YYYYMMDD format
  if (!/^\d{8}$/.test(dateStr)) return false
  const year = parseInt(dateStr.substring(0, 4))
  const month = parseInt(dateStr.substring(4, 6))
  const day = parseInt(dateStr.substring(6, 8))
  return year >= 2020 && year <= 2100 && month >= 1 && month <= 12 && day >= 1 && day <= 31
}

function formatDate(date: Date): string {
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
}

function formatDateCompact(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  return `${year}${month}${day}`
}

function getDateDifference(date1: string, date2: string): number {
  const d1 = new Date(date1)
  const d2 = new Date(date2)
  const diffTime = d1.getTime() - d2.getTime()
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

function calculateConfidenceScore(
  completeness: CompletenessResult,
  signatures: SignatureCheckResult,
  quality: QualityCheckResult,
  naming: NamingCheckResult,
  issues: QAIssue[]
): number {
  let score = 100

  // Deduct for completeness issues
  if (!completeness.allPagesPresent) score -= 20
  if (!completeness.allSignaturesFound) score -= 25
  if (!completeness.allInitialsFound) score -= 10
  if (!completeness.allDatesFilled) score -= 10

  // Deduct for signature issues
  score -= signatures.missingSignatures.length * 10
  score -= signatures.suspiciousSignatures.length * 5

  // Deduct for quality issues
  if (!quality.passed) {
    score -= Math.max(0, (QA_THRESHOLDS.MIN_SCAN_QUALITY - quality.overallScore))
  }

  // Deduct for naming issues
  if (!naming.passed) score -= 5

  // Deduct for each additional error
  const errorCount = issues.filter(i => i.severity === "ERROR").length
  score -= errorCount * 2

  return Math.max(0, Math.min(100, score))
}

function generateSummary(
  issues: QAIssue[],
  confidenceScore: number,
  recommendation: string
): string {
  const errorCount = issues.filter(i => i.severity === "ERROR").length
  const warningCount = issues.filter(i => i.severity === "WARNING").length

  if (errorCount === 0 && warningCount === 0) {
    return `Document passed all QA checks with ${confidenceScore}% confidence. Auto-approved.`
  }

  let summary = `QA Check Complete: ${confidenceScore}% confidence. `
  
  if (errorCount > 0) {
    summary += `Found ${errorCount} error(s). `
  }
  if (warningCount > 0) {
    summary += `Found ${warningCount} warning(s). `
  }

  summary += `Recommendation: ${recommendation}.`

  return summary
}


