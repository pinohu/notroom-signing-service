// Payment Calculation Functions
// Calculates notary payment amounts based on various factors

// =============================================================================
// TYPES
// =============================================================================

export interface PaymentCalculationInput {
  baseRate: number // Base signing fee in cents
  distanceMiles: number // Distance traveled
  isRush: boolean // Rescue tier (immediate dispatch)
  isPriority: boolean // Priority tier
  scheduledTime: Date // Appointment time
  loanType: string // Type of loan
  documentCount: number // Number of documents
}

export interface PaymentBreakdown {
  baseRate: number
  distanceFee: number
  rushFee: number
  priorityFee: number
  timeOfDayModifier: number
  documentFee: number
  loanTypeBonus: number
  totalAmount: number
  description: string[]
}

// =============================================================================
// CONSTANTS
// =============================================================================

// Base rates by service tier (in cents)
export const BASE_RATES = {
  STANDARD: 12500, // $125.00
  PRIORITY: 17500, // $175.00
  RESCUE: 25000, // $250.00
}

// Distance fee per mile (in cents)
export const DISTANCE_FEE_PER_MILE = 65 // $0.65/mile

// Distance thresholds
export const DISTANCE_THRESHOLDS = {
  FREE_MILES: 15, // First 15 miles free
  MAX_STANDARD_MILES: 50, // Standard rate up to 50 miles
  LONG_DISTANCE_MULTIPLIER: 1.25, // 25% extra for 50+ miles
}

// Time of day modifiers (multipliers)
export const TIME_MODIFIERS = {
  EARLY_MORNING: 1.15, // 6 AM - 8 AM
  BUSINESS_HOURS: 1.0, // 8 AM - 6 PM
  EVENING: 1.2, // 6 PM - 9 PM
  LATE_NIGHT: 1.35, // 9 PM - 6 AM
  WEEKEND: 1.25, // Saturday/Sunday
  HOLIDAY: 1.5, // Major holidays
}

// Rush/Priority fees (flat amounts in cents)
export const RUSH_FEES = {
  PRIORITY: 5000, // $50.00 extra
  RESCUE: 10000, // $100.00 extra
}

// Document count fees (in cents)
export const DOCUMENT_FEES = {
  BASE_DOCUMENTS: 100, // First 100 docs included
  PER_EXTRA_DOC: 15, // $0.15 per additional document
  MAX_DOCUMENT_FEE: 5000, // Cap at $50.00
}

// Loan type bonuses (in cents)
export const LOAN_TYPE_BONUSES: Record<string, number> = {
  REVERSE_MORTGAGE: 7500, // $75.00 bonus - complex
  COMMERCIAL: 10000, // $100.00 bonus - complex
  CONSTRUCTION: 5000, // $50.00 bonus
  HELOC: 2500, // $25.00 bonus
  VA: 2500, // $25.00 bonus
  FHA: 2000, // $20.00 bonus
  USDA: 2000, // $20.00 bonus
}

// US Federal Holidays (month-day format)
const FEDERAL_HOLIDAYS = [
  "01-01", // New Year's Day
  "07-04", // Independence Day
  "11-11", // Veterans Day
  "12-25", // Christmas Day
]

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Check if a date is a weekend
 */
function isWeekend(date: Date): boolean {
  const day = date.getDay()
  return day === 0 || day === 6
}

/**
 * Check if a date is a federal holiday
 */
function isHoliday(date: Date): boolean {
  const monthDay = `${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`
  return FEDERAL_HOLIDAYS.includes(monthDay)
}

/**
 * Get time of day modifier based on scheduled time
 */
function getTimeOfDayModifier(date: Date): { modifier: number; description: string } {
  // Check holiday first (highest priority)
  if (isHoliday(date)) {
    return { modifier: TIME_MODIFIERS.HOLIDAY, description: "Holiday rate (+50%)" }
  }

  // Check weekend
  if (isWeekend(date)) {
    return { modifier: TIME_MODIFIERS.WEEKEND, description: "Weekend rate (+25%)" }
  }

  // Check time of day
  const hour = date.getHours()

  if (hour >= 21 || hour < 6) {
    return { modifier: TIME_MODIFIERS.LATE_NIGHT, description: "Late night rate (+35%)" }
  }

  if (hour >= 18 && hour < 21) {
    return { modifier: TIME_MODIFIERS.EVENING, description: "Evening rate (+20%)" }
  }

  if (hour >= 6 && hour < 8) {
    return { modifier: TIME_MODIFIERS.EARLY_MORNING, description: "Early morning rate (+15%)" }
  }

  return { modifier: TIME_MODIFIERS.BUSINESS_HOURS, description: "Standard business hours" }
}

/**
 * Calculate distance fee
 */
function calculateDistanceFee(miles: number): { fee: number; description: string } {
  if (miles <= DISTANCE_THRESHOLDS.FREE_MILES) {
    return { fee: 0, description: `First ${DISTANCE_THRESHOLDS.FREE_MILES} miles included` }
  }

  const billableMiles = miles - DISTANCE_THRESHOLDS.FREE_MILES
  let fee = billableMiles * DISTANCE_FEE_PER_MILE

  if (miles > DISTANCE_THRESHOLDS.MAX_STANDARD_MILES) {
    fee = Math.round(fee * DISTANCE_THRESHOLDS.LONG_DISTANCE_MULTIPLIER)
    return {
      fee,
      description: `Long distance: ${billableMiles} miles @ $${(DISTANCE_FEE_PER_MILE * DISTANCE_THRESHOLDS.LONG_DISTANCE_MULTIPLIER / 100).toFixed(2)}/mile`,
    }
  }

  return {
    fee,
    description: `Distance: ${billableMiles} miles @ $${(DISTANCE_FEE_PER_MILE / 100).toFixed(2)}/mile`,
  }
}

