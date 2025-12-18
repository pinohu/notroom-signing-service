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

    // Update notary performance metrics
    await updateNotaryPerformance(assignment.notaryId)

    // TODO: Send completion notification to title company
    // TODO: Trigger scanback reminder

    return successResponse({
      assignment: updatedAssignment,
      payment: {
        id: payment.id,
        amount: payment.amount,
        status: payment.status,
      },
      message: "Assignment completed successfully. Payment is pending.",
    })
  })
}

// ============================================================================
// Helper: Update Notary Performance
// ============================================================================

async function updateNotaryPerformance(notaryId: string) {
  // Get all completed assignments for this notary
  const assignments = await prisma.assignment.findMany({
    where: { notaryId },
    include: { order: true },
  })

  const total = assignments.length
  const completed = assignments.filter(a => a.status === AssignmentStatus.COMPLETED).length
  const cancelled = assignments.filter(a => a.status === AssignmentStatus.CANCELLED).length
  const noShow = assignments.filter(a => a.status === AssignmentStatus.NO_SHOW).length
  
  // Calculate rates
  const acceptedAssignments = assignments.filter(a => 
    [AssignmentStatus.ACCEPTED, AssignmentStatus.COMPLETED].includes(a.status)
  )
  const acceptanceRate = total > 0 ? (acceptedAssignments.length / total) * 100 : 0
  
  // Calculate on-time rate (simplified - checking if completed before SLA)
  const onTimeCount = assignments.filter(a => {
    if (a.status !== AssignmentStatus.COMPLETED || !a.completedAt) return false
    const order = a.order
    if (!order.scanbackDeadline) return true
    return a.completedAt <= order.scanbackDeadline
  }).length
  const onTimeRate = completed > 0 ? (onTimeCount / completed) * 100 : 0

  // Calculate average confirmation time
  const confirmTimes = assignments
    .filter(a => a.confirmationTime !== null)
    .map(a => a.confirmationTime as number)
  const avgConfirmTime = confirmTimes.length > 0
    ? Math.round(confirmTimes.reduce((a, b) => a + b, 0) / confirmTimes.length)
    : null

  // Determine tier based on metrics
  let tier: "BRONZE" | "SILVER" | "GOLD" | "ELITE" = "BRONZE"
  if (completed >= 50 && acceptanceRate >= 90 && onTimeRate >= 95) {
    tier = "ELITE"
  } else if (completed >= 25 && acceptanceRate >= 75 && onTimeRate >= 90) {
    tier = "GOLD"
  } else if (completed >= 10 && acceptanceRate >= 60 && onTimeRate >= 80) {
    tier = "SILVER"
  }

  // Update performance record
  await prisma.notaryPerformance.upsert({
    where: { notaryId },
    update: {
      totalSignings: total,
      completedSignings: completed,
      cancelledSignings: cancelled,
      noShowCount: noShow,
      acceptanceRate,
      onTimeRate,
      avgConfirmTime,
      tier,
      lastCalculatedAt: new Date(),
    },
    create: {
      notaryId,
      totalSignings: total,
      completedSignings: completed,
      cancelledSignings: cancelled,
      noShowCount: noShow,
      acceptanceRate,
      onTimeRate,
      avgConfirmTime,
      tier,
    },
  })

  // Update notary's tier and elite score
  const eliteScore = Math.round(
    (acceptanceRate * 0.3) + 
    (onTimeRate * 0.4) + 
    (Math.min(100, completed) * 0.3)
  )

  await prisma.notary.update({
    where: { id: notaryId },
    data: { tier, eliteScore },
  })
}

