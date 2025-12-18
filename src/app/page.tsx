import Link from "next/link"
import { Button } from "@/components/ui/button"
import { 
  CheckCircle2, 
  MapPin, 
  Zap, 
  Users,
  ArrowRight
} from "lucide-react"
import { PublicHeader } from "@/components/nav/public-header"
import { PublicFooter } from "@/components/nav/public-footer"

export const metadata = {
  title: "Notroom | National Signing Service",
  description: "50-state signing coverage with 3-minute confirmation and 98%+ first-pass funding. The signing service title companies and lenders trust.",
}

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <PublicHeader />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-cyan-500/20 rounded-full border border-cyan-500/30">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-cyan-300 text-sm font-medium">National Signing Service Operations</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
              Closings That
              <span 
                className="block"
                style={{
                  background: 'linear-gradient(90deg, #22d3ee, #60a5fa, #22d3ee)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Never Miss
              </span>
            </h1>

            <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
              50-state signing coverage with 3-minute confirmation and 98%+ first-pass funding. 
              The signing service title companies and lenders trust.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" asChild className="bg-cyan-500 hover:bg-cyan-400 text-lg px-8">
                <Link href="/contact">
                  Start Free Pilot
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="border-slate-600 text-white hover:bg-slate-800">
                <Link href="/for-notaries">Join as Notary</Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-16 border-t border-slate-800">
              <div className="text-center">
                <div className="text-4xl font-bold text-cyan-400">3<span className="text-2xl">min</span></div>
                <div className="text-slate-500 text-sm mt-1">Avg Confirmation</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-cyan-400">98%+</div>
                <div className="text-slate-500 text-sm mt-1">First-Pass Funding</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-cyan-400">50</div>
                <div className="text-slate-500 text-sm mt-1">States Covered</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-cyan-400">2-7<span className="text-2xl">day</span></div>
                <div className="text-slate-500 text-sm mt-1">Vendor Pay</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem/Solution */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Stop Chasing Notaries. Start Closing.
            </h2>
            <p className="text-lg text-slate-600">
              Directory roulette costs you time, money, and deals. Notroom is your dedicated signing operations team.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-slate-50 rounded-2xl p-8">
              <div className="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center mb-6">
                <Zap className="h-6 w-6 text-cyan-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">3-Minute Confirmation</h3>
              <p className="text-slate-600">
                No more waiting. Get instant confirmation with our smart routing engine that matches the right notary every time.
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-8">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-6">
                <CheckCircle2 className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Zero-Defect Packages</h3>
              <p className="text-slate-600">
                QA gate before every shipment. Our 98%+ first-pass funding rate means fewer re-signs and happier borrowers.
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-8">
              <div className="w-12 h-12 bg-violet-100 rounded-xl flex items-center justify-center mb-6">
                <MapPin className="h-6 w-6 text-violet-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">50-State Coverage</h3>
              <p className="text-slate-600">
                In-person and RON coverage nationwide. One partner for all your signing needs, from Maine to California.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Service Tiers */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Service Tiers for Every Need
            </h2>
            <p className="text-lg text-slate-600">
              From standard closings to same-day rescues, we&apos;ve got you covered.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
              <div className="text-slate-600 font-medium mb-2">Standard</div>
              <div className="text-3xl font-bold text-slate-900 mb-4">$125-150</div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-slate-600">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  60-min confirmation SLA
                </li>
                <li className="flex items-center gap-2 text-slate-600">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  Next-day scanbacks
                </li>
                <li className="flex items-center gap-2 text-slate-600">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  QA verified
                </li>
              </ul>
              <Button variant="outline" className="w-full">Learn More</Button>
            </div>

            <div className="bg-gradient-to-b from-cyan-500 to-blue-600 rounded-2xl p-8 shadow-lg text-white relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-amber-400 text-amber-900 text-xs font-bold rounded-full">
                MOST POPULAR
              </div>
              <div className="font-medium mb-2 text-cyan-100">Priority</div>
              <div className="text-3xl font-bold mb-4">$175-225</div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4" />
                  15-min confirmation SLA
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4" />
                  Same-day scanbacks
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4" />
                  Elite notaries only
                </li>
              </ul>
              <Button className="w-full bg-white text-cyan-600 hover:bg-slate-100">Get Started</Button>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
              <div className="text-slate-600 font-medium mb-2">Rescue</div>
              <div className="text-3xl font-bold text-slate-900 mb-4">$250-350</div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-slate-600">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  Immediate dispatch
                </li>
                <li className="flex items-center gap-2 text-slate-600">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  Failed signing recovery
                </li>
                <li className="flex items-center gap-2 text-slate-600">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  After-hours available
                </li>
              </ul>
              <Button variant="outline" className="w-full">Learn More</Button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA for Notaries */}
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-violet-500/20 rounded-full border border-violet-500/30">
              <Users className="h-4 w-4 text-violet-300" />
              <span className="text-violet-300 text-sm font-medium">For Notary Signing Agents</span>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Join the Elite Notary Network
            </h2>
            <p className="text-lg text-slate-400 mb-8 max-w-2xl mx-auto">
              Fast pay (2-7 days), performance-based routing, and steady volume. 
              Top performers earn priority access to the best assignments.
            </p>

            <Button size="lg" asChild className="bg-violet-500 hover:bg-violet-400">
              <Link href="/for-notaries">
                Apply Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  )
}
