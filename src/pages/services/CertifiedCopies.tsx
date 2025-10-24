import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, FileCheck, Shield, Clock, BadgeCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ServiceLocalSEO } from "@/components/local-seo/ServiceLocalSEO";
import { generateServiceSchema, generateBreadcrumbSchema } from "@/utils/schemaGenerator";

const CertifiedCopies = () => {
  const navigate = useNavigate();

  const scrollToBooking = () => {
    navigate("/");
    setTimeout(() => {
      document.getElementById("booking-form")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const serviceSchema = generateServiceSchema({
    name: "Certified Copy Services Erie PA",
    description: "Official certified copy services in Erie, PA. Birth certificates, diplomas, passports, legal documents. $20 per document. Same-day service available.",
    provider: "Notroom - PA Licensed Notary",
    areaServed: "Northwestern Pennsylvania",
    price: "20",
    url: "https://notroom.com/services/certified-copies"
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://notroom.com" },
    { name: "Services", url: "https://notroom.com/pricing" },
    { name: "Certified Copies", url: "https://notroom.com/services/certified-copies" }
  ]);

  const combinedSchema = {
    "@context": "https://schema.org",
    "@graph": [serviceSchema, breadcrumbSchema]
  };

  return (
    <Layout>
      <SEO
        title="Certified Copy Services Erie PA | $20 per Document | Crawford, Warren, Mercer Counties"
        description="Official certified copy services Northwestern PA. Birth certificates, diplomas, passports, legal documents. $20 per document. Same-day service Erie, Meadville, Warren, Sharon."
        keywords="certified copies Erie PA, document certification Northwestern PA, notarized copies Crawford County, birth certificate copy Warren PA, diploma certification Erie, certified documents Mercer County"
        canonical="https://notroom.com/services/certified-copies"
        schema={combinedSchema}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[hsl(var(--hero-gradient-from))] to-[hsl(var(--hero-gradient-to))] text-primary-foreground py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-background/10 backdrop-blur-sm mb-6">
              <FileCheck className="w-10 h-10" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Certified Copy Services</h1>
            <p className="text-xl mb-8 opacity-90">
              Official certified copies of your important documents. Accepted for legal, immigration, and business purposes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="amber" onClick={scrollToBooking} className="text-lg px-8 py-6">
                Book Now - $20 per Document
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
                <div className="text-5xl font-bold text-primary mb-2">$20</div>
                <p className="text-xl text-muted-foreground">Per certified document copy</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <BadgeCheck className="w-5 h-5 text-primary" />
                    What's Included:
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                      <span>Official notary certification</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                      <span>Notary seal and signature</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                      <span>Copy quality verification</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                      <span>Same-day service available</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <FileCheck className="w-5 h-5 text-primary" />
                    Common Documents:
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li>• Birth certificates</li>
                    <li>• Death certificates</li>
                    <li>• Marriage certificates</li>
                    <li>• Diplomas & transcripts</li>
                    <li>• Passports</li>
                    <li>• Driver's licenses</li>
                    <li>• Business documents</li>
                    <li>• Legal records</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose Notroom for Certified Copies?</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="p-6">
                <Shield className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Legally Valid</h3>
                <p className="text-muted-foreground">
                  Our certified copies are accepted by courts, government agencies, and institutions worldwide.
                </p>
              </Card>

              <Card className="p-6">
                <Clock className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Quick Service</h3>
                <p className="text-muted-foreground">
                  Most certified copies completed while you wait. Same-day appointments available.
                </p>
              </Card>

              <Card className="p-6">
                <BadgeCheck className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">PA Licensed Notary</h3>
                <p className="text-muted-foreground">
                  All certifications performed by state-commissioned, bonded Pennsylvania notary public.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Local SEO Section */}
      <ServiceLocalSEO 
        serviceName="Certified Copy Services"
        reviews={[
          { text: "Quick service for my birth certificate copy. Accepted by the court no problem.", author: "Karen M.", city: "Erie", rating: 5 },
          { text: "Needed certified diploma copies for my PA teaching license. Fast and affordable.", author: "Thomas R.", city: "Millcreek", rating: 5 },
          { text: "Professional notarized copies for immigration documents. Great service.", author: "Maria G.", city: "Harborcreek", rating: 5 },
          { text: "Same-day certified copies of my passport. Very convenient.", author: "John D.", city: "Fairview", rating: 5 }
        ]}
      />

      {/* CTA Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Need Certified Copies Today?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Get your documents certified quickly and professionally. Just $20 per document.
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

export default CertifiedCopies;
