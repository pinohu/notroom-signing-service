import { prisma } from "@/lib/prisma"
import type {
  OnboardingProgress,
  OnboardingData,
  OnboardingStatus,
  CommissionVerification,
  StepValidation,
  BasicInfoData,
  CommissionData,
  InsuranceData,
  EquipmentData,
  BackgroundCheckData,
  BankingData,
  ServiceAreasData,
  AvailabilityData,
  SpecializationsData,
  AgreementData,
} from "@/types/onboarding"
import { NotaryStatus } from "@prisma/client"

// ============================================================================
// Constants
// ============================================================================

export const ONBOARDING_STEPS = [
  { step: 1, name: "Basic Information", description: "Your contact details" },
  { step: 2, name: "Commission Details", description: "Notary commission info" },
  { step: 3, name: "Insurance", description: "E&O and bond coverage" },
  { step: 4, name: "Equipment", description: "Printer, scanner, internet" },
  { step: 5, name: "Background Check", description: "Verification consent" },
  { step: 6, name: "Banking", description: "Payment information" },
  { step: 7, name: "Service Areas", description: "Coverage zones" },
  { step: 8, name: "Availability", description: "Schedule preferences" },
  { step: 9, name: "Specializations", description: "Skills and experience" },
  { step: 10, name: "Agreement", description: "Terms and contract" },
] as const

export const LOAN_TYPES = [
  "PURCHASE",
  "REFINANCE",
  "HELOC",
  "REVERSE_MORTGAGE",
  "COMMERCIAL",
  "CONSTRUCTION",
  "FHA",
  "VA",
  "USDA",
  "JUMBO",
  "SELLER_FINANCING",
] as const

export const LANGUAGES = [
  "English",
  "Spanish",
  "Mandarin",
  "Cantonese",
  "Vietnamese",
  "Korean",
  "Tagalog",
  "Russian",
  "Arabic",
  "Hindi",
  "Portuguese",
  "French",
  "German",
  "Italian",
  "Japanese",
  "Polish",
] as const

export const RON_PLATFORMS = [
  "Proof",
  "Notarize",
  "NotaryCam",
  "DocVerify",
  "Pavaso",
  "Nexsys",
  "SigningRoom",
  "SIGNiX",
] as const

// State Commission Verification APIs (where available)
const STATE_VERIFICATION_APIS: Record<string, string> = {
  CA: "https://businesssearch.sos.ca.gov/api/notary/",
  TX: "https://direct.sos.state.tx.us/notaries/NotarySearch.asp",
  FL: "https://notaries.dos.state.fl.us/not-srch.html",
  NY: "https://appext20.dos.ny.gov/lcns_public/",
  PA: "https://www.notaries.pa.gov/",
  // Add more states as APIs become available
}

// ============================================================================
// Onboarding CRUD Operations
// ============================================================================

export async function createOnboarding(userId: string): Promise<string> {
  const onboarding = await prisma.notaryOnboarding.create({
    data: {
      userId,
      currentStep: 1,
      completedSteps: [],
      status: "IN_PROGRESS",
      data: {},
    },
  })
  return onboarding.id
}

export async function getOnboarding(userId: string) {
  return prisma.notaryOnboarding.findUnique({
    where: { userId },
    include: { user: true },
  })
}

export async function getOnboardingById(id: string) {
  return prisma.notaryOnboarding.findUnique({
    where: { id },
    include: { user: true },
  })
}

