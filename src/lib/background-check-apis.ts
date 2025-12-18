// Background Check Provider API Integrations
// Each provider has its own API structure and authentication method

export interface ApplicantData {
  firstName: string
  lastName: string
  email: string
  phone?: string
  address?: {
    street: string
    city: string
    state: string
    zip: string
  }
  ssn?: string
  dob?: string
}

export interface CheckResult {
  checkId: string
  status: "pending" | "complete" | "clear" | "consider" | "error"
  invitationUrl?: string
  message?: string
  providerName: string
}

export interface WebhookPayload {
  provider: string
  checkId: string
  status: string
  completedAt?: string
  result?: {
    adjudication: string
    reportUrl?: string
  }
}

// ============================================================================
// IntelliCorp Integration
// Docs: https://developer.intellicorp.net/
// ============================================================================

export async function initiateIntelliCorpCheck(data: ApplicantData): Promise<CheckResult> {
  const apiKey = process.env.INTELLICORP_API_KEY
  if (!apiKey) {
    throw new Error("IntelliCorp API key not configured")
  }

  try {
    const response = await fetch("https://api.intellicorp.net/v1/screenings", {
      method: "POST",
      headers: {
        Authorization: `ApiKey ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        applicant: {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
          ssn: data.ssn,
          dateOfBirth: data.dob,
          address: data.address
            ? {
                street1: data.address.street,
                city: data.address.city,
                state: data.address.state,
                zip: data.address.zip,
                country: "US",
              }
            : undefined,
        },
        package: "NOTARY_BASIC",
        webhookUrl: `${process.env.NEXT_PUBLIC_APP_URL}/api/background-check/provider-webhook`,
      }),
    })

    if (!response.ok) {
      const error = await response.text()
      console.error("IntelliCorp API error:", error)
      throw new Error(`IntelliCorp API error: ${response.status}`)
    }

    const result = await response.json()
    return {
      checkId: result.screeningId,
      status: "pending",
      invitationUrl: result.applicantPortalUrl,
      providerName: "IntelliCorp",
    }
  } catch (error) {
    console.error("IntelliCorp initiation failed:", error)
    throw error
  }
}

// ============================================================================
// GoodHire Integration
// Docs: https://developers.goodhire.com/
// ============================================================================

export async function initiateGoodHireCheck(data: {
  firstName: string
  lastName: string
  email: string
  package: "basic" | "enhanced"
}): Promise<CheckResult> {
  const apiKey = process.env.GOODHIRE_API_KEY
  if (!apiKey) {
    throw new Error("GoodHire API key not configured")
  }

  try {
    const response = await fetch("https://api.goodhire.com/v1/invitations", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        candidate: {
          first_name: data.firstName,
          last_name: data.lastName,
          email: data.email,
        },
        package: data.package === "enhanced" ? "ENHANCED_CRIMINAL" : "BASIC_CRIMINAL",
        callback_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/background-check/provider-webhook`,
      }),
    })

    if (!response.ok) {
      const error = await response.text()
      console.error("GoodHire API error:", error)
      throw new Error(`GoodHire API error: ${response.status}`)
    }

    const result = await response.json()
    return {
      checkId: result.id,
      status: "pending",
      invitationUrl: result.invitation_url,
      providerName: "GoodHire",
    }
  } catch (error) {
    console.error("GoodHire initiation failed:", error)
    throw error
  }
}

// ============================================================================
// Checkr Integration
// Docs: https://docs.checkr.com/
// ============================================================================

