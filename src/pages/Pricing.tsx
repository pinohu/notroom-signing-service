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
        description="Clear, upfront pricing for notary services in Erie, PA. Remote online notary $50, mobile notary $50 + mileage. No hidden fees. View all pricing."
        keywords="notary prices erie pa, notary cost, mobile notary pricing, online notary fees"
        canonical="https://notroom.com/pricing"
      />

      <section className="bg-gradient-to-br from-[hsl(var(--hero-gradient-from))] to-[hsl(var(--hero-gradient-to))] text-primary-foreground py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Simple, Transparent Pricing</h1>
            <p className="text-xl opacity-90">No hidden fees. No surprises. Just honest pricing for quality notary services.</p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-8">
              <h3 className="text-2xl font-bold mb-2">Remote Online Notary</h3>
              <div className="text-4xl font-bold mb-4">$50</div>
              <p className="text-muted-foreground mb-2">Per document</p>
              <p className="text-sm text-muted-foreground mb-6">$5 PA notary fee + $45 technology fee</p>
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
                  <span className="text-sm">Legally valid in all 50 states</span>
                </li>
              </ul>
              <Button className="w-full" onClick={() => navigate("/services/remote-online-notary")}>Learn More</Button>
            </Card>

            <Card className="p-8 border-primary border-2">
              <h3 className="text-2xl font-bold mb-2">Mobile Notary</h3>
              <div className="text-4xl font-bold mb-4">$50 + mileage</div>
              <p className="text-muted-foreground mb-2">Starting price</p>
              <p className="text-sm text-muted-foreground mb-6">$5 PA notary + $45 service + $1.50/mile from Erie</p>
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
              <div className="text-4xl font-bold mb-4">$175</div>
              <p className="text-muted-foreground mb-2">Base price + travel</p>
              <p className="text-sm text-muted-foreground mb-6">$5 PA notary + $170 signing agent service</p>
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

            <Card className="p-8">
              <h3 className="text-2xl font-bold mb-2">Apostille Services</h3>
              <div className="text-4xl font-bold mb-4">$245+</div>
              <p className="text-muted-foreground mb-2">Standard processing</p>
              <p className="text-sm text-muted-foreground mb-6">$5 PA notary + $240+ processing & coordination</p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Standard (7-10 days) $245</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Expedited (2-3 days) $395</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Full-chain authentication $495</span>
                </li>
              </ul>
              <Button className="w-full" onClick={() => navigate("/services/apostille")}>Learn More</Button>
            </Card>

            <Card className="p-8">
              <h3 className="text-2xl font-bold mb-2">I-9 Verification</h3>
              <div className="text-4xl font-bold mb-4">$85+</div>
              <p className="text-muted-foreground mb-2">Per employee verification</p>
              <p className="text-sm text-muted-foreground mb-6">In-person or remote verification available</p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span className="text-sm">In-person verification $85</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Remote verification $125</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Volume discounts available</span>
                </li>
              </ul>
              <Button className="w-full" onClick={() => navigate("/services/i9-verification")}>Learn More</Button>
            </Card>

            <Card className="p-8">
              <h3 className="text-2xl font-bold mb-2">Registered Office</h3>
              <div className="text-4xl font-bold mb-4">$149/yr</div>
              <p className="text-muted-foreground mb-2">Annual registered agent</p>
              <p className="text-sm text-muted-foreground mb-6">PA commercial registered office provider</p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span className="text-sm">PA street address provided</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Mail forwarding included</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span className="text-sm">LLC formation packages available</span>
                </li>
              </ul>
              <Button className="w-full" onClick={() => navigate("/services/registered-office")}>Learn More</Button>
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
                  <span><strong>RON Services:</strong> $5 per signature (maximum allowed by PA law) + $45 technology platform fee for secure video infrastructure, scheduling system, document storage, and administrative services. Total: $50 per document.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                  <span><strong>Mobile Notary:</strong> $5 per signature (as allowed by PA law) + $45 service fee + $1.50 per mile travel from 6238 Cobblestone Dr, Erie, PA 16509. Minimum: $50 + mileage.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                  <span><strong>Loan Signing Agent:</strong> $5 notary fee per signature + $170 signing agent service fee (covering document review, printing, travel, scanning, and overnight return shipping). Base: $175 + travel if mobile.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                  <span><strong>Apostille Services:</strong> $5 PA notary fee + $240+ processing & coordination (includes PA Dept of State fees). Standard (7-10 days) $245, Expedited (2-3 days) $395, Full-chain authentication $495.</span>
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