export async function updateOnboardingStep(
  userId: string,
  step: number,
  data: Partial<OnboardingData>
): Promise<{ success: boolean; validation: StepValidation }> {
  const onboarding = await getOnboarding(userId)
  if (!onboarding) {
    throw new Error("Onboarding not found")
  }

  // Validate step data
  const validation = validateStep(step, data)
  if (!validation.isValid) {
    return { success: false, validation }
  }

  // Merge data
  const existingData = (onboarding.data as OnboardingData) || {}
  const mergedData = mergeStepData(existingData, step, data)

  // Update completed steps
  const completedSteps = onboarding.completedSteps as number[]
  if (!completedSteps.includes(step)) {
    completedSteps.push(step)
    completedSteps.sort((a, b) => a - b)
  }

  // Determine next step
  const nextStep = Math.min(step + 1, 10)

  await prisma.notaryOnboarding.update({
    where: { userId },
    data: {
      currentStep: nextStep,
      completedSteps,
      data: mergedData as object,
      lastUpdatedAt: new Date(),
    },
  })

  return { success: true, validation }
}

export async function submitOnboarding(userId: string): Promise<{ success: boolean; errors?: string[] }> {
  const onboarding = await getOnboarding(userId)
  if (!onboarding) {
    throw new Error("Onboarding not found")
  }

  const completedSteps = onboarding.completedSteps as number[]
  
  // Check all steps completed
  const missingSteps = ONBOARDING_STEPS.filter(s => !completedSteps.includes(s.step))
  if (missingSteps.length > 0) {
    return {
      success: false,
      errors: missingSteps.map(s => `Step ${s.step}: ${s.name} is not completed`),
    }
  }

  // Update status
  await prisma.notaryOnboarding.update({
    where: { userId },
    data: {
      status: "PENDING_REVIEW",
      submittedAt: new Date(),
    },
  })

  // Create notification for admin
  await prisma.notification.create({
    data: {
      userId, // Will need admin user ID
      type: "NEW_ONBOARDING",
      title: "New Notary Application",
      message: `A new notary application has been submitted and requires review.`,
      data: { onboardingId: onboarding.id },
    },
  })

  return { success: true }
}

// ============================================================================
// Validation
// ============================================================================

function validateStep(step: number, data: Partial<OnboardingData>): StepValidation {
  const errors: string[] = []

  switch (step) {
    case 1:
      validateBasicInfo(data.basicInfo, errors)
      break
    case 2:
      validateCommission(data.commission, errors)
      break
    case 3:
      validateInsurance(data.insurance, errors)
      break
    case 4:
      validateEquipment(data.equipment, errors)
      break
    case 5:
      validateBackgroundCheck(data.backgroundCheck, errors)
      break
    case 6:
      validateBanking(data.banking, errors)
      break
    case 7:
      validateServiceAreas(data.serviceAreas, errors)
      break
    case 8:
      validateAvailability(data.availability, errors)
      break
    case 9:
      validateSpecializations(data.specializations, errors)
      break
    case 10:
      validateAgreement(data.agreement, errors)
      break
  }

  return { step, isValid: errors.length === 0, errors }
}

function validateBasicInfo(data: BasicInfoData | undefined, errors: string[]) {
  if (!data) {
    errors.push("Basic information is required")
    return
  }
  if (!data.firstName?.trim()) errors.push("First name is required")
  if (!data.lastName?.trim()) errors.push("Last name is required")
  if (!data.email?.trim() || !isValidEmail(data.email)) errors.push("Valid email is required")
  if (!data.phone?.trim() || !isValidPhone(data.phone)) errors.push("Valid phone number is required")
  if (!data.address?.street?.trim()) errors.push("Street address is required")
  if (!data.address?.city?.trim()) errors.push("City is required")
  if (!data.address?.state?.trim()) errors.push("State is required")
  if (!data.address?.zip?.trim() || !isValidZip(data.address.zip)) errors.push("Valid ZIP code is required")
}

function validateCommission(data: CommissionData | undefined, errors: string[]) {
  if (!data) {
    errors.push("Commission details are required")
    return
  }
  if (!data.commissionState?.trim()) errors.push("Commission state is required")
  if (!data.commissionNumber?.trim()) errors.push("Commission number is required")
  if (!data.commissionExpiry?.trim()) errors.push("Commission expiry date is required")
  if (data.commissionExpiry && new Date(data.commissionExpiry) < new Date()) {
    errors.push("Commission has expired")
  }
}

