import { NextRequest } from "next/server"
import { prisma } from "@/lib/prisma"
import { 
  successResponse, 
  errorResponse, 
  requireRole,
  withErrorHandler 
} from "@/lib/api/utils"
import type { NotaryMatch } from "@/types/api"
import { SigningType, NotaryStatus } from "@prisma/client"

// ============================================================================
// GET /api/notaries/available - Get available notaries for an order
// ============================================================================

export async function GET(request: NextRequest) {
  return withErrorHandler(async () => {
    await requireRole(["ADMIN"])

    const url = new URL(request.url)
    const propertyState = url.searchParams.get("state")
    const signingType = url.searchParams.get("signingType") as SigningType | null
    const scheduledDatetime = url.searchParams.get("scheduledDatetime")
    const limit = Math.min(50, parseInt(url.searchParams.get("limit") ?? "20"))

    if (!propertyState) {
      return errorResponse("VALIDATION_ERROR", "State is required", 400)
    }

    // Build query conditions
    const conditions: Parameters<typeof prisma.notary.findMany>[0]["where"] = {
      status: NotaryStatus.ACTIVE,
      OR: [
        { commissionState: propertyState },
        {
          stateCommissions: {
            some: { stateCode: propertyState },
          },
        },
      ],
    }

    // If RON, require RON authorization
    if (signingType === "RON") {
      conditions.ronAuthorized = true
    }

    // Find matching notaries
    const notaries = await prisma.notary.findMany({
      where: conditions,
      include: {
        performance: true,
        stateCommissions: true,
      },
      orderBy: [
        { tier: "desc" },
        { eliteScore: "desc" },
      ],
      take: limit,
    })

    // Check availability if datetime provided
    let availableNotaries = notaries
    
    if (scheduledDatetime) {
      const scheduled = new Date(scheduledDatetime)
      const dayOfWeek = scheduled.getDay()
      const timeStr = scheduled.toTimeString().slice(0, 5) // "HH:MM"

      // Check availability and existing assignments
      const notaryIds = notaries.map(n => n.id)
      
      const [availabilityRecords, existingAssignments] = await Promise.all([
        prisma.notaryAvailability.findMany({
          where: {
            notaryId: { in: notaryIds },
            dayOfWeek,
            isActive: true,
          },
        }),
        prisma.assignment.findMany({
          where: {
            notaryId: { in: notaryIds },
            status: { in: ["ACCEPTED"] },
            order: {
              scheduledDatetime: {
                gte: new Date(scheduled.getTime() - 2 * 60 * 60 * 1000), // 2 hours before
                lte: new Date(scheduled.getTime() + 2 * 60 * 60 * 1000), // 2 hours after
              },
            },
          },
        }),
      ])

      const availabilityMap = new Map(availabilityRecords.map(a => [a.notaryId, a]))
      const busyNotaryIds = new Set(existingAssignments.map(a => a.notaryId))

      availableNotaries = notaries.filter(notary => {
        // Check if busy
        if (busyNotaryIds.has(notary.id)) return false

        // Check availability schedule
        const availability = availabilityMap.get(notary.id)
        if (availability) {
          if (timeStr < availability.startTime || timeStr > availability.endTime) {
            return false
          }
        }

        return true
      })
    }

    // Build response with match scores
    const matches: NotaryMatch[] = availableNotaries.map(notary => {
      const matchReasons: string[] = []
      
      if (notary.tier === "ELITE") matchReasons.push("Elite tier")
      if (notary.tier === "GOLD") matchReasons.push("Gold tier")
      if (notary.eliteScore >= 90) matchReasons.push("Top performer")
      if (notary.commissionState === propertyState) {
        matchReasons.push("Primary state")
      } else {
        matchReasons.push("Additional state commission")
      }
      if (signingType === "RON" && notary.ronAuthorized) {
        matchReasons.push("RON certified")
      }

      return {
        notary: {
          id: notary.id,
          firstName: notary.firstName,
          lastName: notary.lastName,
          phone: notary.phone,
          city: notary.city,
          state: notary.state,
          tier: notary.tier,
          eliteScore: notary.eliteScore,
          ronAuthorized: notary.ronAuthorized,
          serviceRadius: notary.serviceRadius,
        } as unknown as typeof notary,
        eliteScore: notary.eliteScore,
        tier: notary.tier,
        matchReasons,
      }
    })

    return successResponse({
      matches,
      total: matches.length,
      filters: {
        state: propertyState,
        signingType,
        scheduledDatetime,
      },
    })
  })
}


