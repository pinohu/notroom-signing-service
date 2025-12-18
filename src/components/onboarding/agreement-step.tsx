"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Loader2, FileText, CheckCircle } from "lucide-react"
import { toast } from "sonner"

interface AgreementData {
  termsAccepted: boolean
  termsAcceptedAt?: string
  contractorAgreementAccepted: boolean
  contractorAgreementSignedAt?: string
  signatureDataUrl?: string
  agreementVersion: string
}

interface Props {
  data?: AgreementData
  onSave: (data: { agreement: AgreementData }) => Promise<boolean>
  onSubmit: () => Promise<void>
  saving: boolean
  canSubmit: boolean
}

const CURRENT_AGREEMENT_VERSION = "2025.1"

export function AgreementStep({ data, onSave, onSubmit, saving, canSubmit }: Props) {
  const [formData, setFormData] = useState<AgreementData>({
    termsAccepted: data?.termsAccepted ?? false,
    termsAcceptedAt: data?.termsAcceptedAt,
    contractorAgreementAccepted: data?.contractorAgreementAccepted ?? false,
    contractorAgreementSignedAt: data?.contractorAgreementSignedAt,
    signatureDataUrl: data?.signatureDataUrl,
    agreementVersion: CURRENT_AGREEMENT_VERSION,
  })
  const [showTerms, setShowTerms] = useState(false)
  const [showAgreement, setShowAgreement] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [hasSigned, setHasSigned] = useState(!!data?.signatureDataUrl)

  function updateField<K extends keyof AgreementData>(field: K, value: AgreementData[K]) {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  // Signature pad functions
  function startDrawing(e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) {
    setIsDrawing(true)
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    
    ctx.beginPath()
    const rect = canvas.getBoundingClientRect()
    const x = "touches" in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left
    const y = "touches" in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top
    ctx.moveTo(x, y)
  }

  function draw(e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) {
    if (!isDrawing) return
    
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    
    const rect = canvas.getBoundingClientRect()
    const x = "touches" in e ? e.touches[0].clientX - rect.left : e.clientX - rect.left
    const y = "touches" in e ? e.touches[0].clientY - rect.top : e.clientY - rect.top
    
    ctx.lineTo(x, y)
    ctx.strokeStyle = "#22d3ee"
    ctx.lineWidth = 2
    ctx.stroke()
  }

  function stopDrawing() {
    setIsDrawing(false)
    const canvas = canvasRef.current
    if (canvas) {
      const dataUrl = canvas.toDataURL()
      updateField("signatureDataUrl", dataUrl)
      setHasSigned(true)
    }
  }

  function clearSignature() {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    updateField("signatureDataUrl", undefined)
    setHasSigned(false)
  }

  async function handleSaveAndSubmit() {
    if (!formData.termsAccepted) {
      toast.error("Please accept the Terms of Service")
      return
    }
    if (!formData.contractorAgreementAccepted) {
      toast.error("Please accept the Independent Contractor Agreement")
      return
    }
    if (!hasSigned) {
      toast.error("Please sign the agreement")
      return
    }

    const dataToSave = {
      ...formData,
      termsAcceptedAt: formData.termsAcceptedAt ?? new Date().toISOString(),
      contractorAgreementSignedAt: new Date().toISOString(),
    }

    const saved = await onSave({ agreement: dataToSave })
    if (saved && canSubmit) {
      await onSubmit()
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-slate-800 rounded-lg p-6 space-y-4">
        <div className="flex items-center gap-3">
          <FileText className="h-8 w-8 text-cyan-400" />
          <div>
            <h3 className="text-lg font-medium text-white">Legal Agreements</h3>
            <p className="text-sm text-slate-400">
              Review and sign to complete your application
            </p>
          </div>
        </div>
      </div>

      {/* Terms of Service */}
      <div className="space-y-4 p-4 bg-slate-800/50 rounded-lg">
        <div className="flex items-center justify-between">
          <h4 className="text-white font-medium">Terms of Service</h4>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setShowTerms(!showTerms)}
          >
            {showTerms ? "Hide" : "View"}
          </Button>
        </div>
        
        {showTerms && (
          <div className="max-h-60 overflow-y-auto bg-slate-900 p-4 rounded-lg text-sm text-slate-300 space-y-2">
            <p><strong>NOTROOM TERMS OF SERVICE</strong></p>
            <p>Version {CURRENT_AGREEMENT_VERSION}</p>
            <p>Last Updated: January 2025</p>
            <br />
            <p>
              By using the Notroom platform, you agree to be bound by these Terms of Service. 
              These terms govern your use of the Notroom platform for receiving and completing 
              signing assignments.
            </p>
            <br />
            <p><strong>1. SERVICE DESCRIPTION</strong></p>
            <p>
              Notroom provides a platform connecting signing agents with title companies and 
              lenders requiring notarization services. You agree to complete assignments 
              professionally and in accordance with all applicable laws.
            </p>
            <br />
            <p><strong>2. REQUIREMENTS</strong></p>
            <p>
              You must maintain valid notary commission, E&O insurance, and pass background 
              verification to remain active on the platform.
            </p>
            <br />
            <p><strong>3. PAYMENT</strong></p>
            <p>
              Payment is processed within 2-5 business days after assignment completion and 
              approval. Fast-pay options may be available for Elite tier notaries.
            </p>
            {/* More terms content... */}
          </div>
        )}
        
        <div className="flex items-center space-x-2">
          <Checkbox
            id="termsAccepted"
            checked={formData.termsAccepted}
            onCheckedChange={(checked) => {
              updateField("termsAccepted", checked as boolean)
              if (checked && !formData.termsAcceptedAt) {
                updateField("termsAcceptedAt", new Date().toISOString())
              }
            }}
          />
          <Label htmlFor="termsAccepted" className="font-normal">
            I have read and agree to the Terms of Service
          </Label>
        </div>
      </div>

      {/* Independent Contractor Agreement */}
      <div className="space-y-4 p-4 bg-slate-800/50 rounded-lg">
        <div className="flex items-center justify-between">
          <h4 className="text-white font-medium">Independent Contractor Agreement</h4>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => setShowAgreement(!showAgreement)}
          >
            {showAgreement ? "Hide" : "View"}
          </Button>
        </div>
        
        {showAgreement && (
          <div className="max-h-60 overflow-y-auto bg-slate-900 p-4 rounded-lg text-sm text-slate-300 space-y-2">
            <p><strong>INDEPENDENT CONTRACTOR AGREEMENT</strong></p>
            <p>Version {CURRENT_AGREEMENT_VERSION}</p>
            <br />
            <p>
              This Independent Contractor Agreement ("Agreement") is entered into between 
              Notroom LLC ("Company") and you ("Contractor").
            </p>
            <br />
            <p><strong>1. RELATIONSHIP</strong></p>
            <p>
              Contractor is an independent contractor and not an employee, partner, or agent 
              of the Company. Contractor is responsible for their own taxes, insurance, and 
              business expenses.
            </p>
            <br />
            <p><strong>2. SERVICES</strong></p>
            <p>
              Contractor agrees to provide notarization and signing services for loan 
              documents as assigned through the Notroom platform.
            </p>
            <br />
            <p><strong>3. CONFIDENTIALITY</strong></p>
            <p>
              Contractor agrees to maintain the confidentiality of all borrower information 
              and proprietary Company information.
            </p>
            <br />
            <p><strong>4. LIABILITY</strong></p>
            <p>
              Contractor maintains sole responsibility for their professional actions and 
              must maintain adequate E&O insurance coverage.
            </p>
            {/* More agreement content... */}
          </div>
        )}
        
        <div className="flex items-center space-x-2">
          <Checkbox
            id="contractorAgreementAccepted"
            checked={formData.contractorAgreementAccepted}
            onCheckedChange={(checked) => 
              updateField("contractorAgreementAccepted", checked as boolean)
            }
          />
          <Label htmlFor="contractorAgreementAccepted" className="font-normal">
            I have read and agree to the Independent Contractor Agreement
          </Label>
        </div>
      </div>

      {/* Signature Pad */}
      <div className="space-y-4 p-4 bg-slate-800/50 rounded-lg">
        <h4 className="text-white font-medium">Electronic Signature</h4>
        <p className="text-sm text-slate-400">
          Sign below to confirm your agreement
        </p>
        
        <div className="relative">
          <canvas
            ref={canvasRef}
            width={400}
            height={150}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg cursor-crosshair touch-none"
          />
          {!hasSigned && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="text-slate-600 text-sm">Sign here</span>
            </div>
          )}
        </div>
        
        <div className="flex justify-between items-center">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={clearSignature}
          >
            Clear Signature
          </Button>
          {hasSigned && (
            <span className="text-green-500 text-sm flex items-center gap-1">
              <CheckCircle className="h-4 w-4" />
              Signed
            </span>
          )}
        </div>
      </div>

      {!canSubmit && (
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4">
          <p className="text-amber-400 text-sm">
            Please complete all previous steps before submitting your application.
          </p>
        </div>
      )}

      <Button
        type="button"
        onClick={handleSaveAndSubmit}
        disabled={saving || !formData.termsAccepted || !formData.contractorAgreementAccepted || !hasSigned}
        className="w-full bg-cyan-600 hover:bg-cyan-700 text-lg py-6"
      >
        {saving ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Submitting...
          </>
        ) : (
          "Submit Application"
        )}
      </Button>

      <p className="text-center text-xs text-slate-500">
        By submitting, you confirm that all information provided is accurate and complete. 
        False information may result in application rejection or account termination.
      </p>
    </div>
  )
}