function validateInsurance(data: InsuranceData | undefined, errors: string[]) {
  if (!data) {
    errors.push("Insurance details are required")
    return
  }
  if (!data.eoAmount || data.eoAmount < 25000) errors.push("E&O coverage must be at least $25,000")
  if (!data.eoCarrier?.trim()) errors.push("E&O carrier is required")
  if (!data.eoExpiry?.trim()) errors.push("E&O expiry date is required")
  if (data.eoExpiry && new Date(data.eoExpiry) < new Date()) {
    errors.push("E&O insurance has expired")
  }
}

function validateEquipment(data: EquipmentData | undefined, errors: string[]) {
  if (!data) {
    errors.push("Equipment details are required")
    return
  }
  if (!data.printerMake?.trim()) errors.push("Printer make is required")
  if (!data.printerModel?.trim()) errors.push("Printer model is required")
  if (!data.scannerType) errors.push("Scanner type is required")
  if (!data.isDualTray) errors.push("Dual-tray printer is required for signing agent work")
}

function validateBackgroundCheck(data: BackgroundCheckData | undefined, errors: string[]) {
  if (!data) {
    errors.push("Background check consent is required")
    return
  }
  if (!data.consentGiven) errors.push("You must consent to a background check")
}

function validateBanking(data: BankingData | undefined, errors: string[]) {
  if (!data) {
    errors.push("Banking information is required")
    return
  }
  if (!data.stripeOnboardingComplete && data.paymentMethod === "ACH") {
    errors.push("Please complete Stripe Connect onboarding")
  }
  if (!data.w9Uploaded) errors.push("W-9 form is required")
}

function validateServiceAreas(data: ServiceAreasData | undefined, errors: string[]) {
  if (!data) {
    errors.push("Service area information is required")
    return
  }
  if (!data.primaryZip?.trim() || !isValidZip(data.primaryZip)) {
    errors.push("Valid primary ZIP code is required")
  }
  if (!data.maxTravelDistance || data.maxTravelDistance < 1) {
    errors.push("Maximum travel distance is required")
  }
}

function validateAvailability(data: AvailabilityData | undefined, errors: string[]) {
  if (!data) {
    errors.push("Availability information is required")
    return
  }
  if (!data.timezone) errors.push("Timezone is required")
  
  const hasAtLeastOneDay = Object.values(data.typicalHours || {}).some(d => d.available)
  if (!hasAtLeastOneDay) {
    errors.push("At least one day of availability is required")
  }
}

function validateSpecializations(data: SpecializationsData | undefined, errors: string[]) {
  if (!data) {
    errors.push("Specialization information is required")
    return
  }
  if (!data.loanTypes || data.loanTypes.length === 0) {
    errors.push("At least one loan type is required")
  }
  if (!data.languages || data.languages.length === 0) {
    errors.push("At least one language is required")
  }
}

function validateAgreement(data: AgreementData | undefined, errors: string[]) {
  if (!data) {
    errors.push("Agreement acceptance is required")
    return
  }
  if (!data.termsAccepted) errors.push("Terms of service must be accepted")
  if (!data.contractorAgreementAccepted) errors.push("Contractor agreement must be signed")
}

// ============================================================================
// Commission Verification
// ============================================================================

export async function verifyCommission(
  state: string,
  commissionNumber: string,
  name?: string
): Promise<CommissionVerification> {
  const result: CommissionVerification = {
    state,
    commissionNumber,
    status: "PENDING",
  }

  // Check if we have an API for this state
  const apiUrl = STATE_VERIFICATION_APIS[state]
  
  if (!apiUrl) {
    // Manual verification required
    result.status = "PENDING"
    result.source = "manual"
    return result
  }

  try {
    // State-specific verification logic
    switch (state) {
      case "CA":
        return await verifyCalifornia(commissionNumber, name)
      case "TX":
        return await verifyTexas(commissionNumber, name)
      case "FL":
        return await verifyFlorida(commissionNumber, name)
      default:
        result.status = "PENDING"
        result.source = "manual"
    }
  } catch (error) {
    console.error(`Commission verification error for ${state}:`, error)
    result.status = "ERROR"
  }

  return result
}

