"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { toast } from "sonner"
import { CheckCircle2, Circle, Loader2, ArrowLeft, Home } from "lucide-react"
import Link from "next/link"

// Import step components
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

export default function OnboardPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [saving, setSaving] = useState(false)
  const [completedSteps, setCompletedSteps] = useState<number[]>([])
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<Record<string, unknown>>({})

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

  // Load saved data from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("notroom_onboarding")
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        setFormData(parsed.formData || {})
        setCompletedSteps(parsed.completedSteps || [])
        if (parsed.currentStep) {
          setCurrentStep(parsed.currentStep)
        }
      } catch (e) {
        console.error("Failed to parse saved onboarding data", e)
      }
    }
  }, [])

  // Save to localStorage
  function saveToLocal(data: Record<string, unknown>, completed: number[], step: number) {
    localStorage.setItem("notroom_onboarding", JSON.stringify({
      formData: data,
      completedSteps: completed,
      currentStep: step,
    }))
  }

  async function saveStep(stepData: Record<string, unknown>) {
    setSaving(true)
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500))

    // Update local state
    const newFormData = { ...formData, [`step${currentStep}`]: stepData }
    const newCompleted = [...completedSteps]
    if (!newCompleted.includes(currentStep)) {
      newCompleted.push(currentStep)
    }
    
    setFormData(newFormData)
    setCompletedSteps(newCompleted)

    // Save to localStorage
    const nextStep = currentStep < 10 ? currentStep + 1 : currentStep
    saveToLocal(newFormData, newCompleted, nextStep)

    toast.success(`Step ${currentStep} saved successfully!`)
    
    // Move to next step
    if (currentStep < 10) {
      setCurrentStep(currentStep + 1)
      router.push(`/onboard?step=${currentStep + 1}`)
    }

    setSaving(false)
    return true
  }

  async function submitOnboarding() {
    setSaving(true)
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    toast.success("Application submitted for review!")
    localStorage.removeItem("notroom_onboarding")
    router.push("/onboard/success")
    
    setSaving(false)
  }

  function goToStep(step: number) {
    setCurrentStep(step)
    router.push(`/onboard?step=${step}`)
  }

  const progress = (completedSteps.length / 10) * 100

  return (
    <div className="min-h-screen bg-slate-950 py-8">
      <div className="container max-w-6xl mx-auto px-4">
        {/* Back to Home */}
        <div className="mb-6">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Join the Notroom Elite Network
          </h1>
          <p className="text-slate-400">
            Complete your application to become a verified signing agent
          </p>
          <p className="text-sm text-cyan-400 mt-2">
            Demo Mode - Data saved locally for testing
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
                  const isCompleted = completedSteps.includes(step.step)
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
                    data={formData?.step1}
                    onSave={saveStep}
                    saving={saving}
                  />
                )}
                {currentStep === 2 && (
                  <CommissionStep
                    data={formData?.step2}
                    onSave={saveStep}
                    saving={saving}
                  />
                )}
                {currentStep === 3 && (
                  <InsuranceStep
                    data={formData?.step3}
                    onSave={saveStep}
                    saving={saving}
                  />
                )}
                {currentStep === 4 && (
                  <EquipmentStep
                    data={formData?.step4}
                    onSave={saveStep}
                    saving={saving}
                  />
                )}
                {currentStep === 5 && (
                  <BackgroundCheckStep
                    data={formData?.step5}
                    onSave={saveStep}
                    saving={saving}
                    commissionState={(formData?.step2 as { commissionState?: string } | undefined)?.commissionState}
                    commissionNumber={(formData?.step2 as { commissionNumber?: string } | undefined)?.commissionNumber}
                  />
                )}
                {currentStep === 6 && (
                  <BankingStep
                    data={formData?.step6}
                    onSave={saveStep}
                    saving={saving}
                  />
                )}
                {currentStep === 7 && (
                  <ServiceAreasStep
                    data={formData?.step7}
                    onSave={saveStep}
                    saving={saving}
                  />
                )}
                {currentStep === 8 && (
                  <AvailabilityStep
                    data={formData?.step8}
                    onSave={saveStep}
                    saving={saving}
                  />
                )}
                {currentStep === 9 && (
                  <SpecializationsStep
                    data={formData?.step9}
                    onSave={saveStep}
                    saving={saving}
                  />
                )}
                {currentStep === 10 && (
                  <AgreementStep
                    data={formData?.step10}
                    onSave={saveStep}
                    onSubmit={submitOnboarding}
                    saving={saving}
                    canSubmit={completedSteps.length >= 9}
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
