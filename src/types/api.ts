import type { 
  Order, 
  Notary, 
  Assignment, 
  TitleCompany,
  OrderStatus,
  SigningType,
  ServiceTier,
  OrderType,
  AssignmentStatus,
  NotaryTier,
  PaymentStatus
} from "@prisma/client"

// ============================================================================
// API Response Types
// ============================================================================

export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: ApiError
  meta?: ApiMeta
}

export interface ApiError {
  code: string
  message: string
  details?: Record<string, string[]>
}

export interface ApiMeta {
  page?: number
  limit?: number
  total?: number
  hasMore?: boolean
}

// ============================================================================
// Order Types
// ============================================================================

export interface CreateOrderInput {
  // Title Company
  titleCompanyId: string
  clientReferenceId?: string
  
  // Order Config
  signingType: SigningType
  serviceTier: ServiceTier
  orderType: OrderType
  
  // Loan Details
  loanAmount?: number
  loanNumber?: string
  lenderName?: string
  
  // Property
  propertyAddress: string
  propertyCity: string
  propertyState: string
  propertyZipCode: string
  propertyType?: string
  
  // Signing Location (optional, defaults to property)
  signingAddress?: string
  signingCity?: string
  signingState?: string
  signingZipCode?: string
  signingLocationType?: string
  
  // Borrower
  borrowerName: string
  borrowerEmail?: string
  borrowerPhone?: string
  coBorrowerName?: string
  coBorrowerEmail?: string
  coBorrowerPhone?: string
  
  // Scheduling
  scheduledDatetime?: string // ISO string
  scheduledEndTime?: string
  timeZone?: string
  isFlexibleTime?: boolean
  
  // Notes
  specialInstructions?: string
}

export interface UpdateOrderStatusInput {
  status: OrderStatus
  notes?: string
}

export interface AssignOrderInput {
  notaryId: string
  paymentAmount: number
  travelAllowance?: number
  bonusAmount?: number
  offerExpiresAt?: string // ISO string
}

export interface OrderWithRelations extends Order {
  titleCompany: TitleCompany
  assignments: (Assignment & { notary: Notary })[]
}

// ============================================================================
// Notary Types
// ============================================================================

export interface NotaryOnboardInput {
  // Personal Info
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  zipCode: string
  
  // Commission
  commissionState: string
  commissionNumber: string
  commissionExpiry: string // ISO date
  
  // Insurance
  eAndOAmount: number
  eAndOExpiry: string // ISO date
  eAndOCarrier?: string
  
  // Certifications
  nnaCertified?: boolean
  nnaNumber?: string
  
  // Equipment
  hasDualTrayPrinter?: boolean
  hasScanner?: boolean
  hasReliableVehicle?: boolean
  
  // RON
  ronAuthorized?: boolean
  ronProvider?: string
  
  // Preferences
  serviceRadius?: number
  acceptsWeekends?: boolean
  acceptsEvenings?: boolean
  languages?: string[]
}

export interface VerifyNotaryInput {
  backgroundCheckClear: boolean
  backgroundCheckDate: string // ISO date
  equipmentVerified: boolean
  commissionVerified?: boolean
  notes?: string
}

export interface AvailableNotaryQuery {
  propertyState: string
  propertyZipCode: string
  signingType: SigningType
  scheduledDatetime?: string
  orderType?: OrderType
  serviceTier?: ServiceTier
}

export interface NotaryMatch {
  notary: Notary
  distance?: number
  eliteScore: number
  tier: NotaryTier
  matchReasons: string[]
}

// ============================================================================
// Assignment Types
// ============================================================================

export interface AcceptAssignmentInput {
  confirmationNotes?: string
}

export interface CompleteAssignmentInput {
  completionNotes?: string
  arrivalTime?: string // ISO datetime
  departureTime?: string // ISO datetime
  borrowerSignedAt?: string // ISO datetime
}

export interface AssignmentWithRelations extends Assignment {
  order: Order
  notary: Notary
}

// ============================================================================
// Webhook Types
// ============================================================================

export interface WebhookStatusPayload {
  orderId: string
  status: OrderStatus
  timestamp: string
  metadata?: Record<string, unknown>
  signature?: string
}


