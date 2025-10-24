import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, Car, FileText, Shield } from "lucide-react";
import { useNavigate } from "react-router-dom";
import LegalDisclaimer from "@/components/LegalDisclaimer";
import { ServiceLocalSEO } from "@/components/local-seo/ServiceLocalSEO";
import { generateServiceSchema, generateBreadcrumbSchema } from "@/utils/schemaGenerator";

const VehicleTitleTransfer = () => {
  const navigate = useNavigate();

  const scrollToBooking = () => {
    navigate("/");
    setTimeout(() => {
      document.getElementById("booking-form")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const serviceSchema = generateServiceSchema({
    name: "Vehicle Title Transfer Notary Erie PA",
    description: "Mobile notary for PA vehicle title transfers. We come to you in Erie County. $60 base fee + $1.50/mile travel. PennDOT MV-4ST forms.",
    provider: "Notroom - Vehicle Title Transfer Notary",
    areaServed: "Erie County PA",
    price: "60",
    url: "https://notroom.com/services/vehicle-title-transfer"
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://notroom.com" },
    { name: "Services", url: "https://notroom.com/pricing" },
    { name: "Vehicle Title Transfer", url: "https://notroom.com/services/vehicle-title-transfer" }
  ]);

  const combinedSchema = {
    "@context": "https://schema.org",
    "@graph": [serviceSchema, breadcrumbSchema]
  };

  return (
    <Layout>
      <SEO
        title="Vehicle Title Transfer Services | $40 + Travel | Erie, PA"
        description="Fast vehicle title transfer notarization in Erie, PA. Mobile service available. Required for private vehicle sales in Pennsylvania. $40 + $1.50/mile."
        keywords="vehicle title transfer Erie PA, car title notary, auto title notarization, PA title transfer"
        canonical="https://notroom.com/services/vehicle-title-transfer"
      />

      <section className="bg-gradient-to-br from-[hsl(var(--hero-gradient-from))] to-[hsl(var(--hero-gradient-to))] text-primary-foreground py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-background/10 backdrop-blur-sm mb-6">
              <Car className="w-10 h-10" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Vehicle Title Transfer Services</h1>
            <p className="text-xl mb-8 opacity-90">
              Quick notarization for PA vehicle title transfers. Required for all private vehicle sales. Mobile service available.
            </p>
            <Button size="lg" variant="amber" onClick={scrollToBooking} className="text-lg px-8 py-6">
              Book Mobile Service - $40 + Travel
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <Card className="p-8 border-primary border-2">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Simple Pricing</h2>
                <div className="text-5xl font-bold text-primary mb-2">$40</div>
                <p className="text-xl text-muted-foreground">Base fee + $1.50/mile from Erie</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-4">What's Included:</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                      <span>Notarization of vehicle title</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                      <span>Mobile service at your location</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                      <span>PA state compliant</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                      <span>Same-day appointments</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-4">When You Need This:</h3>
                  <ul className="space-y-2 text-sm">
                    <li>• Selling your vehicle privately</li>
                    <li>• Buying from private seller</li>
                    <li>• Gifting a vehicle to family</li>
                    <li>• Transferring ownership</li>
                    <li>• Estate vehicle transfers</li>
                    <li>• Required in Pennsylvania</li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <strong>Pennsylvania Law:</strong> All private vehicle sales in PA require notarization of the title. 
                  We'll come to your location for convenient service. Travel calculated at $1.50/mile round-trip from Erie.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Selling or Buying a Vehicle?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Get your PA vehicle title notarized quickly. Mobile service at your location.
            </p>
            <Button size="lg" variant="amber" onClick={scrollToBooking} className="text-lg px-8">
              Book Mobile Service
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default VehicleTitleTransfer;
