// Provider Webhook Handler for Background Check Status Updates
// POST /api/background-check/provider-webhook
// Receives webhooks from IntelliCorp, GoodHire, Checkr, Verified Credentials

import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { mapProviderStatus } from "@/lib/background-check-apis"
import crypto from "crypto"

// Verify webhook signatures from different providers
function verifyWebhookSignature(
  provider: string,
  payload: string,
  signature: string
): boolean {
  const secrets: Record<string, string | undefined> = {
    intellicorp: process.env.INTELLICORP_WEBHOOK_SECRET,
    goodhire: process.env.GOODHIRE_WEBHOOK_SECRET,
    checkr: process.env.CHECKR_WEBHOOK_SECRET,
    verified_credentials: process.env.VERIFIED_CREDENTIALS_WEBHOOK_SECRET,
  }

  const secret = secrets[provider.toLowerCase()]
  if (!secret) {
    console.warn(`No webhook secret configured for provider: ${provider}`)
    return false
  }

  // Most providers use HMAC-SHA256
  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(payload)
    .digest("hex")

  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(expectedSignature)
  )
}

// Parse webhook payload based on provider format
interface ParsedWebhook {
  provider: string
  checkId: string
  status: string
  adjudication?: string
  reportUrl?: string
  completedAt?: string
}

function parseWebhookPayload(
  provider: string,
  body: Record<string, unknown>
): ParsedWebhook | null {
  try {
    switch (provider.toLowerCase()) {
      case "intellicorp":
        return {
          provider: "intellicorp",
          checkId: body.screeningId as string,
          status: body.status as string,
          adjudication: body.adjudication as string,
          reportUrl: body.reportUrl as string,
          completedAt: body.completedAt as string,
        }

      case "goodhire":
        return {
          provider: "goodhire",
          checkId: body.id as string,
          status: body.status as string,
          adjudication: body.result as string,
          reportUrl: body.report_url as string,
          completedAt: body.completed_at as string,
        }

      case "checkr":
        // Checkr sends different event types
        const checkrData = body.data as Record<string, unknown>
        return {
          provider: "checkr",
          checkId: (checkrData?.id as string) || (body.id as string),
          status: body.type === "report.completed" ? "complete" : (body.status as string),
          adjudication: checkrData?.adjudication as string,
          reportUrl: checkrData?.report_url as string,
          completedAt: checkrData?.completed_at as string,
        }

      case "verified_credentials":
        return {
          provider: "verified_credentials",
          checkId: body.orderId as string,
          status: body.orderStatus as string,
          adjudication: body.overallResult as string,
          reportUrl: body.reportLink as string,
          completedAt: body.completedDate as string,
        }

      default:
        console.error(`Unknown provider: ${provider}`)
        return null
    }
  } catch (error) {
    console.error(`Failed to parse webhook payload for ${provider}:`, error)
    return null
  }
}

export async function POST(request: NextRequest) {
  const body = await request.text()
  
  // Determine provider from headers or URL params
  const url = new URL(request.url)
  let provider = url.searchParams.get("provider") || ""
  
  // Also check common header patterns
  if (!provider) {
    if (request.headers.get("x-checkr-signature")) {
      provider = "checkr"
    } else if (request.headers.get("x-goodhire-signature")) {
      provider = "goodhire"
    } else if (request.headers.get("x-intellicorp-signature")) {
      provider = "intellicorp"
    } else if (request.headers.get("x-vc-signature")) {
      provider = "verified_credentials"
    }
  }

  if (!provider) {
    console.error("Could not determine webhook provider")
    return NextResponse.json(
      { error: "Unknown provider" },
      { status: 400 }
    )
  }

  // Verify signature (optional in development)
  const signature =
    request.headers.get("x-checkr-signature") ||
    request.headers.get("x-goodhire-signature") ||
    request.headers.get("x-intellicorp-signature") ||
    request.headers.get("x-vc-signature") ||
    request.headers.get("x-signature") ||
    ""

  if (process.env.NODE_ENV === "production" && signature) {
    if (!verifyWebhookSignature(provider, body, signature)) {
      console.error("Invalid webhook signature")
      return NextResponse.json(
        { error: "Invalid signature" },
        { status: 401 }
      )
    }
  }

  // Parse the payload
  let parsedBody: Record<string, unknown>
  try {
    parsedBody = JSON.parse(body)
  } catch {
    console.error("Invalid JSON payload")
    return NextResponse.json(
      { error: "Invalid JSON" },
      { status: 400 }
    )
  }

  const webhook = parseWebhookPayload(provider, parsedBody)
  if (!webhook) {
    return NextResponse.json(
      { error: "Failed to parse webhook" },
      { status: 400 }
    )
  }

  console.log(`Received ${provider} webhook for check ${webhook.checkId}:`, webhook.status)

  // Find the onboarding record with this check ID
  const onboardings = await prisma.notaryOnboarding.findMany({
    where: {
      status: "IN_PROGRESS",
    },
  })

  // Search through onboarding data for matching check ID
  let targetOnboarding = null
  for (const onboarding of onboardings) {
    const data = onboarding.data as Record<string, unknown> | null
    const bgCheck = data?.backgroundCheck as Record<string, unknown> | null
    if (bgCheck?.providerCheckId === webhook.checkId) {
      targetOnboarding = onboarding
      break
    }
  }

  if (!targetOnboarding) {
    console.error(`No onboarding found for check ID: ${webhook.checkId}`)
    // Return 200 to prevent retries - the check might be from an old/different system
    return NextResponse.json({ received: true, matched: false })
  }

  // Map the status to our internal format
  const mappedStatus = mapProviderStatus(webhook.provider, webhook.status)
  const onboardingData = targetOnboarding.data as Record<string, unknown> | null
  const existingBgCheck = onboardingData?.backgroundCheck as Record<string, unknown> | null

  // Update the onboarding record
  await prisma.notaryOnboarding.update({
    where: { id: targetOnboarding.id },
    data: {
      data: {
        ...(onboardingData || {}),
        backgroundCheck: {
          ...(existingBgCheck || {}),
          status: mappedStatus.toUpperCase(),
          lastWebhookAt: new Date().toISOString(),
          result: {
            adjudication: webhook.adjudication,
            reportUrl: webhook.reportUrl,
          },
          completedAt: webhook.completedAt || 
            (mappedStatus === "complete" || mappedStatus === "clear" || mappedStatus === "consider"
              ? new Date().toISOString()
              : null),
        },
      },
    },
  })

  // If the check is complete and clear, we might want to auto-proceed
  if (mappedStatus === "clear") {
    console.log(`Background check CLEAR for onboarding ${targetOnboarding.id}`)
    // Could send notification or auto-update onboarding step here
  } else if (mappedStatus === "consider") {
    console.log(`Background check needs REVIEW for onboarding ${targetOnboarding.id}`)
    // Flag for admin review
  } else if (mappedStatus === "error") {
    console.error(`Background check ERROR for onboarding ${targetOnboarding.id}`)
    // Send error notification
  }

  return NextResponse.json({
    received: true,
    matched: true,
    status: mappedStatus,
  })
}

// Handle GET requests for health check
export async function GET() {
  return NextResponse.json({
    status: "ok",
    message: "Background check provider webhook endpoint",
    supportedProviders: ["intellicorp", "goodhire", "checkr", "verified_credentials"],
  })
}


