import { prisma } from "@/lib/prisma"
import { NotaryTier, AssignmentStatus } from "@prisma/client"

// ============================================================================
// Types
// ============================================================================

export interface ScoringMetrics {
  // Responsiveness (25 points)
  acceptanceTimeAvg: number | null      // minutes
  declineRate: number                    // percentage
  responseTimePercentile: number         // 0-100
  
  // Quality (30 points)
  errorRate: number                      // percentage
  scanbackAccuracy: number               // percentage
  fundingSuccessRate: number             // percentage (first-pass funding)
  qaPassRate: number                     // percentage
  
  // Reliability (20 points)
  onTimeRate: number                     // percentage
  noShowRate: number                     // percentage
  cancellationRate: number               // percentage
  
  // Compliance (15 points)
  incidentCount: number                  // absolute count
  journalCompliance: number              // percentage
  trainingCompletion: number             // percentage (0-100)
  
  // Specialization (10 points)
  loanTypesHandled: number               // count of unique loan types
  ronExperience: number                  // count of RON signings
  languageSkills: number                 // count of languages
}

export interface ScoreBreakdown {
  responsiveness: {
    score: number
    maxScore: 25
    details: {
      acceptanceTime: number       // max 10
      declineRate: number          // max 8
      responsePercentile: number   // max 7
    }
  }
  quality: {
    score: number
    maxScore: 30
    details: {
      errorRate: number            // max 10
      scanbackAccuracy: number     // max 8
      fundingSuccess: number       // max 7
      qaPassRate: number           // max 5
    }
  }
  reliability: {
    score: number
    maxScore: 20
    details: {
      onTimeRate: number           // max 10
      noShowRate: number           // max 6
      cancellationRate: number     // max 4
    }
  }
  compliance: {
    score: number
    maxScore: 15
    details: {
      incidents: number            // max 6
      journalCompliance: number    // max 5
      trainingCompletion: number   // max 4
    }
  }
  specialization: {
    score: number
    maxScore: 10
    details: {
      loanTypes: number            // max 4
      ronExperience: number        // max 4
      languages: number            // max 2
    }
  }
  totalScore: number
  tier: NotaryTier
}

// ============================================================================
// Tier Thresholds
// ============================================================================

export const TIER_THRESHOLDS = {
  ELITE: 90,
  GOLD: 80,
  SILVER: 70,
  BRONZE: 0,
} as const

export function getTierFromScore(score: number): NotaryTier {
  if (score >= TIER_THRESHOLDS.ELITE) return NotaryTier.ELITE
  if (score >= TIER_THRESHOLDS.GOLD) return NotaryTier.GOLD
  if (score >= TIER_THRESHOLDS.SILVER) return NotaryTier.SILVER
  return NotaryTier.BRONZE
}

// ============================================================================
// Fetch Metrics from Last 90 Days
// ============================================================================

