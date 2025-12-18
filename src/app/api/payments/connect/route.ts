// Stripe Connect Account Management API
// POST /api/payments/connect - Create or get onboarding link
// GET /api/payments/connect - Get account status

import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import {
  createConnectedAccount,
  checkAccountStatus,
  getAccountLink,
  getLoginLink,
} from "@/lib/payments"

// POST: Create connected account or get onboarding link
export async function POST(request: NextRequest) {
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
      include: { user: true },
    })

    if (!notary) {
      return NextResponse.json(
        { success: false, error: "Notary profile not found" },
        { status: 404 }
      )
    }

    const result = await createConnectedAccount(
      notary.id,
      notary.user.email,
      notary.firstName,
      notary.lastName
    )

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      )
    }

    return NextResponse.json({
      success: true,
      accountId: result.accountId,
      onboardingUrl: result.onboardingUrl,
    })
  } catch (error) {
    console.error("Connect account error:", error)
    return NextResponse.json(
      { success: false, error: "Failed to setup payment account" },
      { status: 500 }
    )
  }
}

// GET: Get connected account status
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

    if (!notary.stripeConnectId) {
      return NextResponse.json({
        success: true,
        hasAccount: false,
        status: "not_connected",
      })
    }

    const accountStatus = await checkAccountStatus(notary.stripeConnectId)

    // Get dashboard link if fully onboarded
    let dashboardLink = null
    if (accountStatus.isComplete && accountStatus.payoutsEnabled) {
      dashboardLink = await getLoginLink(notary.stripeConnectId)
    }

    // Get onboarding link if not complete
    let onboardingLink = null
    if (!accountStatus.isComplete) {
      onboardingLink = await getAccountLink(notary.stripeConnectId)
    }

    return NextResponse.json({
      success: true,
      hasAccount: true,
      accountId: notary.stripeConnectId,
      status: accountStatus.isComplete ? "active" : "pending",
      isComplete: accountStatus.isComplete,
      chargesEnabled: accountStatus.chargesEnabled,
      payoutsEnabled: accountStatus.payoutsEnabled,
      requirements: accountStatus.requirements,
      dashboardLink,
      onboardingLink,
    })
  } catch (error) {
    console.error("Get account status error:", error)
    return NextResponse.json(
      { success: false, error: "Failed to get account status" },
      { status: 500 }
    )
  }
}

