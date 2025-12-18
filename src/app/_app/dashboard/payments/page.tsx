"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Wallet,
  Clock,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  FileText,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
  CreditCard,
  Calendar,
  TrendingUp,
  Download,
  Loader2,
} from "lucide-react"
import { toast } from "sonner"
import { formatPaymentAmount } from "@/lib/payment-calculations"

interface Balance {
  pending: number
  available: number
  pendingFormatted: string
  availableFormatted: string
  currency: string
}

interface Stats {
  totalPayments: number
  totalEarnings: number
  totalEarningsFormatted: string
  completedPayments: number
  completedAmount: number
  pendingPayments: number
  pendingAmount: number
  yearToDate: {
    count: number
    amount: number
    formatted: string
  }
}

interface PaymentHistoryItem {
  id: string
  amount: number
  amountFormatted: string
  status: string
  assignmentId: string
  orderNumber: string
  scheduledFor: string
  completedAt?: string
  breakdown: {
    baseRate: number
    distanceFee: number
    rushFee: number
    priorityFee: number
    timeOfDayModifier: number
    documentFee: number
    loanTypeBonus: number
    totalAmount: number
    description: string[]
  }
}

interface TaxDocument {
  id: string
  year: number
  type: string
  totalAmount: number
  totalAmountFormatted: string
  status: string
  documentUrl?: string
  generatedAt?: string
}

interface AccountStatus {
  hasAccount: boolean
  accountId?: string
  status: string
  isComplete?: boolean
  chargesEnabled?: boolean
  payoutsEnabled?: boolean
  requirements?: string[]
  dashboardLink?: string
  onboardingLink?: string
}