export async function fetchNotaryMetrics(notaryId: string): Promise<ScoringMetrics> {
  const ninetyDaysAgo = new Date()
  ninetyDaysAgo.setDate(ninetyDaysAgo.getDate() - 90)

  // Get notary with languages
  const notary = await prisma.notary.findUnique({
    where: { id: notaryId },
    select: {
      languages: true,
      ronAuthorized: true,
    },
  })

  // Get all assignments in last 90 days
  const assignments = await prisma.assignment.findMany({
    where: {
      notaryId,
      createdAt: { gte: ninetyDaysAgo },
    },
    include: {
      order: {
        select: {
          orderType: true,
          signingType: true,
          qaStatus: true,
          scanbackDeadline: true,
          scanbackReceivedAt: true,
          scheduledDatetime: true,
        },
      },
    },
  })

  // Get documents for QA pass rate
  const orderIds = assignments.map(a => a.orderId)
  const documents = await prisma.document.findMany({
    where: {
      orderId: { in: orderIds },
      createdAt: { gte: ninetyDaysAgo },
    },
    select: {
      qaStatus: true,
    },
  })

  // Get audit logs for incidents
  const incidents = await prisma.auditLog.count({
    where: {
      entityType: "Notary",
      entityId: notaryId,
      action: "INCIDENT",
      createdAt: { gte: ninetyDaysAgo },
    },
  })

  // Calculate metrics
  const totalAssignments = assignments.length
  const completedAssignments = assignments.filter(a => a.status === AssignmentStatus.COMPLETED)
  const declinedAssignments = assignments.filter(a => a.status === AssignmentStatus.DECLINED)
  const noShowAssignments = assignments.filter(a => a.status === AssignmentStatus.NO_SHOW)
  const cancelledAssignments = assignments.filter(a => 
    a.status === AssignmentStatus.CANCELLED && a.cancelReason?.includes("notary")
  )

  // Responsiveness metrics
  const acceptanceTimes = assignments
    .filter(a => a.confirmationTime !== null)
    .map(a => a.confirmationTime as number)
  const acceptanceTimeAvg = acceptanceTimes.length > 0
    ? acceptanceTimes.reduce((a, b) => a + b, 0) / acceptanceTimes.length
    : null
  const declineRate = totalAssignments > 0
    ? (declinedAssignments.length / totalAssignments) * 100
    : 0

  // Calculate response time percentile (lower is better)
  const responseTimePercentile = calculateResponsePercentile(acceptanceTimeAvg)

  // Quality metrics
  const completedWithErrors = completedAssignments.filter(a => 
    a.order.qaStatus === "REJECTED" || a.order.qaStatus === "NEEDS_REVIEW"
  )
  const errorRate = completedAssignments.length > 0
    ? (completedWithErrors.length / completedAssignments.length) * 100
    : 0

  // Scanback accuracy (on time)
  const scanbacksOnTime = completedAssignments.filter(a => {
    if (!a.order.scanbackDeadline || !a.order.scanbackReceivedAt) return true
    return a.order.scanbackReceivedAt <= a.order.scanbackDeadline
  })
  const scanbackAccuracy = completedAssignments.length > 0
    ? (scanbacksOnTime.length / completedAssignments.length) * 100
    : 100

  // Funding success (QA approved on first pass)
  const firstPassFunding = completedAssignments.filter(a => a.order.qaStatus === "APPROVED")
  const fundingSuccessRate = completedAssignments.length > 0
    ? (firstPassFunding.length / completedAssignments.length) * 100
    : 100

  // Document QA pass rate
  const approvedDocs = documents.filter(d => d.qaStatus === "APPROVED")
  const qaPassRate = documents.length > 0
    ? (approvedDocs.length / documents.length) * 100
    : 100

  // Reliability metrics
  const onTimeAssignments = completedAssignments.filter(a => {
    if (!a.arrivalTime || !a.order.scheduledDatetime) return true
    const scheduledTime = new Date(a.order.scheduledDatetime)
    const arrivalTime = new Date(a.arrivalTime)
    const diffMinutes = (arrivalTime.getTime() - scheduledTime.getTime()) / 60000
    return diffMinutes <= 15 // Within 15 minutes is on-time
  })
  const onTimeRate = completedAssignments.length > 0
    ? (onTimeAssignments.length / completedAssignments.length) * 100
    : 100
  const noShowRate = totalAssignments > 0
    ? (noShowAssignments.length / totalAssignments) * 100
    : 0
  const cancellationRate = totalAssignments > 0
    ? (cancelledAssignments.length / totalAssignments) * 100
    : 0

  // Compliance metrics
  const journalCompliance = 100 // TODO: Track actual journal compliance
  const trainingCompletion = 100 // TODO: Track actual training completion

  // Specialization metrics
  const uniqueLoanTypes = new Set(completedAssignments.map(a => a.order.orderType))
  const ronSignings = completedAssignments.filter(a => a.order.signingType === "RON")

  return {
    acceptanceTimeAvg,
    declineRate,
    responseTimePercentile,
    errorRate,
    scanbackAccuracy,
    fundingSuccessRate,
    qaPassRate,
    onTimeRate,
    noShowRate,
    cancellationRate,
    incidentCount: incidents,
    journalCompliance,
    trainingCompletion,
    loanTypesHandled: uniqueLoanTypes.size,
    ronExperience: ronSignings.length,
    languageSkills: notary?.languages?.length ?? 1,
  }
}

