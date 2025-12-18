"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { 
  Loader2, 
  Shield, 
  ExternalLink, 
  Upload, 
  CheckCircle, 
  FileText, 
  Search, 
  AlertCircle,
  CreditCard,
  Clock,
  BadgeCheck,
  Info
} from "lucide-react"
import { toast } from "sonner"
import {
  getActiveProviders,
  getFreeProviders,
  getPaidProviders,
  getProviderById,
  formatPrice,
  getMarkupPercentage,
  type BackgroundCheckProvider,
} from "@/lib/background-check-providers"

interface BackgroundCheckData {
  consentGiven: boolean
  consentDate?: string
  provider?: string
  providerName?: string
  providerCheckId?: string
  status?: string
  invitationUrl?: string
  // NNA/Upload option
  uploadedCertificateUrl?: string
  uploadedCertificateDate?: string
  uploadedCertificateExpiry?: string
  uploadedCertificateType?: "nna" | "signing_service"
  // State verification
  stateVerificationStatus?: "pending" | "verified" | "failed" | "not_checked"
  stateVerificationDate?: string
  stateVerificationDetails?: {
    state: string
    commissionNumber: string
    commissionExpiry: string
    status: string
  }
  // Payment
  payment?: {
    amount: number
    paidAt: string
    stripeSessionId: string
  }
}

interface Props {
  data?: BackgroundCheckData
  onSave: (data: { backgroundCheck: BackgroundCheckData }) => Promise<boolean>
  saving: boolean
  commissionState?: string
  commissionNumber?: string
}

