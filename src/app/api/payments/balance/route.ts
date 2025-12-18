// Notary Balance & History API
// GET /api/payments/balance - Get notary balance and payment history

import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import {
  getNotaryBalance,
  getPaymentHistory,
  getTaxDocuments,
} from "@/lib/payments"
import { formatPaymentAmount } from "@/lib/payment-calculations"

export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      )
    }

    // Get notary profile
    const notary = await prisma.notary.findFirst({
      where: { userId: session.user.id },
    })

    if (!notary) {
      return NextResponse.json(
        { success: false, error: "Notary profile not found" },
        { status: 404 }
      )
    }

    const url = new URL(request.url)
    const limit = parseInt(url.searchParams.get("limit") || "20")
    const offset = parseInt(url.searchParams.get("offset") || "0")
    const includeTaxDocs = url.searchParams.get("taxDocs") === "true"

    // Get balance
    const balance = await getNotaryBalance(notary.id)

    // Get payment history
    const history = await getPaymentHistory(notary.id, limit, offset)

    // Get payment stats
    const stats = await prisma.notaryPayment.aggregate({
      where: { notaryId: notary.id },
      _count: true,
      _sum: { amount: true },
    })

    const completedStats = await prisma.notaryPayment.aggregate({
      where: {
        notaryId: notary.id,
        status: "COMPLETED",
      },
      _count: true,
      _sum: { amount: true },
    })

    const pendingStats = await prisma.notaryPayment.aggregate({
      where: {
        notaryId: notary.id,
        status: "PENDING",
      },
      _count: true,
      _sum: { amount: true },
    })

    // Get tax documents if requested
    let taxDocuments = null
    if (includeTaxDocs) {
      taxDocuments = await getTaxDocuments(notary.id)
    }

    // Year-to-date earnings
    const yearStart = new Date(new Date().getFullYear(), 0, 1)
    const ytdStats = await prisma.notaryPayment.aggregate({
      where: {
        notaryId: notary.id,
        status: "COMPLETED",
        completedAt: { gte: yearStart },
      },
      _sum: { amount: true },
      _count: true,
    })

    return NextResponse.json({
      success: true,
      balance: {
        pending: balance.pendingBalance,
        available: balance.availableBalance,
        pendingFormatted: formatPaymentAmount(balance.pendingBalance),
        availableFormatted: formatPaymentAmount(balance.availableBalance),
        currency: balance.currency,
      },
      stats: {
        totalPayments: stats._count,
        totalEarnings: stats._sum.amount || 0,
        totalEarningsFormatted: formatPaymentAmount(stats._sum.amount || 0),
        completedPayments: completedStats._count,
        completedAmount: completedStats._sum.amount || 0,
        pendingPayments: pendingStats._count,
        pendingAmount: pendingStats._sum.amount || 0,
        yearToDate: {
          count: ytdStats._count,
          amount: ytdStats._sum.amount || 0,
          formatted: formatPaymentAmount(ytdStats._sum.amount || 0),
        },
      },
      history: history.map((h) => ({
        ...h,
        amountFormatted: formatPaymentAmount(h.amount),
      })),
      taxDocuments,
      hasStripeAccount: !!notary.stripeConnectId,
    })
  } catch (error) {
    console.error("Get balance error:", error)
    return NextResponse.json(
      { success: false, error: "Failed to get balance" },
      { status: 500 }
    )
  }
}

