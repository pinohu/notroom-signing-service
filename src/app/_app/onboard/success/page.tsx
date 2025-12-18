import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Clock, Mail, ArrowRight } from "lucide-react"

export default function OnboardingSuccessPage() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center py-12 px-4">
      <Card className="max-w-lg w-full bg-slate-900 border-slate-800">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
            <CheckCircle2 className="h-8 w-8 text-green-500" />
          </div>
          <CardTitle className="text-2xl text-white">
            Application Submitted!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-center text-slate-400">
            Thank you for applying to join the Notroom Elite Network. 
            Your application is now under review.
          </p>

          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-slate-800/50 rounded-lg">
              <Clock className="h-6 w-6 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-white font-medium">Review Timeline</h4>
                <p className="text-sm text-slate-400">
                  Our team typically reviews applications within 1-2 business days. 
                  Complex cases may take up to 5 business days.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-slate-800/50 rounded-lg">
              <Mail className="h-6 w-6 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-white font-medium">What's Next</h4>
                <p className="text-sm text-slate-400">
                  You'll receive an email notification once your application has 
                  been reviewed. If approved, you'll immediately be able to 
                  start receiving signing assignments.
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-6 space-y-3">
            <p className="text-sm text-slate-500 text-center">
              In the meantime, you can:
            </p>
            <div className="flex flex-col gap-2">
              <Button asChild variant="outline" className="w-full border-slate-700">
                <Link href="/resources">
                  Browse Training Resources
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="ghost" className="w-full text-slate-400">
                <Link href="/">
                  Return to Homepage
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

