import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Pricing = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <SEO
        title="Pricing - Transparent Notary Service Costs"
        description="Clear, upfront pricing for notary services in Erie, PA. Remote online notary $60, mobile notary $125. No hidden fees. View all pricing."
        keywords="notary prices erie pa, notary cost, mobile notary pricing, online notary fees"
        canonical="https://notroom.com/pricing"
      />

      <section className="bg-gradient-to-br from-[hsl(var(--hero-gradient-from))] to-[hsl(var(--hero-gradient-to))] text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Simple, Transparent Pricing</h1>
            <p className="text-xl text-white/90">No hidden fees. No surprises. Just honest pricing for quality notary services.</p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
            <Card className="p-8">
              <h3 className="text-2xl font-bold mb-2">Remote Online Notary</h3>
              <div className="text-4xl font-bold mb-4">$35</div>
              <p className="text-muted-foreground mb-2">Standard documents</p>
              <p className="text-sm text-muted-foreground mb-6">$5 notary fee + $30 platform/technology fee</p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Available by appointment</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Complete in 5 minutes</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Real estate docs $75</span>
                </li>
              </ul>
              <Button className="w-full" onClick={() => navigate("/services/remote-online-notary")}>Learn More</Button>
            </Card>

            <Card className="p-8 border-primary border-2">
              <h3 className="text-2xl font-bold mb-2">Mobile Notary</h3>
              <div className="text-4xl font-bold mb-4">$125+</div>
              <p className="text-muted-foreground mb-2">Starting price</p>
              <p className="text-sm text-muted-foreground mb-6">$5-15 notary fee + $100 travel + $10 admin</p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span className="text-sm">We come to you</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Same-day available</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Erie County coverage</span>
                </li>
              </ul>
              <Button className="w-full" onClick={() => navigate("/services/mobile-notary")}>Learn More</Button>
            </Card>

            <Card className="p-8">
              <h3 className="text-2xl font-bold mb-2">Loan Signing</h3>
              <div className="text-4xl font-bold mb-4">$150</div>
              <p className="text-muted-foreground mb-2">Per signing appointment</p>
              <p className="text-sm text-muted-foreground mb-6">$15 notary fee + $135 signing agent service</p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span className="text-sm">NNA certified</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span className="text-sm">$100K E&O insurance</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Print & scan included</span>
                </li>
              </ul>
              <Button className="w-full" onClick={() => navigate("/services/loan-signing-agent")}>Learn More</Button>
            </Card>
          </div>

          {/* Fee Disclosure */}
          <div className="max-w-4xl mx-auto mt-12">
            <Card className="p-8 bg-muted/30">
              <h3 className="text-xl font-bold mb-4 text-center">Pennsylvania Notary Fee Regulations</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Pennsylvania law regulates notary fees to protect consumers. Here's how our pricing complies with state law:
              </p>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                  <span><strong>RON Services:</strong> $5-15 per signature (maximum allowed by PA law) + $30-60 technology platform fee for secure video infrastructure, scheduling system, document storage, and administrative services. Standard docs $35 total, real estate docs $75 total.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                  <span><strong>Mobile Notary:</strong> $5-15 per signature (as allowed by PA law) + separate travel service fee, mileage, and administrative charges for on-location services.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                  <span><strong>Loan Signing Agent:</strong> $5-15 notary fee per signature + $135-185 signing agent service fee (covering document review, printing, travel, scanning, and overnight return shipping). Standard closings $150, hybrid/e-closings $200.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                  <span><strong>Apostille Services:</strong> PA Dept of State fee $15 + notarization $5-15 + service fees. Standard (7-10 days) $195, Expedited (1-2 days) $295, Full-chain authentication $495.</span>
                </li>
              </ul>
              <p className="text-xs text-muted-foreground mt-4 text-center">
                All pricing complies with 57 Pa.C.S. Chapter 3 (Pennsylvania Revised Uniform Law on Notarial Acts)
              </p>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Pricing;