export function BackgroundCheckStep({ data, onSave, saving, commissionState, commissionNumber }: Props) {
  const [formData, setFormData] = useState<BackgroundCheckData>({
    consentGiven: data?.consentGiven ?? false,
    consentDate: data?.consentDate,
    provider: data?.provider,
    providerName: data?.providerName,
    providerCheckId: data?.providerCheckId,
    status: data?.status,
    invitationUrl: data?.invitationUrl,
    uploadedCertificateUrl: data?.uploadedCertificateUrl,
    uploadedCertificateDate: data?.uploadedCertificateDate,
    uploadedCertificateExpiry: data?.uploadedCertificateExpiry,
    uploadedCertificateType: data?.uploadedCertificateType,
    stateVerificationStatus: data?.stateVerificationStatus ?? "not_checked",
    stateVerificationDate: data?.stateVerificationDate,
    stateVerificationDetails: data?.stateVerificationDetails,
    payment: data?.payment,
  })
  
  const [selectedProviderId, setSelectedProviderId] = useState<string | null>(null)
  const [verifyingState, setVerifyingState] = useState(false)
  const [processing, setProcessing] = useState(false)
  const [uploadDate, setUploadDate] = useState("")
  const [uploadExpiry, setUploadExpiry] = useState("")

  // Get all providers
  const freeProviders = getFreeProviders()
  const paidProviders = getPaidProviders()
  const selectedProvider = selectedProviderId ? getProviderById(selectedProviderId) : null

  // Auto-verify state database when commission info is available
  useEffect(() => {
    if (commissionState && commissionNumber && formData.stateVerificationStatus === "not_checked") {
      verifyWithStateDatabase()
    }
  }, [commissionState, commissionNumber])

  async function verifyWithStateDatabase() {
    if (!commissionState || !commissionNumber) {
      return
    }

    setVerifyingState(true)
    try {
      const response = await fetch("/api/onboarding/verify-commission", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          state: commissionState,
          commissionNumber: commissionNumber,
        }),
      })

      const result = await response.json()

      if (response.ok && result.data?.verified) {
        setFormData(prev => ({
          ...prev,
          stateVerificationStatus: "verified",
          stateVerificationDate: new Date().toISOString(),
          stateVerificationDetails: result.data.details,
        }))
        toast.success(`Commission verified with ${commissionState} state database`)
      } else {
        setFormData(prev => ({
          ...prev,
          stateVerificationStatus: "failed",
          stateVerificationDate: new Date().toISOString(),
        }))
        toast.info("Could not automatically verify commission - manual review required")
      }
    } catch (error) {
      setFormData(prev => ({
        ...prev,
        stateVerificationStatus: "failed",
      }))
    } finally {
      setVerifyingState(false)
    }
  }

  async function handlePaidProviderSelect(providerId: string) {
    setSelectedProviderId(providerId)
  }

  async function initiatePaymentAndCheck() {
    if (!selectedProviderId) {
      toast.error("Please select a background check provider")
      return
    }

    const provider = getProviderById(selectedProviderId)
    if (!provider) {
      toast.error("Invalid provider selected")
      return
    }

    setProcessing(true)
    try {
      const response = await fetch("/api/background-check/initiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          providerId: selectedProviderId,
        }),
      })

      const result = await response.json()

      if (result.success) {
        if (result.requiresPayment && result.checkoutUrl) {
          // Redirect to Stripe Checkout
          toast.success("Redirecting to payment...")
          window.location.href = result.checkoutUrl
        } else {
          // Free provider - proceed directly
          toast.success("Provider selected successfully")
        }
      } else {
        toast.error(result.error || "Failed to initiate background check")
      }
    } catch (error) {
      toast.error("Failed to process request")
    } finally {
      setProcessing(false)
    }
  }

  function handleCertificateUpload(type: "nna" | "signing_service") {
    if (!uploadDate) {
      toast.error("Please enter the certificate date")
      return
    }
    if (!uploadExpiry) {
      toast.error("Please enter the certificate expiry date")
      return
    }

    // Validate expiry is in the future
    if (new Date(uploadExpiry) <= new Date()) {
      toast.error("Certificate must not be expired")
      return
    }

    setFormData(prev => ({
      ...prev,
      consentGiven: true,
      consentDate: new Date().toISOString(),
      uploadedCertificateType: type,
      uploadedCertificateDate: uploadDate,
      uploadedCertificateExpiry: uploadExpiry,
      uploadedCertificateUrl: `uploaded-${type}-certificate.pdf`, // Simulated URL
      status: "PENDING_REVIEW",
      provider: type === "nna" ? "nna_upload" : "existing_signing_service",
    }))
    toast.success("Certificate uploaded successfully - pending review")
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    
    const hasValidCheck = 
      formData.status === "CLEAR" || 
      formData.status === "PENDING" ||
      formData.status === "PENDING_REVIEW" ||
      formData.uploadedCertificateUrl

    if (!hasValidCheck && !formData.consentGiven) {
      toast.error("Please complete a background check or upload a certificate")
      return
    }
    await onSave({ backgroundCheck: formData })
  }

  const isCheckComplete = formData.status === "CLEAR"
  const isPending = formData.status === "PENDING" || formData.status === "PENDING_REVIEW"
  const hasCertificate = !!formData.uploadedCertificateUrl

  // Check URL params for payment result
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const payment = params.get("payment")
    const provider = params.get("provider")
    
    if (payment === "success" && provider) {
      toast.success("Payment successful! Background check initiated.")
      // Clean URL
      window.history.replaceState({}, "", window.location.pathname + "?step=5")
    } else if (payment === "cancelled") {
      toast.info("Payment cancelled")
      window.history.replaceState({}, "", window.location.pathname + "?step=5")
    }
  }, [])

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* State Database Verification Section */}
      {commissionState && commissionNumber && (
        <div className="bg-slate-800 rounded-lg p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Search className="h-6 w-6 text-blue-400" />
              <div>
                <h4 className="font-medium text-white">State Database Verification</h4>
                <p className="text-sm text-slate-400">
                  Automatic check against {commissionState} notary database
                </p>
              </div>
            </div>
            {verifyingState && (
              <Loader2 className="h-5 w-5 animate-spin text-blue-400" />
            )}
          </div>

          {formData.stateVerificationStatus === "verified" && (
            <div className="flex items-center gap-2 text-green-400 bg-green-500/10 rounded-lg p-3">
              <CheckCircle className="h-5 w-5" />
              <span className="text-sm">
                Commission #{commissionNumber} verified with {commissionState} Secretary of State
              </span>
            </div>
          )}

          {formData.stateVerificationStatus === "failed" && (
            <div className="flex items-start gap-2 text-amber-400 bg-amber-500/10 rounded-lg p-3">
              <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
              <div className="text-sm">
                <p>Could not automatically verify with state database.</p>
                <p className="text-slate-400 mt-1">
                  This may be due to database unavailability. Your application will undergo manual verification.
                </p>
              </div>
            </div>
          )}

          {formData.stateVerificationStatus === "not_checked" && !verifyingState && (
            <Button
              type="button"
              variant="outline"
              onClick={verifyWithStateDatabase}
              className="border-blue-500/50 text-blue-400 hover:bg-blue-500/10"
            >
              <Search className="mr-2 h-4 w-4" />
              Verify with State Database
            </Button>
          )}
        </div>
      )}

      {/* Header */}
      <div className="bg-slate-800 rounded-lg p-6 space-y-4">
        <div className="flex items-center gap-3">
          <Shield className="h-8 w-8 text-cyan-400" />
          <div>
            <h3 className="text-lg font-medium text-white">Background Verification</h3>
            <p className="text-sm text-slate-400">
              Required for all signing agents in the Notroom Elite Network
            </p>
          </div>
        </div>
      </div>

      {/* Show current status if check is in progress or complete */}
      {(isPending || isCheckComplete || hasCertificate) && (
        <div className={`rounded-lg p-4 ${
          isCheckComplete 
            ? "bg-green-500/10 border border-green-500/30" 
            : "bg-amber-500/10 border border-amber-500/30"
        }`}>
          <h4 className={`font-medium mb-2 flex items-center gap-2 ${
            isCheckComplete ? "text-green-400" : "text-amber-400"
          }`}>
            {isCheckComplete ? (
              <><CheckCircle className="h-5 w-5" /> Verification Complete</>
            ) : (
              <><Clock className="h-5 w-5" /> Verification In Progress</>
            )}
          </h4>
          <p className="text-sm text-slate-300">
            {isCheckComplete 
              ? "Your background check has been completed and cleared."
              : formData.provider
                ? `Background check initiated with ${formData.providerName || formData.provider}. This typically takes 1-3 business days.`
                : "Your uploaded certificate is pending review."
            }
          </p>
          {formData.invitationUrl && formData.status === "PENDING" && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-3"
              onClick={() => window.open(formData.invitationUrl, "_blank")}
            >
              Complete Verification
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      )}

      {/* Provider Selection - only show if no check is in progress */}
      {!isPending && !isCheckComplete && !hasCertificate && (
        <>
          {/* Free Options */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-white text-lg">Free Options</Label>
              <span className="text-xs text-slate-500">Upload existing verification</span>
            </div>
            
            <div className="grid gap-3">
              {freeProviders.map(provider => (
                <button
                  key={provider.id}
                  type="button"
                  onClick={() => setSelectedProviderId(provider.id)}
                  className={`p-4 rounded-lg border-2 text-left transition-all ${
                    selectedProviderId === provider.id
                      ? "border-green-500 bg-green-500/10"
                      : "border-slate-700 hover:border-slate-600"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <FileText className="h-6 w-6 text-green-400 shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-white">{provider.name}</span>
                        <span className="text-green-400 font-bold">FREE</span>
                      </div>
                      <p className="text-sm text-slate-400 mb-2">{provider.description}</p>
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <Clock className="h-3 w-3" />
                        {provider.turnaround}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Upload Form for Free Options */}
          {selectedProviderId && getFreeProviders().some(p => p.id === selectedProviderId) && (
            <div className="space-y-4 bg-slate-800/50 rounded-lg p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="uploadDate">Certificate Date *</Label>
                  <Input
                    id="uploadDate"
                    type="date"
                    value={uploadDate}
                    onChange={(e) => setUploadDate(e.target.value)}
                    max={new Date().toISOString().split("T")[0]}
                    className="bg-slate-800 border-slate-700"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="uploadExpiry">Expiry Date *</Label>
                  <Input
                    id="uploadExpiry"
                    type="date"
                    value={uploadExpiry}
                    onChange={(e) => setUploadExpiry(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    className="bg-slate-800 border-slate-700"
                  />
                </div>
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="uploadConsent"
                  checked={formData.consentGiven}
                  onCheckedChange={(checked) => 
                    setFormData(prev => ({ ...prev, consentGiven: checked as boolean }))
                  }
                />
                <Label htmlFor="uploadConsent" className="font-normal text-sm leading-relaxed">
                  I confirm that the uploaded certificate is authentic and I authorize Notroom to verify its validity.
                </Label>
              </div>

              <Button
                type="button"
                onClick={() => handleCertificateUpload(
                  selectedProviderId === "nna_upload" ? "nna" : "signing_service"
                )}
                disabled={!uploadDate || !uploadExpiry || !formData.consentGiven}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                <Upload className="mr-2 h-4 w-4" />
                Upload Certificate
              </Button>
            </div>
          )}

          {/* Paid Options */}
          <div className="space-y-4 pt-4">
            <div className="flex items-center justify-between">
              <Label className="text-white text-lg">New Background Check</Label>
              <div className="flex items-center gap-1 text-xs text-slate-500">
                <Info className="h-3 w-3" />
                {getMarkupPercentage()}% service fee included
              </div>
            </div>
            
            <div className="grid gap-3">
              {paidProviders.map(provider => (
                <button
                  key={provider.id}
                  type="button"
                  onClick={() => handlePaidProviderSelect(provider.id)}
                  className={`p-4 rounded-lg border-2 text-left transition-all ${
                    selectedProviderId === provider.id
                      ? "border-cyan-500 bg-cyan-500/10"
                      : "border-slate-700 hover:border-slate-600"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <BadgeCheck className="h-6 w-6 text-cyan-400 shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className="font-medium text-white">{provider.name}</span>
                          <span className="text-xs bg-cyan-500/20 text-cyan-400 px-2 py-0.5 rounded">
                            {provider.turnaround}
                          </span>
                        </div>
                        <p className="text-sm text-slate-400 mb-2">{provider.description}</p>
                        <div className="flex flex-wrap gap-1">
                          {provider.checksIncluded.slice(0, 4).map(check => (
                            <span 
                              key={check} 
                              className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded"
                            >
                              {check}
                            </span>
                          ))}
                          {provider.checksIncluded.length > 4 && (
                            <span className="text-xs text-slate-500">
                              +{provider.checksIncluded.length - 4} more
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-right ml-4 shrink-0">
                      <div className="text-xl font-bold text-white">
                        {formatPrice(provider.finalCost)}
                      </div>
                      <div className="text-xs text-slate-500 line-through">
                        {formatPrice(provider.baseCost)}
                      </div>
                      <div className="text-xs text-cyan-400">
                        Save {formatPrice(provider.baseCost - provider.finalCost).replace("-", "")}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Payment Button for Paid Providers */}
          {selectedProviderId && getPaidProviders().some(p => p.id === selectedProviderId) && selectedProvider && (
            <div className="space-y-4 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-lg p-4 border border-cyan-500/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">{selectedProvider.name}</p>
                  <p className="text-sm text-slate-400">{selectedProvider.turnaround}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-white">{formatPrice(selectedProvider.finalCost)}</p>
                  <p className="text-xs text-slate-400">
                    includes {getMarkupPercentage()}% service fee
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="paidConsent"
                  checked={formData.consentGiven}
                  onCheckedChange={(checked) => 
                    setFormData(prev => ({ ...prev, consentGiven: checked as boolean }))
                  }
                />
                <Label htmlFor="paidConsent" className="font-normal text-sm leading-relaxed">
                  I authorize Notroom and {selectedProvider.name} to conduct a background check. 
                  I understand this is required for platform participation and I have the right 
                  to dispute any inaccurate information found.
                </Label>
              </div>

              <Button
                type="button"
                onClick={initiatePaymentAndCheck}
                disabled={processing || !formData.consentGiven}
                className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-semibold py-3"
              >
                {processing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <CreditCard className="mr-2 h-4 w-4" />
                    Pay {formatPrice(selectedProvider.finalCost)} & Start Check
                  </>
                )}
              </Button>

              <p className="text-xs text-center text-slate-500">
                Secure payment powered by Stripe. You&apos;ll be redirected to complete payment.
              </p>
            </div>
          )}
        </>
      )}

      {/* Save & Continue Button */}
      <Button
        type="submit"
        disabled={saving || (!formData.consentGiven && !isCheckComplete && !isPending && !hasCertificate)}
        className="w-full bg-cyan-600 hover:bg-cyan-700"
      >
        {saving ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Saving...
          </>
        ) : (
          "Save & Continue"
        )}
      </Button>
    </form>
  )
}