async function verifyCalifornia(commissionNumber: string, name?: string): Promise<CommissionVerification> {
  // California Secretary of State API integration
  // This is a placeholder - actual implementation would call the CA API
  return {
    state: "CA",
    commissionNumber,
    status: "PENDING",
    source: "ca_sos_api",
  }
}

async function verifyTexas(commissionNumber: string, name?: string): Promise<CommissionVerification> {
  // Texas Secretary of State API integration
  return {
    state: "TX",
    commissionNumber,
    status: "PENDING",
    source: "tx_sos_api",
  }
}

async function verifyFlorida(commissionNumber: string, name?: string): Promise<CommissionVerification> {
  // Florida Department of State API integration
  return {
    state: "FL",
    commissionNumber,
    status: "PENDING",
    source: "fl_dos_api",
  }
}

// ============================================================================
// Checkr Background Check Integration
// ============================================================================

const CHECKR_API_KEY = process.env.CHECKR_API_KEY
const CHECKR_API_URL = "https://api.checkr.com/v1"

export async function initiateBackgroundCheck(
  userId: string,
  data: {
    firstName: string
    lastName: string
    email: string
    phone: string
    dob: string
    ssn: string
    address: {
      street: string
      city: string
      state: string
      zip: string
    }
  }
): Promise<{ candidateId: string; invitationUrl: string }> {
  if (!CHECKR_API_KEY) {
    throw new Error("Checkr API key not configured")
  }

  // Create candidate
  const candidateResponse = await fetch(`${CHECKR_API_URL}/candidates`, {
    method: "POST",
    headers: {
      "Authorization": `Basic ${Buffer.from(CHECKR_API_KEY + ":").toString("base64")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      phone: data.phone,
      dob: data.dob,
      ssn: data.ssn,
      work_locations: [{
        country: "US",
        state: data.address.state,
        city: data.address.city,
      }],
    }),
  })

  if (!candidateResponse.ok) {
    const error = await candidateResponse.text()
    throw new Error(`Checkr candidate creation failed: ${error}`)
  }

  const candidate = await candidateResponse.json()

  // Create invitation
  const invitationResponse = await fetch(`${CHECKR_API_URL}/invitations`, {
    method: "POST",
    headers: {
      "Authorization": `Basic ${Buffer.from(CHECKR_API_KEY + ":").toString("base64")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      candidate_id: candidate.id,
      package: "notary_basic", // Custom package for notary checks
    }),
  })

  if (!invitationResponse.ok) {
    const error = await invitationResponse.text()
    throw new Error(`Checkr invitation creation failed: ${error}`)
  }

  const invitation = await invitationResponse.json()

  // Store in onboarding
  await prisma.notaryOnboarding.update({
    where: { userId },
    data: {
      data: {
        backgroundCheck: {
          consentGiven: true,
          consentDate: new Date().toISOString(),
          checkrCandidateId: candidate.id,
          checkrStatus: "PENDING",
        },
      },
    },
  })

  return {
    candidateId: candidate.id,
    invitationUrl: invitation.invitation_url,
  }
}

