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
              <div className="text-4xl font-bold mb-4">$60</div>
              <p className="text-muted-foreground mb-6">Per notarization session</p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Available 24/7</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Complete in 5 minutes</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Digital certificate included</span>
                </li>
              </ul>
              <Button className="w-full" onClick={() => navigate("/services/remote-online-notary")}>Learn More</Button>
            </Card>

            <Card className="p-8 border-primary border-2">
              <h3 className="text-2xl font-bold mb-2">Mobile Notary</h3>
              <div className="text-4xl font-bold mb-4">$125</div>
              <p className="text-muted-foreground mb-6">Base fee + travel</p>
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
              <p className="text-muted-foreground mb-6">Per signing appointment</p>
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
        </div>
      </section>
    </Layout>
  );
};

export default Pricing;
