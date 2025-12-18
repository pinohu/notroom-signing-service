"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { 
  Loader2, 
  Eye, 
  CheckCircle, 
  XCircle, 
  Clock,
  User,
  MapPin,
  Shield,
  Award
} from "lucide-react"

interface OnboardingApplication {
  id: string
  userId: string
  status: string
  currentStep: number
  completedSteps: number[]
  data: {
    basicInfo?: {
      firstName: string
      lastName: string
      email: string
      phone: string
      address: {
        city: string
        state: string
      }
    }
    commission?: {
      commissionState: string
      commissionNumber: string
      commissionExpiry: string
      isRONAuthorized: boolean
    }
    insurance?: {
      eoAmount: number
      eoCarrier: string
    }
    backgroundCheck?: {
      checkrStatus: string
    }
    specializations?: {
      loanTypes: string[]
      yearsExperience: number
    }
  }
  submittedAt: string
  user: {
    email: string
    name: string
  }
}

export default function AdminOnboardingPage() {
  const [applications, setApplications] = useState<OnboardingApplication[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedApp, setSelectedApp] = useState<OnboardingApplication | null>(null)
  const [processing, setProcessing] = useState(false)
  const [rejectionReason, setRejectionReason] = useState("")

  useEffect(() => {
    loadApplications()
  }, [])

  async function loadApplications() {
    try {
      const response = await fetch("/api/admin/onboarding")
      const result = await response.json()
      if (result.success) {
        setApplications(result.data.applications)
      }
    } catch (error) {
      toast.error("Failed to load applications")
    } finally {
      setLoading(false)
    }
  }

  async function approveApplication(id: string) {
    setProcessing(true)
    try {
      const response = await fetch(`/api/admin/onboarding/${id}/approve`, {
        method: "POST",
      })
      const result = await response.json()
      
      if (response.ok) {
        toast.success("Application approved!")
        setSelectedApp(null)
        loadApplications()
      } else {
        toast.error(result.message || "Failed to approve")
      }
    } catch (error) {
      toast.error("Failed to approve application")
    } finally {
      setProcessing(false)
    }
  }

  async function rejectApplication(id: string) {
    if (!rejectionReason.trim()) {
      toast.error("Please provide a rejection reason")
      return
    }
    
    setProcessing(true)
    try {
      const response = await fetch(`/api/admin/onboarding/${id}/reject`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reason: rejectionReason }),
      })
      const result = await response.json()
      
      if (response.ok) {
        toast.success("Application rejected")
        setSelectedApp(null)
        setRejectionReason("")
        loadApplications()
      } else {
        toast.error(result.message || "Failed to reject")
      }
    } catch (error) {
      toast.error("Failed to reject application")
    } finally {
      setProcessing(false)
    }
  }

  function getStatusBadge(status: string) {
    switch (status) {
      case "PENDING_REVIEW":
        return <Badge className="bg-amber-500/20 text-amber-400">Pending Review</Badge>
      case "PENDING_BACKGROUND_CHECK":
        return <Badge className="bg-blue-500/20 text-blue-400">Awaiting Background</Badge>
      case "PENDING_VERIFICATION":
        return <Badge className="bg-purple-500/20 text-purple-400">Needs Verification</Badge>
      case "APPROVED":
        return <Badge className="bg-green-500/20 text-green-400">Approved</Badge>
      case "REJECTED":
        return <Badge className="bg-red-500/20 text-red-400">Rejected</Badge>
      default:
        return <Badge className="bg-slate-500/20 text-slate-400">{status}</Badge>
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-cyan-500" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Notary Applications</h1>
          <p className="text-slate-400">Review and approve new notary applications</p>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline" className="border-amber-500/50 text-amber-400">
            {applications.filter(a => a.status === "PENDING_REVIEW").length} Pending
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Applications List */}
        <div className="lg:col-span-2 space-y-4">
          {applications.length === 0 ? (
            <Card className="bg-slate-900 border-slate-800">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Clock className="h-12 w-12 text-slate-600 mb-4" />
                <p className="text-slate-400">No pending applications</p>
              </CardContent>
            </Card>
          ) : (
            applications.map((app) => (
              <Card 
                key={app.id} 
                className={`bg-slate-900 border-slate-800 cursor-pointer transition-colors ${
                  selectedApp?.id === app.id ? "border-cyan-500" : "hover:border-slate-700"
                }`}
                onClick={() => setSelectedApp(app)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-slate-400" />
                      </div>
                      <div>
                        <h3 className="text-white font-medium">
                          {app.data.basicInfo?.firstName} {app.data.basicInfo?.lastName}
                        </h3>
                        <p className="text-sm text-slate-400">{app.data.basicInfo?.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-sm text-slate-400">
                          <MapPin className="h-3 w-3" />
                          {app.data.commission?.commissionState}
                        </div>
                        <p className="text-xs text-slate-500">
                          {new Date(app.submittedAt).toLocaleDateString()}
                        </p>
                      </div>
                      {getStatusBadge(app.status)}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Application Details */}
        <div className="lg:col-span-1">
          {selectedApp ? (
            <Card className="bg-slate-900 border-slate-800 sticky top-6">
              <CardHeader>
                <CardTitle className="text-white flex items-center justify-between">
                  Application Details
                  <Button variant="ghost" size="sm" onClick={() => setSelectedApp(null)}>
                    ×
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-slate-400" />
                    <span className="text-white">
                      {selectedApp.data.basicInfo?.firstName} {selectedApp.data.basicInfo?.lastName}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-slate-400" />
                    <span className="text-slate-300">
                      {selectedApp.data.basicInfo?.address?.city}, {selectedApp.data.basicInfo?.address?.state}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-slate-400" />
                    <span className="text-slate-300">
                      Commission: {selectedApp.data.commission?.commissionState} #{selectedApp.data.commission?.commissionNumber}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-slate-400" />
                    <span className="text-slate-300">
                      {selectedApp.data.specializations?.yearsExperience ?? 0} years experience
                    </span>
                  </div>
                </div>

                <div className="border-t border-slate-800 pt-4 space-y-2">
                  <h4 className="text-sm font-medium text-white">Checklist</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex items-center gap-2">
                      {selectedApp.completedSteps.includes(2) ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-500" />
                      )}
                      <span className="text-slate-300">Commission verified</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {selectedApp.completedSteps.includes(3) ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-500" />
                      )}
                      <span className="text-slate-300">
                        E&O: ${selectedApp.data.insurance?.eoAmount?.toLocaleString() ?? 0}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {selectedApp.data.backgroundCheck?.checkrStatus === "CLEAR" ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : selectedApp.data.backgroundCheck?.checkrStatus === "PENDING" ? (
                        <Clock className="h-4 w-4 text-amber-500" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-500" />
                      )}
                      <span className="text-slate-300">
                        Background: {selectedApp.data.backgroundCheck?.checkrStatus ?? "Not started"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {selectedApp.data.commission?.isRONAuthorized ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <XCircle className="h-4 w-4 text-slate-500" />
                      )}
                      <span className="text-slate-300">RON Authorized</span>
                    </div>
                  </div>
                </div>

                {selectedApp.status === "PENDING_REVIEW" && (
                  <div className="border-t border-slate-800 pt-4 space-y-3">
                    <Button
                      onClick={() => approveApplication(selectedApp.id)}
                      disabled={processing}
                      className="w-full bg-green-600 hover:bg-green-700"
                    >
                      {processing ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <>
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Approve
                        </>
                      )}
                    </Button>
                    
                    <div className="space-y-2">
                      <textarea
                        value={rejectionReason}
                        onChange={(e) => setRejectionReason(e.target.value)}
                        placeholder="Rejection reason (required)"
                        className="w-full p-2 bg-slate-800 border border-slate-700 rounded-md text-sm text-white"
                        rows={2}
                      />
                      <Button
                        onClick={() => rejectApplication(selectedApp.id)}
                        disabled={processing || !rejectionReason.trim()}
                        variant="outline"
                        className="w-full border-red-500/50 text-red-400 hover:bg-red-500/10"
                      >
                        <XCircle className="mr-2 h-4 w-4" />
                        Reject
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card className="bg-slate-900 border-slate-800">
              <CardContent className="flex flex-col items-center justify-center py-12">
                <Eye className="h-8 w-8 text-slate-600 mb-2" />
                <p className="text-slate-400 text-sm">Select an application to view details</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}


