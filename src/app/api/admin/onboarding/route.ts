import { NextRequest } from "next/server"
import { 
  successResponse, 
  errorResponse, 
  requireRole,
  withErrorHandler 
} from "@/lib/api/utils"
import { getPendingOnboardings } from "@/lib/onboarding"

// ============================================================================
// GET /api/admin/onboarding - Get all pending onboarding applications
// ============================================================================

export async function GET(request: NextRequest) {
  return withErrorHandler(async () => {
    await requireRole(["ADMIN"])

    const applications = await getPendingOnboardings()

    return successResponse({
      applications: applications.map(app => ({
        id: app.id,
        userId: app.userId,
        status: app.status,
        currentStep: app.currentStep,
        completedSteps: app.completedSteps,
        data: app.data,
        startedAt: app.startedAt,
        lastUpdatedAt: app.lastUpdatedAt,
        submittedAt: app.submittedAt,
        user: {
          email: app.user.email,
          name: app.user.name,
        },
      })),
    })
  })
}


