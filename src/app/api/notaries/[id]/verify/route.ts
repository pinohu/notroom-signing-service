import { NextRequest } from "next/server"
import { prisma } from "@/lib/prisma"
import { 
  successResponse, 
  errorResponse, 
  requireRole,
  validateRequired,
  withErrorHandler 
} from "@/lib/api/utils"
import type { VerifyNotaryInput } from "@/types/api"
import { NotaryStatus } from "@prisma/client"

// ============================================================================
// PATCH /api/notaries/[id]/verify - Verify notary credentials
// ============================================================================

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  return withErrorHandler(async () => {
    // Only admins can verify notaries
    await requireRole(["ADMIN"])

    const { id } = await params
    const body: VerifyNotaryInput = await request.json()

    // Validate required fields
    const validationErrors = validateRequired(body, [
      "backgroundCheckClear",
      "backgroundCheckDate",
      "equipmentVerified",
    ])

    if (validationErrors) {
      return errorResponse("VALIDATION_ERROR", "Missing required fields", 400, validationErrors)
    }

    // Get notary
    const notary = await prisma.notary.findUnique({
      where: { id },
      include: { user: true },
    })

    if (!notary) {
      return errorResponse("NOT_FOUND", "Notary not found", 404)
    }

    // Update notary verification status
    const newStatus = body.backgroundCheckClear && body.equipmentVerified
      ? NotaryStatus.ACTIVE
      : NotaryStatus.SUSPENDED

    const updatedNotary = await prisma.notary.update({
      where: { id },
      data: {
        backgroundCheckClear: body.backgroundCheckClear,
        backgroundCheckDate: new Date(body.backgroundCheckDate),
        equipmentVerified: body.equipmentVerified,
        status: newStatus,
        approvedAt: newStatus === NotaryStatus.ACTIVE ? new Date() : null,
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
        performance: true,
      },
    })

    // Create audit log
    await prisma.auditLog.create({
      data: {
        action: "UPDATE",
        entityType: "Notary",
        entityId: id,
        oldData: {
          status: notary.status,
          backgroundCheckClear: notary.backgroundCheckClear,
          equipmentVerified: notary.equipmentVerified,
        },
        newData: {
          status: newStatus,
          backgroundCheckClear: body.backgroundCheckClear,
          equipmentVerified: body.equipmentVerified,
          notes: body.notes,
        },
      },
    })

    // TODO: Send notification to notary about approval/rejection

    return successResponse({
      notary: updatedNotary,
      verified: newStatus === NotaryStatus.ACTIVE,
      message: newStatus === NotaryStatus.ACTIVE
        ? "Notary has been verified and activated"
        : "Notary verification incomplete. Status set to suspended.",
    })
  })
}


