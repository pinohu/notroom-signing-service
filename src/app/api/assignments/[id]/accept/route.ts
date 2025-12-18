import { NextRequest } from "next/server"
import { prisma } from "@/lib/prisma"
import { 
  successResponse, 
  errorResponse, 
  requireRole,
  withErrorHandler 
} from "@/lib/api/utils"
import type { AcceptAssignmentInput } from "@/types/api"
import { AssignmentStatus, OrderStatus } from "@prisma/client"

// ============================================================================
// POST /api/assignments/[id]/accept - Notary accepts assignment
// ============================================================================

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  return withErrorHandler(async () => {
    const user = await requireRole(["NOTARY", "ADMIN"])

    const { id } = await params
    const body: AcceptAssignmentInput = await request.json()

    // Get assignment with order
    const assignment = await prisma.assignment.findUnique({
      where: { id },
      include: {
        order: true,
        notary: {
          include: { user: true },
        },
      },
    })

    if (!assignment) {
      return errorResponse("NOT_FOUND", "Assignment not found", 404)
    }

    // Verify the notary is accepting their own assignment (unless admin)
    // @ts-expect-error - user has role and id
    if (user.role === "NOTARY" && assignment.notary.user.id !== user.id) {
      return errorResponse("FORBIDDEN", "Cannot accept another notary's assignment", 403)
    }

    // Check assignment status
    if (assignment.status !== AssignmentStatus.OFFERED) {
      return errorResponse(
        "CONFLICT",
        `Cannot accept assignment with status ${assignment.status}`,
        409
      )
    }

    // Check if offer has expired
    if (assignment.offerExpiresAt && new Date() > assignment.offerExpiresAt) {
      // Update assignment to expired
      await prisma.assignment.update({
        where: { id },
        data: { status: AssignmentStatus.EXPIRED },
      })
      return errorResponse("CONFLICT", "Assignment offer has expired", 409)
    }

    // Calculate confirmation time
    const confirmationTime = Math.round(
      (Date.now() - assignment.offeredAt.getTime()) / 60000
    ) // minutes

    // Accept assignment
    const updatedAssignment = await prisma.assignment.update({
      where: { id },
      data: {
        status: AssignmentStatus.ACCEPTED,
        acceptedAt: new Date(),
        confirmationTime,
        notaryNotes: body.confirmationNotes,
      },
      include: {
        order: {
          include: { titleCompany: true },
        },
        notary: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            phone: true,
          },
        },
      },
    })

    // Update order status
    await prisma.order.update({
      where: { id: assignment.orderId },
      data: {
        status: OrderStatus.ACCEPTED,
        acceptedAt: new Date(),
      },
    })

    // Add order status history
    await prisma.orderStatusHistory.create({
      data: {
        orderId: assignment.orderId,
        status: OrderStatus.ACCEPTED,
        notes: `Accepted by ${assignment.notary.firstName} ${assignment.notary.lastName} in ${confirmationTime} minutes`,
      },
    })

    // Update notary's last active timestamp
    await prisma.notary.update({
      where: { id: assignment.notaryId },
      data: { lastActiveAt: new Date() },
    })

    // TODO: Send confirmation to title company
    // TODO: Send confirmation to notary with order details

    return successResponse({
      assignment: updatedAssignment,
      confirmationTime,
      message: "Assignment accepted successfully",
    })
  })
}