export default function PaymentsDashboard() {
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(true)
  const [accountStatus, setAccountStatus] = useState<AccountStatus | null>(null)
  const [balance, setBalance] = useState<Balance | null>(null)
  const [stats, setStats] = useState<Stats | null>(null)
  const [history, setHistory] = useState<PaymentHistoryItem[]>([])
  const [taxDocuments, setTaxDocuments] = useState<TaxDocument[]>([])
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    // Check for onboarding completion
    if (searchParams.get("onboarding") === "complete") {
      toast.success("Payment account setup complete!")
    }
    if (searchParams.get("refresh") === "true") {
      toast.info("Refreshing account status...")
    }

    loadData()
  }, [searchParams])

  async function loadData() {
    try {
      setLoading(true)

      // Load account status
      const accountRes = await fetch("/api/payments/connect")
      const accountData = await accountRes.json()
      if (accountData.success) {
        setAccountStatus(accountData)
      }

      // Load balance and history
      const balanceRes = await fetch("/api/payments/balance?taxDocs=true")
      const balanceData = await balanceRes.json()
      if (balanceData.success) {
        setBalance(balanceData.balance)
        setStats(balanceData.stats)
        setHistory(balanceData.history || [])
        setTaxDocuments(balanceData.taxDocuments || [])
      }
    } catch (error) {
      console.error("Failed to load payment data:", error)
      toast.error("Failed to load payment data")
    } finally {
      setLoading(false)
    }
  }

  async function handleSetupAccount() {
    try {
      setRefreshing(true)
      const res = await fetch("/api/payments/connect", { method: "POST" })
      const data = await res.json()

      if (data.success && data.onboardingUrl) {
        window.location.href = data.onboardingUrl
      } else {
        toast.error(data.error || "Failed to setup account")
      }
    } catch (error) {
      toast.error("Failed to setup payment account")
    } finally {
      setRefreshing(false)
    }
  }

  async function handleRefresh() {
    setRefreshing(true)
    await loadData()
    setRefreshing(false)
    toast.success("Data refreshed")
  }

  function getStatusBadge(status: string) {
    switch (status.toUpperCase()) {
      case "COMPLETED":
        return <Badge className="bg-green-500/20 text-green-400">Completed</Badge>
      case "PENDING":
        return <Badge className="bg-yellow-500/20 text-yellow-400">Pending</Badge>
      case "PROCESSING":
        return <Badge className="bg-blue-500/20 text-blue-400">Processing</Badge>
      case "FAILED":
        return <Badge className="bg-red-500/20 text-red-400">Failed</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-cyan-500" />
      </div>
    )
  }

  return (
    <div className="container max-w-6xl mx-auto py-8 px-4 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Payments</h1>
          <p className="text-slate-400">Manage your earnings and payment settings</p>
        </div>
        <Button
          variant="outline"
          onClick={handleRefresh}
          disabled={refreshing}
          className="border-slate-700"
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      {/* Account Setup Banner */}
      {!accountStatus?.hasAccount && (
        <Card className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-cyan-500/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-cyan-500/20 rounded-lg">
                  <CreditCard className="h-6 w-6 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Set Up Payment Account</h3>
                  <p className="text-slate-300">
                    Connect your bank account to receive fast, secure payments via Stripe
                  </p>
                </div>
              </div>
              <Button onClick={handleSetupAccount} disabled={refreshing} className="bg-cyan-600 hover:bg-cyan-700">
                {refreshing ? <Loader2 className="h-4 w-4 animate-spin" /> : "Get Started"}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Incomplete Account Banner */}
      {accountStatus?.hasAccount && !accountStatus?.isComplete && (
        <Card className="bg-yellow-500/10 border-yellow-500/30">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <AlertCircle className="h-6 w-6 text-yellow-400" />
                <div>
                  <h3 className="text-lg font-semibold text-white">Complete Account Setup</h3>
                  <p className="text-slate-300">
                    Your payment account setup is incomplete. Finish setup to receive payments.
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                onClick={() => accountStatus.onboardingLink && (window.location.href = accountStatus.onboardingLink)}
                className="border-yellow-500/50 text-yellow-400 hover:bg-yellow-500/10"
              >
                Continue Setup
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Wallet className="h-5 w-5 text-green-400" />
              <TrendingUp className="h-4 w-4 text-green-400" />
            </div>
            <p className="text-sm text-slate-400 mb-1">Available Balance</p>
            <p className="text-2xl font-bold text-white">
              {balance?.availableFormatted || "$0.00"}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Clock className="h-5 w-5 text-yellow-400" />
              <ArrowUpRight className="h-4 w-4 text-yellow-400" />
            </div>
            <p className="text-sm text-slate-400 mb-1">Pending</p>
            <p className="text-2xl font-bold text-white">
              {balance?.pendingFormatted || "$0.00"}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <Calendar className="h-5 w-5 text-cyan-400" />
              <span className="text-xs text-slate-500">YTD</span>
            </div>
            <p className="text-sm text-slate-400 mb-1">Year to Date</p>
            <p className="text-2xl font-bold text-white">
              {stats?.yearToDate.formatted || "$0.00"}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-slate-900 border-slate-800">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <CheckCircle2 className="h-5 w-5 text-blue-400" />
              <span className="text-xs text-slate-500">Total</span>
            </div>
            <p className="text-sm text-slate-400 mb-1">Total Earnings</p>
            <p className="text-2xl font-bold text-white">
              {stats?.totalEarningsFormatted || "$0.00"}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="history" className="space-y-4">
        <TabsList className="bg-slate-900 border border-slate-800">
          <TabsTrigger value="history">Payment History</TabsTrigger>
          <TabsTrigger value="tax">Tax Documents</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        {/* Payment History Tab */}
        <TabsContent value="history" className="space-y-4">
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white">Recent Payments</CardTitle>
              <CardDescription>Your payment history and breakdown</CardDescription>
            </CardHeader>
            <CardContent>
              {history.length === 0 ? (
                <div className="text-center py-12 text-slate-400">
                  <DollarSign className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No payments yet</p>
                  <p className="text-sm">Complete signings to start earning</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {history.map((payment) => (
                    <div
                      key={payment.id}
                      className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg hover:bg-slate-800 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className={`p-2 rounded-lg ${
                          payment.status === "COMPLETED"
                            ? "bg-green-500/20"
                            : payment.status === "PENDING"
                            ? "bg-yellow-500/20"
                            : "bg-slate-700"
                        }`}>
                          {payment.status === "COMPLETED" ? (
                            <ArrowDownRight className="h-5 w-5 text-green-400" />
                          ) : (
                            <Clock className="h-5 w-5 text-yellow-400" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-white">
                            Order #{payment.orderNumber}
                          </p>
                          <p className="text-sm text-slate-400">
                            {payment.status === "COMPLETED" && payment.completedAt
                              ? `Paid ${new Date(payment.completedAt).toLocaleDateString()}`
                              : `Scheduled for ${new Date(payment.scheduledFor).toLocaleDateString()}`}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-white">{payment.amountFormatted}</p>
                        {getStatusBadge(payment.status)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tax Documents Tab */}
        <TabsContent value="tax" className="space-y-4">
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white">Tax Documents</CardTitle>
              <CardDescription>
                1099-NEC forms are generated for earnings of $600 or more per year
              </CardDescription>
            </CardHeader>
            <CardContent>
              {taxDocuments.length === 0 ? (
                <div className="text-center py-12 text-slate-400">
                  <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No tax documents available</p>
                  <p className="text-sm">
                    Tax documents will appear here when you reach the $600 threshold
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {taxDocuments.map((doc) => (
                    <div
                      key={doc.id}
                      className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-blue-500/20 rounded-lg">
                          <FileText className="h-5 w-5 text-blue-400" />
                        </div>
                        <div>
                          <p className="font-medium text-white">
                            {doc.type} - {doc.year}
                          </p>
                          <p className="text-sm text-slate-400">
                            Total Earnings: {doc.totalAmountFormatted}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {getStatusBadge(doc.status)}
                        {doc.documentUrl && (
                          <Button variant="outline" size="sm" className="border-slate-700">
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-4">
          <Card className="bg-slate-900 border-slate-800">
            <CardHeader>
              <CardTitle className="text-white">Payment Settings</CardTitle>
              <CardDescription>Manage your payment account and preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Account Status */}
              <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-lg ${
                    accountStatus?.isComplete ? "bg-green-500/20" : "bg-yellow-500/20"
                  }`}>
                    {accountStatus?.isComplete ? (
                      <CheckCircle2 className="h-5 w-5 text-green-400" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-yellow-400" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-white">Account Status</p>
                    <p className="text-sm text-slate-400">
                      {accountStatus?.isComplete
                        ? "Your account is fully set up and ready to receive payments"
                        : "Complete your account setup to receive payments"}
                    </p>
                  </div>
                </div>
                {accountStatus?.isComplete ? (
                  <Badge className="bg-green-500/20 text-green-400">Active</Badge>
                ) : (
                  <Badge className="bg-yellow-500/20 text-yellow-400">Incomplete</Badge>
                )}
              </div>

              {/* Stripe Dashboard Link */}
              {accountStatus?.dashboardLink && (
                <div className="flex items-center justify-between p-4 bg-slate-800/50 rounded-lg">
                  <div>
                    <p className="font-medium text-white">Stripe Dashboard</p>
                    <p className="text-sm text-slate-400">
                      View detailed payment history and manage your payout settings
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => window.open(accountStatus.dashboardLink, "_blank")}
                    className="border-slate-700"
                  >
                    Open Dashboard
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              )}

              {/* Payment Speed Info */}
              <div className="p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-lg">
                <h4 className="font-medium text-white mb-2">Payment Schedule</h4>
                <p className="text-sm text-slate-300">
                  Payments are processed 2-7 days after signing completion, depending on title
                  company payment terms. You&apos;ll receive notifications when payments are initiated.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

