"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Loader2, Shield, ExternalLink } from "lucide-react"
import { toast } from "sonner"

interface BackgroundCheckData {
  consentGiven: boolean
  consentDate?: string
  checkrStatus?: string
}

interface Props {
  data?: BackgroundCheckData
  onSave: (data: { backgroundCheck: BackgroundCheckData }) => Promise<boolean>
  saving: boolean
}

export function BackgroundCheckStep({ data, onSave, saving }: Props) {
  const [formData, setFormData] = useState<BackgroundCheckData>({
    consentGiven: data?.consentGiven ?? false,
    consentDate: data?.consentDate,
    checkrStatus: data?.checkrStatus,
  })
  const [dob, setDob] = useState("")
  const [ssn, setSsn] = useState("")
  const [initiating, setInitiating] = useState(false)

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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!formData.consentGiven) {
      toast.error("You must consent to a background check")
      return
    }
    await onSave({ backgroundCheck: formData })
  }

  const isCheckComplete = formData.checkrStatus === "CLEAR"
  const isPending = formData.checkrStatus === "PENDING"

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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
            Notroom partners with Checkr to conduct background verification for all signing 
            agents. This is a standard industry requirement to ensure trust and safety.
          </p>
          <p>The background check includes:</p>
          <ul className="list-disc list-inside space-y-1 text-slate-400">
            <li>National Criminal Database Search</li>
            <li>Sex Offender Registry Search</li>
            <li>Social Security Number Trace</li>
            <li>County Criminal Records (7 years)</li>
          </ul>
        </div>
      </div>

      {!isCheckComplete && !isPending && (
        <>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="dob">Date of Birth *</Label>
              <Input
                id="dob"
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                required
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
                required
                pattern="\d{3}-?\d{2}-?\d{4}"
                className="bg-slate-800 border-slate-700"
              />
              <p className="text-xs text-slate-500">
                Your SSN is encrypted and only used for identity verification
              </p>
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

      {isCheckComplete && (
        <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
          <h4 className="text-green-400 font-medium mb-2">✓ Verification Complete</h4>
          <p className="text-sm text-slate-300">
            Your background check has been completed and cleared.
          </p>
        </div>
      )}

      <Button
        type="submit"
        disabled={saving || !formData.consentGiven}
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

