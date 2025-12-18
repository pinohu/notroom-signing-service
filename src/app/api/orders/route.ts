import { NextRequest } from "next/server"
import { prisma } from "@/lib/prisma"
import { 
  successResponse, 
  errorResponse, 
  requireRole,
  validateRequired,
  withErrorHandler,
  parseQueryParams
} from "@/lib/api/utils"
import type { CreateOrderInput, OrderWithRelations } from "@/types/api"
import { OrderStatus, ServiceTier } from "@prisma/client"

// ============================================================================
// POST /api/orders - Create new signing order
// ============================================================================

export async function POST(request: NextRequest) {
  return withErrorHandler(async () => {
    // Auth: Only admins and title companies can create orders
    await requireRole(["ADMIN", "TITLE_COMPANY"])

    const body: CreateOrderInput = await request.json()

    // Validate required fields
    const validationErrors = validateRequired(body, [
      "titleCompanyId",
      "signingType",
      "serviceTier",
      "orderType",
      "propertyAddress",
      "propertyCity",
      "propertyState",
      "propertyZipCode",
      "borrowerName",
    ])

    if (validationErrors) {
      return errorResponse("VALIDATION_ERROR", "Missing required fields", 400, validationErrors)
    }

    // Calculate fees based on service tier
    const baseFee = calculateBaseFee(body.serviceTier)
    const rushFee = body.serviceTier === "RESCUE" ? 50 : 0
    const totalFee = baseFee + rushFee

    // Calculate SLA deadlines
    const confirmationDeadline = calculateConfirmationDeadline(body.serviceTier)
    const scanbackDeadline = body.scheduledDatetime 
      ? calculateScanbackDeadline(new Date(body.scheduledDatetime), body.serviceTier)
      : null

    // Create order
    const order = await prisma.order.create({
      data: {
        titleCompanyId: body.titleCompanyId,
        clientReferenceId: body.clientReferenceId,
        status: OrderStatus.PENDING_ASSIGNMENT,
        signingType: body.signingType,
        serviceTier: body.serviceTier,
        orderType: body.orderType,
        loanAmount: body.loanAmount ? body.loanAmount : null,
        loanNumber: body.loanNumber,
        lenderName: body.lenderName,
        propertyAddress: body.propertyAddress,
        propertyCity: body.propertyCity,
        propertyState: body.propertyState,
        propertyZipCode: body.propertyZipCode,
        propertyType: body.propertyType,
        signingAddress: body.signingAddress ?? body.propertyAddress,
        signingCity: body.signingCity ?? body.propertyCity,
        signingState: body.signingState ?? body.propertyState,
        signingZipCode: body.signingZipCode ?? body.propertyZipCode,
        signingLocationType: body.signingLocationType,
        borrowerName: body.borrowerName,
        borrowerEmail: body.borrowerEmail,
        borrowerPhone: body.borrowerPhone,
        coBorrowerName: body.coBorrowerName,
        coBorrowerEmail: body.coBorrowerEmail,
        coBorrowerPhone: body.coBorrowerPhone,
        scheduledDatetime: body.scheduledDatetime ? new Date(body.scheduledDatetime) : null,
        scheduledEndTime: body.scheduledEndTime ? new Date(body.scheduledEndTime) : null,
        timeZone: body.timeZone ?? "America/New_York",
        isFlexibleTime: body.isFlexibleTime ?? false,
        specialInstructions: body.specialInstructions,
        baseFee,
        rushFee,
        totalFee,
        confirmationDeadline,
        scanbackDeadline,
        submittedAt: new Date(),
      },
      include: {
        titleCompany: true,
      },
    })

    // Create initial status history
    await prisma.orderStatusHistory.create({
      data: {
        orderId: order.id,
        status: OrderStatus.PENDING_ASSIGNMENT,
        notes: "Order created",
      },
    })

    return successResponse(order, 201)
  })
}

// ============================================================================
// GET /api/orders - List orders
// ============================================================================

export async function GET(request: NextRequest) {
  return withErrorHandler(async () => {
    await requireRole(["ADMIN", "TITLE_COMPANY"])

    const url = new URL(request.url)
    const { page, limit, offset } = parseQueryParams(url)
    
    const status = url.searchParams.get("status") as OrderStatus | null
    const titleCompanyId = url.searchParams.get("titleCompanyId")
    const state = url.searchParams.get("state")

    const where = {
      ...(status && { status }),
      ...(titleCompanyId && { titleCompanyId }),
      ...(state && { propertyState: state }),
    }

    const [orders, total] = await Promise.all([
      prisma.order.findMany({
        where,
        include: {
          titleCompany: true,
          assignments: {
            include: { notary: true },
          },
        },
        orderBy: { createdAt: "desc" },
        skip: offset,
        take: limit,
      }),
      prisma.order.count({ where }),
    ])

    return successResponse({
      orders,
      pagination: { page, limit, total, hasMore: page * limit < total },
    })
  })
}

// ============================================================================
// Helper Functions
// ============================================================================

function calculateBaseFee(serviceTier: ServiceTier): number {
  const fees: Record<ServiceTier, number> = {
    STANDARD: 125,
    PRIORITY: 175,
    RESCUE: 275,
  }
  return fees[serviceTier]
}

function calculateConfirmationDeadline(serviceTier: ServiceTier): Date {
  const now = new Date()
  const minutes: Record<ServiceTier, number> = {
    STANDARD: 60,
    PRIORITY: 15,
    RESCUE: 5,
  }
  return new Date(now.getTime() + minutes[serviceTier] * 60 * 1000)
}

function calculateScanbackDeadline(scheduledDate: Date, serviceTier: ServiceTier): Date {
  const hours: Record<ServiceTier, number> = {
    STANDARD: 24,
    PRIORITY: 4,
    RESCUE: 2,
  }
  return new Date(scheduledDate.getTime() + hours[serviceTier] * 60 * 60 * 1000)
}


