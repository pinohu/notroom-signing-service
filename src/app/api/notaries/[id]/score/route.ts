import { NextRequest } from "next/server"
import { prisma } from "@/lib/prisma"
import { 
  successResponse, 
  errorResponse, 
  requireRole,
  withErrorHandler 
} from "@/lib/api/utils"
import { 
  getNotaryScoreDetails, 
  updateNotaryTier 
} from "@/lib/scoring"

// ============================================================================
// GET /api/notaries/[id]/score - Get notary score details
// ============================================================================

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  return withErrorHandler(async () => {
    await requireRole(["ADMIN", "NOTARY"])

    const { id } = await params

    // Verify notary exists
    const notary = await prisma.notary.findUnique({
      where: { id },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        tier: true,
        eliteScore: true,
        status: true,
      },
    })

    if (!notary) {
      return errorResponse("NOT_FOUND", "Notary not found", 404)
    }

    // Get detailed score breakdown
    const scoreDetails = await getNotaryScoreDetails(id)

    return successResponse({
      notary: {
        id: notary.id,
        name: `${notary.firstName} ${notary.lastName}`,
        currentTier: notary.tier,
        currentScore: notary.eliteScore,
        status: notary.status,
      },
      metrics: scoreDetails.metrics,
      breakdown: scoreDetails.breakdown,
      history: scoreDetails.history,
    })
  })
}

// ============================================================================
// POST /api/notaries/[id]/score - Recalculate notary score
// ============================================================================

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  return withErrorHandler(async () => {
    await requireRole(["ADMIN"])

    const { id } = await params

    // Verify notary exists
    const notary = await prisma.notary.findUnique({
      where: { id },
    })

    if (!notary) {
      return errorResponse("NOT_FOUND", "Notary not found", 404)
    }

    // Recalculate score and update tier
    const result = await updateNotaryTier(id)

    return successResponse({
      notaryId: id,
      previousTier: result.previousTier,
      newTier: result.newTier,
      previousScore: result.previousScore,
      newScore: result.newScore,
      tierChanged: result.tierChanged,
      breakdown: result.breakdown,
    })
  })
}


