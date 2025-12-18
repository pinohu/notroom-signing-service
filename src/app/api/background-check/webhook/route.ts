// Stripe Webhook Handler for Background Check Payments
// POST /api/background-check/webhook

import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { prisma } from "@/lib/prisma"
import { getProviderById } from "@/lib/background-check-providers"
import { initiateBackgroundCheck } from "@/lib/background-check-apis"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-12-18.acacia",
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get("stripe-signature")

  if (!signature) {
    console.error("Missing Stripe signature")
    return NextResponse.json({ error: "Missing signature" }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err) {
    console.error("Webhook signature verification failed:", err)
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 })
  }

  // Handle the checkout.session.completed event
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session

    const { userId, providerId, applicantEmail, applicantName, onboardingId } =
      session.metadata || {}

    if (!userId || !providerId || !onboardingId) {
      console.error("Missing metadata in Stripe session:", session.metadata)
      return NextResponse.json({ error: "Missing metadata" }, { status: 400 })
    }

    // Get onboarding data
    const onboarding = await prisma.notaryOnboarding.findUnique({
      where: { id: onboardingId },
    })

    if (!onboarding) {
      console.error("Onboarding not found:", onboardingId)
      return NextResponse.json({ error: "Onboarding not found" }, { status: 404 })
    }

    const onboardingData = onboarding.data as Record<string, unknown> | null
    const basicInfo = (onboardingData?.basicInfo as Record<string, string>) || {}

    // Get provider details
    const provider = getProviderById(providerId)
    if (!provider) {
      console.error("Provider not found:", providerId)
      return NextResponse.json({ error: "Provider not found" }, { status: 400 })
    }

    try {
      // Initiate background check with the provider API
      const checkResult = await initiateBackgroundCheck(providerId, {
        firstName: basicInfo.firstName || applicantName?.split(" ")[0] || "",
        lastName: basicInfo.lastName || applicantName?.split(" ").slice(1).join(" ") || "",
        email: basicInfo.email || applicantEmail || "",
        phone: basicInfo.phone,
        address: basicInfo.address
          ? {
              street: basicInfo.address,
              city: basicInfo.city || "",
              state: basicInfo.state || "",
              zip: basicInfo.zipCode || "",
            }
          : undefined,
        ssn: (onboardingData?.backgroundCheck as Record<string, string>)?.ssn,
        dob: (onboardingData?.backgroundCheck as Record<string, string>)?.dob,
      })

      // Update onboarding with check details
      await prisma.notaryOnboarding.update({
        where: { id: onboardingId },
        data: {
          data: {
            ...(onboardingData || {}),
            backgroundCheck: {
              ...(onboardingData?.backgroundCheck as Record<string, unknown> || {}),
              provider: providerId,
              providerName: provider.name,
              providerCheckId: checkResult.checkId,
              status: "PENDING",
              invitationUrl: checkResult.invitationUrl,
              payment: {
                stripeSessionId: session.id,
                stripePaymentIntent: session.payment_intent,
                amount: session.amount_total,
                currency: session.currency,
                paidAt: new Date().toISOString(),
              },
              initiatedAt: new Date().toISOString(),
              pendingPayment: null, // Clear pending payment
            },
          },
        },
      })

      console.log(
        `Background check initiated for user ${userId} with provider ${providerId}:`,
        checkResult.checkId
      )
    } catch (error) {
      console.error("Failed to initiate background check after payment:", error)

      // Update onboarding with error status
      await prisma.notaryOnboarding.update({
        where: { id: onboardingId },
        data: {
          data: {
            ...(onboardingData || {}),
            backgroundCheck: {
              ...(onboardingData?.backgroundCheck as Record<string, unknown> || {}),
              provider: providerId,
              status: "ERROR",
              error: error instanceof Error ? error.message : "Unknown error",
              payment: {
                stripeSessionId: session.id,
                stripePaymentIntent: session.payment_intent,
                amount: session.amount_total,
                currency: session.currency,
                paidAt: new Date().toISOString(),
              },
              initiatedAt: new Date().toISOString(),
            },
          },
        },
      })

      // Attempt refund if check initiation fails
      if (session.payment_intent) {
        try {
          await stripe.refunds.create({
            payment_intent: session.payment_intent as string,
            reason: "requested_by_customer",
          })
          console.log("Refund issued for failed background check initiation")
        } catch (refundError) {
          console.error("Failed to issue refund:", refundError)
        }
      }
    }
  }

  // Handle checkout.session.expired event
  if (event.type === "checkout.session.expired") {
    const session = event.data.object as Stripe.Checkout.Session
    const { onboardingId } = session.metadata || {}

    if (onboardingId) {
      const onboarding = await prisma.notaryOnboarding.findUnique({
        where: { id: onboardingId },
      })

      if (onboarding) {
        const onboardingData = onboarding.data as Record<string, unknown> | null
        await prisma.notaryOnboarding.update({
          where: { id: onboardingId },
          data: {
            data: {
              ...(onboardingData || {}),
              backgroundCheck: {
                ...(onboardingData?.backgroundCheck as Record<string, unknown> || {}),
                pendingPayment: null, // Clear expired payment session
              },
            },
          },
        })
      }
    }
  }

  return NextResponse.json({ received: true })
}

