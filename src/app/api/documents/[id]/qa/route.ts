import { NextRequest } from "next/server"
import { prisma } from "@/lib/prisma"
import { 
  successResponse, 
  errorResponse, 
  requireRole,
  withErrorHandler 
} from "@/lib/api/utils"
import { processDocumentQA, generateQAReport } from "@/lib/qa-automation"
import type { DocumentMetadata } from "@/lib/qa-automation"

// ============================================================================
// POST /api/documents/[id]/qa - Run QA check on document
// ============================================================================

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  return withErrorHandler(async () => {
    await requireRole(["ADMIN"])

    const { id } = await params

    // Get document
    const document = await prisma.document.findUnique({
      where: { id },
      include: { 
        order: {
          select: {
            orderNumber: true,
            scheduledDatetime: true,
            completionDatetime: true,
          },
        },
      },
    })

    if (!document) {
      return errorResponse("NOT_FOUND", "Document not found", 404)
    }

    if (!document.scanbackUrl && !document.signedUrl && !document.originalUrl) {
      return errorResponse("VALIDATION_ERROR", "No document file available for QA", 400)
    }

    // Fetch the document file
    const documentUrl = document.scanbackUrl ?? document.signedUrl ?? document.originalUrl
    let documentBuffer: Buffer

    try {
      const response = await fetch(documentUrl!)
      if (!response.ok) {
        throw new Error(`Failed to fetch document: ${response.status}`)
      }
      const arrayBuffer = await response.arrayBuffer()
      documentBuffer = Buffer.from(arrayBuffer)
    } catch (error) {
      return errorResponse(
        "INTERNAL_ERROR", 
        `Failed to fetch document for QA: ${error instanceof Error ? error.message : "Unknown error"}`,
        500
      )
    }

    // Process QA
    const signingDate = document.order.completionDatetime ?? document.order.scheduledDatetime ?? undefined
    const report = await processDocumentQA(id, documentBuffer, signingDate ?? undefined)

    return successResponse({
      documentId: id,
      report,
    })
  })
}

// ============================================================================
// GET /api/documents/[id]/qa - Get QA report for document
// ============================================================================

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  return withErrorHandler(async () => {
    await requireRole(["ADMIN", "TITLE_COMPANY"])

    const { id } = await params

    // Get document with QA info
    const document = await prisma.document.findUnique({
      where: { id },
      include: {
        order: {
          select: {
            orderNumber: true,
            titleCompanyId: true,
          },
        },
      },
    })

    if (!document) {
      return errorResponse("NOT_FOUND", "Document not found", 404)
    }

    // Get audit log for QA check
    const qaLog = await prisma.auditLog.findFirst({
      where: {
        entityType: "Document",
        entityId: id,
        action: "QA_CHECK",
      },
      orderBy: { createdAt: "desc" },
    })

    return successResponse({
      documentId: id,
      name: document.name,
      type: document.type,
      qaStatus: document.qaStatus,
      qaReviewedAt: document.qaReviewedAt,
      qaNotes: document.qaNotes,
      lastQACheck: qaLog ? {
        checkedAt: qaLog.createdAt,
        result: qaLog.newData,
      } : null,
    })
  })
}


