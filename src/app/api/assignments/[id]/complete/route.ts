import { NextRequest } from "next/server"
import { prisma } from "@/lib/prisma"
import { 
  successResponse, 
  errorResponse, 
  requireRole,
  withErrorHandler 
} from "@/lib/api/utils"
import type { CompleteAssignmentInput } from "@/types/api"
import { AssignmentStatus, OrderStatus, PaymentStatus } from "@prisma/client"
import { updateNotaryTier } from "@/lib/scoring"

// ============================================================================
// POST /api/assignments/[id]/complete - Mark assignment complete
// ============================================================================

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  return withErrorHandler(async () => {
    const user = await requireRole(["NOTARY", "ADMIN"])

    const { id } = await params
    const body: CompleteAssignmentInput = await request.json()

    // Get assignment
    const assignment = await prisma.assignment.findUnique({
      where: { id },
      include: {
        order: true,
        notary: {
          include: { 
            user: true,
            performance: true,
          },
        },
      },
    })

    if (!assignment) {
      return errorResponse("NOT_FOUND", "Assignment not found", 404)
    }

    // Verify the notary is completing their own assignment (unless admin)
    // @ts-expect-error - user has role and id
    if (user.role === "NOTARY" && assignment.notary.user.id !== user.id) {
      return errorResponse("FORBIDDEN", "Cannot complete another notary's assignment", 403)
    }

    // Check assignment status
    if (assignment.status !== AssignmentStatus.ACCEPTED) {
      return errorResponse(
        "CONFLICT",
        `Cannot complete assignment with status ${assignment.status}`,
        409
      )
    }

    // Complete assignment
    const updatedAssignment = await prisma.assignment.update({
      where: { id },
      data: {
        status: AssignmentStatus.COMPLETED,
        completedAt: new Date(),
        arrivalTime: body.arrivalTime ? new Date(body.arrivalTime) : null,
        departureTime: body.departureTime ? new Date(body.departureTime) : null,
        notaryNotes: body.completionNotes,
        paymentStatus: PaymentStatus.PENDING,
      },
      include: {
        order: true,
        notary: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    })

    // Update order status
    await prisma.order.update({
      where: { id: assignment.orderId },
      data: {
        status: OrderStatus.COMPLETED,
        completionDatetime: new Date(),
      },
    })

    // Add order status history
    await prisma.orderStatusHistory.create({
      data: {
        orderId: assignment.orderId,
        status: OrderStatus.COMPLETED,
        notes: `Completed by ${assignment.notary.firstName} ${assignment.notary.lastName}`,
      },
    })

    // Create pending payment record
    const payment = await prisma.payment.create({
      data: {
        assignmentId: id,
        amount: assignment.totalPayment,
        status: PaymentStatus.PENDING,
        method: assignment.notary.preferredPayment,
      },
    })

    // Update notary score and tier using the scoring system
    const tierUpdate = await updateNotaryTier(assignment.notaryId)

    // TODO: Send completion notification to title company
    // TODO: Trigger scanback reminder

    return successResponse({
      assignment: updatedAssignment,
      payment: {
        id: payment.id,
        amount: payment.amount,
        status: payment.status,
      },
      tierUpdate: {
        previousTier: tierUpdate.previousTier,
        newTier: tierUpdate.newTier,
        newScore: tierUpdate.newScore,
        tierChanged: tierUpdate.tierChanged,
      },
      message: "Assignment completed successfully. Payment is pending.",
    })
  })
}


