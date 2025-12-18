// Payment Processing API
// POST /api/payments/process - Process payment for an assignment
// POST /api/payments/process/batch - Process multiple payments

import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import {
  processPayment,
  executeTransfer,
  retryPayment,
  processScheduledPayments,
} from "@/lib/payments"

// POST: Process payment for assignment
export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      )
    }

    // Check if user is admin
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
    const { assignmentId, delayDays = 2, action } = body

    // Handle different actions
    switch (action) {
      case "process": {
        if (!assignmentId) {
          return NextResponse.json(
            { success: false, error: "Assignment ID required" },
            { status: 400 }
          )
        }

        const result = await processPayment(assignmentId, delayDays)
        return NextResponse.json(result)
      }

      case "execute": {
        const { paymentId } = body
        if (!paymentId) {
          return NextResponse.json(
            { success: false, error: "Payment ID required" },
            { status: 400 }
          )
        }

        const result = await executeTransfer(paymentId)
        return NextResponse.json(result)
      }

      case "retry": {
        const { paymentId } = body
        if (!paymentId) {
          return NextResponse.json(
            { success: false, error: "Payment ID required" },
            { status: 400 }
          )
        }

        const result = await retryPayment(paymentId)
        return NextResponse.json(result)
      }

      case "process_scheduled": {
        const result = await processScheduledPayments()
        return NextResponse.json({
          success: true,
          ...result,
        })
      }

      default:
        // Default action is to process a single payment
        if (!assignmentId) {
          return NextResponse.json(
            { success: false, error: "Assignment ID required" },
            { status: 400 }
          )
        }

        const result = await processPayment(assignmentId, delayDays)
        return NextResponse.json(result)
    }
  } catch (error) {
    console.error("Payment processing error:", error)
    return NextResponse.json(
      { success: false, error: "Failed to process payment" },
      { status: 500 }
    )
  }
}

// GET: Get pending payments
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

    const url = new URL(request.url)
    const status = url.searchParams.get("status") || "PENDING"
    const limit = parseInt(url.searchParams.get("limit") || "50")

    const payments = await prisma.notaryPayment.findMany({
      where: { status: status as "PENDING" | "PROCESSING" | "COMPLETED" | "FAILED" },
      include: {
        notary: {
          select: {
            firstName: true,
            lastName: true,
            stripeConnectId: true,
          },
        },
        assignment: {
          include: {
            order: {
              select: {
                orderNumber: true,
                propertyAddress: true,
              },
            },
          },
        },
      },
      orderBy: { scheduledFor: "asc" },
      take: limit,
    })

    const stats = await prisma.notaryPayment.groupBy({
      by: ["status"],
      _count: true,
      _sum: { amount: true },
    })

    return NextResponse.json({
      success: true,
      payments,
      stats: stats.reduce(
        (acc, s) => ({
          ...acc,
          [s.status.toLowerCase()]: {
            count: s._count,
            total: s._sum.amount || 0,
          },
        }),
        {}
      ),
    })
  } catch (error) {
    console.error("Get payments error:", error)
    return NextResponse.json(
      { success: false, error: "Failed to get payments" },
      { status: 500 }
    )
  }
}

