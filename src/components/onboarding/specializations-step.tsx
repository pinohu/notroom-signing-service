"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Loader2, Award } from "lucide-react"

interface SpecializationsData {
  loanTypes: string[]
  languages: string[]
  ronCapable: boolean
  ronPlatforms?: string[]
  hospitalSignings: boolean
  jailSignings: boolean
  reverseClose: boolean
  commercialLoans: boolean
  yearsExperience: number
  certifications: string[]
}

interface Props {
  data?: SpecializationsData
  onSave: (data: { specializations: SpecializationsData }) => Promise<boolean>
  saving: boolean
}

const LOAN_TYPES = [
  { value: "PURCHASE", label: "Purchase" },
  { value: "REFINANCE", label: "Refinance" },
  { value: "HELOC", label: "HELOC" },
  { value: "REVERSE_MORTGAGE", label: "Reverse Mortgage" },
  { value: "COMMERCIAL", label: "Commercial" },
  { value: "CONSTRUCTION", label: "Construction" },
  { value: "FHA", label: "FHA" },
  { value: "VA", label: "VA" },
  { value: "USDA", label: "USDA" },
  { value: "JUMBO", label: "Jumbo" },
  { value: "SELLER_FINANCING", label: "Seller Financing" },
]

const LANGUAGES = [
  "English",
  "Spanish",
  "Mandarin",
  "Cantonese",
  "Vietnamese",
  "Korean",
  "Tagalog",
  "Russian",
  "Arabic",
  "Hindi",
  "Portuguese",
  "French",
  "German",
]

const RON_PLATFORMS = [
  "Proof",
  "Notarize",
  "NotaryCam",
  "DocVerify",
  "Pavaso",
  "SigningRoom",
]

const CERTIFICATIONS = [
  { value: "NNA_CERTIFIED", label: "NNA Certified Signing Agent" },
  { value: "LSS_CERTIFIED", label: "Loan Signing System Certified" },
  { value: "NOTARY_CAFE", label: "Notary Café Certified" },
  { value: "SIGNING_AGENT_COM", label: "SigningAgent.com Certified" },
]

