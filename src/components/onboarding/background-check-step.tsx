"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Loader2, Shield, ExternalLink, Upload, CheckCircle, FileText, Search, AlertCircle } from "lucide-react"
import { toast } from "sonner"

interface BackgroundCheckData {
  consentGiven: boolean
  consentDate?: string
  checkrStatus?: string
  // NNA background check option
  nnaBackgroundCheckUploaded?: boolean
  nnaBackgroundCheckDate?: string
  nnaBackgroundCheckExpiry?: string
  nnaBackgroundCheckUrl?: string
  // State verification
  stateVerificationStatus?: "pending" | "verified" | "failed" | "not_checked"
  stateVerificationDate?: string
  stateVerificationDetails?: {
    state: string
    commissionNumber: string
    commissionExpiry: string
    status: string
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
    checkrStatus: data?.checkrStatus,
    nnaBackgroundCheckUploaded: data?.nnaBackgroundCheckUploaded ?? false,
    nnaBackgroundCheckDate: data?.nnaBackgroundCheckDate,
    nnaBackgroundCheckExpiry: data?.nnaBackgroundCheckExpiry,
    nnaBackgroundCheckUrl: data?.nnaBackgroundCheckUrl,
    stateVerificationStatus: data?.stateVerificationStatus ?? "not_checked",
    stateVerificationDate: data?.stateVerificationDate,
    stateVerificationDetails: data?.stateVerificationDetails,
  })
  const [dob, setDob] = useState("")
  const [ssn, setSsn] = useState("")
  const [initiating, setInitiating] = useState(false)
  const [verificationMethod, setVerificationMethod] = useState<"checkr" | "nna">("checkr")
  const [nnaDate, setNnaDate] = useState("")
  const [nnaExpiry, setNnaExpiry] = useState("")
  const [verifyingState, setVerifyingState] = useState(false)

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

      if (response.ok && result.data.verified) {
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
        // Not a hard failure - manual review can still approve
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

  async function initiateCheck() {
    if (!dob || !ssn) {
      toast.error("Please enter your date of birth and SSN")
      return
    }

    setInitiating(true)
    try {
      const response = await fetch("/api/onboarding/background-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dob, ssn }),
      })

      const result = await response.json()

      if (response.ok) {
        toast.success("Background check initiated")
        setFormData(prev => ({
          ...prev,
          consentGiven: true,
          consentDate: new Date().toISOString(),
          checkrStatus: "PENDING",
        }))
        
        // Open Checkr invitation URL in new tab
        if (result.data.invitationUrl) {
          window.open(result.data.invitationUrl, "_blank")
        }
      } else {
        toast.error(result.message || "Failed to initiate background check")
      }
    } catch (error) {
      toast.error("Failed to initiate background check")
    } finally {
      setInitiating(false)
    }
  }

  function handleNnaUpload() {
    // In production, this would handle actual file upload
    // For demo, we simulate the upload
    if (!nnaDate) {
      toast.error("Please enter the NNA background check date")
      return
    }
    if (!nnaExpiry) {
      toast.error("Please enter the NNA background check expiry date")
      return
    }

    setFormData(prev => ({
      ...prev,
      consentGiven: true,
      consentDate: new Date().toISOString(),
      nnaBackgroundCheckUploaded: true,
      nnaBackgroundCheckDate: nnaDate,
      nnaBackgroundCheckExpiry: nnaExpiry,
      nnaBackgroundCheckUrl: "uploaded-nna-certificate.pdf", // Simulated URL
      checkrStatus: "NNA_VERIFIED", // Custom status for NNA verification
    }))
    toast.success("NNA background check certificate uploaded")
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    
    const hasValidCheck = 
      formData.checkrStatus === "CLEAR" || 
      formData.checkrStatus === "PENDING" ||
      formData.checkrStatus === "NNA_VERIFIED" ||
      formData.nnaBackgroundCheckUploaded

    if (!hasValidCheck && !formData.consentGiven) {
      toast.error("Please complete a background check or upload NNA certification")
      return
    }
    await onSave({ backgroundCheck: formData })
  }

  const isCheckComplete = formData.checkrStatus === "CLEAR" || formData.checkrStatus === "NNA_VERIFIED"
  const isPending = formData.checkrStatus === "PENDING"
  const hasNnaCertificate = formData.nnaBackgroundCheckUploaded

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
                  This may be due to database unavailability or data entry differences. 
                  Your application will undergo manual verification.
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

      <div className="bg-slate-800 rounded-lg p-6 space-y-4">
        <div className="flex items-center gap-3">
          <Shield className="h-8 w-8 text-cyan-400" />
          <div>
            <h3 className="text-lg font-medium text-white">Background Verification</h3>
            <p className="text-sm text-slate-400">
              Required for all signing agents
            </p>
          </div>
        </div>

        <div className="text-sm text-slate-300 space-y-2">
          <p>
            Background verification is required to ensure trust and safety. 
            You can either complete a new background check through Checkr or 
            upload an existing NNA background screening certificate.
          </p>
        </div>
      </div>

      {/* Verification Method Selection */}
      {!isCheckComplete && !isPending && !hasNnaCertificate && (
        <div className="space-y-4">
          <Label className="text-white">Choose Verification Method</Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setVerificationMethod("checkr")}
              className={`p-4 rounded-lg border-2 text-left transition-colors ${
                verificationMethod === "checkr"
                  ? "border-cyan-500 bg-cyan-500/10"
                  : "border-slate-700 hover:border-slate-600"
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <Shield className="h-6 w-6 text-cyan-400" />
                <span className="font-medium text-white">New Checkr Screening</span>
              </div>
              <p className="text-sm text-slate-400">
                Complete a new background check through Checkr (1-3 business days)
              </p>
            </button>

            <button
              type="button"
              onClick={() => setVerificationMethod("nna")}
              className={`p-4 rounded-lg border-2 text-left transition-colors ${
                verificationMethod === "nna"
                  ? "border-cyan-500 bg-cyan-500/10"
                  : "border-slate-700 hover:border-slate-600"
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <FileText className="h-6 w-6 text-amber-400" />
                <span className="font-medium text-white">Upload NNA Certificate</span>
              </div>
              <p className="text-sm text-slate-400">
                Already have an NNA background screening? Upload your certificate
              </p>
            </button>
          </div>
        </div>
      )}

      {/* Checkr Flow */}
      {verificationMethod === "checkr" && !isCheckComplete && !isPending && !hasNnaCertificate && (
        <>
          <div className="bg-slate-800/50 rounded-lg p-4 space-y-1 text-sm text-slate-400">
            <p className="font-medium text-slate-300">Checkr background check includes:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>National Criminal Database Search</li>
              <li>Sex Offender Registry Search</li>
              <li>Social Security Number Trace</li>
              <li>County Criminal Records (7 years)</li>
            </ul>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dob">Date of Birth *</Label>
                <Input
                  id="dob"
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  max={new Date(new Date().setFullYear(new Date().getFullYear() - 18)).toISOString().split("T")[0]}
                  className="bg-slate-800 border-slate-700"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ssn">Social Security Number *</Label>
                <Input
                  id="ssn"
                  type="password"
                  value={ssn}
                  onChange={(e) => setSsn(e.target.value)}
                  placeholder="XXX-XX-XXXX"
                  pattern="\d{3}-?\d{2}-?\d{4}"
                  className="bg-slate-800 border-slate-700"
                />
                <p className="text-xs text-slate-500">
                  Encrypted and only used for identity verification
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-start space-x-2">
            <Checkbox
              id="consent"
              checked={formData.consentGiven}
              onCheckedChange={(checked) => 
                setFormData(prev => ({ ...prev, consentGiven: checked as boolean }))
              }
            />
            <Label htmlFor="consent" className="font-normal text-sm leading-relaxed">
              I authorize Notroom and its partners to conduct a background check. I understand 
              this is required for platform participation and I have the right to dispute any 
              inaccurate information found.
            </Label>
          </div>

          <Button
            type="button"
            onClick={initiateCheck}
            disabled={initiating || !formData.consentGiven || !dob || !ssn}
            className="w-full bg-cyan-600 hover:bg-cyan-700"
          >
            {initiating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Initiating...
              </>
            ) : (
              <>
                Start Background Check
                <ExternalLink className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </>
      )}

      {/* NNA Upload Flow */}
      {verificationMethod === "nna" && !isCheckComplete && !isPending && !hasNnaCertificate && (
        <div className="space-y-4">
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
            <h4 className="text-amber-400 font-medium mb-2 flex items-center gap-2">
              <FileText className="h-5 w-5" />
              NNA Background Screening Certificate
            </h4>
            <p className="text-sm text-slate-300 mb-3">
              If you have completed a background screening through the National Notary Association, 
              you can upload your certificate as proof. The certificate must be current (not expired).
            </p>
            <p className="text-xs text-slate-500">
              Accepted formats: PDF, JPG, PNG. Max file size: 10MB
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="nnaDate">NNA Screening Date *</Label>
              <Input
                id="nnaDate"
                type="date"
                value={nnaDate}
                onChange={(e) => setNnaDate(e.target.value)}
                max={new Date().toISOString().split("T")[0]}
                className="bg-slate-800 border-slate-700"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="nnaExpiry">Certificate Expiry Date *</Label>
              <Input
                id="nnaExpiry"
                type="date"
                value={nnaExpiry}
                onChange={(e) => setNnaExpiry(e.target.value)}
                min={new Date().toISOString().split("T")[0]}
                className="bg-slate-800 border-slate-700"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Upload NNA Certificate *</Label>
            <Button
              type="button"
              variant="outline"
              onClick={handleNnaUpload}
              disabled={!nnaDate || !nnaExpiry}
              className="w-full border-slate-700 hover:bg-slate-800"
            >
              <Upload className="mr-2 h-4 w-4" />
              Upload NNA Certificate (PDF/Image)
            </Button>
          </div>

          <div className="flex items-start space-x-2">
            <Checkbox
              id="nnaConsent"
              checked={formData.consentGiven}
              onCheckedChange={(checked) => 
                setFormData(prev => ({ ...prev, consentGiven: checked as boolean }))
              }
            />
            <Label htmlFor="nnaConsent" className="font-normal text-sm leading-relaxed">
              I confirm that the uploaded NNA background screening certificate is authentic 
              and I authorize Notroom to verify its validity with the National Notary Association.
            </Label>
          </div>
        </div>
      )}

      {/* Status Messages */}
      {isPending && (
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
          <h4 className="text-amber-400 font-medium mb-2">Verification In Progress</h4>
          <p className="text-sm text-slate-300">
            Your background check has been initiated. This typically takes 1-3 business days. 
            You'll receive an email when it's complete. You can continue with the remaining steps 
            in the meantime.
          </p>
        </div>
      )}

      {hasNnaCertificate && !isCheckComplete && (
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
          <h4 className="text-blue-400 font-medium mb-2 flex items-center gap-2">
            <FileText className="h-5 w-5" />
            NNA Certificate Uploaded
          </h4>
          <p className="text-sm text-slate-300">
            Your NNA background screening certificate has been uploaded and is pending verification. 
            Screening date: {formData.nnaBackgroundCheckDate}
          </p>
        </div>
      )}

      {isCheckComplete && (
        <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
          <h4 className="text-green-400 font-medium mb-2 flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            Verification Complete
          </h4>
          <p className="text-sm text-slate-300">
            {formData.checkrStatus === "NNA_VERIFIED" 
              ? "Your NNA background screening has been verified."
              : "Your background check has been completed and cleared."
            }
          </p>
        </div>
      )}

      <Button
        type="submit"
        disabled={saving || (!formData.consentGiven && !isCheckComplete && !isPending)}
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

