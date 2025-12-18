// ============================================================================
// Onboarding Types
// ============================================================================

export interface OnboardingProgress {
  currentStep: number
  completedSteps: number[]
  status: OnboardingStatus
  startedAt: Date
  lastUpdatedAt: Date
  submittedAt?: Date
  approvedAt?: Date
  rejectedAt?: Date
  rejectionReason?: string
}

export type OnboardingStatus = 
  | "IN_PROGRESS"
  | "PENDING_REVIEW"
  | "PENDING_BACKGROUND_CHECK"
  | "PENDING_VERIFICATION"
  | "APPROVED"
  | "REJECTED"

export interface OnboardingData {
  // Step 1: Basic Information
  basicInfo?: BasicInfoData
  
  // Step 2: Commission Details
  commission?: CommissionData
  
  // Step 3: Insurance
  insurance?: InsuranceData
  
  // Step 4: Equipment
  equipment?: EquipmentData
  
  // Step 5: Background Check
  backgroundCheck?: BackgroundCheckData
  
  // Step 6: Banking
  banking?: BankingData
  
  // Step 7: Service Areas
  serviceAreas?: ServiceAreasData
  
  // Step 8: Availability
  availability?: AvailabilityData
  
  // Step 9: Specializations
  specializations?: SpecializationsData
  
  // Step 10: Agreement
  agreement?: AgreementData
}

// Step 1: Basic Information
export interface BasicInfoData {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: {
    street: string
    city: string
    state: string
    zip: string
  }
  dateOfBirth?: string
  ssn?: string // Encrypted, last 4 for display
}

// Step 2: Commission Details
export interface CommissionData {
  commissionState: string
  commissionNumber: string
  commissionExpiry: string
  certificateUrl?: string
  isRONAuthorized: boolean
  ronProvider?: string
  additionalStates?: {
    state: string
    commissionNumber: string
    expiry: string
    certificateUrl?: string
  }[]
  verificationStatus?: "PENDING" | "VERIFIED" | "FAILED"
  verificationDetails?: string
}

// Step 3: Insurance
export interface InsuranceData {
  eoAmount: number
  eoCarrier: string
  eoPolicyNumber: string
  eoExpiry: string
  eoCertificateUrl?: string
  bondAmount?: number
  bondCarrier?: string
  bondExpiry?: string
  bondCertificateUrl?: string
}

// Step 4: Equipment
export interface EquipmentData {
  printerMake: string
  printerModel: string
  isDualTray: boolean
  hasColorPrinting: boolean
  scannerType: "FLATBED" | "SHEET_FED" | "MULTI_FUNCTION" | "MOBILE"
  scannerCapabilities: string[]
  internetProvider: string
  internetSpeed?: {
    download: number
    upload: number
    testedAt: string
  }
  hasBackupInternet: boolean
  mobileHotspot: boolean
  laptopOrTablet: string
  hasPrinterInk: boolean
  hasPaper: boolean
}

// Step 5: Background Check
export interface BackgroundCheckData {
  consentGiven: boolean
  consentDate?: string
  checkrCandidateId?: string
  checkrReportId?: string
  checkrStatus?: "PENDING" | "CLEAR" | "CONSIDER" | "SUSPENDED"
  completedAt?: string
}

// Step 6: Banking
export interface BankingData {
  stripeConnectId?: string
  stripeOnboardingComplete: boolean
  paymentMethod: "ACH" | "CHECK"
  bankName?: string
  accountType?: "CHECKING" | "SAVINGS"
  routingNumber?: string // Last 4 only
  accountNumber?: string // Last 4 only
  w9Uploaded: boolean
  w9Url?: string
}

// Step 7: Service Areas
export interface ServiceAreasData {
  primaryZip: string
  additionalZips: string[]
  maxTravelDistance: number // miles
  willingToTravel: boolean
  travelFeePerMile?: number
  servedCounties: string[]
  excludedAreas?: string[]
}

// Step 8: Availability
export interface AvailabilityData {
  timezone: string
  typicalHours: {
    monday: DayAvailability
    tuesday: DayAvailability
    wednesday: DayAvailability
    thursday: DayAvailability
    friday: DayAvailability
    saturday: DayAvailability
    sunday: DayAvailability
  }
  holidays: string[]
  blackoutDates: string[]
  advanceNoticeHours: number
  acceptsSameDay: boolean
  acceptsAfterHours: boolean
  afterHoursFee?: number
  acceptsWeekends: boolean
  weekendFee?: number
}

export interface DayAvailability {
  available: boolean
  start?: string // HH:mm
  end?: string // HH:mm
}

// Step 9: Specializations
export interface SpecializationsData {
  loanTypes: string[]
  languages: string[]
  ronCapable: boolean
  ronPlatforms?: string[]
  hospitalSignings: boolean
  jailSignings: boolean
  reverseClose: boolean
  commercialLoans: boolean
  refinanceExperience: boolean
  purchaseExperience: boolean
  helocExperience: boolean
  sellerFinancing: boolean
  yearsExperience: number
  certifications: string[]
}

// Step 10: Agreement
export interface AgreementData {
  termsAccepted: boolean
  termsAcceptedAt?: string
  contractorAgreementAccepted: boolean
  contractorAgreementSignedAt?: string
  signatureDataUrl?: string
  agreementVersion: string
  ipAddress?: string
}

// Validation
export interface StepValidation {
  step: number
  isValid: boolean
  errors: string[]
}

// Commission Verification
export interface CommissionVerification {
  state: string
  commissionNumber: string
  status: "PENDING" | "VERIFIED" | "NOT_FOUND" | "EXPIRED" | "ERROR"
  notaryName?: string
  expirationDate?: string
  isActive?: boolean
  verifiedAt?: string
  source?: string
}


