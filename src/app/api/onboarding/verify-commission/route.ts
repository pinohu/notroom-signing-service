import { NextRequest } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { 
  successResponse, 
  errorResponse, 
  withErrorHandler 
} from "@/lib/api/utils"
import { verifyCommission } from "@/lib/onboarding"

// ============================================================================
// POST /api/onboarding/verify-commission - Verify notary commission
// ============================================================================

export async function POST(request: NextRequest) {
  return withErrorHandler(async () => {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return errorResponse("UNAUTHORIZED", "Not authenticated", 401)
    }

    const body = await request.json()
    const { state, commissionNumber, name } = body as {
      state: string
      commissionNumber: string
      name?: string
    }

    if (!state || !commissionNumber) {
      return errorResponse(
        "VALIDATION_ERROR",
        "State and commission number are required",
        400
      )
    }

    const result = await verifyCommission(state, commissionNumber, name)

    return successResponse({
      verification: result,
      message: result.status === "VERIFIED" 
        ? "Commission verified successfully"
        : result.status === "PENDING"
        ? "Commission verification pending manual review"
        : "Commission verification failed",
    })
  })
}