export async function initiateCheckrCheck(data: {
  firstName: string
  lastName: string
  email: string
  phone?: string
}): Promise<CheckResult> {
  const apiKey = process.env.CHECKR_API_KEY
  if (!apiKey) {
    throw new Error("Checkr API key not configured")
  }

  try {
    // Step 1: Create candidate
    const candidateResponse = await fetch("https://api.checkr.com/v1/candidates", {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(apiKey + ":").toString("base64")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        phone: data.phone,
      }),
    })

    if (!candidateResponse.ok) {
      const error = await candidateResponse.text()
      console.error("Checkr candidate creation error:", error)
      throw new Error("Failed to create Checkr candidate")
    }

    const candidate = await candidateResponse.json()

    // Step 2: Create invitation
    const invitationResponse = await fetch("https://api.checkr.com/v1/invitations", {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(apiKey + ":").toString("base64")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        candidate_id: candidate.id,
        package: "notary_basic",
        callback_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/background-check/provider-webhook`,
      }),
    })

    if (!invitationResponse.ok) {
      const error = await invitationResponse.text()
      console.error("Checkr invitation creation error:", error)
      throw new Error("Failed to create Checkr invitation")
    }

    const invitation = await invitationResponse.json()

    return {
      checkId: candidate.id,
      status: "pending",
      invitationUrl: invitation.invitation_url,
      providerName: "Checkr",
    }
  } catch (error) {
    console.error("Checkr initiation failed:", error)
    throw error
  }
}

// ============================================================================
// Verified Credentials Integration
// Docs: https://developer.verifiedcredentials.com/
// ============================================================================

export async function initiateVerifiedCredentialsCheck(data: ApplicantData): Promise<CheckResult> {
  const apiKey = process.env.VERIFIED_CREDENTIALS_API_KEY
  if (!apiKey) {
    throw new Error("Verified Credentials API key not configured")
  }

  try {
    const response = await fetch("https://api.verifiedcredentials.com/v2/orders", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        subject: {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phone: data.phone,
          ssn: data.ssn,
          dateOfBirth: data.dob,
          currentAddress: data.address
            ? {
                addressLine1: data.address.street,
                city: data.address.city,
                stateCode: data.address.state,
                postalCode: data.address.zip,
                countryCode: "US",
              }
            : undefined,
        },
        packageCode: "NOTARY_STANDARD",
        webhookUrl: `${process.env.NEXT_PUBLIC_APP_URL}/api/background-check/provider-webhook`,
      }),
    })

    if (!response.ok) {
      const error = await response.text()
      console.error("Verified Credentials API error:", error)
      throw new Error(`Verified Credentials API error: ${response.status}`)
    }

    const result = await response.json()
    return {
      checkId: result.orderId,
      status: "pending",
      invitationUrl: result.candidatePortalUrl,
      providerName: "Verified Credentials",
    }
  } catch (error) {
    console.error("Verified Credentials initiation failed:", error)
    throw error
  }
}

// ============================================================================
// Unified Provider Router
// ============================================================================

export async function initiateBackgroundCheck(
  providerId: string,
  data: ApplicantData
): Promise<CheckResult> {
  switch (providerId) {
    case "intellicorp":
      return initiateIntelliCorpCheck(data)

    case "goodhire_basic":
      return initiateGoodHireCheck({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        package: "basic",
      })

    case "goodhire_enhanced":
      return initiateGoodHireCheck({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        package: "enhanced",
      })

    case "checkr_basic":
      return initiateCheckrCheck({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
      })

    case "verified_credentials":
      return initiateVerifiedCredentialsCheck(data)

    default:
      throw new Error(`Unknown provider: ${providerId}`)
  }
}

// ============================================================================
// Webhook Status Mapper
// ============================================================================

export function mapProviderStatus(
  provider: string,
  rawStatus: string
): "pending" | "complete" | "clear" | "consider" | "error" {
  const statusMap: Record<string, Record<string, string>> = {
    intellicorp: {
      PENDING: "pending",
      IN_PROGRESS: "pending",
      COMPLETE: "complete",
      CLEAR: "clear",
      REVIEW: "consider",
      ERROR: "error",
    },
    goodhire: {
      pending: "pending",
      running: "pending",
      complete: "complete",
      clear: "clear",
      consider: "consider",
      failed: "error",
    },
    checkr: {
      pending: "pending",
      running: "pending",
      complete: "complete",
      clear: "clear",
      consider: "consider",
      suspended: "error",
    },
    verified_credentials: {
      ORDERED: "pending",
      PROCESSING: "pending",
      COMPLETED: "complete",
      CLEAR: "clear",
      ALERT: "consider",
      CANCELLED: "error",
    },
  }

  const providerMap = statusMap[provider.toLowerCase()] || {}
  return (providerMap[rawStatus] as CheckResult["status"]) || "pending"
}


