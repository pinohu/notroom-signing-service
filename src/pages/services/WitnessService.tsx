import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, UserCheck, Shield, Clock, BadgeCheck, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

const WitnessService = () => {
  const navigate = useNavigate();

  const scrollToBooking = () => {
    navigate("/");
    setTimeout(() => {
      document.getElementById("booking-form")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <Layout>
      <SEO
        title="Professional Witness Services | $60 + Travel | Erie, PA"
        description="Professional witness services in Erie, PA. Neutral third-party for private agreements and contracts. Mobile service available. $60 + $1.50/mile travel."
        keywords="professional witness Erie PA, contract witness, agreement witness, third party witness, neutral witness service"
        canonical="https://notroom.com/services/witness-service"
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[hsl(var(--hero-gradient-from))] to-[hsl(var(--hero-gradient-to))] text-primary-foreground py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-background/10 backdrop-blur-sm mb-6">
              <UserCheck className="w-10 h-10" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Professional Witness Services</h1>
            <p className="text-xl mb-8 opacity-90">
              Neutral third-party witness for private agreements, contracts, and transactions that don't require notarization.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="amber" onClick={scrollToBooking} className="text-lg px-8 py-6">
                Book Witness Service - $60 + Travel
              </Button>
              <Button size="lg" variant="amberOutline" onClick={() => navigate("/calculator")}>
                Calculate Your Cost
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <Card className="p-8 border-primary border-2">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Simple, Transparent Pricing</h2>
                <div className="text-5xl font-bold text-primary mb-2">$60</div>
                <p className="text-xl text-muted-foreground">Base fee + $1.50/mile round-trip from Erie</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <BadgeCheck className="w-5 h-5 text-primary" />
                    What We Provide:
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                      <span>Neutral third-party verification</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                      <span>Professional witness signature</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                      <span>Document date verification</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                      <span>Mobile service at your location</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <UserCheck className="w-5 h-5 text-primary" />
                    Common Uses:
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li>• Private contracts & agreements</li>
                    <li>• Business transactions</li>
                    <li>• Settlement agreements</li>
                    <li>• Memorandums of understanding</li>
                    <li>• Personal agreements</li>
                    <li>• Partnership agreements</li>
                    <li>• Service contracts</li>
                    <li>• Any document needing witness signature</li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                <h4 className="font-semibold mb-2">Important Notes:</h4>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• This service is for documents that don't require notarization</li>
                  <li>• We serve as an impartial witness to the signing</li>
                  <li>• If your document requires notarization, book our Mobile Notary service instead</li>
                  <li>• Mobile service: $1.50/mile round-trip from Erie</li>
                </ul>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Witness vs Notary */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Witness Service vs. Notarization</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4 text-primary">Professional Witness Service ($60)</h3>
                <p className="text-muted-foreground mb-4">Best for:</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                    <span>Private agreements between parties</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                    <span>Business contracts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                    <span>Documents not requiring notarization</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                    <span>Lower cost option</span>
                  </li>
                </ul>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4 text-primary">Mobile Notary Service ($50+)</h3>
                <p className="text-muted-foreground mb-4">Required for:</p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                    <span>Legal documents (affidavits, deeds)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                    <span>Powers of attorney</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                    <span>Real estate transactions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                    <span>Government forms</span>
                  </li>
                </ul>
              </Card>
            </div>

            <div className="mt-8 text-center">
              <p className="text-muted-foreground">
                Not sure which service you need? <a href="tel:814-480-0989" className="text-primary hover:underline font-semibold">Call us at (814) 480-0989</a> and we'll help you choose.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Need a Professional Witness?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Get a neutral third-party witness for your agreements. Mobile service available throughout Erie County.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="amber" onClick={scrollToBooking} className="text-lg px-8">
                Book Witness Service
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate("/pricing")}>
                View All Services
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-6">
              Questions? Call us at <a href="tel:814-480-0989" className="text-primary hover:underline">(814) 480-0989</a>
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default WitnessService;
