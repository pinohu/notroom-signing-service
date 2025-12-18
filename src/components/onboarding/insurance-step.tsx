"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, Upload, AlertCircle } from "lucide-react"

interface InsuranceData {
  eoAmount: number
  eoCarrier: string
  eoPolicyNumber: string
  eoExpiry: string
  eoCertificateUrl?: string
}

interface Props {
  data?: InsuranceData
  onSave: (data: { insurance: InsuranceData }) => Promise<boolean>
  saving: boolean
}

const COMMON_CARRIERS = [
  "NNA (Notary Signing Agent)",
  "Lockton Affinity (Notary E&O)",
  "ACOM",
  "Hiscox",
  "Hartford",
  "Liberty Mutual",
  "State Farm",
  "Allstate",
  "Other"
]

export function InsuranceStep({ data, onSave, saving }: Props) {
  const [formData, setFormData] = useState<InsuranceData>({
    eoAmount: data?.eoAmount ?? 25000,
    eoCarrier: data?.eoCarrier ?? "",
    eoPolicyNumber: data?.eoPolicyNumber ?? "",
    eoExpiry: data?.eoExpiry ?? "",
    eoCertificateUrl: data?.eoCertificateUrl ?? "",
  })

  function updateField<K extends keyof InsuranceData>(field: K, value: InsuranceData[K]) {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    await onSave({ insurance: formData })
  }

  const isMinimumMet = formData.eoAmount >= 25000

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-4 mb-6">
        <h3 className="text-cyan-400 font-medium mb-2">Insurance Requirements</h3>
        <p className="text-sm text-slate-300">
          All signing agents must maintain Errors & Omissions (E&O) insurance with a minimum 
          coverage of $25,000. Higher coverage amounts may qualify you for priority assignments.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="eoAmount">E&O Coverage Amount *</Label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">$</span>
          <Input
            id="eoAmount"
            type="number"
            value={formData.eoAmount}
            onChange={(e) => updateField("eoAmount", parseInt(e.target.value) || 0)}
            required
            min={25000}
            step={1000}
            className="bg-slate-800 border-slate-700 pl-7"
          />
        </div>
        {!isMinimumMet && (
          <div className="flex items-center gap-2 text-amber-400 text-sm">
            <AlertCircle className="h-4 w-4" />
            Minimum coverage of $25,000 required
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="eoCarrier">Insurance Carrier *</Label>
          <select
            id="eoCarrier"
            value={formData.eoCarrier}
            onChange={(e) => updateField("eoCarrier", e.target.value)}
            required
            className="flex h-10 w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white"
          >
            <option value="">Select Carrier</option>
            {COMMON_CARRIERS.map((carrier) => (
              <option key={carrier} value={carrier}>{carrier}</option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="eoPolicyNumber">Policy Number *</Label>
          <Input
            id="eoPolicyNumber"
            value={formData.eoPolicyNumber}
            onChange={(e) => updateField("eoPolicyNumber", e.target.value)}
            placeholder="POL-123456"
            required
            className="bg-slate-800 border-slate-700"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="eoExpiry">Policy Expiration Date *</Label>
        <Input
          id="eoExpiry"
          type="date"
          value={formData.eoExpiry}
          onChange={(e) => updateField("eoExpiry", e.target.value)}
          required
          min={new Date().toISOString().split("T")[0]}
          className="bg-slate-800 border-slate-700"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="eoCertificate">Certificate of Insurance</Label>
        <div className="flex items-center gap-4">
          <Button
            type="button"
            variant="outline"
            className="border-slate-700"
          >
            <Upload className="mr-2 h-4 w-4" />
            Upload Certificate
          </Button>
          {formData.eoCertificateUrl && (
            <span className="text-sm text-green-500">✓ Uploaded</span>
          )}
        </div>
        <p className="text-xs text-slate-500">
          Upload your Certificate of Insurance showing coverage details (PDF, JPG, PNG)
        </p>
      </div>

      <Button
        type="submit"
        disabled={saving || !isMinimumMet}
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


