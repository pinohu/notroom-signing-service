import { PublicHeader } from "@/components/nav/public-header"
import { PublicFooter } from "@/components/nav/public-footer"

export const metadata = {
  title: "Terms of Service | Notroom",
  description: "Notroom's terms of service and conditions of use.",
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <PublicHeader />
      
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto prose prose-slate">
            <h1>Terms of Service</h1>
            <p className="text-slate-600">Last updated: December 2024</p>

            <h2>Acceptance of Terms</h2>
            <p>
              By accessing or using Notroom&apos;s services, you agree to be bound by these Terms of Service. 
              If you do not agree to these terms, do not use our services.
            </p>

            <h2>Services Description</h2>
            <p>
              Notroom provides a platform connecting title companies and lenders with notary signing 
              agents for loan document signings. We facilitate the assignment, tracking, and 
              completion of signing orders.
            </p>

            <h2>User Accounts</h2>
            <p>
              You are responsible for maintaining the confidentiality of your account credentials 
              and for all activities that occur under your account.
            </p>

            <h2>For Title Companies</h2>
            <ul>
              <li>You agree to provide accurate signing order information</li>
              <li>Payment is due according to your agreed billing terms</li>
              <li>You are responsible for providing complete document packages</li>
            </ul>

            <h2>For Notary Signing Agents</h2>
            <ul>
              <li>You must maintain valid notary commission and required insurance</li>
              <li>You agree to complete accepted assignments professionally</li>
              <li>You must comply with all applicable notary laws and regulations</li>
              <li>Payment is made according to our vendor payment schedule</li>
            </ul>

            <h2>Limitation of Liability</h2>
            <p>
              Notroom is not liable for any indirect, incidental, special, consequential, or 
              punitive damages arising from your use of our services. Our total liability is 
              limited to the fees paid for the specific service giving rise to the claim.
            </p>

            <h2>Termination</h2>
            <p>
              Either party may terminate the relationship at any time. Outstanding obligations 
              survive termination.
            </p>

            <h2>Governing Law</h2>
            <p>
              These terms are governed by the laws of the Commonwealth of Pennsylvania.
            </p>

            <h2>Contact</h2>
            <p>
              Questions about these Terms should be directed to:<br />
              Email: legal@notroom.com<br />
              Phone: (814) 480-0989
            </p>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  )
}