// ============================================================================
// Calculate Elite Score
// ============================================================================

export function calculateEliteScore(metrics: ScoringMetrics): ScoreBreakdown {
  // =========================================================================
  // RESPONSIVENESS (25 points)
  // =========================================================================
  
  // Acceptance time (max 10 points)
  // < 5 min = 10, < 10 min = 8, < 15 min = 6, < 30 min = 4, < 60 min = 2, else 0
  let acceptanceTimeScore = 0
  if (metrics.acceptanceTimeAvg !== null) {
    if (metrics.acceptanceTimeAvg <= 5) acceptanceTimeScore = 10
    else if (metrics.acceptanceTimeAvg <= 10) acceptanceTimeScore = 8
    else if (metrics.acceptanceTimeAvg <= 15) acceptanceTimeScore = 6
    else if (metrics.acceptanceTimeAvg <= 30) acceptanceTimeScore = 4
    else if (metrics.acceptanceTimeAvg <= 60) acceptanceTimeScore = 2
  } else {
    acceptanceTimeScore = 5 // Neutral if no data
  }

  // Decline rate (max 8 points)
  // 0% = 8, < 5% = 7, < 10% = 5, < 20% = 3, < 30% = 1, else 0
  let declineRateScore = 0
  if (metrics.declineRate === 0) declineRateScore = 8
  else if (metrics.declineRate < 5) declineRateScore = 7
  else if (metrics.declineRate < 10) declineRateScore = 5
  else if (metrics.declineRate < 20) declineRateScore = 3
  else if (metrics.declineRate < 30) declineRateScore = 1

  // Response time percentile (max 7 points)
  // Top 10% = 7, top 25% = 5, top 50% = 3, else 1
  let responsePercentileScore = 0
  if (metrics.responseTimePercentile >= 90) responsePercentileScore = 7
  else if (metrics.responseTimePercentile >= 75) responsePercentileScore = 5
  else if (metrics.responseTimePercentile >= 50) responsePercentileScore = 3
  else responsePercentileScore = 1

  const responsivenessScore = acceptanceTimeScore + declineRateScore + responsePercentileScore

  // =========================================================================
  // QUALITY (30 points)
  // =========================================================================

  // Error rate (max 10 points)
  // 0% = 10, < 1% = 9, < 2% = 7, < 5% = 5, < 10% = 2, else 0
  let errorRateScore = 0
  if (metrics.errorRate === 0) errorRateScore = 10
  else if (metrics.errorRate < 1) errorRateScore = 9
  else if (metrics.errorRate < 2) errorRateScore = 7
  else if (metrics.errorRate < 5) errorRateScore = 5
  else if (metrics.errorRate < 10) errorRateScore = 2

  // Scanback accuracy (max 8 points)
  // 100% = 8, >= 98% = 7, >= 95% = 5, >= 90% = 3, else 1
  let scanbackScore = 0
  if (metrics.scanbackAccuracy >= 100) scanbackScore = 8
  else if (metrics.scanbackAccuracy >= 98) scanbackScore = 7
  else if (metrics.scanbackAccuracy >= 95) scanbackScore = 5
  else if (metrics.scanbackAccuracy >= 90) scanbackScore = 3
  else scanbackScore = 1

  // Funding success rate (max 7 points)
  // >= 98% = 7, >= 95% = 6, >= 90% = 4, >= 85% = 2, else 0
  let fundingScore = 0
  if (metrics.fundingSuccessRate >= 98) fundingScore = 7
  else if (metrics.fundingSuccessRate >= 95) fundingScore = 6
  else if (metrics.fundingSuccessRate >= 90) fundingScore = 4
  else if (metrics.fundingSuccessRate >= 85) fundingScore = 2

  // QA pass rate (max 5 points)
  // >= 98% = 5, >= 95% = 4, >= 90% = 3, >= 85% = 2, else 1
  let qaScore = 0
  if (metrics.qaPassRate >= 98) qaScore = 5
  else if (metrics.qaPassRate >= 95) qaScore = 4
  else if (metrics.qaPassRate >= 90) qaScore = 3
  else if (metrics.qaPassRate >= 85) qaScore = 2
  else qaScore = 1

  const qualityScore = errorRateScore + scanbackScore + fundingScore + qaScore

  // =========================================================================
  // RELIABILITY (20 points)
  // =========================================================================

  // On-time rate (max 10 points)
  // >= 98% = 10, >= 95% = 8, >= 90% = 6, >= 85% = 4, >= 80% = 2, else 0
  let onTimeScore = 0
  if (metrics.onTimeRate >= 98) onTimeScore = 10
  else if (metrics.onTimeRate >= 95) onTimeScore = 8
  else if (metrics.onTimeRate >= 90) onTimeScore = 6
  else if (metrics.onTimeRate >= 85) onTimeScore = 4
  else if (metrics.onTimeRate >= 80) onTimeScore = 2

  // No-show rate (max 6 points)
  // 0% = 6, < 1% = 5, < 2% = 3, < 5% = 1, else 0
  let noShowScore = 0
  if (metrics.noShowRate === 0) noShowScore = 6
  else if (metrics.noShowRate < 1) noShowScore = 5
  else if (metrics.noShowRate < 2) noShowScore = 3
  else if (metrics.noShowRate < 5) noShowScore = 1

  // Cancellation rate (max 4 points)
  // 0% = 4, < 2% = 3, < 5% = 2, < 10% = 1, else 0
  let cancellationScore = 0
  if (metrics.cancellationRate === 0) cancellationScore = 4
  else if (metrics.cancellationRate < 2) cancellationScore = 3
  else if (metrics.cancellationRate < 5) cancellationScore = 2
  else if (metrics.cancellationRate < 10) cancellationScore = 1

  const reliabilityScore = onTimeScore + noShowScore + cancellationScore

  // =========================================================================
  // COMPLIANCE (15 points)
  // =========================================================================

  // Incident count (max 6 points)
  // 0 = 6, 1 = 4, 2 = 2, 3+ = 0
  let incidentScore = 0
  if (metrics.incidentCount === 0) incidentScore = 6
  else if (metrics.incidentCount === 1) incidentScore = 4
  else if (metrics.incidentCount === 2) incidentScore = 2

  // Journal compliance (max 5 points)
  // 100% = 5, >= 98% = 4, >= 95% = 3, >= 90% = 2, else 1
  let journalScore = 0
  if (metrics.journalCompliance >= 100) journalScore = 5
  else if (metrics.journalCompliance >= 98) journalScore = 4
  else if (metrics.journalCompliance >= 95) journalScore = 3
  else if (metrics.journalCompliance >= 90) journalScore = 2
  else journalScore = 1

  // Training completion (max 4 points)
  // 100% = 4, >= 80% = 3, >= 60% = 2, >= 40% = 1, else 0
  let trainingScore = 0
  if (metrics.trainingCompletion >= 100) trainingScore = 4
  else if (metrics.trainingCompletion >= 80) trainingScore = 3
  else if (metrics.trainingCompletion >= 60) trainingScore = 2
  else if (metrics.trainingCompletion >= 40) trainingScore = 1

  const complianceScore = incidentScore + journalScore + trainingScore

  // =========================================================================
  // SPECIALIZATION (10 points)
  // =========================================================================

  // Loan types handled (max 4 points)
  // >= 8 = 4, >= 5 = 3, >= 3 = 2, >= 1 = 1
  let loanTypesScore = 0
  if (metrics.loanTypesHandled >= 8) loanTypesScore = 4
  else if (metrics.loanTypesHandled >= 5) loanTypesScore = 3
  else if (metrics.loanTypesHandled >= 3) loanTypesScore = 2
  else if (metrics.loanTypesHandled >= 1) loanTypesScore = 1

  // RON experience (max 4 points)
  // >= 50 = 4, >= 25 = 3, >= 10 = 2, >= 1 = 1
  let ronScore = 0
  if (metrics.ronExperience >= 50) ronScore = 4
  else if (metrics.ronExperience >= 25) ronScore = 3
  else if (metrics.ronExperience >= 10) ronScore = 2
  else if (metrics.ronExperience >= 1) ronScore = 1

  // Language skills (max 2 points)
  // >= 3 = 2, >= 2 = 1, else 0
  let languageScore = 0
  if (metrics.languageSkills >= 3) languageScore = 2
  else if (metrics.languageSkills >= 2) languageScore = 1

  const specializationScore = loanTypesScore + ronScore + languageScore

  // =========================================================================
  // TOTAL SCORE
  // =========================================================================

  const totalScore = Math.round(
    responsivenessScore + 
    qualityScore + 
    reliabilityScore + 
    complianceScore + 
    specializationScore
  )

  const tier = getTierFromScore(totalScore)

  return {
    responsiveness: {
      score: responsivenessScore,
      maxScore: 25,
      details: {
        acceptanceTime: acceptanceTimeScore,
        declineRate: declineRateScore,
        responsePercentile: responsePercentileScore,
      },
    },
    quality: {
      score: qualityScore,
      maxScore: 30,
      details: {
        errorRate: errorRateScore,
        scanbackAccuracy: scanbackScore,
        fundingSuccess: fundingScore,
        qaPassRate: qaScore,
      },
    },
    reliability: {
      score: reliabilityScore,
      maxScore: 20,
      details: {
        onTimeRate: onTimeScore,
        noShowRate: noShowScore,
        cancellationRate: cancellationScore,
      },
    },
    compliance: {
      score: complianceScore,
      maxScore: 15,
      details: {
        incidents: incidentScore,
        journalCompliance: journalScore,
        trainingCompletion: trainingScore,
      },
    },
    specialization: {
      score: specializationScore,
      maxScore: 10,
      details: {
        loanTypes: loanTypesScore,
        ronExperience: ronScore,
        languages: languageScore,
      },
    },
    totalScore,
    tier,
  }
}

