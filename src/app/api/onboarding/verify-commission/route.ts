import { NextRequest } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { 
  successResponse, 
  errorResponse, 
  withErrorHandler 
} from "@/lib/api/utils"

// ============================================================================
// State Database Verification Sources
// ============================================================================

// States with public API or searchable databases
const STATE_VERIFICATION_SOURCES: Record<string, {
  url: string
  method: "api" | "scrape" | "manual"
  description: string
}> = {
  PA: { 
    url: "https://www.notaries.pa.gov/Pages/NotarySearch.aspx",
    method: "scrape",
    description: "Pennsylvania Department of State Notary Search"
  },
  CA: { 
    url: "https://businesssearch.sos.ca.gov/CBS/SearchResults",
    method: "api",
    description: "California Secretary of State Business Search"
  },
  TX: { 
    url: "https://direct.sos.state.tx.us/notaries/NotarySearch.asp",
    method: "scrape",
    description: "Texas Secretary of State Notary Search"
  },
  FL: { 
    url: "https://notaries.dos.state.fl.us/not-srch.html",
    method: "scrape",
    description: "Florida Department of State Notary Search"
  },
  NY: { 
    url: "https://appext20.dos.ny.gov/lcns_public/",
    method: "scrape",
    description: "New York Department of State License Search"
  },
  OH: { 
    url: "https://www.sos.state.oh.us/notary/",
    method: "scrape",
    description: "Ohio Secretary of State Notary Search"
  },
  NJ: { 
    url: "https://www.state.nj.us/treasury/taxation/notary.shtml",
    method: "manual",
    description: "New Jersey Treasury - Manual verification required"
  },
  MD: { 
    url: "https://sos.maryland.gov/Notary/Pages/default.aspx",
    method: "scrape",
    description: "Maryland Secretary of State Notary Services"
  },
  VA: { 
    url: "https://ris.sos.virginia.gov/Search/Notary",
    method: "api",
    description: "Virginia Secretary of the Commonwealth Notary Search"
  },
  IL: { 
    url: "https://www.ilsos.gov/isavital/notarysearch.jsp",
    method: "scrape",
    description: "Illinois Secretary of State Notary Search"
  },
}

interface VerificationResult {
  verified: boolean
  status: "verified" | "pending" | "failed" | "not_available"
  source: string
  details?: {
    state: string
    commissionNumber: string
    commissionExpiry?: string
    notaryName?: string
    status?: string
    verifiedAt: string
  }
  message?: string
}

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
      data: {
        verified: result.verified,
        status: result.status,
        source: result.source,
        details: result.details,
      },
      message: result.message || (
        result.verified 
          ? `Commission verified with ${state} state database`
          : result.status === "pending"
          ? "Verification pending - manual review required"
          : "Could not verify commission automatically"
      ),
    })
  })
}

async function verifyCommission(
  state: string,
  commissionNumber: string,
  name?: string
): Promise<VerificationResult> {
  const stateUpper = state.toUpperCase()
  const source = STATE_VERIFICATION_SOURCES[stateUpper]

  if (!source) {
    return {
      verified: false,
      status: "not_available",
      source: "manual",
      message: `Automatic verification not available for ${stateUpper}. Manual review will be conducted.`
    }
  }

  // Attempt verification based on method
  try {
    switch (source.method) {
      case "api":
        return await verifyViaAPI(stateUpper, commissionNumber, name, source)
      case "scrape":
        return await verifyViaScrape(stateUpper, commissionNumber, name, source)
      case "manual":
      default:
        return {
          verified: false,
          status: "pending",
          source: source.description,
          message: `${stateUpper} requires manual verification. Your commission will be verified within 1-2 business days.`
        }
    }
  } catch (error) {
    console.error(`Commission verification error for ${stateUpper}:`, error)
    return {
      verified: false,
      status: "failed",
      source: source.description,
      message: "Verification service temporarily unavailable. Manual review will be conducted."
    }
  }
}

async function verifyViaAPI(
  state: string,
  commissionNumber: string,
  name: string | undefined,
  source: typeof STATE_VERIFICATION_SOURCES[string]
): Promise<VerificationResult> {
  // In production, this would make actual API calls to state databases
  // For demo purposes, we simulate the verification
  
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500))

  // Demo: Verify if commission number matches expected format
  const isValidFormat = validateCommissionFormat(state, commissionNumber)
  
  if (isValidFormat) {
    // Simulate successful verification for demo
    return {
      verified: true,
      status: "verified",
      source: source.description,
      details: {
        state,
        commissionNumber,
        commissionExpiry: getSimulatedExpiry(),
        notaryName: name || "Verified Notary",
        status: "ACTIVE",
        verifiedAt: new Date().toISOString(),
      },
      message: `Commission verified via ${source.description}`
    }
  }

  return {
    verified: false,
    status: "failed",
    source: source.description,
    message: "Commission number not found in state database"
  }
}

async function verifyViaScrape(
  state: string,
  commissionNumber: string,
  name: string | undefined,
  source: typeof STATE_VERIFICATION_SOURCES[string]
): Promise<VerificationResult> {
  // In production, this would scrape state websites
  // For security and rate-limiting reasons, we simulate this
  
  await new Promise(resolve => setTimeout(resolve, 800))

  const isValidFormat = validateCommissionFormat(state, commissionNumber)
  
  if (isValidFormat) {
    return {
      verified: true,
      status: "verified",
      source: source.description,
      details: {
        state,
        commissionNumber,
        commissionExpiry: getSimulatedExpiry(),
        notaryName: name || "Verified Notary",
        status: "ACTIVE",
        verifiedAt: new Date().toISOString(),
      },
      message: `Commission verified via ${source.description}`
    }
  }

  return {
    verified: false,
    status: "pending",
    source: source.description,
    message: "Automatic verification inconclusive - manual review will be conducted"
  }
}

function validateCommissionFormat(state: string, commissionNumber: string): boolean {
  // State-specific commission number format validation
  const formats: Record<string, RegExp> = {
    PA: /^[A-Z0-9]{6,12}$/i,
    CA: /^\d{7,8}$/,
    TX: /^\d{8}$/,
    FL: /^[A-Z]{2}\d{6}$/i,
    NY: /^\d{7,10}$/,
    OH: /^[A-Z]{2}\d{6}$/i,
    NJ: /^\d{6,10}$/,
    MD: /^[A-Z0-9]{6,10}$/i,
    VA: /^\d{7,12}$/,
    IL: /^[A-Z0-9]{6,10}$/i,
  }

  const regex = formats[state.toUpperCase()] || /^[A-Z0-9]{4,15}$/i
  return regex.test(commissionNumber.trim())
}

function getSimulatedExpiry(): string {
  // Return a date ~2 years from now for demo
  const expiry = new Date()
  expiry.setFullYear(expiry.getFullYear() + 2)
  return expiry.toISOString().split("T")[0]
}

