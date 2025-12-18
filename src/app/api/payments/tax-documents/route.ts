// Tax Document API (1099-NEC Generation)
// GET /api/payments/tax-documents - Get tax documents
// POST /api/payments/tax-documents - Generate tax document for a year

import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { generateTaxDocuments, getTaxDocuments } from "@/lib/payments"
import { formatPaymentAmount } from "@/lib/payment-calculations"

// GET: List tax documents for the notary
export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      )
    }

    const notary = await prisma.notary.findFirst({
      where: { userId: session.user.id },
    })

    if (!notary) {
      return NextResponse.json(
        { success: false, error: "Notary profile not found" },
        { status: 404 }
      )
    }

    const documents = await getTaxDocuments(notary.id)

    // Calculate earnings by year for context
    const earningsByYear: Record<number, number> = {}
    const currentYear = new Date().getFullYear()

    for (let year = currentYear; year >= currentYear - 3; year--) {
      const yearStart = new Date(year, 0, 1)
      const yearEnd = new Date(year, 11, 31, 23, 59, 59)

      const earnings = await prisma.notaryPayment.aggregate({
        where: {
          notaryId: notary.id,
          status: "COMPLETED",
          completedAt: {
            gte: yearStart,
            lte: yearEnd,
          },
        },
        _sum: { amount: true },
      })

      earningsByYear[year] = earnings._sum.amount || 0
    }

    return NextResponse.json({
      success: true,
      documents: documents.map((d) => ({
        ...d,
        totalAmountFormatted: formatPaymentAmount(d.totalAmount),
      })),
      earningsByYear: Object.entries(earningsByYear).map(([year, amount]) => ({
        year: parseInt(year),
        amount,
        formatted: formatPaymentAmount(amount),
        requires1099: amount >= 60000, // $600.00
      })),
      threshold: {
        amount: 60000,
        formatted: "$600.00",
        description: "1099-NEC required for earnings of $600 or more",
      },
    })
  } catch (error) {
    console.error("Get tax documents error:", error)
    return NextResponse.json(
      { success: false, error: "Failed to get tax documents" },
      { status: 500 }
    )
  }
}

// POST: Generate 1099 for a specific year (admin only for now)
export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { year, notaryId } = body

    // For now, allow both admin and notary to request
    // In production, this might be admin-only or scheduled
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    })

    let targetNotaryId = notaryId

    // If not admin, can only generate for self
    if (user?.role !== "ADMIN") {
      const notary = await prisma.notary.findFirst({
        where: { userId: session.user.id },
      })

      if (!notary) {
        return NextResponse.json(
          { success: false, error: "Notary profile not found" },
          { status: 404 }
        )
      }

      targetNotaryId = notary.id
    }

    if (!targetNotaryId || !year) {
      return NextResponse.json(
        { success: false, error: "Notary ID and year required" },
        { status: 400 }
      )
    }

    // Validate year
    const currentYear = new Date().getFullYear()
    if (year < 2020 || year > currentYear) {
      return NextResponse.json(
        { success: false, error: "Invalid year" },
        { status: 400 }
      )
    }

    // Can only generate for completed years
    if (year === currentYear) {
      return NextResponse.json(
        { success: false, error: "Cannot generate 1099 for current year until it ends" },
        { status: 400 }
      )
    }

    const document = await generateTaxDocuments(targetNotaryId, year)

    if (!document) {
      return NextResponse.json({
        success: true,
        generated: false,
        message: "Earnings below $600 threshold - no 1099 required",
      })
    }

    return NextResponse.json({
      success: true,
      generated: true,
      document: {
        ...document,
        totalAmountFormatted: formatPaymentAmount(document.totalAmount),
      },
    })
  } catch (error) {
    console.error("Generate tax document error:", error)
    return NextResponse.json(
      { success: false, error: "Failed to generate tax document" },
      { status: 500 }
    )
  }
}

