import { NextRequest } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { 
  successResponse, 
  errorResponse, 
  requireRole,
  withErrorHandler 
} from "@/lib/api/utils"
import { rejectOnboarding } from "@/lib/onboarding"

// ============================================================================
// POST /api/admin/onboarding/[id]/reject - Reject an onboarding application
// ============================================================================

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  return withErrorHandler(async () => {
    const session = await getServerSession(authOptions)
    await requireRole(["ADMIN"])

    const { id } = await params
    const body = await request.json()
    const { reason } = body as { reason: string }

    if (!reason?.trim()) {
      return errorResponse("VALIDATION_ERROR", "Rejection reason is required", 400)
    }

    try {
      await rejectOnboarding(id, session?.user?.id ?? "system", reason)

      return successResponse({
        message: "Application rejected",
        onboardingId: id,
      })
    } catch (error) {
      return errorResponse(
        "INTERNAL_ERROR",
        error instanceof Error ? error.message : "Failed to reject application",
        500
      )
    }
  })
}

