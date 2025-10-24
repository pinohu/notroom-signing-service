import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, Fingerprint, Shield, Clock, BadgeCheck, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ServiceLocalSEO } from "@/components/local-seo/ServiceLocalSEO";
import { generateServiceSchema, generateBreadcrumbSchema } from "@/utils/schemaGenerator";

const Fingerprinting = () => {
  const navigate = useNavigate();

  const scrollToBooking = () => {
    navigate("/");
    setTimeout(() => {
      document.getElementById("booking-form")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const serviceSchema = generateServiceSchema({
    name: "FBI-Approved Fingerprinting Services Erie PA",
    description: "FBI-approved electronic fingerprinting in Erie, PA. For teaching licenses, adoptions, background checks. Mobile service available. $35 + $1.50/mile travel.",
    provider: "Notroom - FBI-Approved Fingerprinting",
    areaServed: "Erie County PA",
    price: "35",
    url: "https://notroom.com/services/fingerprinting"
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://notroom.com" },
    { name: "Services", url: "https://notroom.com/pricing" },
    { name: "Fingerprinting", url: "https://notroom.com/services/fingerprinting" }
  ]);

  const combinedSchema = {
    "@context": "https://schema.org",
    "@graph": [serviceSchema, breadcrumbSchema]
  };

  return (
    <Layout>
      <SEO
        title="Fingerprinting Services Erie PA | $35 + Travel | FBI-Approved Electronic Fingerprinting"
        description="FBI-approved electronic fingerprinting Northwestern PA. Teaching licenses, adoptions, background checks. Mobile service Erie County. $35 + $1.50/mile travel."
        keywords="fingerprinting Erie PA, FBI fingerprinting Northwestern PA, electronic fingerprinting Erie County, background check fingerprints, teaching license fingerprints Erie, PA Act 34 fingerprinting"
        canonical="https://notroom.com/services/fingerprinting"
        schema={combinedSchema}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[hsl(var(--hero-gradient-from))] to-[hsl(var(--hero-gradient-to))] text-primary-foreground py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-background/10 backdrop-blur-sm mb-6">
              <Fingerprint className="w-10 h-10" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">FBI-Approved Fingerprinting Services</h1>
            <p className="text-xl mb-8 opacity-90">
              Professional electronic fingerprinting for background checks, licenses, and certifications. Mobile service available throughout Erie County.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="amber" onClick={scrollToBooking} className="text-lg px-8 py-6">
                Book Mobile Service - $35 + Travel
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
                <div className="text-5xl font-bold text-primary mb-2">$35</div>
                <p className="text-xl text-muted-foreground">Base fee + $1.50/mile round-trip from Erie</p>
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
                      <span>FBI-approved electronic fingerprinting</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                      <span>Electronic submission to agencies</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                      <span>Mobile service at your location</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                      <span>Quick, professional service</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <Fingerprint className="w-5 h-5 text-primary" />
                    Common Uses:
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li>• PA teaching license (Act 34/151 clearances)</li>
                    <li>• Real estate license</li>
                    <li>• Nursing & healthcare licenses</li>
                    <li>• Adoption & foster care</li>
                    <li>• Employment background checks</li>
                    <li>• Immigration (USCIS)</li>
                    <li>• Security clearances</li>
                    <li>• Professional certifications</li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Mobile Service Details:
                </h4>
                <p className="text-sm text-muted-foreground">
                  We bring FBI-approved fingerprinting equipment to your location anywhere in Erie County. 
                  Travel calculated at $1.50/mile round-trip from Erie. Example: 20 miles away = $35 + $60 travel = $95 total.
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
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose Notroom for Fingerprinting?</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="p-6">
                <Shield className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">FBI-Approved Equipment</h3>
                <p className="text-muted-foreground">
                  We use only FBI-certified electronic fingerprinting systems for accurate, reliable results.
                </p>
              </Card>

              <Card className="p-6">
                <MapPin className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Mobile Convenience</h3>
                <p className="text-muted-foreground">
                  No need to travel - we bring fingerprinting equipment to your workplace or home.
                </p>
              </Card>

              <Card className="p-6">
                <Clock className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Fast Processing</h3>
                <p className="text-muted-foreground">
                  Electronic submission means faster processing compared to traditional ink fingerprinting.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Local SEO Section */}
      <ServiceLocalSEO 
        serviceName="Fingerprinting Services"
        reviews={[
          { text: "Convenient mobile fingerprinting for my PA teaching license. They came to my school.", author: "Jennifer L.", city: "Erie", rating: 5 },
          { text: "Fast FBI-approved fingerprinting for adoption clearances. Professional service.", author: "Michael S.", city: "Millcreek", rating: 5 },
          { text: "Electronic fingerprints submitted same day. Much better than ink cards.", author: "Rachel W.", city: "Harborcreek", rating: 5 },
          { text: "Mobile service saved me so much time. Great for background check fingerprints.", author: "David P.", city: "Fairview", rating: 5 }
        ]}
      />

      {/* CTA Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Need Fingerprinting Services?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Schedule mobile fingerprinting at your location. FBI-approved equipment and professional service.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="amber" onClick={scrollToBooking} className="text-lg px-8">
                Book Mobile Fingerprinting
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

export default Fingerprinting;