/**
 * Calculate document fee
 */
function calculateDocumentFee(count: number): { fee: number; description: string } {
  if (count <= DOCUMENT_FEES.BASE_DOCUMENTS) {
    return { fee: 0, description: `${count} documents (included)` }
  }

  const extraDocs = count - DOCUMENT_FEES.BASE_DOCUMENTS
  let fee = extraDocs * DOCUMENT_FEES.PER_EXTRA_DOC

  if (fee > DOCUMENT_FEES.MAX_DOCUMENT_FEE) {
    fee = DOCUMENT_FEES.MAX_DOCUMENT_FEE
    return { fee, description: `${extraDocs} extra documents (capped at $${fee / 100})` }
  }

  return {
    fee,
    description: `${extraDocs} extra documents @ $${(DOCUMENT_FEES.PER_EXTRA_DOC / 100).toFixed(2)}/doc`,
  }
}

// =============================================================================
// MAIN CALCULATION FUNCTION
// =============================================================================

/**
 * Calculate total payment for a signing
 */
export function calculatePayment(input: PaymentCalculationInput): PaymentBreakdown {
  const descriptions: string[] = []

  // Start with base rate
  let baseRate = input.baseRate
  if (baseRate === 0) {
    // Use default base rate if not provided
    if (input.isRush) {
      baseRate = BASE_RATES.RESCUE
    } else if (input.isPriority) {
      baseRate = BASE_RATES.PRIORITY
    } else {
      baseRate = BASE_RATES.STANDARD
    }
  }
  descriptions.push(`Base rate: $${(baseRate / 100).toFixed(2)}`)

  // Distance fee
  const distanceResult = calculateDistanceFee(input.distanceMiles)
  if (distanceResult.fee > 0) {
    descriptions.push(distanceResult.description)
  }

  // Rush/Priority fees
  let rushFee = 0
  let priorityFee = 0

  if (input.isRush) {
    rushFee = RUSH_FEES.RESCUE
    descriptions.push(`Rescue fee: $${(rushFee / 100).toFixed(2)}`)
  } else if (input.isPriority) {
    priorityFee = RUSH_FEES.PRIORITY
    descriptions.push(`Priority fee: $${(priorityFee / 100).toFixed(2)}`)
  }

  // Time of day modifier
  const timeResult = getTimeOfDayModifier(input.scheduledTime)
  const timeModifierAmount = Math.round((baseRate * (timeResult.modifier - 1)))
  if (timeModifierAmount > 0) {
    descriptions.push(timeResult.description)
  }

  // Document fee
  const documentResult = calculateDocumentFee(input.documentCount)
  if (documentResult.fee > 0) {
    descriptions.push(documentResult.description)
  }

  // Loan type bonus
  const loanTypeBonus = LOAN_TYPE_BONUSES[input.loanType] || 0
  if (loanTypeBonus > 0) {
    descriptions.push(`${input.loanType} bonus: $${(loanTypeBonus / 100).toFixed(2)}`)
  }

  // Calculate total
  const totalAmount =
    baseRate +
    distanceResult.fee +
    rushFee +
    priorityFee +
    timeModifierAmount +
    documentResult.fee +
    loanTypeBonus

  descriptions.push(`Total: $${(totalAmount / 100).toFixed(2)}`)

  return {
    baseRate,
    distanceFee: distanceResult.fee,
    rushFee,
    priorityFee,
    timeOfDayModifier: timeModifierAmount,
    documentFee: documentResult.fee,
    loanTypeBonus,
    totalAmount,
    description: descriptions,
  }
}

/**
 * Get estimated payment range for a signing
 */
export function getPaymentEstimate(
  serviceTier: "STANDARD" | "PRIORITY" | "RESCUE",
  estimatedMiles: number = 20
): { min: number; max: number; average: number } {
  const baseRate = BASE_RATES[serviceTier]

  // Calculate min (no modifiers)
  const min = baseRate

  // Calculate max (all modifiers)
  const maxDistanceFee = (estimatedMiles + 30 - DISTANCE_THRESHOLDS.FREE_MILES) * DISTANCE_FEE_PER_MILE
  const maxTimeModifier = Math.round(baseRate * (TIME_MODIFIERS.HOLIDAY - 1))
  const rushFee = serviceTier === "RESCUE" ? RUSH_FEES.RESCUE : serviceTier === "PRIORITY" ? RUSH_FEES.PRIORITY : 0
  const maxLoanBonus = LOAN_TYPE_BONUSES.COMMERCIAL

  const max = baseRate + maxDistanceFee + maxTimeModifier + rushFee + maxLoanBonus + DOCUMENT_FEES.MAX_DOCUMENT_FEE

  // Calculate average (typical scenario)
  const avgDistanceFee = Math.max(0, (estimatedMiles - DISTANCE_THRESHOLDS.FREE_MILES)) * DISTANCE_FEE_PER_MILE
  const average = baseRate + avgDistanceFee + rushFee

  return { min, max, average }
}

/**
 * Format payment amount for display
 */
export function formatPaymentAmount(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`
}

