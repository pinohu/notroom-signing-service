import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Target, Users, Zap, ArrowRight } from "lucide-react"
import { PublicHeader } from "@/components/nav/public-header"
import { PublicFooter } from "@/components/nav/public-footer"

export const metadata = {
  title: "About Us | Notroom",
  description: "Learn about Notroom's mission to transform the signing service industry with technology and excellence.",
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <PublicHeader />
      
      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            About Notroom
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            We&apos;re building the signing service that title companies deserve—one that actually works.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Our Mission</h2>
            <p className="text-lg text-slate-600 mb-6">
              Title companies and lenders face the same problem every day: finding reliable notaries is a gamble. 
              Directory roulette, no-shows, botched packages, and missed deadlines cost the industry millions 
              in delays and re-work.
            </p>
            <p className="text-lg text-slate-600 mb-6">
              Notroom was founded to solve this. We combine technology with a curated network of elite 
              signing agents to deliver closings that never miss. Our 3-minute confirmation SLA and 
              98%+ first-pass funding rate aren&apos;t marketing fluff—they&apos;re our operating standards.
            </p>
            <p className="text-lg text-slate-600">
              We believe in paying notaries fairly and quickly, giving title companies certainty, 
              and making the entire closing process less stressful for everyone involved.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">
            What We Stand For
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <div className="w-12 h-12 bg-cyan-100 rounded-xl flex items-center justify-center mb-6">
                <Target className="h-6 w-6 text-cyan-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Certainty Over Speed</h3>
              <p className="text-slate-600">
                We&apos;d rather get it right the first time than rush and fail. Every signing is QA-checked 
                before the package ships.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mb-6">
                <Users className="h-6 w-6 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Fair Pay, Fast Pay</h3>
              <p className="text-slate-600">
                Notaries are professionals who deserve to be paid fairly and promptly. 
                2-7 day payment is our standard, not an exception.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <div className="w-12 h-12 bg-violet-100 rounded-xl flex items-center justify-center mb-6">
                <Zap className="h-6 w-6 text-violet-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Technology + Humans</h3>
              <p className="text-slate-600">
                Smart routing and automation handle the logistics. Skilled notaries handle the signings. 
                The best of both worlds.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* By the Numbers */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">
            By the Numbers
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-5xl font-bold text-cyan-500 mb-2">50</div>
              <div className="text-slate-600">States Covered</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-cyan-500 mb-2">500+</div>
              <div className="text-slate-600">Active Notaries</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-cyan-500 mb-2">98%</div>
              <div className="text-slate-600">First-Pass Funding</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-cyan-500 mb-2">3min</div>
              <div className="text-slate-600">Avg Confirmation</div>
            </div>
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Based in Pennsylvania</h2>
            <p className="text-lg text-slate-600 mb-6">
              Notroom is headquartered in Erie, Pennsylvania. While our network spans all 50 states, 
              we&apos;re proud of our Pennsylvania roots and the work ethic that comes with them.
            </p>
            <div className="flex items-center justify-center gap-8 text-slate-600">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                PA-based operations
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                50-state coverage
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Work with Us?
          </h2>
          <p className="text-slate-400 mb-8 max-w-xl mx-auto">
            Whether you&apos;re a title company looking for reliable signings or a notary looking to grow your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="bg-cyan-500 hover:bg-cyan-400">
              <Link href="/contact">
                For Title Companies
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-slate-600 text-white hover:bg-slate-800">
              <Link href="/apply">For Notaries</Link>
            </Button>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  )
}

