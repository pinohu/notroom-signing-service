import { NextRequest } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { 
  successResponse, 
  errorResponse, 
  requireRole,
  withErrorHandler 
} from "@/lib/api/utils"
import { approveOnboarding } from "@/lib/onboarding"

// ============================================================================
// POST /api/admin/onboarding/[id]/approve - Approve an onboarding application
// ============================================================================

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  return withErrorHandler(async () => {
    const session = await getServerSession(authOptions)
    await requireRole(["ADMIN"])

    const { id } = await params

    try {
      await approveOnboarding(id, session?.user?.id ?? "system")

      return successResponse({
        message: "Application approved successfully",
        onboardingId: id,
      })
    } catch (error) {
      return errorResponse(
        "INTERNAL_ERROR",
        error instanceof Error ? error.message : "Failed to approve application",
        500
      )
    }
  })
}

