"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Loader2, MapPin, Plus, X } from "lucide-react"

interface ServiceAreasData {
  primaryZip: string
  additionalZips: string[]
  maxTravelDistance: number
  willingToTravel: boolean
  travelFeePerMile?: number
}

interface Props {
  data?: ServiceAreasData
  onSave: (data: { serviceAreas: ServiceAreasData }) => Promise<boolean>
  saving: boolean
}

export function ServiceAreasStep({ data, onSave, saving }: Props) {
  const [formData, setFormData] = useState<ServiceAreasData>({
    primaryZip: data?.primaryZip ?? "",
    additionalZips: data?.additionalZips ?? [],
    maxTravelDistance: data?.maxTravelDistance ?? 25,
    willingToTravel: data?.willingToTravel ?? true,
    travelFeePerMile: data?.travelFeePerMile ?? 0.65,
  })
  const [newZip, setNewZip] = useState("")

  function updateField<K extends keyof ServiceAreasData>(field: K, value: ServiceAreasData[K]) {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  function addZip() {
    if (newZip && /^\d{5}$/.test(newZip) && !formData.additionalZips.includes(newZip)) {
      setFormData(prev => ({
        ...prev,
        additionalZips: [...prev.additionalZips, newZip],
      }))
      setNewZip("")
    }
  }

  function removeZip(zip: string) {
    setFormData(prev => ({
      ...prev,
      additionalZips: prev.additionalZips.filter(z => z !== zip),
    }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    await onSave({ serviceAreas: formData })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-slate-800 rounded-lg p-6 space-y-4">
        <div className="flex items-center gap-3">
          <MapPin className="h-8 w-8 text-cyan-400" />
          <div>
            <h3 className="text-lg font-medium text-white">Service Coverage</h3>
            <p className="text-sm text-slate-400">
              Define where you're willing to accept signings
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="primaryZip">Primary ZIP Code *</Label>
          <Input
            id="primaryZip"
            value={formData.primaryZip}
            onChange={(e) => updateField("primaryZip", e.target.value)}
            placeholder="15213"
            required
            pattern="\d{5}"
            maxLength={5}
            className="bg-slate-800 border-slate-700"
          />
          <p className="text-xs text-slate-500">
            This is your base location for calculating travel distances
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="maxTravelDistance">Maximum Travel Distance *</Label>
          <div className="flex items-center gap-2">
            <Input
              id="maxTravelDistance"
              type="number"
              value={formData.maxTravelDistance}
              onChange={(e) => updateField("maxTravelDistance", parseInt(e.target.value) || 0)}
              required
              min={5}
              max={100}
              className="bg-slate-800 border-slate-700 w-24"
            />
            <span className="text-slate-400">miles</span>
          </div>
        </div>
      </div>

      <div className="space-y-4 border-t border-slate-800 pt-6">
        <h3 className="text-lg font-medium text-white">Additional ZIP Codes</h3>
        <p className="text-sm text-slate-400">
          Add specific ZIP codes where you'd like to accept signings outside your radius
        </p>
        
        <div className="flex gap-2">
          <Input
            value={newZip}
            onChange={(e) => setNewZip(e.target.value)}
            placeholder="Enter ZIP"
            maxLength={5}
            className="bg-slate-800 border-slate-700 w-32"
          />
          <Button
            type="button"
            variant="outline"
            onClick={addZip}
            disabled={!newZip || !/^\d{5}$/.test(newZip)}
            className="border-slate-700"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {formData.additionalZips.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {formData.additionalZips.map((zip) => (
              <span
                key={zip}
                className="inline-flex items-center gap-1 px-3 py-1 bg-slate-800 rounded-full text-sm"
              >
                {zip}
                <button
                  type="button"
                  onClick={() => removeZip(zip)}
                  className="text-slate-400 hover:text-white"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-4 border-t border-slate-800 pt-6">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="willingToTravel"
            checked={formData.willingToTravel}
            onCheckedChange={(checked) => updateField("willingToTravel", checked as boolean)}
          />
          <Label htmlFor="willingToTravel" className="font-normal">
            I'm willing to travel beyond my radius for additional compensation
          </Label>
        </div>

        {formData.willingToTravel && (
          <div className="space-y-2 ml-6">
            <Label htmlFor="travelFeePerMile">Travel Fee Per Mile</Label>
            <div className="flex items-center gap-2">
              <span className="text-slate-400">$</span>
              <Input
                id="travelFeePerMile"
                type="number"
                value={formData.travelFeePerMile}
                onChange={(e) => updateField("travelFeePerMile", parseFloat(e.target.value) || 0)}
                step={0.05}
                min={0}
                max={2}
                className="bg-slate-800 border-slate-700 w-24"
              />
              <span className="text-slate-400">per mile (IRS rate: $0.67)</span>
            </div>
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


