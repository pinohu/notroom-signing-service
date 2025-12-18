"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Loader2, Wifi, AlertCircle, CheckCircle } from "lucide-react"
import { toast } from "sonner"

interface EquipmentData {
  printerMake: string
  printerModel: string
  isDualTray: boolean
  hasColorPrinting: boolean
  scannerType: string
  internetProvider: string
  internetSpeed?: {
    download: number
    upload: number
    testedAt: string
  }
  hasBackupInternet: boolean
  mobileHotspot: boolean
}

interface Props {
  data?: EquipmentData
  onSave: (data: { equipment: EquipmentData }) => Promise<boolean>
  saving: boolean
}

const PRINTER_MAKES = [
  "HP",
  "Canon",
  "Brother",
  "Epson",
  "Lexmark",
  "Samsung",
  "Xerox",
  "Other"
]

const SCANNER_TYPES = [
  { value: "FLATBED", label: "Flatbed Scanner" },
  { value: "SHEET_FED", label: "Sheet-fed Scanner" },
  { value: "MULTI_FUNCTION", label: "Multi-function (Printer/Scanner)" },
  { value: "MOBILE", label: "Mobile Scanner App" },
]

export function EquipmentStep({ data, onSave, saving }: Props) {
  const [formData, setFormData] = useState<EquipmentData>({
    printerMake: data?.printerMake ?? "",
    printerModel: data?.printerModel ?? "",
    isDualTray: data?.isDualTray ?? false,
    hasColorPrinting: data?.hasColorPrinting ?? false,
    scannerType: data?.scannerType ?? "",
    internetProvider: data?.internetProvider ?? "",
    internetSpeed: data?.internetSpeed,
    hasBackupInternet: data?.hasBackupInternet ?? false,
    mobileHotspot: data?.mobileHotspot ?? false,
  })
  const [testingSpeed, setTestingSpeed] = useState(false)

  function updateField<K extends keyof EquipmentData>(field: K, value: EquipmentData[K]) {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  async function testInternetSpeed() {
    setTestingSpeed(true)
    try {
      // Simulated speed test - in production would use a real API
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const mockResult = {
        download: Math.round(50 + Math.random() * 100),
        upload: Math.round(10 + Math.random() * 30),
        testedAt: new Date().toISOString(),
      }
      
      updateField("internetSpeed", mockResult)
      toast.success(`Speed test complete: ${mockResult.download} Mbps down, ${mockResult.upload} Mbps up`)
    } catch (error) {
      toast.error("Speed test failed")
    } finally {
      setTestingSpeed(false)
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    await onSave({ equipment: formData })
  }

  const meetsRequirements = formData.isDualTray && formData.scannerType

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 mb-6">
        <h3 className="text-amber-400 font-medium mb-2">Equipment Requirements</h3>
        <ul className="text-sm text-slate-300 space-y-1">
          <li>• Dual-tray laser printer (required for loan signings)</li>
          <li>• Scanner capable of producing clear PDF scans</li>
          <li>• Reliable internet connection (10+ Mbps recommended)</li>
        </ul>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-white">Printer</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="printerMake">Printer Make *</Label>
            <select
              id="printerMake"
              value={formData.printerMake}
              onChange={(e) => updateField("printerMake", e.target.value)}
              required
              className="flex h-10 w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white"
            >
              <option value="">Select Make</option>
              {PRINTER_MAKES.map((make) => (
                <option key={make} value={make}>{make}</option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="printerModel">Printer Model *</Label>
            <Input
              id="printerModel"
              value={formData.printerModel}
              onChange={(e) => updateField("printerModel", e.target.value)}
              placeholder="LaserJet Pro M404n"
              required
              className="bg-slate-800 border-slate-700"
            />
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="isDualTray"
              checked={formData.isDualTray}
              onCheckedChange={(checked) => updateField("isDualTray", checked as boolean)}
            />
            <Label htmlFor="isDualTray" className="font-normal flex items-center gap-2">
              Dual-tray printer
              {formData.isDualTray ? (
                <CheckCircle className="h-4 w-4 text-green-500" />
              ) : (
                <AlertCircle className="h-4 w-4 text-amber-500" />
              )}
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="hasColorPrinting"
              checked={formData.hasColorPrinting}
              onCheckedChange={(checked) => updateField("hasColorPrinting", checked as boolean)}
            />
            <Label htmlFor="hasColorPrinting" className="font-normal">
              Color printing capability
            </Label>
          </div>
        </div>
      </div>

      <div className="space-y-4 border-t border-slate-800 pt-6">
        <h3 className="text-lg font-medium text-white">Scanner</h3>
        
        <div className="space-y-2">
          <Label htmlFor="scannerType">Scanner Type *</Label>
          <select
            id="scannerType"
            value={formData.scannerType}
            onChange={(e) => updateField("scannerType", e.target.value)}
            required
            className="flex h-10 w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-white"
          >
            <option value="">Select Type</option>
            {SCANNER_TYPES.map((type) => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-4 border-t border-slate-800 pt-6">
        <h3 className="text-lg font-medium text-white">Internet</h3>
        
        <div className="space-y-2">
          <Label htmlFor="internetProvider">Internet Provider *</Label>
          <Input
            id="internetProvider"
            value={formData.internetProvider}
            onChange={(e) => updateField("internetProvider", e.target.value)}
            placeholder="Comcast, Verizon, AT&T..."
            required
            className="bg-slate-800 border-slate-700"
          />
        </div>

        <div className="flex items-center gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={testInternetSpeed}
            disabled={testingSpeed}
            className="border-slate-700"
          >
            {testingSpeed ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Wifi className="mr-2 h-4 w-4" />
            )}
            Test Speed
          </Button>
          {formData.internetSpeed && (
            <span className="text-sm text-slate-300">
              {formData.internetSpeed.download} Mbps ↓ / {formData.internetSpeed.upload} Mbps ↑
            </span>
          )}
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="hasBackupInternet"
              checked={formData.hasBackupInternet}
              onCheckedChange={(checked) => updateField("hasBackupInternet", checked as boolean)}
            />
            <Label htmlFor="hasBackupInternet" className="font-normal">
              I have backup internet access
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="mobileHotspot"
              checked={formData.mobileHotspot}
              onCheckedChange={(checked) => updateField("mobileHotspot", checked as boolean)}
            />
            <Label htmlFor="mobileHotspot" className="font-normal">
              I have a mobile hotspot for field use
            </Label>
          </div>
        </div>
      </div>

      {!meetsRequirements && (
        <div className="flex items-center gap-2 text-amber-400 text-sm bg-amber-500/10 p-3 rounded-lg">
          <AlertCircle className="h-4 w-4 shrink-0" />
          A dual-tray printer is required for loan signing assignments
        </div>
      )}

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

