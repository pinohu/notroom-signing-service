"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Loader2, CreditCard, Upload, ExternalLink, CheckCircle } from "lucide-react"
import { toast } from "sonner"

interface BankingData {
  stripeConnectId?: string
  stripeOnboardingComplete: boolean
  paymentMethod: string
  w9Uploaded: boolean
}

interface Props {
  data?: BankingData
  onSave: (data: { banking: BankingData }) => Promise<boolean>
  saving: boolean
}

export function BankingStep({ data, onSave, saving }: Props) {
  const [formData, setFormData] = useState<BankingData>({
    stripeConnectId: data?.stripeConnectId,
    stripeOnboardingComplete: data?.stripeOnboardingComplete ?? false,
    paymentMethod: data?.paymentMethod ?? "ACH",
    w9Uploaded: data?.w9Uploaded ?? false,
  })
  const [connecting, setConnecting] = useState(false)
  const [checkingStatus, setCheckingStatus] = useState(false)

  // Check Stripe status on mount and when returning from Stripe
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    if (urlParams.get("complete") === "true") {
      checkStripeStatus()
    }
  }, [])

  async function checkStripeStatus() {
    setCheckingStatus(true)
    try {
      const response = await fetch("/api/onboarding/stripe-connect")
      const result = await response.json()

      if (result.data.isComplete) {
        setFormData(prev => ({
          ...prev,
          stripeConnectId: result.data.accountId,
          stripeOnboardingComplete: true,
        }))
        toast.success("Stripe Connect setup complete!")
      }
    } catch (error) {
      console.error("Failed to check Stripe status")
    } finally {
      setCheckingStatus(false)
    }
  }

  async function connectStripe() {
    setConnecting(true)
    try {
      const response = await fetch("/api/onboarding/stripe-connect", {
        method: "POST",
      })
      const result = await response.json()

      if (response.ok && result.data.onboardingUrl) {
        // Redirect to Stripe Connect onboarding
        window.location.href = result.data.onboardingUrl
      } else {
        toast.error(result.message || "Failed to create Stripe account")
      }
    } catch (error) {
      toast.error("Failed to connect Stripe")
    } finally {
      setConnecting(false)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!formData.w9Uploaded) {
      toast.error("Please upload your W-9 form")
      return
    }
    await onSave({ banking: formData })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-slate-800 rounded-lg p-6 space-y-4">
        <div className="flex items-center gap-3">
          <CreditCard className="h-8 w-8 text-cyan-400" />
          <div>
            <h3 className="text-lg font-medium text-white">Payment Setup</h3>
            <p className="text-sm text-slate-400">
              Get paid quickly via direct deposit
            </p>
          </div>
        </div>

        <div className="text-sm text-slate-300">
          <p>
            We use Stripe Connect for fast, secure payments. You'll receive payments 
            directly to your bank account within 2-5 business days after completing 
            a signing.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-white">Stripe Connect</h3>
        
        {formData.stripeOnboardingComplete ? (
          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 flex items-center gap-3">
            <CheckCircle className="h-6 w-6 text-green-500" />
            <div>
              <h4 className="text-green-400 font-medium">Connected!</h4>
              <p className="text-sm text-slate-300">
                Your Stripe account is set up and ready to receive payments.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {formData.stripeConnectId && !formData.stripeOnboardingComplete && (
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
                <h4 className="text-amber-400 font-medium mb-2">Setup Incomplete</h4>
                <p className="text-sm text-slate-300 mb-3">
                  Please complete your Stripe onboarding to receive payments.
                </p>
                <Button
                  type="button"
                  variant="outline"
                  onClick={connectStripe}
                  disabled={connecting}
                  className="border-amber-500/50 text-amber-400"
                >
                  Continue Setup
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </div>
            )}

            {!formData.stripeConnectId && (
              <Button
                type="button"
                onClick={connectStripe}
                disabled={connecting}
                className="w-full bg-[#635bff] hover:bg-[#5149e0]"
              >
                {connecting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Connecting...
                  </>
                ) : (
                  <>
                    <CreditCard className="mr-2 h-4 w-4" />
                    Connect with Stripe
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            )}

            {checkingStatus && (
              <div className="flex items-center gap-2 text-slate-400">
                <Loader2 className="h-4 w-4 animate-spin" />
                Checking connection status...
              </div>
            )}
          </div>
        )}
      </div>

      <div className="space-y-4 border-t border-slate-800 pt-6">
        <h3 className="text-lg font-medium text-white">Tax Information</h3>
        
        <div className="space-y-2">
          <Label>W-9 Form *</Label>
          <div className="flex items-center gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setFormData(prev => ({ ...prev, w9Uploaded: true }))}
              className="border-slate-700"
            >
              <Upload className="mr-2 h-4 w-4" />
              Upload W-9
            </Button>
            {formData.w9Uploaded && (
              <span className="text-sm text-green-500 flex items-center gap-1">
                <CheckCircle className="h-4 w-4" />
                Uploaded
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500">
            Required for 1099 tax reporting. Upload a completed W-9 form (PDF).
          </p>
        </div>
      </div>

      <div className="flex items-start space-x-2">
        <Checkbox
          id="paymentTerms"
          checked
          disabled
        />
        <Label htmlFor="paymentTerms" className="font-normal text-sm leading-relaxed text-slate-400">
          I understand that payments are processed within 2-5 business days after 
          a signing is completed and approved. Fast-pay options may be available 
          for Elite tier notaries.
        </Label>
      </div>

      <Button
        type="submit"
        disabled={saving || !formData.w9Uploaded}
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


