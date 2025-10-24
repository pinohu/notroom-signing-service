import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, FileText, Shield, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProcessServing = () => {
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
        title="Process Serving Services | $75 + Travel | Erie, PA"
        description="Professional process serving in Erie, PA. Fast, reliable legal document delivery. Licensed and bonded. $75 + $1.50/mile."
        keywords="process server Erie PA, legal document delivery, court document service, process serving Pennsylvania"
        canonical="https://notroom.com/services/process-serving"
      />

      <section className="bg-gradient-to-br from-[hsl(var(--hero-gradient-from))] to-[hsl(var(--hero-gradient-to))] text-primary-foreground py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-background/10 backdrop-blur-sm mb-6">
              <FileText className="w-10 h-10" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Professional Process Serving</h1>
            <p className="text-xl mb-8 opacity-90">
              Fast, reliable legal document delivery throughout Erie County. Licensed process server with proof of service.
            </p>
            <Button size="lg" variant="amber" onClick={scrollToBooking} className="text-lg px-8 py-6">
              Request Service - $75 + Travel
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <Card className="p-8 border-primary border-2">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Transparent Pricing</h2>
                <div className="text-5xl font-bold text-primary mb-2">$75</div>
                <p className="text-xl text-muted-foreground">Per serve + $1.50/mile from Erie</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-4">What's Included:</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                      <span>Personal document delivery</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                      <span>Proof of service affidavit</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                      <span>Multiple attempt service</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                      <span>Professional & discreet</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-4">Documents We Serve:</h3>
                  <ul className="space-y-2 text-sm">
                    <li>• Summons & complaints</li>
                    <li>• Subpoenas</li>
                    <li>• Divorce papers</li>
                    <li>• Eviction notices</li>
                    <li>• Court orders</li>
                    <li>• Small claims documents</li>
                    <li>• Restraining orders</li>
                    <li>• Business legal papers</li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <strong>How It Works:</strong> Provide us with the documents and recipient information. We'll make multiple attempts 
                  if needed and provide you with a notarized proof of service affidavit for court filing.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Need Documents Served?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Professional, reliable process serving throughout Erie County. Fast turnaround with proof of service.
            </p>
            <Button size="lg" variant="amber" onClick={scrollToBooking} className="text-lg px-8">
              Request Service
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ProcessServing;
