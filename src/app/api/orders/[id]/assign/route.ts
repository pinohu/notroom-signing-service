import { NextRequest } from "next/server"
import { prisma } from "@/lib/prisma"
import { 
  successResponse, 
  errorResponse, 
  requireRole,
  validateRequired,
  withErrorHandler 
} from "@/lib/api/utils"
import type { AssignOrderInput } from "@/types/api"
import { OrderStatus, AssignmentStatus } from "@prisma/client"

// ============================================================================
// POST /api/orders/[id]/assign - Assign order to notary
// ============================================================================

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  return withErrorHandler(async () => {
    await requireRole(["ADMIN"])

    const { id } = await params
    const body: AssignOrderInput = await request.json()

    // Validate input
    const validationErrors = validateRequired(body, ["notaryId", "paymentAmount"])
    if (validationErrors) {
      return errorResponse("VALIDATION_ERROR", "Missing required fields", 400, validationErrors)
    }

    // Get order
    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        assignments: {
          where: {
            status: { in: [AssignmentStatus.OFFERED, AssignmentStatus.ACCEPTED] },
          },
        },
      },
    })

    if (!order) {
      return errorResponse("NOT_FOUND", "Order not found", 404)
    }

    // Check order is assignable
    if (!["PENDING_ASSIGNMENT", "ASSIGNED"].includes(order.status)) {
      return errorResponse(
        "CONFLICT",
        `Cannot assign order with status ${order.status}`,
        409
      )
    }

    // Check for existing active assignment
    if (order.assignments.length > 0) {
      return errorResponse(
        "CONFLICT",
        "Order already has an active assignment. Cancel it first.",
        409
      )
    }

    // Verify notary exists and is active
    const notary = await prisma.notary.findUnique({
      where: { id: body.notaryId },
    })

    if (!notary) {
      return errorResponse("NOT_FOUND", "Notary not found", 404)
    }

    if (notary.status !== "ACTIVE") {
      return errorResponse("CONFLICT", "Notary is not active", 409)
    }

    // Check notary is commissioned in the signing state
    const signingState = order.signingState ?? order.propertyState
    if (notary.commissionState !== signingState) {
      const additionalCommission = await prisma.notaryStateCommission.findFirst({
        where: {
          notaryId: notary.id,
          stateCode: signingState,
        },
      })

      if (!additionalCommission) {
        return errorResponse(
          "CONFLICT",
          `Notary is not commissioned in ${signingState}`,
          409
        )
      }
    }

    // Calculate total payment
    const totalPayment = 
      body.paymentAmount + 
      (body.travelAllowance ?? 0) + 
      (body.bonusAmount ?? 0)

    // Calculate offer expiration (default 30 minutes)
    const offerExpiresAt = body.offerExpiresAt 
      ? new Date(body.offerExpiresAt)
      : new Date(Date.now() + 30 * 60 * 1000)

    // Create assignment
    const assignment = await prisma.assignment.create({
      data: {
        orderId: id,
        notaryId: body.notaryId,
        status: AssignmentStatus.OFFERED,
        paymentAmount: body.paymentAmount,
        travelAllowance: body.travelAllowance,
        bonusAmount: body.bonusAmount,
        totalPayment,
        offerExpiresAt,
      },
      include: {
        notary: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            phone: true,
            tier: true,
          },
        },
        order: true,
      },
    })

    // Update order status
    await prisma.order.update({
      where: { id },
      data: {
        status: OrderStatus.ASSIGNED,
        assignedAt: new Date(),
      },
    })

    // Add status history
    await prisma.orderStatusHistory.create({
      data: {
        orderId: id,
        status: OrderStatus.ASSIGNED,
        notes: `Assigned to ${notary.firstName} ${notary.lastName}`,
      },
    })

    // TODO: Send notification to notary (SMS/email)

    return successResponse(assignment, 201)
  })
}


