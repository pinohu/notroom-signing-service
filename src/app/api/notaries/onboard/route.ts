import { NextRequest } from "next/server"
import { prisma } from "@/lib/prisma"
import { 
  successResponse, 
  errorResponse, 
  validateRequired,
  validateEmail,
  validatePhone,
  validateZipCode,
  validateFutureDate,
  withErrorHandler 
} from "@/lib/api/utils"
import type { NotaryOnboardInput } from "@/types/api"
import { NotaryStatus, NotaryTier, PaymentMethod } from "@prisma/client"
import bcrypt from "bcryptjs"

// ============================================================================
// POST /api/notaries/onboard - Notary application submission
// ============================================================================

export async function POST(request: NextRequest) {
  return withErrorHandler(async () => {
    // This is a public endpoint - no auth required
    
    const body: NotaryOnboardInput = await request.json()

    // Validate required fields
    const validationErrors = validateRequired(body, [
      "firstName",
      "lastName",
      "email",
      "phone",
      "address",
      "city",
      "state",
      "zipCode",
      "commissionState",
      "commissionNumber",
      "commissionExpiry",
      "eAndOAmount",
      "eAndOExpiry",
    ])

    if (validationErrors) {
      return errorResponse("VALIDATION_ERROR", "Missing required fields", 400, validationErrors)
    }

    // Validate email format
    if (!validateEmail(body.email)) {
      return errorResponse("VALIDATION_ERROR", "Invalid email format", 400, {
        email: ["Invalid email format"],
      })
    }

    // Validate phone format
    if (!validatePhone(body.phone)) {
      return errorResponse("VALIDATION_ERROR", "Invalid phone format", 400, {
        phone: ["Invalid phone format"],
      })
    }

    // Validate zip code
    if (!validateZipCode(body.zipCode)) {
      return errorResponse("VALIDATION_ERROR", "Invalid zip code", 400, {
        zipCode: ["Invalid zip code format"],
      })
    }

    // Validate commission expiry is in the future
    if (!validateFutureDate(body.commissionExpiry)) {
      return errorResponse("VALIDATION_ERROR", "Commission must not be expired", 400, {
        commissionExpiry: ["Commission expiry must be a future date"],
      })
    }

    // Validate E&O expiry is in the future
    if (!validateFutureDate(body.eAndOExpiry)) {
      return errorResponse("VALIDATION_ERROR", "E&O insurance must not be expired", 400, {
        eAndOExpiry: ["E&O expiry must be a future date"],
      })
    }

    // Check if email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: body.email },
    })

    if (existingUser) {
      return errorResponse("CONFLICT", "Email already registered", 409, {
        email: ["This email is already registered"],
      })
    }

    // Check for duplicate commission number in same state
    const existingNotary = await prisma.notary.findFirst({
      where: {
        commissionState: body.commissionState,
        commissionNumber: body.commissionNumber,
      },
    })

    if (existingNotary) {
      return errorResponse("CONFLICT", "Commission number already registered", 409, {
        commissionNumber: ["This commission number is already registered"],
      })
    }

    // Create user and notary in transaction
    const result = await prisma.$transaction(async (tx) => {
      // Generate temporary password
      const tempPassword = generateTempPassword()
      const passwordHash = await bcrypt.hash(tempPassword, 10)

      // Create user
      const user = await tx.user.create({
        data: {
          email: body.email,
          name: `${body.firstName} ${body.lastName}`,
          phone: body.phone,
          passwordHash,
          role: "NOTARY",
          isActive: true,
        },
      })

      // Create notary profile
      const notary = await tx.notary.create({
        data: {
          userId: user.id,
          firstName: body.firstName,
          lastName: body.lastName,
          phone: body.phone,
          address: body.address,
          city: body.city,
          state: body.state,
          zipCode: body.zipCode,
          commissionState: body.commissionState,
          commissionNumber: body.commissionNumber,
          commissionExpiry: new Date(body.commissionExpiry),
          eAndOAmount: body.eAndOAmount,
          eAndOExpiry: new Date(body.eAndOExpiry),
          eAndOCarrier: body.eAndOCarrier,
          nnaCertified: body.nnaCertified ?? false,
          nnaNumber: body.nnaNumber,
          hasDualTrayPrinter: body.hasDualTrayPrinter ?? false,
          hasScanner: body.hasScanner ?? false,
          hasReliableVehicle: body.hasReliableVehicle ?? false,
          ronAuthorized: body.ronAuthorized ?? false,
          ronProvider: body.ronProvider,
          serviceRadius: body.serviceRadius ?? 25,
          acceptsWeekends: body.acceptsWeekends ?? true,
          acceptsEvenings: body.acceptsEvenings ?? true,
          languages: body.languages ?? ["English"],
          status: NotaryStatus.PENDING,
          tier: NotaryTier.BRONZE,
          eliteScore: 0,
          preferredPayment: PaymentMethod.ACH,
        },
      })

      // Create initial performance record
      await tx.notaryPerformance.create({
        data: {
          notaryId: notary.id,
          tier: NotaryTier.BRONZE,
        },
      })

      return { user, notary, tempPassword }
    })

    // TODO: Send welcome email with temporary password

    return successResponse({
      id: result.notary.id,
      email: result.user.email,
      status: result.notary.status,
      message: "Application submitted successfully. We will review your credentials and contact you within 2-3 business days.",
    }, 201)
  })
}

function generateTempPassword(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789"
  let password = ""
  for (let i = 0; i < 12; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return password
}

