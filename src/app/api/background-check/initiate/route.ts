// API Route: Initiate Background Check with Payment
// POST /api/background-check/initiate

import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import Stripe from "stripe"
import {
  getProviderById,
  formatPrice,
} from "@/lib/background-check-providers"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-12-18.acacia",
})

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
    const { providerId, applicantData } = body

    if (!providerId) {
      return NextResponse.json(
        { success: false, error: "Provider ID is required" },
        { status: 400 }
      )
    }

    const provider = getProviderById(providerId)
    if (!provider) {
      return NextResponse.json(
        { success: false, error: "Invalid provider" },
        { status: 400 }
      )
    }

    // Handle free providers (uploads) - no payment needed
    if (provider.finalCost === 0) {
      return NextResponse.json({
        success: true,
        requiresPayment: false,
        provider: {
          id: provider.id,
          name: provider.name,
          method: provider.method,
        },
        message: "Upload your certificate to continue",
      })
    }

    // Get user's onboarding data for applicant info
    const onboarding = await prisma.notaryOnboarding.findUnique({
      where: { userId: session.user.id },
      include: { user: true },
    })

    if (!onboarding) {
      return NextResponse.json(
        { success: false, error: "Onboarding not found" },
        { status: 404 }
      )
    }

    const onboardingData = onboarding.data as Record<string, unknown> | null
    const basicInfo = (onboardingData?.basicInfo as Record<string, string>) || {}
    
    // Use provided applicant data or fall back to onboarding data
    const applicantName = applicantData?.name || 
      `${basicInfo.firstName || ""} ${basicInfo.lastName || ""}`.trim() ||
      session.user.name ||
      "Notary Applicant"
    
    const applicantEmail = applicantData?.email || 
      basicInfo.email || 
      session.user.email ||
      ""

    // Create Stripe Checkout Session for paid providers
    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      customer_email: applicantEmail || undefined,
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: provider.finalCost,
            product_data: {
              name: `${provider.name} Background Check`,
              description: `Background screening for Notroom Elite Network. Includes: ${provider.checksIncluded.slice(0, 3).join(", ")}${provider.checksIncluded.length > 3 ? ` and ${provider.checksIncluded.length - 3} more` : ""}`,
              metadata: {
                provider_id: provider.id,
                base_cost: provider.baseCost.toString(),
                markup: (provider.finalCost - provider.baseCost).toString(),
              },
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId: session.user.id,
        providerId: provider.id,
        applicantEmail: applicantEmail,
        applicantName: applicantName,
        onboardingId: onboarding.id,
      },
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/onboard?step=5&payment=success&provider=${providerId}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/onboard?step=5&payment=cancelled`,
      expires_at: Math.floor(Date.now() / 1000) + 30 * 60, // 30 minutes
    })

    // Store pending payment in onboarding data
    await prisma.notaryOnboarding.update({
      where: { id: onboarding.id },
      data: {
        data: {
          ...(onboardingData || {}),
          backgroundCheck: {
            ...(onboardingData?.backgroundCheck as Record<string, unknown> || {}),
            pendingPayment: {
              sessionId: checkoutSession.id,
              providerId: provider.id,
              amount: provider.finalCost,
              createdAt: new Date().toISOString(),
            },
          },
        },
      },
    })

    return NextResponse.json({
      success: true,
      requiresPayment: true,
      checkoutUrl: checkoutSession.url,
      sessionId: checkoutSession.id,
      provider: {
        id: provider.id,
        name: provider.name,
        turnaround: provider.turnaround,
      },
      pricing: {
        baseCost: formatPrice(provider.baseCost),
        markup: formatPrice(provider.finalCost - provider.baseCost),
        total: formatPrice(provider.finalCost),
        totalCents: provider.finalCost,
      },
    })
  } catch (error) {
    console.error("Background check initiation error:", error)
    return NextResponse.json(
      { success: false, error: "Failed to initiate background check" },
      { status: 500 }
    )
  }
}

// GET endpoint to check payment/check status
export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      )
    }

    const onboarding = await prisma.notaryOnboarding.findUnique({
      where: { userId: session.user.id },
    })

    if (!onboarding) {
      return NextResponse.json(
        { success: false, error: "Onboarding not found" },
        { status: 404 }
      )
    }

    const onboardingData = onboarding.data as Record<string, unknown> | null
    const backgroundCheck = onboardingData?.backgroundCheck as Record<string, unknown> | null

    if (!backgroundCheck) {
      return NextResponse.json({
        success: true,
        status: "not_started",
        message: "Background check not yet initiated",
      })
    }

    return NextResponse.json({
      success: true,
      status: backgroundCheck.status || "unknown",
      provider: backgroundCheck.provider,
      checkId: backgroundCheck.providerCheckId,
      invitationUrl: backgroundCheck.invitationUrl,
      completedAt: backgroundCheck.completedAt,
      result: backgroundCheck.result,
    })
  } catch (error) {
    console.error("Background check status error:", error)
    return NextResponse.json(
      { success: false, error: "Failed to get status" },
      { status: 500 }
    )
  }
}

