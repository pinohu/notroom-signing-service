// Notroom Payment System using Stripe Connect
// Handles notary payments, delayed transfers, and tax document generation

import Stripe from "stripe"
import { prisma } from "./prisma"
import { 
  calculatePayment, 
  type PaymentCalculationInput,
  type PaymentBreakdown 
} from "./payment-calculations"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-12-18.acacia",
})

// =============================================================================
// TYPES
// =============================================================================

export interface NotaryOnboardingResult {
  success: boolean
  accountId?: string
  onboardingUrl?: string
  error?: string
}

export interface PaymentResult {
  success: boolean
  paymentId?: string
  transferId?: string
  amount?: number
  scheduledFor?: Date
  error?: string
}

export interface PaymentStatusUpdate {
  paymentId: string
  status: "pending" | "processing" | "completed" | "failed"
  failureReason?: string
  transferId?: string
}

export interface NotaryBalance {
  pendingBalance: number
  availableBalance: number
  currency: string
}

export interface PaymentHistoryItem {
  id: string
  amount: number
  status: string
  assignmentId: string
  orderNumber: string
  scheduledFor: Date
  completedAt?: Date
  breakdown: PaymentBreakdown
}

export interface TaxDocument {
  id: string
  year: number
  type: "1099-NEC"
  totalAmount: number
  status: "pending" | "generated" | "sent"
  documentUrl?: string
  generatedAt?: Date
}

// =============================================================================
// STRIPE CONNECT ONBOARDING
// =============================================================================

/**
 * Create a Stripe Connect Express account for a notary
 */
