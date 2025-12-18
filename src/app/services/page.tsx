import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Clock, Zap, Shield, ArrowRight } from "lucide-react"
import { PublicHeader } from "@/components/nav/public-header"
import { PublicFooter } from "@/components/nav/public-footer"

export const metadata = {
  title: "Service Tiers | Notroom",
  description: "Choose from Standard, Priority, or Rescue signing services. 50-state coverage with guaranteed SLAs.",
}

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white">
      <PublicHeader />
      
      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Service Tiers Built for Closings
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            From routine signings to same-day rescues, we have a solution for every scenario.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 -mt-8">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Standard */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200">
              <div className="mb-6">
                <Clock className="h-10 w-10 text-slate-600 mb-4" />
                <h3 className="text-2xl font-bold text-slate-900">Standard</h3>
                <p className="text-slate-600 mt-2">For routine closings with flexible timing</p>
              </div>
              <div className="mb-6">
                <span className="text-4xl font-bold text-slate-900">$125-150</span>
                <span className="text-slate-600">/signing</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 mt-0.5" />
                  <span className="text-slate-700">60-minute confirmation SLA</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 mt-0.5" />
                  <span className="text-slate-700">Next-business-day scanbacks</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 mt-0.5" />
                  <span className="text-slate-700">QA-verified packages</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 mt-0.5" />
                  <span className="text-slate-700">Vetted, background-checked notaries</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 mt-0.5" />
                  <span className="text-slate-700">Real-time status updates</span>
                </li>
              </ul>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/contact">Get Started</Link>
              </Button>
            </div>

            {/* Priority */}
            <div className="bg-gradient-to-b from-cyan-500 to-blue-600 rounded-2xl p-8 shadow-xl text-white relative transform md:-translate-y-4">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 bg-amber-400 text-amber-900 text-sm font-bold rounded-full">
                MOST POPULAR
              </div>
              <div className="mb-6">
                <Zap className="h-10 w-10 text-white mb-4" />
                <h3 className="text-2xl font-bold">Priority</h3>
                <p className="text-cyan-100 mt-2">For time-sensitive closings</p>
              </div>
              <div className="mb-6">
                <span className="text-4xl font-bold">$175-225</span>
                <span className="text-cyan-100">/signing</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-white mt-0.5" />
                  <span>15-minute confirmation SLA</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-white mt-0.5" />
                  <span>Same-day scanbacks</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-white mt-0.5" />
                  <span>Elite-tier notaries only</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-white mt-0.5" />
                  <span>Priority escalation support</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-white mt-0.5" />
                  <span>Dedicated account manager</span>
                </li>
              </ul>
              <Button className="w-full bg-white text-cyan-600 hover:bg-slate-100" asChild>
                <Link href="/contact">Get Started</Link>
              </Button>
            </div>

            {/* Rescue */}
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-slate-200">
              <div className="mb-6">
                <Shield className="h-10 w-10 text-amber-600 mb-4" />
                <h3 className="text-2xl font-bold text-slate-900">Rescue</h3>
                <p className="text-slate-600 mt-2">For failed or urgent last-minute signings</p>
              </div>
              <div className="mb-6">
                <span className="text-4xl font-bold text-slate-900">$250-350</span>
                <span className="text-slate-600">/signing</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 mt-0.5" />
                  <span className="text-slate-700">Immediate dispatch</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 mt-0.5" />
                  <span className="text-slate-700">Failed signing recovery</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 mt-0.5" />
                  <span className="text-slate-700">After-hours & weekend availability</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 mt-0.5" />
                  <span className="text-slate-700">Hot-standby notary network</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-emerald-500 mt-0.5" />
                  <span className="text-slate-700">24/7 operations support</span>
                </li>
              </ul>
              <Button variant="outline" className="w-full" asChild>
                <Link href="/contact">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">
            Compare All Features
          </h2>
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-slate-100">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">Feature</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-slate-900">Standard</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-cyan-600">Priority</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-slate-900">Rescue</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="px-6 py-4 text-sm text-slate-700">Confirmation SLA</td>
                  <td className="px-6 py-4 text-center text-sm text-slate-600">60 min</td>
                  <td className="px-6 py-4 text-center text-sm font-medium text-cyan-600">15 min</td>
                  <td className="px-6 py-4 text-center text-sm text-slate-600">Immediate</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm text-slate-700">Scanback Delivery</td>
                  <td className="px-6 py-4 text-center text-sm text-slate-600">Next day</td>
                  <td className="px-6 py-4 text-center text-sm font-medium text-cyan-600">Same day</td>
                  <td className="px-6 py-4 text-center text-sm text-slate-600">Same day</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm text-slate-700">Notary Tier</td>
                  <td className="px-6 py-4 text-center text-sm text-slate-600">All tiers</td>
                  <td className="px-6 py-4 text-center text-sm font-medium text-cyan-600">Elite only</td>
                  <td className="px-6 py-4 text-center text-sm text-slate-600">Elite only</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm text-slate-700">After-Hours</td>
                  <td className="px-6 py-4 text-center text-sm text-slate-400">—</td>
                  <td className="px-6 py-4 text-center text-sm text-slate-400">—</td>
                  <td className="px-6 py-4 text-center text-sm text-emerald-600">✓</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 text-sm text-slate-700">Weekend Coverage</td>
                  <td className="px-6 py-4 text-center text-sm text-slate-400">—</td>
                  <td className="px-6 py-4 text-center text-sm text-slate-400">—</td>
                  <td className="px-6 py-4 text-center text-sm text-emerald-600">✓</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-slate-400 mb-8 max-w-xl mx-auto">
            Start with a free pilot—your first 10 signings are on us. See the Notroom difference firsthand.
          </p>
          <Button size="lg" asChild className="bg-cyan-500 hover:bg-cyan-400">
            <Link href="/contact">
              Start Free Pilot
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      <PublicFooter />
    </div>
  )
}