// ============================================================================
// Update Notary Tier (Call after each signing completion)
// ============================================================================

export async function updateNotaryTier(notaryId: string): Promise<{
  previousTier: NotaryTier
  newTier: NotaryTier
  previousScore: number
  newScore: number
  breakdown: ScoreBreakdown
  tierChanged: boolean
}> {
  // Get current tier and score
  const notary = await prisma.notary.findUnique({
    where: { id: notaryId },
    select: { tier: true, eliteScore: true },
  })

  if (!notary) {
    throw new Error(`Notary ${notaryId} not found`)
  }

  const previousTier = notary.tier
  const previousScore = notary.eliteScore

  // Fetch metrics and calculate new score
  const metrics = await fetchNotaryMetrics(notaryId)
  const breakdown = calculateEliteScore(metrics)

  const newTier = breakdown.tier
  const newScore = breakdown.totalScore
  const tierChanged = previousTier !== newTier

  // Update notary
  await prisma.notary.update({
    where: { id: notaryId },
    data: {
      tier: newTier,
      eliteScore: newScore,
    },
  })

  // Update performance record
  await prisma.notaryPerformance.upsert({
    where: { notaryId },
    update: {
      tier: newTier,
      tierUpdatedAt: tierChanged ? new Date() : undefined,
      acceptanceRate: 100 - metrics.declineRate,
      onTimeRate: metrics.onTimeRate,
      errorRate: metrics.errorRate,
      firstPassRate: metrics.fundingSuccessRate,
      lastCalculatedAt: new Date(),
    },
    create: {
      notaryId,
      tier: newTier,
      acceptanceRate: 100 - metrics.declineRate,
      onTimeRate: metrics.onTimeRate,
      errorRate: metrics.errorRate,
      firstPassRate: metrics.fundingSuccessRate,
    },
  })

  // Log tier change
  if (tierChanged) {
    await prisma.auditLog.create({
      data: {
        action: "TIER_CHANGE",
        entityType: "Notary",
        entityId: notaryId,
        oldData: { tier: previousTier, score: previousScore },
        newData: { tier: newTier, score: newScore, breakdown },
      },
    })

    // TODO: Send notification to notary about tier change
    if (newTier === NotaryTier.ELITE || newTier === NotaryTier.GOLD) {
      // Congratulations notification
    } else if (getTierRank(newTier) < getTierRank(previousTier)) {
      // Demotion notification with tips for improvement
    }
  }

  return {
    previousTier,
    newTier,
    previousScore,
    newScore,
    breakdown,
    tierChanged,
  }
}

