import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import type { ApiResponse, ApiError } from "@/types/api"

// ============================================================================
// Response Helpers
// ============================================================================

export function successResponse<T>(data: T, status = 200): NextResponse<ApiResponse<T>> {
  return NextResponse.json({ success: true, data }, { status })
}

export function errorResponse(
  code: string,
  message: string,
  status = 400,
  details?: Record<string, string[]>
): NextResponse<ApiResponse> {
  const error: ApiError = { code, message, details }
  return NextResponse.json({ success: false, error }, { status })
}

export function paginatedResponse<T>(
  data: T[],
  page: number,
  limit: number,
  total: number
): NextResponse<ApiResponse<T[]>> {
  return NextResponse.json({
    success: true,
    data,
    meta: {
      page,
      limit,
      total,
      hasMore: page * limit < total,
    },
  })
}

// ============================================================================
// Error Types
// ============================================================================

export const ApiErrors = {
  UNAUTHORIZED: { code: "UNAUTHORIZED", message: "Authentication required", status: 401 },
  FORBIDDEN: { code: "FORBIDDEN", message: "Access denied", status: 403 },
  NOT_FOUND: { code: "NOT_FOUND", message: "Resource not found", status: 404 },
  VALIDATION_ERROR: { code: "VALIDATION_ERROR", message: "Validation failed", status: 400 },
  CONFLICT: { code: "CONFLICT", message: "Resource conflict", status: 409 },
  INTERNAL_ERROR: { code: "INTERNAL_ERROR", message: "Internal server error", status: 500 },
} as const

// ============================================================================
// Authentication Helpers
// ============================================================================

export async function getAuthenticatedUser() {
  const session = await getServerSession(authOptions)
  return session?.user ?? null
}

export async function requireAuth() {
  const user = await getAuthenticatedUser()
  if (!user) {
    throw new AuthError("UNAUTHORIZED", "Authentication required")
  }
  return user
}

export async function requireRole(allowedRoles: string[]) {
  const user = await requireAuth()
  // @ts-expect-error - role is added to session user
  if (!allowedRoles.includes(user.role)) {
    throw new AuthError("FORBIDDEN", "Access denied")
  }
  return user
}

export class AuthError extends Error {
  code: string
  constructor(code: string, message: string) {
    super(message)
    this.code = code
    this.name = "AuthError"
  }
}

// ============================================================================
// Validation Helpers
// ============================================================================

export function validateRequired(
  data: Record<string, unknown>,
  requiredFields: string[]
): Record<string, string[]> | null {
  const errors: Record<string, string[]> = {}
  
  for (const field of requiredFields) {
    const value = data[field]
    if (value === undefined || value === null || value === "") {
      errors[field] = [`${field} is required`]
    }
  }
  
  return Object.keys(errors).length > 0 ? errors : null
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function validatePhone(phone: string): boolean {
  const phoneRegex = /^\+?[\d\s()-]{10,}$/
  return phoneRegex.test(phone)
}

export function validateZipCode(zip: string): boolean {
  const zipRegex = /^\d{5}(-\d{4})?$/
  return zipRegex.test(zip)
}

export function validateDate(dateStr: string): boolean {
  const date = new Date(dateStr)
  return !isNaN(date.getTime())
}

export function validateFutureDate(dateStr: string): boolean {
  const date = new Date(dateStr)
  return !isNaN(date.getTime()) && date > new Date()
}

// ============================================================================
// Parsing Helpers
// ============================================================================

export function parseQueryParams(url: URL) {
  const page = Math.max(1, parseInt(url.searchParams.get("page") ?? "1"))
  const limit = Math.min(100, Math.max(1, parseInt(url.searchParams.get("limit") ?? "20")))
  const offset = (page - 1) * limit
  
  return { page, limit, offset }
}

// ============================================================================
// Error Handler Wrapper
// ============================================================================

export function withErrorHandler<T>(
  handler: () => Promise<NextResponse<ApiResponse<T>>>
): Promise<NextResponse<ApiResponse<T>>> {
  return handler().catch((error) => {
    console.error("API Error:", error)
    
    if (error instanceof AuthError) {
      const status = error.code === "UNAUTHORIZED" ? 401 : 403
      return errorResponse(error.code, error.message, status) as NextResponse<ApiResponse<T>>
    }
    
    return errorResponse(
      "INTERNAL_ERROR",
      process.env.NODE_ENV === "development" ? error.message : "Internal server error",
      500
    ) as NextResponse<ApiResponse<T>>
  })
}


