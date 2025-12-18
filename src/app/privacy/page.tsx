import { PublicHeader } from "@/components/nav/public-header"
import { PublicFooter } from "@/components/nav/public-footer"

export const metadata = {
  title: "Privacy Policy | Notroom",
  description: "Notroom's privacy policy and data handling practices.",
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <PublicHeader />
      
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto prose prose-slate">
            <h1>Privacy Policy</h1>
            <p className="text-slate-600">Last updated: December 2024</p>

            <h2>Information We Collect</h2>
            <p>
              Notroom LLC (&quot;Notroom,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) collects information you provide directly 
              to us when you use our services, including:
            </p>
            <ul>
              <li>Name, email address, phone number, and mailing address</li>
              <li>Notary commission information and credentials</li>
              <li>Business information for title companies</li>
              <li>Payment and billing information</li>
              <li>Communications and correspondence with us</li>
            </ul>

            <h2>How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Provide, maintain, and improve our services</li>
              <li>Match signing orders with appropriate notaries</li>
              <li>Process payments and manage billing</li>
              <li>Communicate with you about services, updates, and support</li>
              <li>Comply with legal obligations</li>
            </ul>

            <h2>Information Sharing</h2>
            <p>
              We share personal information only as necessary to provide our services:
            </p>
            <ul>
              <li>With title companies when assigning notaries to signings</li>
              <li>With notaries when receiving signing assignments</li>
              <li>With service providers who assist our operations</li>
              <li>As required by law or to protect our rights</li>
            </ul>

            <h2>Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your 
              personal information against unauthorized access, alteration, disclosure, or destruction.
            </p>

            <h2>Your Rights</h2>
            <p>
              You may request access to, correction of, or deletion of your personal information 
              by contacting us at privacy@notroom.com.
            </p>

            <h2>Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy, please contact us at:
            </p>
            <p>
              Notroom LLC<br />
              Erie, Pennsylvania<br />
              Email: privacy@notroom.com<br />
              Phone: (814) 480-0989
            </p>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  )
}


