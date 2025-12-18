import { NextRequest } from "next/server"
import { prisma } from "@/lib/prisma"
import { 
  successResponse, 
  errorResponse, 
  requireRole,
  withErrorHandler 
} from "@/lib/api/utils"

// ============================================================================
// GET /api/orders/[id] - Get order details
// ============================================================================

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  return withErrorHandler(async () => {
    await requireRole(["ADMIN", "TITLE_COMPANY", "NOTARY"])

    const { id } = await params

    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        titleCompany: true,
        assignments: {
          include: {
            notary: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                phone: true,
                tier: true,
                eliteScore: true,
              },
            },
            payment: true,
          },
          orderBy: { createdAt: "desc" },
        },
        documents: {
          orderBy: { createdAt: "asc" },
        },
        statusHistory: {
          orderBy: { createdAt: "desc" },
          take: 20,
        },
      },
    })

    if (!order) {
      return errorResponse("NOT_FOUND", "Order not found", 404)
    }

    return successResponse(order)
  })
}

// ============================================================================
// PATCH /api/orders/[id] - Update order
// ============================================================================

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  return withErrorHandler(async () => {
    await requireRole(["ADMIN", "TITLE_COMPANY"])

    const { id } = await params
    const body = await request.json()

    const existingOrder = await prisma.order.findUnique({
      where: { id },
    })

    if (!existingOrder) {
      return errorResponse("NOT_FOUND", "Order not found", 404)
    }

    // Only allow updates to certain fields
    const allowedFields = [
      "scheduledDatetime",
      "scheduledEndTime",
      "borrowerPhone",
      "borrowerEmail",
      "specialInstructions",
      "signingAddress",
      "signingCity",
      "signingState",
      "signingZipCode",
    ]

    const updateData: Record<string, unknown> = {}
    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        if (field.includes("Datetime") || field.includes("Time")) {
          updateData[field] = new Date(body[field])
        } else {
          updateData[field] = body[field]
        }
      }
    }

    const order = await prisma.order.update({
      where: { id },
      data: updateData,
      include: {
        titleCompany: true,
        assignments: {
          include: { notary: true },
        },
      },
    })

    return successResponse(order)
  })
}

// ============================================================================
// DELETE /api/orders/[id] - Cancel order
// ============================================================================

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  return withErrorHandler(async () => {
    await requireRole(["ADMIN", "TITLE_COMPANY"])

    const { id } = await params
    const url = new URL(request.url)
    const reason = url.searchParams.get("reason") ?? "Cancelled by client"

    const order = await prisma.order.findUnique({
      where: { id },
    })

    if (!order) {
      return errorResponse("NOT_FOUND", "Order not found", 404)
    }

    // Cannot cancel completed orders
    if (order.status === "COMPLETED") {
      return errorResponse("CONFLICT", "Cannot cancel a completed order", 409)
    }

    // Update order status
    const updatedOrder = await prisma.order.update({
      where: { id },
      data: {
        status: "CANCELLED",
        cancellationReason: reason,
      },
    })

    // Cancel any active assignments
    await prisma.assignment.updateMany({
      where: {
        orderId: id,
        status: { in: ["OFFERED", "ACCEPTED"] },
      },
      data: {
        status: "CANCELLED",
        cancelledAt: new Date(),
        cancelReason: "Order cancelled",
      },
    })

    // Add status history
    await prisma.orderStatusHistory.create({
      data: {
        orderId: id,
        status: "CANCELLED",
        notes: reason,
      },
    })

    return successResponse(updatedOrder)
  })
}