export function SpecializationsStep({ data, onSave, saving }: Props) {
  const [formData, setFormData] = useState<SpecializationsData>({
    loanTypes: data?.loanTypes ?? ["PURCHASE", "REFINANCE"],
    languages: data?.languages ?? ["English"],
    ronCapable: data?.ronCapable ?? false,
    ronPlatforms: data?.ronPlatforms ?? [],
    hospitalSignings: data?.hospitalSignings ?? false,
    jailSignings: data?.jailSignings ?? false,
    reverseClose: data?.reverseClose ?? false,
    commercialLoans: data?.commercialLoans ?? false,
    yearsExperience: data?.yearsExperience ?? 0,
    certifications: data?.certifications ?? [],
  })

  function toggleArrayItem(field: "loanTypes" | "languages" | "ronPlatforms" | "certifications", value: string) {
    setFormData(prev => {
      const current = prev[field] ?? []
      const updated = current.includes(value)
        ? current.filter((v: string) => v !== value)
        : [...current, value]
      return { ...prev, [field]: updated }
    })
  }

  function updateField<K extends keyof SpecializationsData>(field: K, value: SpecializationsData[K]) {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    await onSave({ specializations: formData })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-slate-800 rounded-lg p-6 space-y-4">
        <div className="flex items-center gap-3">
          <Award className="h-8 w-8 text-cyan-400" />
          <div>
            <h3 className="text-lg font-medium text-white">Skills & Experience</h3>
            <p className="text-sm text-slate-400">
              Tell us about your expertise
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="yearsExperience">Years of Signing Agent Experience *</Label>
        <Input
          id="yearsExperience"
          type="number"
          value={formData.yearsExperience}
          onChange={(e) => updateField("yearsExperience", parseInt(e.target.value) || 0)}
          min={0}
          max={50}
          className="bg-slate-800 border-slate-700 w-24"
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-white">Loan Types *</h3>
        <p className="text-sm text-slate-400">Select all loan types you're comfortable signing</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {LOAN_TYPES.map(({ value, label }) => (
            <div key={value} className="flex items-center space-x-2">
              <Checkbox
                id={`loan-${value}`}
                checked={formData.loanTypes.includes(value)}
                onCheckedChange={() => toggleArrayItem("loanTypes", value)}
              />
              <Label htmlFor={`loan-${value}`} className="font-normal text-sm">
                {label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4 border-t border-slate-800 pt-6">
        <h3 className="text-lg font-medium text-white">Languages *</h3>
        <p className="text-sm text-slate-400">Select languages you can conduct signings in</p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {LANGUAGES.map((lang) => (
            <div key={lang} className="flex items-center space-x-2">
              <Checkbox
                id={`lang-${lang}`}
                checked={formData.languages.includes(lang)}
                onCheckedChange={() => toggleArrayItem("languages", lang)}
              />
              <Label htmlFor={`lang-${lang}`} className="font-normal text-sm">
                {lang}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4 border-t border-slate-800 pt-6">
        <h3 className="text-lg font-medium text-white">Remote Online Notarization</h3>
        
        <div className="flex items-center space-x-2">
          <Checkbox
            id="ronCapable"
            checked={formData.ronCapable}
            onCheckedChange={(checked) => updateField("ronCapable", checked as boolean)}
          />
          <Label htmlFor="ronCapable" className="font-normal">
            I'm authorized and equipped to perform RON sessions
          </Label>
        </div>

        {formData.ronCapable && (
          <div className="ml-6 space-y-2">
            <Label>RON Platforms</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {RON_PLATFORMS.map((platform) => (
                <div key={platform} className="flex items-center space-x-2">
                  <Checkbox
                    id={`ron-${platform}`}
                    checked={formData.ronPlatforms?.includes(platform) ?? false}
                    onCheckedChange={() => toggleArrayItem("ronPlatforms", platform)}
                  />
                  <Label htmlFor={`ron-${platform}`} className="font-normal text-sm">
                    {platform}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="space-y-4 border-t border-slate-800 pt-6">
        <h3 className="text-lg font-medium text-white">Special Capabilities</h3>
        
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="hospitalSignings"
              checked={formData.hospitalSignings}
              onCheckedChange={(checked) => updateField("hospitalSignings", checked as boolean)}
            />
            <Label htmlFor="hospitalSignings" className="font-normal">
              Hospital/Nursing Home Signings
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="jailSignings"
              checked={formData.jailSignings}
              onCheckedChange={(checked) => updateField("jailSignings", checked as boolean)}
            />
            <Label htmlFor="jailSignings" className="font-normal">
              Jail/Correctional Facility Signings
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="reverseClose"
              checked={formData.reverseClose}
              onCheckedChange={(checked) => updateField("reverseClose", checked as boolean)}
            />
            <Label htmlFor="reverseClose" className="font-normal">
              Reverse Mortgage Specialist
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="commercialLoans"
              checked={formData.commercialLoans}
              onCheckedChange={(checked) => updateField("commercialLoans", checked as boolean)}
            />
            <Label htmlFor="commercialLoans" className="font-normal">
              Commercial Loan Experience
            </Label>
          </div>
        </div>
      </div>

      <div className="space-y-4 border-t border-slate-800 pt-6">
        <h3 className="text-lg font-medium text-white">Certifications</h3>
        <div className="space-y-3">
          {CERTIFICATIONS.map(({ value, label }) => (
            <div key={value} className="flex items-center space-x-2">
              <Checkbox
                id={`cert-${value}`}
                checked={formData.certifications.includes(value)}
                onCheckedChange={() => toggleArrayItem("certifications", value)}
              />
              <Label htmlFor={`cert-${value}`} className="font-normal">
                {label}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <Button
        type="submit"
        disabled={saving || formData.loanTypes.length === 0 || formData.languages.length === 0}
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


