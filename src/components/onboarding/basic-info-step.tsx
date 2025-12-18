"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"

interface BasicInfoData {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: {
    street: string
    city: string
    state: string
    zip: string
  }
}

interface Props {
  data?: BasicInfoData
  onSave: (data: { basicInfo: BasicInfoData }) => Promise<boolean>
  saving: boolean
}

const US_STATES = [
  "AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA",
  "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD",
  "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ",
  "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC",
  "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY", "DC"
]

export function BasicInfoStep({ data, onSave, saving }: Props) {
  const [formData, setFormData] = useState<BasicInfoData>({
    firstName: data?.firstName ?? "",
    lastName: data?.lastName ?? "",
    email: data?.email ?? "",
    phone: data?.phone ?? "",
    address: {
      street: data?.address?.street ?? "",
      city: data?.address?.city ?? "",
      state: data?.address?.state ?? "",
      zip: data?.address?.zip ?? "",
    },
  })

  function updateField(field: keyof BasicInfoData, value: string) {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  function updateAddress(field: keyof BasicInfoData["address"], value: string) {
    setFormData(prev => ({
      ...prev,
      address: { ...prev.address, [field]: value },
    }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    await onSave({ basicInfo: formData })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name *</Label>
          <Input
            id="firstName"
            value={formData.firstName}
            onChange={(e) => updateField("firstName", e.target.value)}
            placeholder="John"
            required
            className="bg-slate-800 border-slate-700"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name *</Label>
          <Input
            id="lastName"
            value={formData.lastName}
            onChange={(e) => updateField("lastName", e.target.value)}
            placeholder="Doe"
            required
            className="bg-slate-800 border-slate-700"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => updateField("email", e.target.value)}
            placeholder="john.doe@example.com"
            required
            className="bg-slate-800 border-slate-700"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number *</Label>
          <Input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => updateField("phone", e.target.value)}
            placeholder="(555) 123-4567"
            required
            className="bg-slate-800 border-slate-700"
          />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-white">Address</h3>
        
        <div className="space-y-2">
          <Label htmlFor="street">Street Address *</Label>
          <Input
            id="street"
            value={formData.address.street}
            onChange={(e) => updateAddress("street", e.target.value)}
            placeholder="123 Main St, Apt 4"
            required
            className="bg-slate-800 border-slate-700"
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="col-span-2 space-y-2">
            <Label htmlFor="city">City *</Label>
            <Input
              id="city"
              value={formData.address.city}
              onChange={(e) => updateAddress("city", e.target.value)}
              placeholder="Pittsburgh"
              required
              className="bg-slate-800 border-slate-700"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="state">State *</Label>
            <select
              id="state"
              value={formData.address.state}
              onChange={(e) => updateAddress("state", e.target.value)}
              required
              className="flex h-10 w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white"
            >
              <option value="">Select</option>
              {US_STATES.map((state) => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="zip">ZIP Code *</Label>
            <Input
              id="zip"
              value={formData.address.zip}
              onChange={(e) => updateAddress("zip", e.target.value)}
              placeholder="15213"
              required
              pattern="\d{5}(-\d{4})?"
              className="bg-slate-800 border-slate-700"
            />
          </div>
        </div>
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


