import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Shield, Home, Building, Hospital, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SocialProof from "@/components/marketing/SocialProof";
import GuaranteeSection from "@/components/marketing/GuaranteeSection";
import TrustIndicators from "@/components/marketing/TrustIndicators";
import FAQSection from "@/components/marketing/FAQSection";

const MobileNotary = () => {
  const navigate = useNavigate();

  const scrollToBooking = () => {
    navigate("/");
    setTimeout(() => {
      const element = document.getElementById("booking-form");
      element?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const locations = [
    { icon: Home, title: "Your Home", desc: "Convenient home visits throughout Erie County" },
    { icon: Building, title: "Office or Business", desc: "Professional notarization at your workplace" },
    { icon: Hospital, title: "Hospital or Care Facility", desc: "Compassionate service for healthcare settings" },
  ];

  const serviceAreas = [
    "Erie", "Millcreek", "Harborcreek", "Fairview", "Girard",
    "North East", "Wesleyville", "Lawrence Park", "Edinboro", "Union City"
  ];

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Mobile Notary Service Erie PA",
    "provider": {
      "@type": "LocalBusiness",
      "name": "Notroom",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Erie",
        "addressRegion": "PA",
        "addressCountry": "US"
      }
    },
    "areaServed": [
      {"@type": "City", "name": "Erie", "address": {"@type": "PostalAddress", "addressRegion": "PA"}},
      {"@type": "City", "name": "Millcreek", "address": {"@type": "PostalAddress", "addressRegion": "PA"}}
    ],
    "description": "Professional mobile notary service in Erie, PA. We come to your location for convenient document notarization.",
    "offers": {
      "@type": "Offer",
      "price": "50",
      "priceCurrency": "USD"
    }
  };

  return (
    <Layout>
      <SEO
        title="Mobile Notary Service in Erie, PA - We Come to You"
        description="Professional mobile notary service in Erie, PA. Same-day appointments available. We travel to your home, office, or hospital. Licensed & bonded. Book now!"
        keywords="mobile notary erie pa, traveling notary pennsylvania, notary service erie county, home notary visit, mobile notarization near me"
        canonical="https://notroom.com/services/mobile-notary"
        schema={schema}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[hsl(var(--hero-gradient-from))] to-[hsl(var(--hero-gradient-to))] text-primary-foreground py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-accent text-accent-foreground border-0">
              Same-Day Available
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Mobile Notary Service in Erie, PA
            </h1>
            <p className="text-xl mb-8 opacity-90">
              We bring professional notary services to your location throughout Erie County and surrounding areas. Convenient, reliable, and professional.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={scrollToBooking}
                variant="secondary"
              >
                Schedule Mobile Visit - $50 + mileage
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-primary-foreground opacity-90 hover:opacity-100"
                onClick={() => window.location.href = "tel:814-480-0989"}
              >
                Call (814) 480-0989
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto space-y-6">
            <TrustIndicators />
          </div>
        </div>
      </section>

      {/* Locations Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">We Come to Your Location</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {locations.map((location, index) => (
                <Card key={index} className="p-6 text-center">
                  <location.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">{location.title}</h3>
                  <p className="text-muted-foreground">{location.desc}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose Mobile Notary?</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="p-6">
                <Clock className="w-10 h-10 text-primary mb-3" />
                <h3 className="font-bold mb-2">Same-Day Service</h3>
                <p className="text-sm text-muted-foreground">
                  Most appointments available same-day or next-day
                </p>
              </Card>
              <Card className="p-6">
                <Shield className="w-10 h-10 text-primary mb-3" />
                <h3 className="font-bold mb-2">PA Commissioned</h3>
                <p className="text-sm text-muted-foreground">
                  Pennsylvania-commissioned notary with required state education
                </p>
              </Card>
              <Card className="p-6">
                <MapPin className="w-10 h-10 text-primary mb-3" />
                <h3 className="font-bold mb-2">Wide Service Area</h3>
                <p className="text-sm text-muted-foreground">
                  Serving all of Erie County and surrounding areas
                </p>
              </Card>
              <Card className="p-6">
                <CheckCircle className="w-10 h-10 text-primary mb-3" />
                <h3 className="font-bold mb-2">No Travel Hassle</h3>
                <p className="text-sm text-muted-foreground">
                  We handle the commute so you don't have to
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Service Areas Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Service Areas</h2>
            <p className="text-center text-muted-foreground mb-8">
              We proudly serve the following communities in and around Erie County:
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {serviceAreas.map((area, index) => (
                <div key={index} className="flex items-center gap-2 p-3 bg-muted/30 rounded-lg">
                  <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                  <span className="text-sm font-medium">{area}</span>
                </div>
              ))}
            </div>
            <p className="text-center text-sm text-muted-foreground mt-6">
              Don't see your location? <a href="tel:814-480-0989" className="text-primary hover:underline">Call us</a> - we may still be able to help!
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Transparent Pricing</h2>
            <Card className="p-8">
              <div className="space-y-4">
                <div className="flex justify-between items-center pb-4 border-b">
                  <div>
                    <h3 className="font-bold">Notary Fee (per signature)</h3>
                    <p className="text-sm text-muted-foreground">As allowed by Pennsylvania law</p>
                  </div>
                  <span className="text-xl font-bold">$5-15</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b">
                  <div>
                    <h3 className="font-bold">Travel Service Fee</h3>
                    <p className="text-sm text-muted-foreground">Within Erie city limits</p>
                  </div>
                  <span className="text-2xl font-bold">$100</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b">
                  <div>
                    <h3 className="font-bold">Mileage Fee</h3>
                    <p className="text-sm text-muted-foreground">Outside Erie city limits (per mile)</p>
                  </div>
                  <span className="text-xl font-bold">$1.50</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b">
                  <div>
                    <h3 className="font-bold">Administrative Fee</h3>
                    <p className="text-sm text-muted-foreground">Scheduling and coordination</p>
                  </div>
                  <span className="text-xl font-bold">$10</span>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-bold">After-Hours Surcharge</h3>
                    <p className="text-sm text-muted-foreground">Evenings after 7 PM or weekends</p>
                  </div>
                  <span className="text-xl font-bold">+$50</span>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t">
                <p className="text-sm text-muted-foreground text-center">
                  Pennsylvania law limits notary fees to $5-15 per signature. Additional fees shown are for travel, scheduling, and administrative services.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Professional Commitments */}
      <GuaranteeSection />

      {/* FAQs */}
      <FAQSection 
        faqs={[
          {
            question: "How far will you travel?",
            answer: "We serve all of Erie County and surrounding areas including Crawford, Warren, Mercer, and Venango counties. Mileage fees apply outside Erie city limits at $1.50 per mile."
          },
          {
            question: "Do you offer same-day mobile notary service?",
            answer: "Yes! Most mobile appointments are available same-day or next-day. Call (814) 480-0989 for urgent scheduling."
          },
          {
            question: "How much does mobile notary service cost?",
            answer: "Base price is $50 ($5 PA notary fee + $45 service fee) plus $1.50 per mile from our Erie office (6238 Cobblestone Dr, Erie, PA 16509). Additional charges may apply for after-hours service or multiple documents."
          },
          {
            question: "Can you come to a hospital or nursing home?",
            answer: "Absolutely. We provide compassionate notary service at hospitals, nursing homes, and assisted living facilities throughout our service area."
          },
          {
            question: "What documents can you notarize during a mobile visit?",
            answer: "We can notarize virtually any document that requires notarization including powers of attorney, affidavits, contracts, real estate documents, loan modifications, and more."
          }
        ]}
      />

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Book Your Mobile Notary Visit Today</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Convenient, professional notary service at your location. Same-day appointments available throughout Erie County.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={scrollToBooking}
              variant="secondary"
            >
              Schedule Mobile Visit
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-primary-foreground opacity-90 hover:opacity-100"
              onClick={() => window.location.href = "tel:814-480-0989"}
            >
              Call (814) 480-0989
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default MobileNotary;
