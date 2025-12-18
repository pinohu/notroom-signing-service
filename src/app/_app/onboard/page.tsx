"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { toast } from "sonner"
import { CheckCircle2, Circle, Loader2 } from "lucide-react"

// Step Components
import { BasicInfoStep } from "@/components/onboarding/basic-info-step"
import { CommissionStep } from "@/components/onboarding/commission-step"
import { InsuranceStep } from "@/components/onboarding/insurance-step"
import { EquipmentStep } from "@/components/onboarding/equipment-step"
import { BackgroundCheckStep } from "@/components/onboarding/background-check-step"
import { BankingStep } from "@/components/onboarding/banking-step"
import { ServiceAreasStep } from "@/components/onboarding/service-areas-step"
import { AvailabilityStep } from "@/components/onboarding/availability-step"
import { SpecializationsStep } from "@/components/onboarding/specializations-step"
import { AgreementStep } from "@/components/onboarding/agreement-step"

const STEPS = [
  { step: 1, name: "Basic Information", description: "Your contact details" },
  { step: 2, name: "Commission Details", description: "Notary commission info" },
  { step: 3, name: "Insurance", description: "E&O and bond coverage" },
  { step: 4, name: "Equipment", description: "Printer, scanner, internet" },
  { step: 5, name: "Background Check", description: "Verification consent" },
  { step: 6, name: "Banking", description: "Payment information" },
  { step: 7, name: "Service Areas", description: "Coverage zones" },
  { step: 8, name: "Availability", description: "Schedule preferences" },
  { step: 9, name: "Specializations", description: "Skills and experience" },
  { step: 10, name: "Agreement", description: "Terms and contract" },
]

interface OnboardingState {
  id: string
  currentStep: number
  completedSteps: number[]
  status: string
  data: Record<string, unknown>
}

