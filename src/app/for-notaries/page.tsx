import Link from "next/link"
import { Button } from "@/components/ui/button"
import { 
  CheckCircle2, 
  DollarSign, 
  TrendingUp, 
  Clock, 
  Shield, 
  Star,
  ArrowRight,
  Users
} from "lucide-react"
import { PublicHeader } from "@/components/nav/public-header"
import { PublicFooter } from "@/components/nav/public-footer"

export const metadata = {
  title: "For Notaries | Notroom",
  description: "Join the Notroom elite notary network. Fast pay, steady volume, and performance-based routing.",
}

export default function ForNotariesPage() {
  return (
    <div className="min-h-screen bg-white">
      <PublicHeader />
      
      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-violet-900 to-violet-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-violet-500/20 rounded-full border border-violet-500/30">
              <Users className="h-4 w-4 text-violet-300" />
              <span className="text-violet-300 text-sm font-medium">Elite Notary Network</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Join the Network
              <span className="block text-violet-300">Built for Top Performers</span>
            </h1>
            <p className="text-xl text-violet-200 mb-8 max-w-2xl mx-auto">
              Fast pay, steady volume, and a scoring system that rewards excellence. 
              The best notaries get the best assignments.
            </p>
            <Button size="lg" asChild className="bg-white text-violet-900 hover:bg-violet-100">
              <Link href="/apply">
                Apply Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">
            Why Notaries Choose Notroom
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <DollarSign className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Fast Pay</h3>
              <p className="text-slate-600">
                Get paid in 2-7 days, not 30-60. We respect your time and cash flow.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-violet-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="h-8 w-8 text-violet-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Performance Routing</h3>
              <p className="text-slate-600">
                Top performers get first access to assignments. Your score opens doors.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-cyan-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Clock className="h-8 w-8 text-cyan-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Steady Volume</h3>
              <p className="text-slate-600">
                Direct relationships with title companies mean consistent work flow.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tier System */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-slate-900 mb-4">
              Elite Tier System
            </h2>
            <p className="text-center text-slate-600 mb-12">
              Your performance determines your tier. Higher tiers = better assignments.
            </p>

            <div className="grid md:grid-cols-4 gap-4">
              <div className="bg-white rounded-xl p-6 border-2 border-amber-700">
                <div className="w-10 h-10 bg-amber-700 rounded-full flex items-center justify-center mb-4">
                  <Star className="h-5 w-5 text-white" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">Bronze</h3>
                <p className="text-sm text-slate-600 mb-4">Starting tier for all new notaries</p>
                <ul className="text-xs text-slate-500 space-y-1">
                  <li>• Standard assignments</li>
                  <li>• 7-day payment</li>
                  <li>• Basic support</li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-6 border-2 border-slate-400">
                <div className="w-10 h-10 bg-slate-400 rounded-full flex items-center justify-center mb-4">
                  <Star className="h-5 w-5 text-white" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">Silver</h3>
                <p className="text-sm text-slate-600 mb-4">Score 60+ with 10+ signings</p>
                <ul className="text-xs text-slate-500 space-y-1">
                  <li>• Priority queue access</li>
                  <li>• 5-day payment</li>
                  <li>• Priority support</li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-6 border-2 border-amber-400">
                <div className="w-10 h-10 bg-amber-400 rounded-full flex items-center justify-center mb-4">
                  <Star className="h-5 w-5 text-white" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">Gold</h3>
                <p className="text-sm text-slate-600 mb-4">Score 75+ with 25+ signings</p>
                <ul className="text-xs text-slate-500 space-y-1">
                  <li>• First-look assignments</li>
                  <li>• 3-day payment</li>
                  <li>• Dedicated support</li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl p-6 text-white">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mb-4">
                  <Star className="h-5 w-5 text-violet-600" />
                </div>
                <h3 className="font-bold mb-2">Elite</h3>
                <p className="text-sm text-violet-200 mb-4">Score 90+ with 50+ signings</p>
                <ul className="text-xs text-violet-100 space-y-1">
                  <li>• Premium assignments</li>
                  <li>• 2-day payment</li>
                  <li>• VIP support</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">
              Requirements
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Shield className="h-5 w-5 text-cyan-600" />
                  Credentials
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-500 mt-0.5" />
                    <span className="text-slate-700">Active notary commission</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-500 mt-0.5" />
                    <span className="text-slate-700">NNA certification (preferred)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-500 mt-0.5" />
                    <span className="text-slate-700">E&O insurance ($25K+ minimum)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-500 mt-0.5" />
                    <span className="text-slate-700">Background check clearance</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Shield className="h-5 w-5 text-cyan-600" />
                  Equipment
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-500 mt-0.5" />
                    <span className="text-slate-700">Dual-tray laser printer</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-500 mt-0.5" />
                    <span className="text-slate-700">Scanner or scanning app</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-500 mt-0.5" />
                    <span className="text-slate-700">Reliable vehicle</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-500 mt-0.5" />
                    <span className="text-slate-700">Smartphone with internet</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-violet-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Grow Your Business?
          </h2>
          <p className="text-violet-200 mb-8 max-w-xl mx-auto">
            Join hundreds of notaries who&apos;ve made Notroom their primary signing source.
          </p>
          <Button size="lg" asChild className="bg-white text-violet-900 hover:bg-violet-100">
            <Link href="/apply">
              Apply Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      <PublicFooter />
    </div>
  )
}


