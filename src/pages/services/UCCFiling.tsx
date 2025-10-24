import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import LegalDisclaimer from "@/components/LegalDisclaimer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, FileText, Shield, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ServiceLocalSEO } from "@/components/local-seo/ServiceLocalSEO";
import { generateServiceSchema, generateBreadcrumbSchema } from "@/utils/schemaGenerator";

const UCCFiling = () => {
  const navigate = useNavigate();

  const scrollToBooking = () => {
    navigate("/");
    setTimeout(() => {
      document.getElementById("booking-form")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const serviceSchema = generateServiceSchema({
    name: "UCC Filing Services Pennsylvania",
    description: "Professional UCC filing services in Pennsylvania. UCC-1, amendments, continuations, terminations. $125 per filing plus state fees.",
    provider: "Notroom - UCC Filing Services",
    areaServed: "Pennsylvania",
    price: "125",
    url: "https://notroom.com/services/ucc-filing"
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://notroom.com" },
    { name: "Services", url: "https://notroom.com/pricing" },
    { name: "UCC Filing", url: "https://notroom.com/services/ucc-filing" }
  ]);

  const combinedSchema = {
    "@context": "https://schema.org",
    "@graph": [serviceSchema, breadcrumbSchema]
  };

  return (
    <Layout>
      <SEO
        title="UCC Filing Services | $125 | Erie, PA"
        description="Professional UCC filing services in Pennsylvania. UCC-1 financing statements, amendments, continuations. Expert assistance. $125."
        keywords="UCC filing Erie PA, UCC-1 filing, financing statement, secured transaction, Pennsylvania UCC"
        canonical="https://notroom.com/services/ucc-filing"
      />

      <section className="bg-gradient-to-br from-[hsl(var(--hero-gradient-from))] to-[hsl(var(--hero-gradient-to))] text-primary-foreground py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-background/10 backdrop-blur-sm mb-6">
              <FileCheck className="w-10 h-10" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">UCC Filing Services</h1>
            <p className="text-xl mb-8 opacity-90">
              Expert assistance with Uniform Commercial Code filings in Pennsylvania. Protect your secured interests with proper UCC-1 filings.
            </p>
            <Button size="lg" variant="amber" onClick={scrollToBooking} className="text-lg px-8 py-6">
              Get Started - $125
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <Card className="p-8 border-primary border-2">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Professional Service</h2>
                <div className="text-5xl font-bold text-primary mb-2">$125</div>
                <p className="text-xl text-muted-foreground">Per UCC filing</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-4">Our Services:</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                      <span>UCC-1 financing statements</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                      <span>Amendments & assignments</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                      <span>Continuation statements</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                      <span>Termination statements</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-4">Common Uses:</h3>
                  <ul className="space-y-2 text-sm">
                    <li>• Business loan security interests</li>
                    <li>• Equipment financing</li>
                    <li>• Inventory financing</li>
                    <li>• Accounts receivable financing</li>
                    <li>• Lease agreements</li>
                    <li>• Secured creditor protection</li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <strong>What We Do:</strong> We'll prepare and file your UCC documents with the Pennsylvania Department of State. 
                  Our service includes document preparation, filing with the state, and providing you with filed copies. 
                  State filing fees are additional.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Need UCC Filing Assistance?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Protect your secured interests with proper UCC filings. Expert assistance for lenders and secured creditors.
            </p>
            <Button size="lg" variant="amber" onClick={scrollToBooking} className="text-lg px-8">
              Get Started
            </Button>
          </div>
        </div>
      </section>

      {/* Legal Disclaimer */}
      <div className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <LegalDisclaimer variant="compact" />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UCCFiling;
