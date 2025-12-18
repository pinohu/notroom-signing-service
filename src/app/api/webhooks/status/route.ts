import { NextRequest } from "next/server"
import { prisma } from "@/lib/prisma"
import { 
  successResponse, 
  errorResponse,
  withErrorHandler 
} from "@/lib/api/utils"
import type { WebhookStatusPayload } from "@/types/api"
import { OrderStatus } from "@prisma/client"
import crypto from "crypto"

// ============================================================================
// POST /api/webhooks/status - Webhook for status updates
// ============================================================================

export async function POST(request: NextRequest) {
  return withErrorHandler(async () => {
    const body: WebhookStatusPayload = await request.json()

    // Validate webhook signature if provided
    const signature = request.headers.get("x-webhook-signature")
    if (signature) {
      const isValid = validateWebhookSignature(body, signature)
      if (!isValid) {
        return errorResponse("UNAUTHORIZED", "Invalid webhook signature", 401)
      }
    }

    // Validate required fields
    if (!body.orderId || !body.status) {
      return errorResponse("VALIDATION_ERROR", "orderId and status are required", 400)
    }

    // Validate status
    if (!Object.values(OrderStatus).includes(body.status)) {
      return errorResponse("VALIDATION_ERROR", "Invalid status value", 400)
    }

    // Find order
    const order = await prisma.order.findUnique({
      where: { id: body.orderId },
    })

    if (!order) {
      // Try finding by order number
      const orderByNumber = await prisma.order.findUnique({
        where: { orderNumber: body.orderId },
      })
      
      if (!orderByNumber) {
        return errorResponse("NOT_FOUND", "Order not found", 404)
      }
    }

    const orderId = order?.id ?? body.orderId

    // Update order status
    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: {
        status: body.status,
        ...(body.status === "COMPLETED" && { completionDatetime: new Date() }),
      },
    })

    // Add status history
    await prisma.orderStatusHistory.create({
      data: {
        orderId,
        status: body.status,
        notes: `Updated via webhook at ${body.timestamp}`,
      },
    })

    // Log webhook receipt
    await prisma.auditLog.create({
      data: {
        action: "WEBHOOK",
        entityType: "Order",
        entityId: orderId,
        newData: {
          source: "webhook",
          payload: body,
          timestamp: new Date().toISOString(),
        },
      },
    })

    // Handle specific status updates
    if (body.status === "COMPLETED") {
      await handleOrderCompleted(orderId)
    } else if (body.status === "FAILED") {
      await handleOrderFailed(orderId, body.metadata)
    }

    return successResponse({
      orderId,
      status: body.status,
      processed: true,
      timestamp: new Date().toISOString(),
    })
  })
}

// ============================================================================
// Helper Functions
// ============================================================================

function validateWebhookSignature(payload: WebhookStatusPayload, signature: string): boolean {
  const secret = process.env.WEBHOOK_SECRET
  if (!secret) {
    console.warn("WEBHOOK_SECRET not configured")
    return true // Allow if not configured (dev mode)
  }

  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(JSON.stringify(payload))
    .digest("hex")

  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  )
}

async function handleOrderCompleted(orderId: string) {
  // Get active assignment
  const assignment = await prisma.assignment.findFirst({
    where: {
      orderId,
      status: "ACCEPTED",
    },
  })

  if (assignment) {
    // Update assignment to completed
    await prisma.assignment.update({
      where: { id: assignment.id },
      data: {
        status: "COMPLETED",
        completedAt: new Date(),
        paymentStatus: "PENDING",
      },
    })

    // Create payment record
    await prisma.payment.create({
      data: {
        assignmentId: assignment.id,
        amount: assignment.totalPayment,
        status: "PENDING",
        method: "ACH",
      },
    })
  }

  // TODO: Send completion notifications
}

async function handleOrderFailed(orderId: string, metadata?: Record<string, unknown>) {
  const failureReason = metadata?.reason as string ?? "Unknown failure"

  // Update any active assignments
  await prisma.assignment.updateMany({
    where: {
      orderId,
      status: { in: ["OFFERED", "ACCEPTED"] },
    },
    data: {
      status: "CANCELLED",
      cancelledAt: new Date(),
      cancelReason: failureReason,
    },
  })

  // Add internal note
  await prisma.order.update({
    where: { id: orderId },
    data: {
      internalNotes: `Failed: ${failureReason}`,
    },
  })

  // TODO: Send failure notifications
  // TODO: Trigger rescue assignment if applicable
}