export async function handleCheckrWebhook(payload: {
  type: string
  data: { object: { id: string; status: string; candidate_id: string } }
}): Promise<void> {
  if (payload.type !== "report.completed") return

  const { id: reportId, status, candidate_id } = payload.data.object

  // Find onboarding by candidate ID
  const onboarding = await prisma.notaryOnboarding.findFirst({
    where: {
      data: {
        path: ["backgroundCheck", "checkrCandidateId"],
        equals: candidate_id,
      },
    },
  })

  if (!onboarding) {
    console.error(`No onboarding found for Checkr candidate ${candidate_id}`)
    return
  }

  const checkrStatus = status === "clear" ? "CLEAR" : status === "consider" ? "CONSIDER" : "SUSPENDED"
  const newStatus: OnboardingStatus = checkrStatus === "CLEAR" ? "PENDING_REVIEW" : "PENDING_VERIFICATION"

  await prisma.notaryOnboarding.update({
    where: { id: onboarding.id },
    data: {
      status: newStatus,
      data: {
        ...(onboarding.data as object),
        backgroundCheck: {
          ...(onboarding.data as OnboardingData).backgroundCheck,
          checkrReportId: reportId,
          checkrStatus,
          completedAt: new Date().toISOString(),
        },
      },
    },
  })
}

// ============================================================================
// Stripe Connect Integration
// ============================================================================

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY

export async function createStripeConnectAccount(
  userId: string,
  email: string
): Promise<{ accountId: string; onboardingUrl: string }> {
  if (!STRIPE_SECRET_KEY) {
    throw new Error("Stripe API key not configured")
  }

  // Create Stripe Connect account
  const response = await fetch("https://api.stripe.com/v1/accounts", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${STRIPE_SECRET_KEY}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      type: "express",
      email,
      capabilities: {
        transfers: { requested: true },
      } as unknown as string,
      business_type: "individual",
      metadata: {
        userId,
        platform: "notroom",
      } as unknown as string,
    }),
  })

  if (!response.ok) {
    const error = await response.text()
    throw new Error(`Stripe account creation failed: ${error}`)
  }

  const account = await response.json()

  // Create account link for onboarding
  const linkResponse = await fetch("https://api.stripe.com/v1/account_links", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${STRIPE_SECRET_KEY}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      account: account.id,
      refresh_url: `${process.env.NEXT_PUBLIC_APP_URL}/onboard?step=6&refresh=true`,
      return_url: `${process.env.NEXT_PUBLIC_APP_URL}/onboard?step=6&complete=true`,
      type: "account_onboarding",
    }),
  })

  if (!linkResponse.ok) {
    const error = await linkResponse.text()
    throw new Error(`Stripe account link creation failed: ${error}`)
  }

  const link = await linkResponse.json()

  // Update onboarding with Stripe account ID
  await prisma.notaryOnboarding.update({
    where: { userId },
    data: {
      data: {
        banking: {
          stripeConnectId: account.id,
          stripeOnboardingComplete: false,
          paymentMethod: "ACH",
          w9Uploaded: false,
        },
      },
    },
  })

  return {
    accountId: account.id,
    onboardingUrl: link.url,
  }
}

export async function checkStripeConnectStatus(accountId: string): Promise<boolean> {
  if (!STRIPE_SECRET_KEY) {
    throw new Error("Stripe API key not configured")
  }

  const response = await fetch(`https://api.stripe.com/v1/accounts/${accountId}`, {
    headers: {
      "Authorization": `Bearer ${STRIPE_SECRET_KEY}`,
    },
  })

  if (!response.ok) {
    return false
  }

  const account = await response.json()
  return account.details_submitted && account.payouts_enabled
}

// ============================================================================
// Admin Functions
// ============================================================================

