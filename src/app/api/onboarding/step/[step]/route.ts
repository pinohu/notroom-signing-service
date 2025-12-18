import { NextRequest } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { 
  successResponse, 
  errorResponse, 
  withErrorHandler 
} from "@/lib/api/utils"
import { 
  updateOnboardingStep,
  getOnboarding,
  ONBOARDING_STEPS,
} from "@/lib/onboarding"
import type { OnboardingData } from "@/types/onboarding"

// ============================================================================
// PUT /api/onboarding/step/[step] - Update a specific step
// ============================================================================

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ step: string }> }
) {
  return withErrorHandler(async () => {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return errorResponse("UNAUTHORIZED", "Not authenticated", 401)
    }

    const { step: stepStr } = await params
    const step = parseInt(stepStr, 10)

    if (isNaN(step) || step < 1 || step > 10) {
      return errorResponse("VALIDATION_ERROR", "Invalid step number", 400)
    }

    const onboarding = await getOnboarding(session.user.id)
    if (!onboarding) {
      return errorResponse("NOT_FOUND", "Onboarding not found. Please start first.", 404)
    }

    if (onboarding.status === "APPROVED") {
      return errorResponse("VALIDATION_ERROR", "Onboarding already approved", 400)
    }

    if (onboarding.status === "PENDING_REVIEW") {
      return errorResponse("VALIDATION_ERROR", "Onboarding already submitted for review", 400)
    }

    const body = await request.json()
    const stepData = body as Partial<OnboardingData>

    const result = await updateOnboardingStep(session.user.id, step, stepData)

    if (!result.success) {
      return errorResponse(
        "VALIDATION_ERROR",
        "Step validation failed",
        400,
        { errors: result.validation.errors }
      )
    }

    const stepInfo = ONBOARDING_STEPS[step - 1]
    const nextStep = step < 10 ? ONBOARDING_STEPS[step] : null

    return successResponse({
      message: `${stepInfo.name} saved successfully`,
      currentStep: step,
      nextStep: nextStep ? {
        step: nextStep.step,
        name: nextStep.name,
      } : null,
      isComplete: step === 10,
    })
  })
}

// ============================================================================
// GET /api/onboarding/step/[step] - Get data for a specific step
// ============================================================================

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ step: string }> }
) {
  return withErrorHandler(async () => {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return errorResponse("UNAUTHORIZED", "Not authenticated", 401)
    }

    const { step: stepStr } = await params
    const step = parseInt(stepStr, 10)

    if (isNaN(step) || step < 1 || step > 10) {
      return errorResponse("VALIDATION_ERROR", "Invalid step number", 400)
    }

    const onboarding = await getOnboarding(session.user.id)
    if (!onboarding) {
      return errorResponse("NOT_FOUND", "Onboarding not found", 404)
    }

    const data = onboarding.data as OnboardingData
    const stepKeyMap: Record<number, keyof OnboardingData> = {
      1: "basicInfo",
      2: "commission",
      3: "insurance",
      4: "equipment",
      5: "backgroundCheck",
      6: "banking",
      7: "serviceAreas",
      8: "availability",
      9: "specializations",
      10: "agreement",
    }

    const key = stepKeyMap[step]
    const stepInfo = ONBOARDING_STEPS[step - 1]
    const completedSteps = onboarding.completedSteps as number[]

    return successResponse({
      step,
      name: stepInfo.name,
      description: stepInfo.description,
      data: key ? data[key] : null,
      isCompleted: completedSteps.includes(step),
      canEdit: onboarding.status === "IN_PROGRESS" || onboarding.status === "REJECTED",
    })
  })
}