export async function createConnectedAccount(
  notaryId: string,
  email: string,
  firstName: string,
  lastName: string
): Promise<NotaryOnboardingResult> {
  try {
    // Check if notary already has a connected account
    const notary = await prisma.notary.findUnique({
      where: { id: notaryId },
    })

    if (notary?.stripeConnectId) {
      // Return existing account link for completion
      const accountLink = await stripe.accountLinks.create({
        account: notary.stripeConnectId,
        refresh_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/payments?refresh=true`,
        return_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/payments?onboarding=complete`,
        type: "account_onboarding",
      })

      return {
        success: true,
        accountId: notary.stripeConnectId,
        onboardingUrl: accountLink.url,
      }
    }

    // Create new Express connected account
    const account = await stripe.accounts.create({
      type: "express",
      country: "US",
      email: email,
      capabilities: {
        transfers: { requested: true },
      },
      business_type: "individual",
      individual: {
        first_name: firstName,
        last_name: lastName,
        email: email,
      },
      metadata: {
        notary_id: notaryId,
        platform: "notroom",
      },
      settings: {
        payouts: {
          schedule: {
            interval: "manual", // We control when payouts happen
          },
        },
      },
    })

    // Update notary with Stripe account ID
    await prisma.notary.update({
      where: { id: notaryId },
      data: { stripeConnectId: account.id },
    })

    // Create account link for onboarding
    const accountLink = await stripe.accountLinks.create({
      account: account.id,
      refresh_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/payments?refresh=true`,
      return_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/payments?onboarding=complete`,
      type: "account_onboarding",
    })

    return {
      success: true,
      accountId: account.id,
      onboardingUrl: accountLink.url,
    }
  } catch (error) {
    console.error("Failed to create connected account:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    }
  }
}

/**
 * Check if a notary's Stripe account is fully onboarded
 */
export async function checkAccountStatus(stripeAccountId: string): Promise<{
  isComplete: boolean
  chargesEnabled: boolean
  payoutsEnabled: boolean
  requirements: string[]
}> {
  try {
    const account = await stripe.accounts.retrieve(stripeAccountId)
    
    return {
      isComplete: account.details_submitted ?? false,
      chargesEnabled: account.charges_enabled ?? false,
      payoutsEnabled: account.payouts_enabled ?? false,
      requirements: account.requirements?.currently_due ?? [],
    }
  } catch (error) {
    console.error("Failed to check account status:", error)
    return {
      isComplete: false,
      chargesEnabled: false,
      payoutsEnabled: false,
      requirements: [],
    }
  }
}

/**
 * Get a new onboarding link for an existing account
 */
export async function getAccountLink(stripeAccountId: string): Promise<string | null> {
  try {
    const accountLink = await stripe.accountLinks.create({
      account: stripeAccountId,
      refresh_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/payments?refresh=true`,
      return_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/payments?onboarding=complete`,
      type: "account_onboarding",
    })
    return accountLink.url
  } catch (error) {
    console.error("Failed to get account link:", error)
    return null
  }
}

/**
 * Get Stripe dashboard login link for a connected account
 */
export async function getLoginLink(stripeAccountId: string): Promise<string | null> {
  try {
    const loginLink = await stripe.accounts.createLoginLink(stripeAccountId)
    return loginLink.url
  } catch (error) {
    console.error("Failed to get login link:", error)
    return null
  }
}

// =============================================================================
// PAYMENT PROCESSING
// =============================================================================

/**
 * Process payment for a completed assignment with configurable delay
 */
export async function processPayment(
  assignmentId: string,
  delayDays: number = 2 // Default 2-day delay
): Promise<PaymentResult> {
  try {
    // Get assignment with related data
    const assignment = await prisma.assignment.findUnique({
      where: { id: assignmentId },
      include: {
        order: true,
        notary: true,
      },
    })

    if (!assignment) {
      return { success: false, error: "Assignment not found" }
    }

    if (!assignment.notary.stripeConnectId) {
      return { success: false, error: "Notary has no connected Stripe account" }
    }

    // Check account status
    const accountStatus = await checkAccountStatus(assignment.notary.stripeConnectId)
    if (!accountStatus.payoutsEnabled) {
      return { success: false, error: "Notary account not ready for payouts" }
    }

    // Calculate payment amount
    const paymentInput: PaymentCalculationInput = {
      baseRate: Number(assignment.paymentAmount || 0) * 100, // Convert to cents
      distanceMiles: assignment.order.distanceMiles || 0,
      isRush: assignment.order.serviceTier === "RESCUE",
      isPriority: assignment.order.serviceTier === "PRIORITY",
      scheduledTime: assignment.order.scheduledDatetime,
      loanType: assignment.order.type,
      documentCount: assignment.order.documentCount || 0,
    }

    const paymentBreakdown = calculatePayment(paymentInput)

    // Create payment record
    const payment = await prisma.notaryPayment.create({
      data: {
        assignmentId: assignment.id,
        notaryId: assignment.notaryId,
        amount: paymentBreakdown.totalAmount,
        baseAmount: paymentBreakdown.baseRate,
        distanceFee: paymentBreakdown.distanceFee,
        rushFee: paymentBreakdown.rushFee,
        timeModifier: paymentBreakdown.timeOfDayModifier,
        documentFee: paymentBreakdown.documentFee,
        status: "PENDING",
        scheduledFor: new Date(Date.now() + delayDays * 24 * 60 * 60 * 1000),
        breakdown: paymentBreakdown as unknown as Record<string, unknown>,
      },
    })

    // For immediate processing (no delay), create transfer now
    if (delayDays === 0) {
      const transferResult = await executeTransfer(payment.id)
      return transferResult
    }

    return {
      success: true,
      paymentId: payment.id,
      amount: paymentBreakdown.totalAmount,
      scheduledFor: payment.scheduledFor,
    }
  } catch (error) {
    console.error("Failed to process payment:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    }
  }
}

/**
 * Execute a scheduled transfer to a notary
 */
export async function executeTransfer(paymentId: string): Promise<PaymentResult> {
  try {
    const payment = await prisma.notaryPayment.findUnique({
      where: { id: paymentId },
      include: {
        notary: true,
        assignment: {
          include: { order: true },
        },
      },
    })

    if (!payment) {
      return { success: false, error: "Payment not found" }
    }

    if (payment.status !== "PENDING") {
      return { success: false, error: `Payment already ${payment.status.toLowerCase()}` }
    }

    if (!payment.notary.stripeConnectId) {
      return { success: false, error: "No connected account" }
    }

    // Update status to processing
    await prisma.notaryPayment.update({
      where: { id: paymentId },
      data: { status: "PROCESSING" },
    })

    // Create transfer to connected account
    const transfer = await stripe.transfers.create({
      amount: payment.amount,
      currency: "usd",
      destination: payment.notary.stripeConnectId,
      metadata: {
        payment_id: payment.id,
        assignment_id: payment.assignmentId,
        order_number: payment.assignment.order.orderNumber,
        notary_id: payment.notaryId,
      },
      description: `Payment for order ${payment.assignment.order.orderNumber}`,
    })

    // Update payment with transfer ID
    await prisma.notaryPayment.update({
      where: { id: paymentId },
      data: {
        status: "COMPLETED",
        stripeTransferId: transfer.id,
        completedAt: new Date(),
      },
    })

    // Update assignment payment status
    await prisma.assignment.update({
      where: { id: payment.assignmentId },
      data: { paymentStatus: "COMPLETED" },
    })

    return {
      success: true,
      paymentId: payment.id,
      transferId: transfer.id,
      amount: payment.amount,
    }
  } catch (error) {
    console.error("Transfer failed:", error)

    // Update payment status to failed
    await prisma.notaryPayment.update({
      where: { id: paymentId },
      data: {
        status: "FAILED",
        failureReason: error instanceof Error ? error.message : "Unknown error",
        retryCount: { increment: 1 },
      },
    })

    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    }
  }
}

/**
 * Retry a failed payment
 */
export async function retryPayment(paymentId: string): Promise<PaymentResult> {
  const payment = await prisma.notaryPayment.findUnique({
    where: { id: paymentId },
  })

  if (!payment) {
    return { success: false, error: "Payment not found" }
  }

  if (payment.status !== "FAILED") {
    return { success: false, error: "Only failed payments can be retried" }
  }

  if (payment.retryCount >= 3) {
    return { success: false, error: "Maximum retry attempts reached" }
  }

  // Reset status to pending and execute
  await prisma.notaryPayment.update({
    where: { id: paymentId },
    data: { status: "PENDING" },
  })

  return executeTransfer(paymentId)
}

/**
 * Process all scheduled payments that are due
 */
export async function processScheduledPayments(): Promise<{
  processed: number
  failed: number
  errors: string[]
}> {
  const now = new Date()
  const duePayments = await prisma.notaryPayment.findMany({
    where: {
      status: "PENDING",
      scheduledFor: { lte: now },
    },
  })

  let processed = 0
  let failed = 0
  const errors: string[] = []

  for (const payment of duePayments) {
    const result = await executeTransfer(payment.id)
    if (result.success) {
      processed++
    } else {
      failed++
      errors.push(`Payment ${payment.id}: ${result.error}`)
    }
  }

  return { processed, failed, errors }
}

// =============================================================================
// PAYMENT WEBHOOKS
// =============================================================================

/**
 * Handle Stripe webhook events for payments
 */
export async function handlePaymentWebhook(
  event: Stripe.Event
): Promise<PaymentStatusUpdate | null> {
  switch (event.type) {
    case "transfer.created": {
      const transfer = event.data.object as Stripe.Transfer
      const paymentId = transfer.metadata?.payment_id

      if (paymentId) {
        await prisma.notaryPayment.update({
          where: { id: paymentId },
          data: {
            status: "PROCESSING",
            stripeTransferId: transfer.id,
          },
        })

        return {
          paymentId,
          status: "processing",
          transferId: transfer.id,
        }
      }
      break
    }

    case "transfer.paid": {
      const transfer = event.data.object as Stripe.Transfer
      const paymentId = transfer.metadata?.payment_id

      if (paymentId) {
        await prisma.notaryPayment.update({
          where: { id: paymentId },
          data: {
            status: "COMPLETED",
            completedAt: new Date(),
          },
        })

        return {
          paymentId,
          status: "completed",
          transferId: transfer.id,
        }
      }
      break
    }

    case "transfer.failed": {
      const transfer = event.data.object as Stripe.Transfer
      const paymentId = transfer.metadata?.payment_id

      if (paymentId) {
        await prisma.notaryPayment.update({
          where: { id: paymentId },
          data: {
            status: "FAILED",
            failureReason: "Transfer failed",
          },
        })

        return {
          paymentId,
          status: "failed",
          failureReason: "Transfer failed",
        }
      }
      break
    }

    case "account.updated": {
      const account = event.data.object as Stripe.Account
      const notaryId = account.metadata?.notary_id

      if (notaryId) {
        await prisma.notary.update({
          where: { id: notaryId },
          data: {
            stripeAccountStatus: account.details_submitted ? "ACTIVE" : "PENDING",
          },
        })
      }
      break
    }
  }

  return null
}

// =============================================================================
// BALANCE & HISTORY
// =============================================================================

/**
 * Get notary's payment balance
 */
export async function getNotaryBalance(notaryId: string): Promise<NotaryBalance> {
  const notary = await prisma.notary.findUnique({
    where: { id: notaryId },
  })

  if (!notary?.stripeConnectId) {
    return { pendingBalance: 0, availableBalance: 0, currency: "usd" }
  }

  try {
    const balance = await stripe.balance.retrieve({
      stripeAccount: notary.stripeConnectId,
    })

    const pending = balance.pending.find((b) => b.currency === "usd")?.amount || 0
    const available = balance.available.find((b) => b.currency === "usd")?.amount || 0

    return {
      pendingBalance: pending,
      availableBalance: available,
      currency: "usd",
    }
  } catch (error) {
    console.error("Failed to get balance:", error)
    return { pendingBalance: 0, availableBalance: 0, currency: "usd" }
  }
}

/**
 * Get notary's payment history
 */
export async function getPaymentHistory(
  notaryId: string,
  limit: number = 50,
  offset: number = 0
): Promise<PaymentHistoryItem[]> {
  const payments = await prisma.notaryPayment.findMany({
    where: { notaryId },
    include: {
      assignment: {
        include: { order: true },
      },
    },
    orderBy: { createdAt: "desc" },
    take: limit,
    skip: offset,
  })

  return payments.map((p) => ({
    id: p.id,
    amount: p.amount,
    status: p.status,
    assignmentId: p.assignmentId,
    orderNumber: p.assignment.order.orderNumber,
    scheduledFor: p.scheduledFor,
    completedAt: p.completedAt || undefined,
    breakdown: p.breakdown as unknown as PaymentBreakdown,
  }))
}

// =============================================================================
// TAX DOCUMENTS (1099)
// =============================================================================

/**
 * Generate 1099-NEC for a notary for a tax year
 */
export async function generateTaxDocuments(
  notaryId: string,
  taxYear: number
): Promise<TaxDocument | null> {
  try {
    const notary = await prisma.notary.findUnique({
      where: { id: notaryId },
      include: { user: true },
    })

    if (!notary?.stripeConnectId) {
      console.error("Notary has no connected account")
      return null
    }

    // Get total payments for the year
    const yearStart = new Date(taxYear, 0, 1)
    const yearEnd = new Date(taxYear, 11, 31, 23, 59, 59)

    const payments = await prisma.notaryPayment.aggregate({
      where: {
        notaryId,
        status: "COMPLETED",
        completedAt: {
          gte: yearStart,
          lte: yearEnd,
        },
      },
      _sum: {
        amount: true,
      },
    })

    const totalAmount = payments._sum.amount || 0

    // Only generate 1099 if over $600
    if (totalAmount < 60000) {
      // $600.00 in cents
      console.log(`Total payments ${totalAmount / 100} below 1099 threshold`)
      return null
    }

    // Create 1099 report run in Stripe
    const reportRun = await stripe.reporting.reportRuns.create({
      report_type: "connected_account_payout_reconciliation.by_id.itemized.4",
      parameters: {
        connected_account: notary.stripeConnectId,
        interval_start: Math.floor(yearStart.getTime() / 1000),
        interval_end: Math.floor(yearEnd.getTime() / 1000),
      },
    })

    // Store tax document record
    const taxDoc = await prisma.taxDocument.create({
      data: {
        notaryId,
        year: taxYear,
        type: "1099-NEC",
        totalAmount,
        status: "PENDING",
        stripeReportId: reportRun.id,
      },
    })

    return {
      id: taxDoc.id,
      year: taxDoc.year,
      type: "1099-NEC",
      totalAmount: taxDoc.totalAmount,
      status: "pending",
      generatedAt: taxDoc.createdAt,
    }
  } catch (error) {
    console.error("Failed to generate tax documents:", error)
    return null
  }
}

/**
 * Get tax documents for a notary
 */
export async function getTaxDocuments(notaryId: string): Promise<TaxDocument[]> {
  const docs = await prisma.taxDocument.findMany({
    where: { notaryId },
    orderBy: { year: "desc" },
  })

  return docs.map((d) => ({
    id: d.id,
    year: d.year,
    type: "1099-NEC" as const,
    totalAmount: d.totalAmount,
    status: d.status.toLowerCase() as "pending" | "generated" | "sent",
    documentUrl: d.documentUrl || undefined,
    generatedAt: d.generatedAt || undefined,
  }))
}

// =============================================================================
// RECONCILIATION
// =============================================================================

/**
 * Reconcile payments with assignments
 */
export async function reconcilePayments(): Promise<{
  matched: number
  unmatched: number
  issues: string[]
}> {
  const issues: string[] = []
  let matched = 0
  let unmatched = 0

  // Find completed assignments without payments
  const unpaidAssignments = await prisma.assignment.findMany({
    where: {
      status: "COMPLETED",
      paymentStatus: "PENDING",
      completedAt: { not: null },
    },
    include: { order: true },
  })

  for (const assignment of unpaidAssignments) {
    // Check if payment exists but isn't linked
    const existingPayment = await prisma.notaryPayment.findFirst({
      where: { assignmentId: assignment.id },
    })

    if (existingPayment) {
      matched++
      // Update assignment payment status based on payment status
      await prisma.assignment.update({
        where: { id: assignment.id },
        data: { paymentStatus: existingPayment.status },
      })
    } else {
      unmatched++
      issues.push(
        `Assignment ${assignment.id} (Order ${assignment.order.orderNumber}) completed but no payment record`
      )
    }
  }

  // Find orphaned payments
  const orphanedPayments = await prisma.notaryPayment.findMany({
    where: {
      assignment: null,
    },
  })

  for (const payment of orphanedPayments) {
    issues.push(`Payment ${payment.id} has no associated assignment`)
    unmatched++
  }

  return { matched, unmatched, issues }
}

/**
 * Create missing payments for completed assignments
 */
export async function createMissingPayments(
  delayDays: number = 2
): Promise<{
  created: number
  errors: string[]
}> {
  const errors: string[] = []
  let created = 0

  const unpaidAssignments = await prisma.assignment.findMany({
    where: {
      status: "COMPLETED",
      paymentStatus: "PENDING",
      completedAt: { not: null },
    },
  })

  for (const assignment of unpaidAssignments) {
    // Check if payment already exists
    const existingPayment = await prisma.notaryPayment.findFirst({
      where: { assignmentId: assignment.id },
    })

    if (!existingPayment) {
      const result = await processPayment(assignment.id, delayDays)
      if (result.success) {
        created++
      } else {
        errors.push(`Failed to create payment for ${assignment.id}: ${result.error}`)
      }
    }
  }

  return { created, errors }
}

