// Stripe Webhook Handler for Payments
// POST /api/payments/webhook

import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { handlePaymentWebhook } from "@/lib/payments"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-12-18.acacia",
})

const webhookSecret = process.env.STRIPE_CONNECT_WEBHOOK_SECRET!

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

  console.log(`Received Stripe event: ${event.type}`)

  try {
    // Handle payment-related events
    const result = await handlePaymentWebhook(event)

    if (result) {
      console.log(`Payment ${result.paymentId} status: ${result.status}`)
    }

    // Handle Connect account events
    if (event.type === "account.updated") {
      const account = event.data.object as Stripe.Account
      console.log(
        `Account ${account.id} updated - details_submitted: ${account.details_submitted}, payouts_enabled: ${account.payouts_enabled}`
      )
    }

    // Handle payout events
    if (event.type === "payout.created") {
      const payout = event.data.object as Stripe.Payout
      console.log(`Payout ${payout.id} created for ${payout.amount / 100} ${payout.currency}`)
    }

    if (event.type === "payout.paid") {
      const payout = event.data.object as Stripe.Payout
      console.log(`Payout ${payout.id} paid`)
    }

    if (event.type === "payout.failed") {
      const payout = event.data.object as Stripe.Payout
      console.error(`Payout ${payout.id} failed: ${payout.failure_message}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error("Webhook processing error:", error)
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    )
  }
}

