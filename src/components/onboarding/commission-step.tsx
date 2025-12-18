"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Loader2, CheckCircle, AlertCircle, Upload } from "lucide-react"
import { toast } from "sonner"

interface CommissionData {
  commissionState: string
  commissionNumber: string
  commissionExpiry: string
  certificateUrl?: string
  isRONAuthorized: boolean
  ronProvider?: string
}

interface Props {
  data?: CommissionData
  onSave: (data: { commission: CommissionData }) => Promise<boolean>
  saving: boolean
}

const US_STATES = [
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
  "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
  "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
  "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
  "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY", "DC"
]

const RON_PROVIDERS = [
  "Proof",
  "Notarize",
  "NotaryCam",
  "DocVerify",
  "Pavaso",
  "SigningRoom",
  "Other"
]

export function CommissionStep({ data, onSave, saving }: Props) {
  const [formData, setFormData] = useState<CommissionData>({
    commissionState: data?.commissionState ?? "",
    commissionNumber: data?.commissionNumber ?? "",
    commissionExpiry: data?.commissionExpiry ?? "",
    certificateUrl: data?.certificateUrl ?? "",
    isRONAuthorized: data?.isRONAuthorized ?? false,
    ronProvider: data?.ronProvider ?? "",
  })
  const [verifying, setVerifying] = useState(false)
  const [verified, setVerified] = useState<boolean | null>(null)

  function updateField<K extends keyof CommissionData>(field: K, value: CommissionData[K]) {
    setFormData(prev => ({ ...prev, [field]: value }))
    setVerified(null) // Reset verification on change
  }

  async function verifyCommission() {
    if (!formData.commissionState || !formData.commissionNumber) {
      toast.error("Please enter state and commission number first")
      return
    }

    setVerifying(true)
    try {
      const response = await fetch("/api/onboarding/verify-commission", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          state: formData.commissionState,
          commissionNumber: formData.commissionNumber,
        }),
      })
      const result = await response.json()

      if (result.data.verification.status === "VERIFIED") {
        setVerified(true)
        toast.success("Commission verified!")
      } else if (result.data.verification.status === "PENDING") {
        setVerified(null)
        toast.info("Commission will be verified manually")
      } else {
        setVerified(false)
        toast.error("Commission verification failed")
      }
    } catch (error) {
      toast.error("Verification failed")
    } finally {
      setVerifying(false)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    await onSave({ commission: formData })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="commissionState">Commission State *</Label>
          <select
            id="commissionState"
            value={formData.commissionState}
            onChange={(e) => updateField("commissionState", e.target.value)}
            required
            className="flex h-10 w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white"
          >
            <option value="">Select State</option>
            {US_STATES.map((state) => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="commissionNumber">Commission Number *</Label>
          <div className="flex gap-2">
            <Input
              id="commissionNumber"
              value={formData.commissionNumber}
              onChange={(e) => updateField("commissionNumber", e.target.value)}
              placeholder="123456789"
              required
              className="bg-slate-800 border-slate-700"
            />
            <Button
              type="button"
              variant="outline"
              onClick={verifyCommission}
              disabled={verifying}
              className="shrink-0 border-slate-700"
            >
              {verifying ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : verified === true ? (
                <CheckCircle className="h-4 w-4 text-green-500" />
              ) : verified === false ? (
                <AlertCircle className="h-4 w-4 text-red-500" />
              ) : (
                "Verify"
              )}
            </Button>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="commissionExpiry">Commission Expiration Date *</Label>
        <Input
          id="commissionExpiry"
          type="date"
          value={formData.commissionExpiry}
          onChange={(e) => updateField("commissionExpiry", e.target.value)}
          required
          min={new Date().toISOString().split("T")[0]}
          className="bg-slate-800 border-slate-700"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="certificate">Commission Certificate</Label>
        <div className="flex items-center gap-4">
          <Button
            type="button"
            variant="outline"
            className="border-slate-700"
          >
            <Upload className="mr-2 h-4 w-4" />
            Upload Certificate
          </Button>
          {formData.certificateUrl && (
            <span className="text-sm text-green-500">✓ Uploaded</span>
          )}
        </div>
        <p className="text-xs text-slate-500">
          Upload a scanned copy of your notary commission certificate (PDF, JPG, PNG)
        </p>
      </div>

      <div className="border-t border-slate-800 pt-6">
        <div className="flex items-center space-x-2 mb-4">
          <Checkbox
            id="ronAuthorized"
            checked={formData.isRONAuthorized}
            onCheckedChange={(checked) => updateField("isRONAuthorized", checked as boolean)}
          />
          <Label htmlFor="ronAuthorized" className="font-normal">
            I am authorized to perform Remote Online Notarization (RON)
          </Label>
        </div>

        {formData.isRONAuthorized && (
          <div className="space-y-2 ml-6">
            <Label htmlFor="ronProvider">RON Platform *</Label>
            <select
              id="ronProvider"
              value={formData.ronProvider}
              onChange={(e) => updateField("ronProvider", e.target.value)}
              required={formData.isRONAuthorized}
              className="flex h-10 w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white"
            >
              <option value="">Select Platform</option>
              {RON_PROVIDERS.map((provider) => (
                <option key={provider} value={provider}>{provider}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      <Button
        type="submit"
        disabled={saving}
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


