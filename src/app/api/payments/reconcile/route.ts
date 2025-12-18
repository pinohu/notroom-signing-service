// Payment Reconciliation API
// POST /api/payments/reconcile - Run reconciliation

import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import {
  reconcilePayments,
  createMissingPayments,
} from "@/lib/payments"

// POST: Run payment reconciliation
export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      )
    }

    // Admin only
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    })

    if (user?.role !== "ADMIN") {
      return NextResponse.json(
        { success: false, error: "Admin access required" },
        { status: 403 }
      )
    }

    const body = await request.json()
    const { action = "reconcile", delayDays = 2 } = body

    switch (action) {
      case "reconcile": {
        // Just check for issues, don't create payments
        const result = await reconcilePayments()
        return NextResponse.json({
          success: true,
          action: "reconcile",
          ...result,
        })
      }

      case "create_missing": {
        // Create payments for completed assignments without payments
        const result = await createMissingPayments(delayDays)
        return NextResponse.json({
          success: true,
          action: "create_missing",
          ...result,
        })
      }

      case "full": {
        // Run full reconciliation and create missing payments
        const reconcileResult = await reconcilePayments()
        const createResult = await createMissingPayments(delayDays)

        return NextResponse.json({
          success: true,
          action: "full",
          reconciliation: reconcileResult,
          created: createResult,
        })
      }

      default:
        return NextResponse.json(
          { success: false, error: "Invalid action" },
          { status: 400 }
        )
    }
  } catch (error) {
    console.error("Reconciliation error:", error)
    return NextResponse.json(
      { success: false, error: "Reconciliation failed" },
      { status: 500 }
    )
  }
}

// GET: Get reconciliation status
export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      )
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    })

    if (user?.role !== "ADMIN") {
      return NextResponse.json(
        { success: false, error: "Admin access required" },
        { status: 403 }
      )
    }

    // Get counts for reconciliation status
    const completedAssignments = await prisma.assignment.count({
      where: { status: "COMPLETED" },
    })

    const paymentsCount = await prisma.notaryPayment.count()

    const unpaidAssignments = await prisma.assignment.count({
      where: {
        status: "COMPLETED",
        paymentStatus: "PENDING",
      },
    })

    const failedPayments = await prisma.notaryPayment.count({
      where: { status: "FAILED" },
    })

    const pendingPayments = await prisma.notaryPayment.count({
      where: { status: "PENDING" },
    })

    const processingPayments = await prisma.notaryPayment.count({
      where: { status: "PROCESSING" },
    })

    // Get payments due for processing
    const now = new Date()
    const duePayments = await prisma.notaryPayment.count({
      where: {
        status: "PENDING",
        scheduledFor: { lte: now },
      },
    })

    // Get payment totals
    const paymentTotals = await prisma.notaryPayment.groupBy({
      by: ["status"],
      _sum: { amount: true },
      _count: true,
    })

    return NextResponse.json({
      success: true,
      status: {
        completedAssignments,
        paymentsCount,
        unpaidAssignments,
        failedPayments,
        pendingPayments,
        processingPayments,
        dueForProcessing: duePayments,
        isHealthy: unpaidAssignments === 0 && failedPayments === 0,
      },
      totals: paymentTotals.reduce(
        (acc, t) => ({
          ...acc,
          [t.status.toLowerCase()]: {
            count: t._count,
            amount: t._sum.amount || 0,
          },
        }),
        {}
      ),
    })
  } catch (error) {
    console.error("Get reconciliation status error:", error)
    return NextResponse.json(
      { success: false, error: "Failed to get status" },
      { status: 500 }
    )
  }
}

