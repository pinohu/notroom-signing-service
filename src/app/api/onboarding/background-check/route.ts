import { NextRequest } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { 
  successResponse, 
  errorResponse, 
  withErrorHandler 
} from "@/lib/api/utils"
import { 
  initiateBackgroundCheck,
  getOnboarding,
} from "@/lib/onboarding"
import type { OnboardingData } from "@/types/onboarding"

// ============================================================================
// POST /api/onboarding/background-check - Initiate background check
// ============================================================================

export async function POST(request: NextRequest) {
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
    
    if (!data.basicInfo) {
      return errorResponse(
        "VALIDATION_ERROR", 
        "Basic information must be completed first", 
        400
      )
    }

    const body = await request.json()
    const { dob, ssn } = body as { dob: string; ssn: string }

    if (!dob || !ssn) {
      return errorResponse(
        "VALIDATION_ERROR",
        "Date of birth and SSN are required",
        400
      )
    }

    try {
      const result = await initiateBackgroundCheck(session.user.id, {
        firstName: data.basicInfo.firstName,
        lastName: data.basicInfo.lastName,
        email: data.basicInfo.email,
        phone: data.basicInfo.phone,
        dob,
        ssn,
        address: data.basicInfo.address,
      })

      return successResponse({
        message: "Background check initiated",
        candidateId: result.candidateId,
        invitationUrl: result.invitationUrl,
      })
    } catch (error) {
      return errorResponse(
        "INTERNAL_ERROR",
        error instanceof Error ? error.message : "Failed to initiate background check",
        500
      )
    }
  })
}


