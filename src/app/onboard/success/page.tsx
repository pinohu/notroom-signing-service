"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Clock, Mail, ArrowRight, Home } from "lucide-react"
import Link from "next/link"

export default function OnboardSuccessPage() {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center py-12 px-4">
      <Card className="max-w-lg w-full bg-slate-900 border-slate-800">
        <CardHeader className="text-center pb-0">
          <div className="mx-auto mb-4 w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
            <CheckCircle2 className="h-10 w-10 text-green-500" />
          </div>
          <CardTitle className="text-2xl text-white">
            Application Submitted!
          </CardTitle>
          <CardDescription className="text-slate-400">
            Thank you for applying to join the Notroom Elite Network
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6 pt-6">
          {/* What happens next */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white">What happens next?</h3>
            
            <div className="flex gap-4">
              <div className="shrink-0 w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center">
                <Clock className="h-4 w-4 text-cyan-400" />
              </div>
              <div>
                <p className="font-medium text-white">Review Period</p>
                <p className="text-sm text-slate-400">
                  Our team will review your application within 24-48 hours
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="shrink-0 w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center">
                <Mail className="h-4 w-4 text-cyan-400" />
              </div>
              <div>
                <p className="font-medium text-white">Email Confirmation</p>
                <p className="text-sm text-slate-400">
                  You'll receive an email once your application is approved
                </p>
              </div>
            </div>
            
            <div className="flex gap-4">
              <div className="shrink-0 w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center">
                <ArrowRight className="h-4 w-4 text-cyan-400" />
              </div>
              <div>
                <p className="font-medium text-white">Start Earning</p>
                <p className="text-sm text-slate-400">
                  Once approved, you'll start receiving signing assignments
                </p>
              </div>
            </div>
          </div>

          {/* Contact info */}
          <div className="p-4 bg-slate-800/50 rounded-lg">
            <p className="text-sm text-slate-400">
              Have questions? Contact us at{" "}
              <a 
                href="mailto:support@notroom.com" 
                className="text-cyan-400 hover:underline"
              >
                support@notroom.com
              </a>
            </p>
          </div>

          {/* Actions */}
          <div className="flex flex-col gap-3">
            <Link href="/">
              <Button className="w-full bg-cyan-600 hover:bg-cyan-700">
                <Home className="mr-2 h-4 w-4" />
                Return to Homepage
              </Button>
            </Link>
            <Link href="/for-notaries">
              <Button variant="outline" className="w-full border-slate-700 text-slate-300">
                Learn More About Our Network
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
