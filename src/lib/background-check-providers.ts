// Background Check Provider Configuration
// All costs in USD cents - includes 5% markup for paid providers

export interface BackgroundCheckProvider {
  id: string
  name: string
  description: string
  baseCost: number // USD cents (provider cost)
  markup: number // Percentage markup (0.05 = 5%)
  finalCost: number // baseCost * (1 + markup)
  turnaround: string
  method: "api" | "upload"
  apiConfig?: {
    baseUrl: string
    authType: "basic" | "bearer" | "api_key"
    envKeyName: string
  }
  checksIncluded: string[]
  isActive: boolean
}

const MARKUP_PERCENTAGE = 0.05 // 5% markup on all paid providers

function calculateFinalCost(baseCostCents: number): number {
  return Math.ceil(baseCostCents * (1 + MARKUP_PERCENTAGE))
}

export const BACKGROUND_CHECK_PROVIDERS: Record<string, BackgroundCheckProvider> = {
  // ============================================================================
  // FREE TIER - User uploads existing verification
  // ============================================================================
  
  nna_upload: {
    id: "nna_upload",
    name: "Upload NNA Certificate",
    description: "Already have an NNA background screening? Upload it for free verification.",
    baseCost: 0,
    markup: 0,
    finalCost: 0,
    turnaround: "Instant verification",
    method: "upload",
    checksIncluded: [
      "National Criminal Database",
      "Sex Offender Registry",
      "SSN Trace",
      "County Records (7 years)",
    ],
    isActive: true,
  },

  existing_signing_service: {
    id: "existing_signing_service",
    name: "Upload Signing Service Verification",
    description: "Upload background check from Snapdocs, NotaryDash, SigningOrder, or other services.",
    baseCost: 0,
    markup: 0,
    finalCost: 0,
    turnaround: "1-2 business days",
    method: "upload",
    checksIncluded: [
      "Varies by provider",
      "Must be dated within 2 years",
    ],
    isActive: true,
  },

  // ============================================================================
  // PAID TIER - API integration with 5% markup (cost borne by registrant)
  // ============================================================================

  intellicorp: {
    id: "intellicorp",
    name: "IntelliCorp Basic",
    description: "Industry-standard background check used by major signing services nationwide.",
    baseCost: 2500, // $25.00 base
    markup: MARKUP_PERCENTAGE,
    finalCost: calculateFinalCost(2500), // $26.25 final
    turnaround: "1-2 business days",
    method: "api",
    apiConfig: {
      baseUrl: "https://api.intellicorp.net/v1",
      authType: "api_key",
      envKeyName: "INTELLICORP_API_KEY",
    },
    checksIncluded: [
      "National Criminal Database",
      "Sex Offender Registry",
      "SSN Trace",
      "County Criminal (7 years)",
      "Address History",
    ],
    isActive: true,
  },

  goodhire_basic: {
    id: "goodhire_basic",
    name: "GoodHire Basic",
    description: "Fast, reliable background screening with detailed reports and clear results.",
    baseCost: 3500, // $35.00 base
    markup: MARKUP_PERCENTAGE,
    finalCost: calculateFinalCost(3500), // $36.75 final
    turnaround: "1-3 business days",
    method: "api",
    apiConfig: {
      baseUrl: "https://api.goodhire.com/v1",
      authType: "bearer",
      envKeyName: "GOODHIRE_API_KEY",
    },
    checksIncluded: [
      "National Criminal Database",
      "Sex Offender Registry",
      "SSN Trace",
      "County Criminal (7 years)",
      "Federal Criminal",
      "Address History",
    ],
    isActive: true,
  },

  goodhire_enhanced: {
    id: "goodhire_enhanced",
    name: "GoodHire Enhanced",
    description: "Comprehensive check including employment and education verification for premium notaries.",
    baseCost: 5500, // $55.00 base
    markup: MARKUP_PERCENTAGE,
    finalCost: calculateFinalCost(5500), // $57.75 final
    turnaround: "3-5 business days",
    method: "api",
    apiConfig: {
      baseUrl: "https://api.goodhire.com/v1",
      authType: "bearer",
      envKeyName: "GOODHIRE_API_KEY",
    },
    checksIncluded: [
      "Everything in Basic",
      "Employment Verification",
      "Education Verification",
      "Professional License Check",
    ],
    isActive: true,
  },

  checkr_basic: {
    id: "checkr_basic",
    name: "Checkr Basic",
    description: "Enterprise-grade background check trusted by Fortune 500 companies.",
    baseCost: 5000, // $50.00 base
    markup: MARKUP_PERCENTAGE,
    finalCost: calculateFinalCost(5000), // $52.50 final
    turnaround: "1-3 business days",
    method: "api",
    apiConfig: {
      baseUrl: "https://api.checkr.com/v1",
      authType: "basic",
      envKeyName: "CHECKR_API_KEY",
    },
    checksIncluded: [
      "National Criminal Database",
      "Sex Offender Registry",
      "SSN Trace",
      "County Criminal (7 years)",
      "Federal Criminal",
      "Terrorist Watchlist",
    ],
    isActive: true,
  },

  verified_credentials: {
    id: "verified_credentials",
    name: "Verified Credentials",
    description: "Trusted by title companies for thorough, compliant background screening.",
    baseCost: 4000, // $40.00 base
    markup: MARKUP_PERCENTAGE,
    finalCost: calculateFinalCost(4000), // $42.00 final
    turnaround: "2-3 business days",
    method: "api",
    apiConfig: {
      baseUrl: "https://api.verifiedcredentials.com/v2",
      authType: "bearer",
      envKeyName: "VERIFIED_CREDENTIALS_API_KEY",
    },
    checksIncluded: [
      "National Criminal Database",
      "Sex Offender Registry",
      "SSN Trace",
      "County Criminal (7 years)",
      "Federal Criminal",
      "Credit Check (optional)",
    ],
    isActive: true,
  },
}

// ============================================================================
// Helper Functions
// ============================================================================

export function getActiveProviders(): BackgroundCheckProvider[] {
  return Object.values(BACKGROUND_CHECK_PROVIDERS).filter((p) => p.isActive)
}

export function getFreeProviders(): BackgroundCheckProvider[] {
  return getActiveProviders().filter((p) => p.finalCost === 0)
}

export function getPaidProviders(): BackgroundCheckProvider[] {
  return getActiveProviders().filter((p) => p.finalCost > 0)
}

export function formatPrice(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`
}

export function getProviderById(id: string): BackgroundCheckProvider | undefined {
  return BACKGROUND_CHECK_PROVIDERS[id]
}

export function getMarkupAmount(baseCostCents: number): number {
  return Math.ceil(baseCostCents * MARKUP_PERCENTAGE)
}

export function getMarkupPercentage(): number {
  return MARKUP_PERCENTAGE * 100 // Returns 5 for display as "5%"
}

// Get provider comparison data for UI
export function getProviderComparison() {
  const paid = getPaidProviders()
  return paid.map((p) => ({
    id: p.id,
    name: p.name,
    baseCost: formatPrice(p.baseCost),
    finalCost: formatPrice(p.finalCost),
    markup: formatPrice(p.finalCost - p.baseCost),
    turnaround: p.turnaround,
    checksCount: p.checksIncluded.length,
  }))
}

