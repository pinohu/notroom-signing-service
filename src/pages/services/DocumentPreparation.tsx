import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import EnhancedUPLDisclaimer from "@/components/EnhancedUPLDisclaimer";
import LegalDisclaimer from "@/components/LegalDisclaimer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, FileText, Shield, Clock, BadgeCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DocumentPreparation = () => {
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
        title="Document Preparation Services | Starting at $100 | Erie, PA"
        description="Professional document preparation in Erie, PA. Affidavits, contracts, agreements, legal forms. Starting at $100. Quick turnaround, expert formatting."
        keywords="document preparation Erie PA, legal document preparation, affidavit preparation, contract drafting, form completion"
        canonical="https://notroom.com/services/document-preparation"
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[hsl(var(--hero-gradient-from))] to-[hsl(var(--hero-gradient-to))] text-primary-foreground py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-background/10 backdrop-blur-sm mb-6">
              <FileText className="w-10 h-10" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Professional Document Preparation</h1>
            <p className="text-xl mb-8 opacity-90">
              Get your legal documents professionally formatted and prepared. Affordable alternative to attorney fees for standard forms.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="amber" onClick={scrollToBooking} className="text-lg px-8 py-6">
                Book Now - From $100
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
                <h2 className="text-3xl font-bold mb-4">Transparent Pricing</h2>
                <div className="text-5xl font-bold text-primary mb-2">$100+</div>
                <p className="text-xl text-muted-foreground">Varies by document complexity</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <BadgeCheck className="w-5 h-5 text-primary" />
                    What We Do:
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                      <span>Format documents to legal standards</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                      <span>Type and organize your information</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                      <span>Review for completeness</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                      <span>Same-day turnaround available</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-primary" />
                    Common Documents:
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li>• Affidavits</li>
                    <li>• Living wills & advance directives</li>
                    <li>• Business contracts</li>
                    <li>• Purchase agreements</li>
                    <li>• Demand letters</li>
                    <li>• Personal agreements</li>
                    <li>• Real estate forms</li>
                    <li>• Custom documents</li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <strong>Important:</strong> We prepare documents based on your instructions but do not provide legal advice. 
                  For legal advice or complex matters, please consult with an attorney.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose Notroom for Document Preparation?</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="p-6">
                <Shield className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Professional Quality</h3>
                <p className="text-muted-foreground">
                  Years of experience preparing legal documents. Proper formatting and attention to detail.
                </p>
              </Card>

              <Card className="p-6">
                <Clock className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Quick Turnaround</h3>
                <p className="text-muted-foreground">
                  Most documents completed within 1-2 business days. Rush service available for urgent needs.
                </p>
              </Card>

              <Card className="p-6">
                <BadgeCheck className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Affordable Pricing</h3>
                <p className="text-muted-foreground">
                  Save hundreds compared to attorney fees for standard document preparation work.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* UPL Disclaimer */}
      <EnhancedUPLDisclaimer service="document-prep" />

      {/* Legal Disclaimers */}
      <div className="container mx-auto px-4 py-8">
        <LegalDisclaimer variant="compact" />
      </div>

      {/* CTA Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Need a Document Prepared?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Get professional document preparation without the high cost of attorney fees. Starting at just $100.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="amber" onClick={scrollToBooking} className="text-lg px-8">
                Book Appointment
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


export default DocumentPreparation;
