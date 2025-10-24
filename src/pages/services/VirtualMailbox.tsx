import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, Mail, Shield, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import LegalDisclaimer from "@/components/LegalDisclaimer";
import { ServiceLocalSEO } from "@/components/local-seo/ServiceLocalSEO";
import { generateServiceSchema, generateBreadcrumbSchema } from "@/utils/schemaGenerator";

const VirtualMailbox = () => {
  const navigate = useNavigate();

  const scrollToBooking = () => {
    navigate("/");
    setTimeout(() => {
      document.getElementById("booking-form")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const serviceSchema = generateServiceSchema({
    name: "Virtual Mailbox Services Erie PA",
    description: "Professional virtual mailbox and mail forwarding service in Erie PA. Digital mail scanning, forwarding, shredding. From $29/month.",
    provider: "Notroom - Virtual Mailbox",
    areaServed: "United States",
    price: "29",
    url: "https://notroom.com/services/virtual-mailbox"
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://notroom.com" },
    { name: "Services", url: "https://notroom.com/pricing" },
    { name: "Virtual Mailbox", url: "https://notroom.com/services/virtual-mailbox" }
  ]);

  const combinedSchema = {
    "@context": "https://schema.org",
    "@graph": [serviceSchema, breadcrumbSchema]
  };

  return (
    <Layout>
      <SEO
        title="Virtual Mailbox Service | $50/month | Erie, PA"
        description="Professional virtual mailbox in Erie, PA. Mail scanning and forwarding for businesses. PA business address included. $50/month."
        keywords="virtual mailbox Erie PA, mail forwarding, business mailbox, virtual address Pennsylvania"
        canonical="https://notroom.com/services/virtual-mailbox"
      />

      <section className="bg-gradient-to-br from-[hsl(var(--hero-gradient-from))] to-[hsl(var(--hero-gradient-to))] text-primary-foreground py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-background/10 backdrop-blur-sm mb-6">
              <Mail className="w-10 h-10" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Virtual Mailbox Service</h1>
            <p className="text-xl mb-8 opacity-90">
              Professional mail scanning and forwarding service. Perfect for remote businesses, digital nomads, and multi-location companies.
            </p>
            <Button size="lg" variant="amber" onClick={scrollToBooking} className="text-lg px-8 py-6">
              Start Service - $50/month
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <Card className="p-8 border-primary border-2">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Simple Monthly Pricing</h2>
                <div className="text-5xl font-bold text-primary mb-2">$50/mo</div>
                <p className="text-xl text-muted-foreground">All-inclusive service</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-4">What's Included:</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                      <span>PA business street address</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                      <span>Mail scanning & digital delivery</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                      <span>Mail forwarding on request</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                      <span>Online portal access 24/7</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-4">Perfect For:</h3>
                  <ul className="space-y-2 text-sm">
                    <li>• Remote businesses</li>
                    <li>• Home-based businesses</li>
                    <li>• Digital nomads</li>
                    <li>• Privacy protection</li>
                    <li>• Multi-location companies</li>
                    <li>• Startups & freelancers</li>
                    <li>• Professional business image</li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <strong>How It Works:</strong> You'll receive a professional Erie, PA street address. We scan your mail and upload it 
                  to your secure online portal. Request forwarding anytime, or have us shred junk mail. Perfect for businesses needing 
                  a professional presence without a physical office.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Ready for Your Virtual Mailbox?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Get a professional business address with mail scanning and forwarding. Start today for just $50/month.
            </p>
            <Button size="lg" variant="amber" onClick={scrollToBooking} className="text-lg px-8">
              Start Service
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default VirtualMailbox;
