"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Loader2, Clock } from "lucide-react"

interface DayAvailability {
  available: boolean
  start?: string
  end?: string
}

interface AvailabilityData {
  timezone: string
  typicalHours: {
    monday: DayAvailability
    tuesday: DayAvailability
    wednesday: DayAvailability
    thursday: DayAvailability
    friday: DayAvailability
    saturday: DayAvailability
    sunday: DayAvailability
  }
  advanceNoticeHours: number
  acceptsSameDay: boolean
  acceptsAfterHours: boolean
  afterHoursFee?: number
  acceptsWeekends: boolean
  weekendFee?: number
}

interface Props {
  data?: AvailabilityData
  onSave: (data: { availability: AvailabilityData }) => Promise<boolean>
  saving: boolean
}

const DAYS = [
  { key: "monday", label: "Monday" },
  { key: "tuesday", label: "Tuesday" },
  { key: "wednesday", label: "Wednesday" },
  { key: "thursday", label: "Thursday" },
  { key: "friday", label: "Friday" },
  { key: "saturday", label: "Saturday" },
  { key: "sunday", label: "Sunday" },
] as const

const TIMEZONES = [
  { value: "America/New_York", label: "Eastern (ET)" },
  { value: "America/Chicago", label: "Central (CT)" },
  { value: "America/Denver", label: "Mountain (MT)" },
  { value: "America/Los_Angeles", label: "Pacific (PT)" },
  { value: "America/Phoenix", label: "Arizona" },
  { value: "America/Anchorage", label: "Alaska" },
  { value: "Pacific/Honolulu", label: "Hawaii" },
]

const defaultDay: DayAvailability = { available: false, start: "09:00", end: "17:00" }

export function AvailabilityStep({ data, onSave, saving }: Props) {
  const [formData, setFormData] = useState<AvailabilityData>({
    timezone: data?.timezone ?? "America/New_York",
    typicalHours: data?.typicalHours ?? {
      monday: { available: true, start: "09:00", end: "17:00" },
      tuesday: { available: true, start: "09:00", end: "17:00" },
      wednesday: { available: true, start: "09:00", end: "17:00" },
      thursday: { available: true, start: "09:00", end: "17:00" },
      friday: { available: true, start: "09:00", end: "17:00" },
      saturday: { available: false, start: "10:00", end: "14:00" },
      sunday: { available: false, start: "10:00", end: "14:00" },
    },
    advanceNoticeHours: data?.advanceNoticeHours ?? 2,
    acceptsSameDay: data?.acceptsSameDay ?? true,
    acceptsAfterHours: data?.acceptsAfterHours ?? false,
    afterHoursFee: data?.afterHoursFee ?? 50,
    acceptsWeekends: data?.acceptsWeekends ?? true,
    weekendFee: data?.weekendFee ?? 25,
  })

  function updateDay(day: keyof typeof formData.typicalHours, updates: Partial<DayAvailability>) {
    setFormData(prev => ({
      ...prev,
      typicalHours: {
        ...prev.typicalHours,
        [day]: { ...prev.typicalHours[day], ...updates },
      },
    }))
  }

  function updateField<K extends keyof AvailabilityData>(field: K, value: AvailabilityData[K]) {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    await onSave({ availability: formData })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-slate-800 rounded-lg p-6 space-y-4">
        <div className="flex items-center gap-3">
          <Clock className="h-8 w-8 text-cyan-400" />
          <div>
            <h3 className="text-lg font-medium text-white">Your Schedule</h3>
            <p className="text-sm text-slate-400">
              Set your typical working hours
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="timezone">Timezone *</Label>
        <select
          id="timezone"
          value={formData.timezone}
          onChange={(e) => updateField("timezone", e.target.value)}
          required
          className="flex h-10 w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white"
        >
          {TIMEZONES.map((tz) => (
            <option key={tz.value} value={tz.value}>{tz.label}</option>
          ))}
        </select>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-white">Weekly Schedule</h3>
        
        <div className="space-y-3">
          {DAYS.map(({ key, label }) => (
            <div key={key} className="flex items-center gap-4 p-3 bg-slate-800 rounded-lg">
              <div className="w-28">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id={key}
                    checked={formData.typicalHours[key].available}
                    onCheckedChange={(checked) => 
                      updateDay(key, { available: checked as boolean })
                    }
                  />
                  <Label htmlFor={key} className="font-normal">{label}</Label>
                </div>
              </div>
              
              {formData.typicalHours[key].available && (
                <div className="flex items-center gap-2">
                  <Input
                    type="time"
                    value={formData.typicalHours[key].start}
                    onChange={(e) => updateDay(key, { start: e.target.value })}
                    className="bg-slate-900 border-slate-700 w-32"
                  />
                  <span className="text-slate-400">to</span>
                  <Input
                    type="time"
                    value={formData.typicalHours[key].end}
                    onChange={(e) => updateDay(key, { end: e.target.value })}
                    className="bg-slate-900 border-slate-700 w-32"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4 border-t border-slate-800 pt-6">
        <h3 className="text-lg font-medium text-white">Preferences</h3>
        
        <div className="space-y-2">
          <Label htmlFor="advanceNotice">Minimum Advance Notice *</Label>
          <div className="flex items-center gap-2">
            <Input
              id="advanceNotice"
              type="number"
              value={formData.advanceNoticeHours}
              onChange={(e) => updateField("advanceNoticeHours", parseInt(e.target.value) || 0)}
              min={0}
              max={24}
              className="bg-slate-800 border-slate-700 w-20"
            />
            <span className="text-slate-400">hours</span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="acceptsSameDay"
              checked={formData.acceptsSameDay}
              onCheckedChange={(checked) => updateField("acceptsSameDay", checked as boolean)}
            />
            <Label htmlFor="acceptsSameDay" className="font-normal">
              Accept same-day signings
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="acceptsAfterHours"
              checked={formData.acceptsAfterHours}
              onCheckedChange={(checked) => updateField("acceptsAfterHours", checked as boolean)}
            />
            <Label htmlFor="acceptsAfterHours" className="font-normal">
              Accept after-hours signings (before 8am or after 8pm)
            </Label>
          </div>

          {formData.acceptsAfterHours && (
            <div className="ml-6 space-y-2">
              <Label htmlFor="afterHoursFee">After-hours fee</Label>
              <div className="flex items-center gap-2">
                <span className="text-slate-400">$</span>
                <Input
                  id="afterHoursFee"
                  type="number"
                  value={formData.afterHoursFee}
                  onChange={(e) => updateField("afterHoursFee", parseInt(e.target.value) || 0)}
                  min={0}
                  className="bg-slate-800 border-slate-700 w-24"
                />
              </div>
            </div>
          )}

          <div className="flex items-center space-x-2">
            <Checkbox
              id="acceptsWeekends"
              checked={formData.acceptsWeekends}
              onCheckedChange={(checked) => updateField("acceptsWeekends", checked as boolean)}
            />
            <Label htmlFor="acceptsWeekends" className="font-normal">
              Accept weekend signings
            </Label>
          </div>

          {formData.acceptsWeekends && (
            <div className="ml-6 space-y-2">
              <Label htmlFor="weekendFee">Weekend fee</Label>
              <div className="flex items-center gap-2">
                <span className="text-slate-400">$</span>
                <Input
                  id="weekendFee"
                  type="number"
                  value={formData.weekendFee}
                  onChange={(e) => updateField("weekendFee", parseInt(e.target.value) || 0)}
                  min={0}
                  className="bg-slate-800 border-slate-700 w-24"
                />
              </div>
            </div>
          )}
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


