import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, Languages, Shield, FileCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import LegalDisclaimer from "@/components/LegalDisclaimer";
import { ServiceLocalSEO } from "@/components/local-seo/ServiceLocalSEO";
import { generateServiceSchema, generateBreadcrumbSchema } from "@/utils/schemaGenerator";

const TranslationCertification = () => {
  const navigate = useNavigate();

  const scrollToBooking = () => {
    navigate("/");
    setTimeout(() => {
      document.getElementById("booking-form")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const serviceSchema = generateServiceSchema({
    name: "Translation Certification Services PA",
    description: "Notarized certification of translated documents for USCIS, courts, and official use. From $35 per page. Serving Northwestern Pennsylvania.",
    provider: "Notroom - Translation Certification",
    areaServed: "Pennsylvania",
    price: "35",
    url: "https://notroom.com/services/translation-certification"
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://notroom.com" },
    { name: "Services", url: "https://notroom.com/pricing" },
    { name: "Translation Certification", url: "https://notroom.com/services/translation-certification" }
  ]);

  const combinedSchema = {
    "@context": "https://schema.org",
    "@graph": [serviceSchema, breadcrumbSchema]
  };

  return (
    <Layout>
      <SEO
        title="Translation Certification Services | From $35/page | Erie, PA"
        description="Professional translation certification in Erie, PA. Notarized translations for immigration, legal, business documents. From $35 per page."
        keywords="translation certification Erie PA, notarized translation, certified translation, document translation"
        canonical="https://notroom.com/services/translation-certification"
      />

      <section className="bg-gradient-to-br from-[hsl(var(--hero-gradient-from))] to-[hsl(var(--hero-gradient-to))] text-primary-foreground py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-background/10 backdrop-blur-sm mb-6">
              <Languages className="w-10 h-10" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Translation Certification Services</h1>
            <p className="text-xl mb-8 opacity-90">
              Professional certification of translated documents for immigration, legal proceedings, and business purposes.
            </p>
            <Button size="lg" variant="amber" onClick={scrollToBooking} className="text-lg px-8 py-6">
              Get Started - From $35/page
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
                <div className="text-5xl font-bold text-primary mb-2">$35+</div>
                <p className="text-xl text-muted-foreground">Per page certified</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-4">Our Services:</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                      <span>Notarized certification of translations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                      <span>Certified translator network</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                      <span>Accepted by USCIS & courts</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                      <span>Quick turnaround times</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-4">Common Documents:</h3>
                  <ul className="space-y-2 text-sm">
                    <li>• Birth certificates</li>
                    <li>• Marriage certificates</li>
                    <li>• Diplomas & transcripts</li>
                    <li>• Legal documents</li>
                    <li>• Immigration papers</li>
                    <li>• Business contracts</li>
                    <li>• Medical records</li>
                    <li>• Court documents</li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <strong>Note:</strong> Translation certification includes our notary certification that the translated document is accurate. 
                  We work with certified translators for major languages including Spanish, Arabic, Chinese, and more.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Need a Certified Translation?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Get your documents professionally translated and certified. Accepted by USCIS, courts, and institutions.
            </p>
            <Button size="lg" variant="amber" onClick={scrollToBooking} className="text-lg px-8">
              Request Quote
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default TranslationCertification;
