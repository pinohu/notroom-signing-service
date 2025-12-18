"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  User,
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  ArrowRight,
  ArrowLeft
} from "lucide-react"
import { PublicHeader } from "@/components/nav/public-header"
import { PublicFooter } from "@/components/nav/public-footer"

export default function ApplyPage() {
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    commissionState: "",
    commissionNumber: "",
    commissionExpiry: "",
    nnaNumber: "",
    eoAmount: "",
    signingExperience: "",
    hasDualTrayPrinter: false,
    hasScanner: false,
    hasReliableVehicle: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const value = e.target.type === "checkbox" ? (e.target as HTMLInputElement).checked : e.target.value
    setFormData({ ...formData, [e.target.name]: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-white">
        <PublicHeader />
        <section className="pt-32 pb-20">
          <div className="container mx-auto px-4">
            <Card className="max-w-lg mx-auto">
              <CardContent className="pt-12 pb-12 text-center">
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="h-10 w-10 text-emerald-600" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Application Received!</h2>
                <p className="text-slate-600 mb-6">
                  Thank you for applying to join the Notroom network. We&apos;ll review your application 
                  and get back to you within 2-3 business days.
                </p>
                <p className="text-sm text-slate-500">
                  Check your email for a confirmation message.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
        <PublicFooter />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <PublicHeader />
      
      {/* Hero */}
      <section className="pt-32 pb-8 bg-gradient-to-b from-violet-900 to-violet-800">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Join the Notroom Network
          </h1>
          <p className="text-xl text-violet-200">
            Apply to become an elite signing agent
          </p>
        </div>
      </section>

      {/* Progress */}
      <section className="py-6 bg-violet-800">
        <div className="container mx-auto px-4">
          <div className="flex justify-center gap-4">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  s === step ? "bg-white text-violet-900" : 
                  s < step ? "bg-violet-400 text-white" : "bg-violet-700 text-violet-300"
                }`}>
                  {s < step ? <CheckCircle2 className="h-4 w-4" /> : s}
                </div>
                <span className={`hidden sm:inline text-sm ${s === step ? "text-white" : "text-violet-300"}`}>
                  {s === 1 ? "Personal Info" : s === 2 ? "Commission" : "Equipment"}
                </span>
                {s < 3 && <div className="w-8 h-0.5 bg-violet-600" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>
                {step === 1 && "Personal Information"}
                {step === 2 && "Commission Details"}
                {step === 3 && "Equipment & Experience"}
              </CardTitle>
              <CardDescription>
                {step === 1 && "Tell us about yourself"}
                {step === 2 && "Your notary commission information"}
                {step === 3 && "Your equipment and signing experience"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                {/* Step 1: Personal Info */}
                {step === 1 && (
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Street Address</Label>
                      <Input
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state">State</Label>
                        <Input
                          id="state"
                          name="state"
                          value={formData.state}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="zipCode">ZIP Code</Label>
                        <Input
                          id="zipCode"
                          name="zipCode"
                          value={formData.zipCode}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Commission */}
                {step === 2 && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="commissionState">Commission State</Label>
                      <Input
                        id="commissionState"
                        name="commissionState"
                        placeholder="e.g., Pennsylvania"
                        value={formData.commissionState}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="commissionNumber">Commission Number</Label>
                        <Input
                          id="commissionNumber"
                          name="commissionNumber"
                          value={formData.commissionNumber}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="commissionExpiry">Expiration Date</Label>
                        <Input
                          id="commissionExpiry"
                          name="commissionExpiry"
                          type="date"
                          value={formData.commissionExpiry}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="nnaNumber">NNA Number (Optional)</Label>
                      <Input
                        id="nnaNumber"
                        name="nnaNumber"
                        value={formData.nnaNumber}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="eoAmount">E&O Insurance Amount</Label>
                      <select
                        id="eoAmount"
                        name="eoAmount"
                        className="w-full h-10 px-3 rounded-md border border-input bg-background"
                        value={formData.eoAmount}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select amount...</option>
                        <option value="25000">$25,000</option>
                        <option value="50000">$50,000</option>
                        <option value="100000">$100,000+</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* Step 3: Equipment */}
                {step === 3 && (
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="signingExperience">Signing Experience</Label>
                      <select
                        id="signingExperience"
                        name="signingExperience"
                        className="w-full h-10 px-3 rounded-md border border-input bg-background"
                        value={formData.signingExperience}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select experience...</option>
                        <option value="0">New to loan signings</option>
                        <option value="1-10">1-10 signings</option>
                        <option value="11-50">11-50 signings</option>
                        <option value="51-100">51-100 signings</option>
                        <option value="100+">100+ signings</option>
                      </select>
                    </div>

                    <div className="space-y-4">
                      <Label>Equipment (Check all that apply)</Label>
                      <div className="space-y-3">
                        <label className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg cursor-pointer">
                          <input
                            type="checkbox"
                            name="hasDualTrayPrinter"
                            checked={formData.hasDualTrayPrinter}
                            onChange={handleChange}
                            className="h-4 w-4"
                          />
                          <span>Dual-tray laser printer</span>
                        </label>
                        <label className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg cursor-pointer">
                          <input
                            type="checkbox"
                            name="hasScanner"
                            checked={formData.hasScanner}
                            onChange={handleChange}
                            className="h-4 w-4"
                          />
                          <span>Scanner or scanning app</span>
                        </label>
                        <label className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg cursor-pointer">
                          <input
                            type="checkbox"
                            name="hasReliableVehicle"
                            checked={formData.hasReliableVehicle}
                            onChange={handleChange}
                            className="h-4 w-4"
                          />
                          <span>Reliable vehicle</span>
                        </label>
                      </div>
                    </div>
                  </div>
                )}

                {/* Navigation */}
                <div className="flex justify-between mt-8">
                  {step > 1 ? (
                    <Button type="button" variant="outline" onClick={() => setStep(step - 1)}>
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back
                    </Button>
                  ) : (
                    <div />
                  )}
                  
                  {step < 3 ? (
                    <Button type="button" onClick={() => setStep(step + 1)}>
                      Continue
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  ) : (
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? "Submitting..." : "Submit Application"}
                    </Button>
                  )}
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      <PublicFooter />
    </div>
  )
}


