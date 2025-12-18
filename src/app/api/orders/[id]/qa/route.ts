import { NextRequest } from "next/server"
import { prisma } from "@/lib/prisma"
import { 
  successResponse, 
  errorResponse, 
  requireRole,
  withErrorHandler 
} from "@/lib/api/utils"
import { processDocumentQA } from "@/lib/qa-automation"
import type { QAReport } from "@/lib/qa-automation"
import { DocumentQAStatus, OrderStatus } from "@prisma/client"

// ============================================================================
// POST /api/orders/[id]/qa - Run QA on all documents for an order
// ============================================================================

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  return withErrorHandler(async () => {
    await requireRole(["ADMIN"])

    const { id } = await params

    // Get order with documents
    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        documents: true,
      },
    })

    if (!order) {
      return errorResponse("NOT_FOUND", "Order not found", 404)
    }

    if (order.documents.length === 0) {
      return errorResponse("VALIDATION_ERROR", "No documents found for this order", 400)
    }

    const results: {
      documentId: string
      name: string
      status: DocumentQAStatus
      confidenceScore: number
      issues: number
      success: boolean
      error?: string
    }[] = []

    // Process each document
    for (const doc of order.documents) {
      try {
        const documentUrl = doc.scanbackUrl ?? doc.signedUrl ?? doc.originalUrl
        
        if (!documentUrl) {
          results.push({
            documentId: doc.id,
            name: doc.name,
            status: DocumentQAStatus.PENDING,
            confidenceScore: 0,
            issues: 0,
            success: false,
            error: "No document file available",
          })
          continue
        }

        // Fetch document
        const response = await fetch(documentUrl)
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status}`)
        }
        const arrayBuffer = await response.arrayBuffer()
        const documentBuffer = Buffer.from(arrayBuffer)

        // Process QA
        const signingDate = order.completionDatetime ?? order.scheduledDatetime ?? undefined
        const report = await processDocumentQA(doc.id, documentBuffer, signingDate ?? undefined)

        results.push({
          documentId: doc.id,
          name: doc.name,
          status: report.status,
          confidenceScore: report.confidenceScore,
          issues: report.issues.length,
          success: true,
        })
      } catch (error) {
        results.push({
          documentId: doc.id,
          name: doc.name,
          status: DocumentQAStatus.PENDING,
          confidenceScore: 0,
          issues: 0,
          success: false,
          error: error instanceof Error ? error.message : "Unknown error",
        })
      }
    }

    // Calculate overall order QA status
    const allApproved = results.every(r => r.status === DocumentQAStatus.APPROVED)
    const anyRejected = results.some(r => r.status === DocumentQAStatus.REJECTED)
    const anyNeedsReview = results.some(r => r.status === DocumentQAStatus.NEEDS_REVIEW)

    let orderQAStatus: DocumentQAStatus
    if (allApproved) {
      orderQAStatus = DocumentQAStatus.APPROVED
    } else if (anyRejected) {
      orderQAStatus = DocumentQAStatus.REJECTED
    } else if (anyNeedsReview) {
      orderQAStatus = DocumentQAStatus.NEEDS_REVIEW
    } else {
      orderQAStatus = DocumentQAStatus.PENDING
    }

    // Update order QA status
    await prisma.order.update({
      where: { id },
      data: {
        qaStatus: orderQAStatus,
        qaReviewedAt: new Date(),
      },
    })

    // Calculate summary stats
    const totalDocuments = results.length
    const approved = results.filter(r => r.status === DocumentQAStatus.APPROVED).length
    const needsReview = results.filter(r => r.status === DocumentQAStatus.NEEDS_REVIEW).length
    const rejected = results.filter(r => r.status === DocumentQAStatus.REJECTED).length
    const failed = results.filter(r => !r.success).length
    const avgConfidence = results
      .filter(r => r.success)
      .reduce((sum, r) => sum + r.confidenceScore, 0) / (totalDocuments - failed || 1)

    return successResponse({
      orderId: id,
      orderNumber: order.orderNumber,
      overallStatus: orderQAStatus,
      summary: {
        totalDocuments,
        approved,
        needsReview,
        rejected,
        failed,
        avgConfidence: Math.round(avgConfidence),
      },
      documents: results,
    })
  })
}

// ============================================================================
// GET /api/orders/[id]/qa - Get QA summary for order
// ============================================================================

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  return withErrorHandler(async () => {
    await requireRole(["ADMIN", "TITLE_COMPANY"])

    const { id } = await params

    // Get order with documents
    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        documents: {
          select: {
            id: true,
            name: true,
            type: true,
            qaStatus: true,
            qaReviewedAt: true,
            qaNotes: true,
          },
        },
      },
    })

    if (!order) {
      return errorResponse("NOT_FOUND", "Order not found", 404)
    }

    // Calculate summary
    const totalDocuments = order.documents.length
    const approved = order.documents.filter(d => d.qaStatus === DocumentQAStatus.APPROVED).length
    const needsReview = order.documents.filter(d => d.qaStatus === DocumentQAStatus.NEEDS_REVIEW).length
    const rejected = order.documents.filter(d => d.qaStatus === DocumentQAStatus.REJECTED).length
    const pending = order.documents.filter(d => d.qaStatus === DocumentQAStatus.PENDING).length

    return successResponse({
      orderId: id,
      orderNumber: order.orderNumber,
      overallStatus: order.qaStatus,
      qaReviewedAt: order.qaReviewedAt,
      summary: {
        totalDocuments,
        approved,
        needsReview,
        rejected,
        pending,
        passRate: totalDocuments > 0 ? Math.round((approved / totalDocuments) * 100) : 0,
      },
      documents: order.documents,
    })
  })
}