export default function OnboardPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { data: session, status: sessionStatus } = useSession()
  
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [onboarding, setOnboarding] = useState<OnboardingState | null>(null)
  const [currentStep, setCurrentStep] = useState(1)

  // Load onboarding state
  useEffect(() => {
    if (sessionStatus === "loading") return
    
    if (sessionStatus === "unauthenticated") {
      router.push("/auth/signin?callbackUrl=/onboard")
      return
    }

    loadOnboarding()
  }, [sessionStatus, router])

  // Handle step from URL
  useEffect(() => {
    const stepParam = searchParams.get("step")
    if (stepParam) {
      const step = parseInt(stepParam, 10)
      if (!isNaN(step) && step >= 1 && step <= 10) {
        setCurrentStep(step)
      }
    }
  }, [searchParams])

  async function loadOnboarding() {
    try {
      const response = await fetch("/api/onboarding")
      const result = await response.json()

      if (result.success && result.data.exists) {
        setOnboarding({
          id: result.data.id,
          currentStep: result.data.currentStep,
          completedSteps: result.data.completedSteps,
          status: result.data.status,
          data: result.data.data,
        })
        setCurrentStep(result.data.currentStep)
      } else {
        // Start new onboarding
        const createResponse = await fetch("/api/onboarding", { method: "POST" })
        const createResult = await createResponse.json()
        
        if (createResult.success) {
          setOnboarding({
            id: createResult.data.id,
            currentStep: 1,
            completedSteps: [],
            status: "IN_PROGRESS",
            data: {},
          })
        }
      }
    } catch (error) {
      toast.error("Failed to load onboarding")
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  async function saveStep(stepData: Record<string, unknown>) {
    setSaving(true)
    try {
      const response = await fetch(`/api/onboarding/step/${currentStep}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(stepData),
      })

      const result = await response.json()

      if (!response.ok) {
        const errors = result.errors || [result.message]
        errors.forEach((error: string) => toast.error(error))
        return false
      }

      // Update local state
      if (onboarding) {
        const newCompleted = [...onboarding.completedSteps]
        if (!newCompleted.includes(currentStep)) {
          newCompleted.push(currentStep)
        }
        setOnboarding({
          ...onboarding,
          completedSteps: newCompleted,
          data: { ...onboarding.data, ...stepData },
        })
      }

      toast.success(result.data.message)
      
      // Move to next step
      if (currentStep < 10) {
        setCurrentStep(currentStep + 1)
        router.push(`/onboard?step=${currentStep + 1}`)
      }

      return true
    } catch (error) {
      toast.error("Failed to save step")
      console.error(error)
      return false
    } finally {
      setSaving(false)
    }
  }

  async function submitOnboarding() {
    setSaving(true)
    try {
      const response = await fetch("/api/onboarding", { method: "PATCH" })
      const result = await response.json()

      if (!response.ok) {
        const errors = result.errors || [result.message]
        errors.forEach((error: string) => toast.error(error))
        return
      }

      toast.success("Application submitted for review!")
      router.push("/onboard/success")
    } catch (error) {
      toast.error("Failed to submit application")
      console.error(error)
    } finally {
      setSaving(false)
    }
  }

  function goToStep(step: number) {
    setCurrentStep(step)
    router.push(`/onboard?step=${step}`)
  }

  if (loading || sessionStatus === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-cyan-500" />
      </div>
    )
  }

  const progress = ((onboarding?.completedSteps.length ?? 0) / 10) * 100

  return (
    <div className="min-h-screen bg-slate-950 py-8">
      <div className="container max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Join the Notroom Elite Network
          </h1>
          <p className="text-slate-400">
            Complete your application to become a verified signing agent
          </p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-slate-400">
              Step {currentStep} of 10
            </span>
            <span className="text-sm text-slate-400">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Step Navigation */}
          <div className="lg:col-span-1">
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-white">Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-1">
                {STEPS.map((step) => {
                  const isCompleted = onboarding?.completedSteps.includes(step.step)
                  const isCurrent = currentStep === step.step
                  
                  return (
                    <button
                      key={step.step}
                      onClick={() => goToStep(step.step)}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                        isCurrent
                          ? "bg-cyan-500/20 text-cyan-400"
                          : isCompleted
                          ? "text-green-400 hover:bg-slate-800"
                          : "text-slate-400 hover:bg-slate-800"
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="h-5 w-5 shrink-0" />
                      ) : (
                        <Circle className="h-5 w-5 shrink-0" />
                      )}
                      <div className="min-w-0">
                        <div className="text-sm font-medium truncate">
                          {step.name}
                        </div>
                        <div className="text-xs text-slate-500 truncate">
                          {step.description}
                        </div>
                      </div>
                    </button>
                  )
                })}
              </CardContent>
            </Card>
          </div>

          {/* Step Content */}
          <div className="lg:col-span-3">
            <Card className="bg-slate-900 border-slate-800">
              <CardHeader>
                <CardTitle className="text-white">
                  {STEPS[currentStep - 1].name}
                </CardTitle>
                <CardDescription>
                  {STEPS[currentStep - 1].description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {currentStep === 1 && (
                  <BasicInfoStep
                    data={onboarding?.data?.basicInfo}
                    onSave={saveStep}
                    saving={saving}
                  />
                )}
                {currentStep === 2 && (
                  <CommissionStep
                    data={onboarding?.data?.commission}
                    onSave={saveStep}
                    saving={saving}
                  />
                )}
                {currentStep === 3 && (
                  <InsuranceStep
                    data={onboarding?.data?.insurance}
                    onSave={saveStep}
                    saving={saving}
                  />
                )}
                {currentStep === 4 && (
                  <EquipmentStep
                    data={onboarding?.data?.equipment}
                    onSave={saveStep}
                    saving={saving}
                  />
                )}
                {currentStep === 5 && (
                  <BackgroundCheckStep
                    data={onboarding?.data?.backgroundCheck}
                    onSave={saveStep}
                    saving={saving}
                  />
                )}
                {currentStep === 6 && (
                  <BankingStep
                    data={onboarding?.data?.banking}
                    onSave={saveStep}
                    saving={saving}
                  />
                )}
                {currentStep === 7 && (
                  <ServiceAreasStep
                    data={onboarding?.data?.serviceAreas}
                    onSave={saveStep}
                    saving={saving}
                  />
                )}
                {currentStep === 8 && (
                  <AvailabilityStep
                    data={onboarding?.data?.availability}
                    onSave={saveStep}
                    saving={saving}
                  />
                )}
                {currentStep === 9 && (
                  <SpecializationsStep
                    data={onboarding?.data?.specializations}
                    onSave={saveStep}
                    saving={saving}
                  />
                )}
                {currentStep === 10 && (
                  <AgreementStep
                    data={onboarding?.data?.agreement}
                    onSave={saveStep}
                    onSubmit={submitOnboarding}
                    saving={saving}
                    canSubmit={onboarding?.completedSteps.length === 9}
                  />
                )}

                {/* Navigation */}
                <div className="flex justify-between mt-8 pt-6 border-t border-slate-800">
                  <Button
                    variant="outline"
                    onClick={() => goToStep(currentStep - 1)}
                    disabled={currentStep === 1}
                    className="border-slate-700"
                  >
                    Previous
                  </Button>
                  
                  {currentStep < 10 && (
                    <Button
                      variant="ghost"
                      onClick={() => goToStep(currentStep + 1)}
                      className="text-slate-400"
                    >
                      Skip for now
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

