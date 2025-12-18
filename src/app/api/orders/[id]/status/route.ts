import { NextRequest } from "next/server"
import { prisma } from "@/lib/prisma"
import { 
  successResponse, 
  errorResponse, 
  requireRole,
  validateRequired,
  withErrorHandler 
} from "@/lib/api/utils"
import type { UpdateOrderStatusInput } from "@/types/api"
import { OrderStatus } from "@prisma/client"

// Valid status transitions
const validTransitions: Record<OrderStatus, OrderStatus[]> = {
  DRAFT: ["PENDING_ASSIGNMENT", "CANCELLED"],
  PENDING_ASSIGNMENT: ["ASSIGNED", "CANCELLED", "ON_HOLD"],
  ASSIGNED: ["ACCEPTED", "PENDING_ASSIGNMENT", "CANCELLED"],
  ACCEPTED: ["SCHEDULED", "IN_PROGRESS", "CANCELLED"],
  SCHEDULED: ["IN_PROGRESS", "CANCELLED", "ON_HOLD"],
  IN_PROGRESS: ["COMPLETED", "FAILED", "CANCELLED"],
  COMPLETED: [], // Terminal state
  CANCELLED: [], // Terminal state
  ON_HOLD: ["PENDING_ASSIGNMENT", "CANCELLED"],
  FAILED: ["PENDING_ASSIGNMENT", "CANCELLED"],
}

// ============================================================================
// PATCH /api/orders/[id]/status - Update order status
// ============================================================================

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  return withErrorHandler(async () => {
    const user = await requireRole(["ADMIN", "TITLE_COMPANY", "NOTARY"])

    const { id } = await params
    const body: UpdateOrderStatusInput = await request.json()

    // Validate input
    const validationErrors = validateRequired(body, ["status"])
    if (validationErrors) {
      return errorResponse("VALIDATION_ERROR", "Status is required", 400, validationErrors)
    }

    // Validate status enum
    if (!Object.values(OrderStatus).includes(body.status)) {
      return errorResponse("VALIDATION_ERROR", "Invalid status value", 400)
    }

    // Get current order
    const order = await prisma.order.findUnique({
      where: { id },
    })

    if (!order) {
      return errorResponse("NOT_FOUND", "Order not found", 404)
    }

    // Check valid transition
    const allowedTransitions = validTransitions[order.status]
    if (!allowedTransitions.includes(body.status)) {
      return errorResponse(
        "CONFLICT",
        `Cannot transition from ${order.status} to ${body.status}`,
        409
      )
    }

    // Update order
    const updateData: Record<string, unknown> = {
      status: body.status,
    }

    // Set completion datetime if completing
    if (body.status === "COMPLETED") {
      updateData.completionDatetime = new Date()
    }

    const updatedOrder = await prisma.order.update({
      where: { id },
      data: updateData,
      include: {
        titleCompany: true,
        assignments: {
          include: { notary: true },
        },
      },
    })

    // Add status history
    await prisma.orderStatusHistory.create({
      data: {
        orderId: id,
        status: body.status,
        notes: body.notes,
        // @ts-expect-error - user.id exists on session
        changedBy: user.id,
      },
    })

    return successResponse(updatedOrder)
  })
}

