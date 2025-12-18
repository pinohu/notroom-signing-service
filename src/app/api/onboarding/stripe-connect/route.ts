import { NextRequest } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { 
  successResponse, 
  errorResponse, 
  withErrorHandler 
} from "@/lib/api/utils"
import { 
  createStripeConnectAccount,
  checkStripeConnectStatus,
  getOnboarding,
} from "@/lib/onboarding"
import type { OnboardingData } from "@/types/onboarding"

// ============================================================================
// POST /api/onboarding/stripe-connect - Create Stripe Connect account
// ============================================================================

export async function POST(request: NextRequest) {
  return withErrorHandler(async () => {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id || !session.user.email) {
      return errorResponse("UNAUTHORIZED", "Not authenticated", 401)
    }

    const onboarding = await getOnboarding(session.user.id)
    if (!onboarding) {
      return errorResponse("NOT_FOUND", "Onboarding not found", 404)
    }

    const data = onboarding.data as OnboardingData
    
    // Check if already has Stripe account
    if (data.banking?.stripeConnectId) {
      // Check status
      const isComplete = await checkStripeConnectStatus(data.banking.stripeConnectId)
      
      if (isComplete) {
        return successResponse({
          message: "Stripe Connect already set up",
          accountId: data.banking.stripeConnectId,
          isComplete: true,
        })
      }
      
      // Need to resume onboarding - would need to create new link
      // For now, return the existing account ID
      return successResponse({
        message: "Stripe Connect setup incomplete",
        accountId: data.banking.stripeConnectId,
        isComplete: false,
      })
    }

    try {
      const result = await createStripeConnectAccount(
        session.user.id,
        session.user.email
      )

      return successResponse({
        message: "Stripe Connect account created",
        accountId: result.accountId,
        onboardingUrl: result.onboardingUrl,
      })
    } catch (error) {
      return errorResponse(
        "INTERNAL_ERROR",
        error instanceof Error ? error.message : "Failed to create Stripe account",
        500
      )
    }
  })
}

// ============================================================================
// GET /api/onboarding/stripe-connect - Check Stripe Connect status
// ============================================================================

export async function GET(request: NextRequest) {
  return withErrorHandler(async () => {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return errorResponse("UNAUTHORIZED", "Not authenticated", 401)
    }

    const onboarding = await getOnboarding(session.user.id)
    if (!onboarding) {
      return errorResponse("NOT_FOUND", "Onboarding not found", 404)
    }

    const data = onboarding.data as OnboardingData
    
    if (!data.banking?.stripeConnectId) {
      return successResponse({
        hasAccount: false,
        isComplete: false,
      })
    }

    const isComplete = await checkStripeConnectStatus(data.banking.stripeConnectId)

    return successResponse({
      hasAccount: true,
      accountId: data.banking.stripeConnectId,
      isComplete,
    })
  })
}

