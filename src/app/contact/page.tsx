"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock,
  CheckCircle2,
  Building2,
  User
} from "lucide-react"
import { PublicHeader } from "@/components/nav/public-header"
import { PublicFooter } from "@/components/nav/public-footer"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    monthlyVolume: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <div className="min-h-screen bg-white">
      <PublicHeader />
      
      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Let&apos;s Talk
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Ready to see the Notroom difference? Start with a free pilot—your first 10 signings are on us.
          </p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Form */}
            <div>
              {isSubmitted ? (
                <Card>
                  <CardContent className="pt-12 pb-12 text-center">
                    <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 className="h-8 w-8 text-emerald-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Thank You!</h3>
                    <p className="text-slate-600 mb-6">
                      We&apos;ve received your request and will be in touch within 24 hours.
                    </p>
                    <Button variant="outline" onClick={() => setIsSubmitted(false)}>
                      Send Another Message
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle>Request a Pilot</CardTitle>
                    <CardDescription>
                      Tell us about your signing needs and we&apos;ll set you up with a free trial.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Your Name</Label>
                          <div className="relative">
                            <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                            <Input
                              id="name"
                              name="name"
                              placeholder="John Smith"
                              className="pl-10"
                              value={formData.name}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                            <Input
                              id="email"
                              name="email"
                              type="email"
                              placeholder="john@company.com"
                              className="pl-10"
                              value={formData.email}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="company">Company Name</Label>
                          <div className="relative">
                            <Building2 className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                            <Input
                              id="company"
                              name="company"
                              placeholder="ABC Title Company"
                              className="pl-10"
                              value={formData.company}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone</Label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                            <Input
                              id="phone"
                              name="phone"
                              type="tel"
                              placeholder="(555) 123-4567"
                              className="pl-10"
                              value={formData.phone}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="monthlyVolume">Monthly Signing Volume</Label>
                        <select
                          id="monthlyVolume"
                          name="monthlyVolume"
                          className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
                          value={formData.monthlyVolume}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select volume...</option>
                          <option value="1-10">1-10 signings/month</option>
                          <option value="11-50">11-50 signings/month</option>
                          <option value="51-100">51-100 signings/month</option>
                          <option value="100+">100+ signings/month</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message">Additional Details (Optional)</Label>
                        <textarea
                          id="message"
                          name="message"
                          placeholder="Tell us about your specific needs..."
                          className="w-full min-h-[100px] px-3 py-2 rounded-md border border-input bg-background text-sm"
                          value={formData.message}
                          onChange={handleChange}
                        />
                      </div>

                      <Button type="submit" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? "Sending..." : "Request Free Pilot"}
                      </Button>

                      <p className="text-xs text-slate-500 text-center">
                        Your first 10 signings are free. No commitment required.
                      </p>
                    </form>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-6">
                  Get in Touch
                </h2>
                <div className="space-y-4">
                  <a 
                    href="tel:814-480-0989" 
                    className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
                  >
                    <div className="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center">
                      <Phone className="h-6 w-6 text-cyan-600" />
                    </div>
                    <div>
                      <div className="font-medium text-slate-900">(814) 480-0989</div>
                      <div className="text-sm text-slate-500">Call or text</div>
                    </div>
                  </a>

                  <a 
                    href="mailto:closings@notroom.com" 
                    className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl hover:bg-slate-100 transition-colors"
                  >
                    <div className="w-12 h-12 bg-violet-100 rounded-xl flex items-center justify-center">
                      <Mail className="h-6 w-6 text-violet-600" />
                    </div>
                    <div>
                      <div className="font-medium text-slate-900">closings@notroom.com</div>
                      <div className="text-sm text-slate-500">Email us anytime</div>
                    </div>
                  </a>

                  <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                    <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                      <MapPin className="h-6 w-6 text-emerald-600" />
                    </div>
                    <div>
                      <div className="font-medium text-slate-900">Erie, Pennsylvania</div>
                      <div className="text-sm text-slate-500">Headquarters</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl">
                    <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                      <Clock className="h-6 w-6 text-amber-600" />
                    </div>
                    <div>
                      <div className="font-medium text-slate-900">Mon-Fri 8am-6pm EST</div>
                      <div className="text-sm text-slate-500">Business hours</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* FAQ Teaser */}
              <div className="bg-slate-900 rounded-2xl p-8 text-white">
                <h3 className="text-xl font-bold mb-4">Common Questions</h3>
                <ul className="space-y-3 text-slate-300 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-cyan-400 mt-0.5" />
                    <span>No setup fees or monthly minimums</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-cyan-400 mt-0.5" />
                    <span>First 10 signings are completely free</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-cyan-400 mt-0.5" />
                    <span>Get started in under 24 hours</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-cyan-400 mt-0.5" />
                    <span>Cancel anytime—no contracts</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  )
}