// ============================================================================
// Batch Update All Notary Tiers
// ============================================================================

export async function batchUpdateNotaryTiers(): Promise<{
  processed: number
  updated: number
  errors: number
}> {
  const activeNotaries = await prisma.notary.findMany({
    where: { status: "ACTIVE" },
    select: { id: true },
  })

  let processed = 0
  let updated = 0
  let errors = 0

  for (const notary of activeNotaries) {
    try {
      const result = await updateNotaryTier(notary.id)
      processed++
      if (result.tierChanged) updated++
    } catch (error) {
      console.error(`Error updating tier for notary ${notary.id}:`, error)
      errors++
    }
  }

  return { processed, updated, errors }
}

// ============================================================================
// Helper Functions
// ============================================================================

function calculateResponsePercentile(avgTime: number | null): number {
  // Response time benchmarks (in minutes)
  // These should ideally come from actual distribution data
  const benchmarks = {
    p90: 5,   // Top 10% respond in < 5 min
    p75: 10,  // Top 25% respond in < 10 min
    p50: 20,  // Top 50% respond in < 20 min
    p25: 40,  // Bottom 25% respond in > 40 min
  }

  if (avgTime === null) return 50 // Neutral if no data

  if (avgTime <= benchmarks.p90) return 95
  if (avgTime <= benchmarks.p75) return 80
  if (avgTime <= benchmarks.p50) return 55
  if (avgTime <= benchmarks.p25) return 30
  return 15
}