export async function approveOnboarding(
  onboardingId: string,
  adminUserId: string
): Promise<void> {
  const onboarding = await getOnboardingById(onboardingId)
  if (!onboarding) {
    throw new Error("Onboarding not found")
  }

  const data = onboarding.data as OnboardingData

  // Create the notary record
  await prisma.notary.create({
    data: {
      userId: onboarding.userId,
      firstName: data.basicInfo?.firstName ?? "",
      lastName: data.basicInfo?.lastName ?? "",
      email: data.basicInfo?.email ?? "",
      phone: data.basicInfo?.phone ?? "",
      address: data.basicInfo?.address,
      commissionState: data.commission?.commissionState ?? "",
      commissionNumber: data.commission?.commissionNumber ?? "",
      commissionExpiry: data.commission?.commissionExpiry ? new Date(data.commission.commissionExpiry) : new Date(),
      ronAuthorized: data.commission?.isRONAuthorized ?? false,
      eoAmount: data.insurance?.eoAmount ?? 0,
      eoCarrier: data.insurance?.eoCarrier ?? "",
      eoExpiry: data.insurance?.eoExpiry ? new Date(data.insurance.eoExpiry) : new Date(),
      equipmentVerified: true,
      backgroundCheckDate: data.backgroundCheck?.completedAt ? new Date(data.backgroundCheck.completedAt) : new Date(),
      serviceAreas: data.serviceAreas?.additionalZips ?? [],
      maxTravelDistance: data.serviceAreas?.maxTravelDistance ?? 25,
      languages: data.specializations?.languages ?? ["English"],
      loanTypes: data.specializations?.loanTypes ?? [],
      status: NotaryStatus.ACTIVE,
      tier: "BRONZE",
      eliteScore: 50,
    },
  })

  // Update onboarding status
  await prisma.notaryOnboarding.update({
    where: { id: onboardingId },
    data: {
      status: "APPROVED",
      approvedAt: new Date(),
    },
  })

  // Create notification for notary
  await prisma.notification.create({
    data: {
      userId: onboarding.userId,
      type: "ONBOARDING_APPROVED",
      title: "Application Approved!",
      message: "Congratulations! Your notary application has been approved. You can now start receiving assignments.",
    },
  })

  // Log action
  await prisma.auditLog.create({
    data: {
      action: "ONBOARDING_APPROVED",
      entityType: "NotaryOnboarding",
      entityId: onboardingId,
      userId: adminUserId,
    },
  })
}

export async function rejectOnboarding(
  onboardingId: string,
  adminUserId: string,
  reason: string
): Promise<void> {
  const onboarding = await getOnboardingById(onboardingId)
  if (!onboarding) {
    throw new Error("Onboarding not found")
  }

  await prisma.notaryOnboarding.update({
    where: { id: onboardingId },
    data: {
      status: "REJECTED",
      rejectedAt: new Date(),
      rejectionReason: reason,
    },
  })

  // Create notification for applicant
  await prisma.notification.create({
    data: {
      userId: onboarding.userId,
      type: "ONBOARDING_REJECTED",
      title: "Application Update",
      message: `Your application requires additional information: ${reason}`,
    },
  })

  // Log action
  await prisma.auditLog.create({
    data: {
      action: "ONBOARDING_REJECTED",
      entityType: "NotaryOnboarding",
      entityId: onboardingId,
      userId: adminUserId,
      newData: { reason },
    },
  })
}

export async function getPendingOnboardings() {
  return prisma.notaryOnboarding.findMany({
    where: {
      status: { in: ["PENDING_REVIEW", "PENDING_VERIFICATION"] },
    },
    include: { user: true },
    orderBy: { submittedAt: "asc" },
  })
}

// ============================================================================
// Helper Functions
// ============================================================================

function mergeStepData(existing: OnboardingData, step: number, newData: Partial<OnboardingData>): OnboardingData {
  const stepKeyMap: Record<number, keyof OnboardingData> = {
    1: "basicInfo",
    2: "commission",
    3: "insurance",
    4: "equipment",
    5: "backgroundCheck",
    6: "banking",
    7: "serviceAreas",
    8: "availability",
    9: "specializations",
    10: "agreement",
  }

  const key = stepKeyMap[step]
  if (!key) return existing

  return {
    ...existing,
    [key]: newData[key],
  }
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

function isValidPhone(phone: string): boolean {
  const cleaned = phone.replace(/\D/g, "")
  return cleaned.length === 10 || cleaned.length === 11
}

function isValidZip(zip: string): boolean {
  return /^\d{5}(-\d{4})?$/.test(zip)
}


