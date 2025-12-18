import { NextRequest } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { 
  successResponse, 
  errorResponse, 
  withErrorHandler 
} from "@/lib/api/utils"
import { 
  createOnboarding, 
  getOnboarding,
  submitOnboarding,
} from "@/lib/onboarding"

// ============================================================================
// GET /api/onboarding - Get current user's onboarding status
// ============================================================================

export async function GET(request: NextRequest) {
  return withErrorHandler(async () => {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return errorResponse("UNAUTHORIZED", "Not authenticated", 401)
    }

    const onboarding = await getOnboarding(session.user.id)
    
    if (!onboarding) {
      return successResponse({ 
        exists: false,
        message: "No onboarding in progress" 
      })
    }

    return successResponse({
      exists: true,
      id: onboarding.id,
      currentStep: onboarding.currentStep,
      completedSteps: onboarding.completedSteps,
      status: onboarding.status,
      data: onboarding.data,
      startedAt: onboarding.startedAt,
      lastUpdatedAt: onboarding.lastUpdatedAt,
      submittedAt: onboarding.submittedAt,
    })
  })
}

// ============================================================================
// POST /api/onboarding - Start new onboarding
// ============================================================================

export async function POST(request: NextRequest) {
  return withErrorHandler(async () => {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return errorResponse("UNAUTHORIZED", "Not authenticated", 401)
    }

    // Check if already has onboarding
    const existing = await getOnboarding(session.user.id)
    if (existing) {
      return successResponse({
        id: existing.id,
        message: "Onboarding already exists",
        currentStep: existing.currentStep,
      })
    }

    // Check if already a notary
    const existingNotary = await prisma.notary.findUnique({
      where: { userId: session.user.id },
    })
    if (existingNotary) {
      return errorResponse(
        "VALIDATION_ERROR", 
        "You are already registered as a notary", 
        400
      )
    }

    const id = await createOnboarding(session.user.id)

    return successResponse({
      id,
      message: "Onboarding started",
      currentStep: 1,
    }, 201)
  })
}

// ============================================================================
// PATCH /api/onboarding - Submit onboarding for review
// ============================================================================

export async function PATCH(request: NextRequest) {
  return withErrorHandler(async () => {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return errorResponse("UNAUTHORIZED", "Not authenticated", 401)
    }

    const result = await submitOnboarding(session.user.id)

    if (!result.success) {
      return errorResponse(
        "VALIDATION_ERROR",
        "Onboarding incomplete",
        400,
        { errors: result.errors }
      )
    }

    return successResponse({
      message: "Onboarding submitted for review",
      status: "PENDING_REVIEW",
    })
  })
}