function getTierRank(tier: NotaryTier): number {
  const ranks: Record<NotaryTier, number> = {
    ELITE: 4,
    GOLD: 3,
    SILVER: 2,
    BRONZE: 1,
  }
  return ranks[tier]
}

// ============================================================================
// Get Notary Score Details
// ============================================================================

export async function getNotaryScoreDetails(notaryId: string): Promise<{
  metrics: ScoringMetrics
  breakdown: ScoreBreakdown
  history: { date: Date; score: number; tier: NotaryTier }[]
}> {
  const metrics = await fetchNotaryMetrics(notaryId)
  const breakdown = calculateEliteScore(metrics)

  // Get score history from audit logs
  const tierChanges = await prisma.auditLog.findMany({
    where: {
      entityType: "Notary",
      entityId: notaryId,
      action: "TIER_CHANGE",
    },
    orderBy: { createdAt: "desc" },
    take: 10,
  })

  const history = tierChanges.map(log => ({
    date: log.createdAt,
    score: (log.newData as { score?: number })?.score ?? 0,
    tier: ((log.newData as { tier?: NotaryTier })?.tier ?? NotaryTier.BRONZE) as NotaryTier,
  }))

  return { metrics, breakdown, history }
}

// ============================================================================
// Score Comparison
// ============================================================================

export async function compareNotaryScores(notaryIds: string[]): Promise<{
  notaryId: string
  name: string
  score: number
  tier: NotaryTier
  rank: number
}[]> {
  const notaries = await prisma.notary.findMany({
    where: { id: { in: notaryIds } },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      eliteScore: true,
      tier: true,
    },
  })

  const sorted = notaries
    .map(n => ({
      notaryId: n.id,
      name: `${n.firstName} ${n.lastName}`,
      score: n.eliteScore,
      tier: n.tier,
      rank: 0,
    }))
    .sort((a, b) => b.score - a.score)
    .map((n, i) => ({ ...n, rank: i + 1 }))

  return sorted
}

