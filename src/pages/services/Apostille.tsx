import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Globe, FileCheck, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import LegalDisclaimer from "@/components/LegalDisclaimer";
import SocialProof from "@/components/marketing/SocialProof";
import TrustIndicators from "@/components/marketing/TrustIndicators";
import UrgencyBanner from "@/components/marketing/UrgencyBanner";
import FAQSection from "@/components/marketing/FAQSection";

const Apostille = () => {
  const navigate = useNavigate();

  const scrollToBooking = () => {
    navigate("/");
    setTimeout(() => {
      const element = document.getElementById("booking-form");
      element?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const documents = [
    "Birth certificates", "Marriage certificates", "Death certificates",
    "Divorce decrees", "Adoption papers", "Court documents",
    "Power of attorney", "Business documents", "Educational diplomas",
    "Transcripts", "Corporate documents", "Affidavits"
  ];

  const countries = [
    "Canada", "Mexico", "United Kingdom", "Germany", "France", "Spain",
    "Italy", "China", "Japan", "Australia", "Brazil", "India"
  ];

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Apostille Services Pennsylvania",
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
    "description": "Professional apostille services for international document authentication in Pennsylvania. Fast, reliable service for documents going abroad.",
    "offers": {
      "@type": "Offer",
      "price": "175",
      "priceCurrency": "USD"
    }
  };

  return (
    <Layout>
      <SEO
        title="Apostille Services in Pennsylvania - International Documents"
        description="Professional apostille services in PA for international document authentication. Birth certificates, marriage certificates, diplomas, and more. Fast processing. Call (814) 480-0989."
        keywords="apostille service pennsylvania, apostille erie pa, document authentication, international notary, hague apostille PA"
        canonical="https://notroom.com/services/apostille"
        schema={schema}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[hsl(var(--hero-gradient-from))] to-[hsl(var(--hero-gradient-to))] text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-[hsl(var(--action-cyan))] text-white border-0">
              International Documents
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Apostille Assistance & Document Preparation in Pennsylvania
            </h1>
            <p className="text-xl mb-8 text-white/90">
              We notarize your documents and assist with the apostille application process through the Pennsylvania Department of State.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={scrollToBooking}
                className="bg-white text-primary hover:bg-white/90"
              >
                Get Started - $175
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-white text-white hover:bg-white/10"
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
            <UrgencyBanner type="seasonal" message="International document rush? We offer 24-hour expedited processing!" />
          </div>
        </div>
      </section>

      {/* What is Apostille */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">What is an Apostille?</h2>
            <Card className="p-8">
              <div className="bg-primary/10 border-l-4 border-primary p-6 mb-6">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold mb-2 text-primary">Important Disclaimer</h3>
                    <p className="text-sm">
                      <strong>Please note:</strong> Notaries cannot issue apostilles in Pennsylvania. Only the Pennsylvania Department of State can authenticate documents with an apostille. We provide document notarization and assistance with the apostille application process.
                    </p>
                  </div>
                </div>
              </div>
              <p className="text-lg mb-4">
                An apostille is an official certification that authenticates the origin of a public document for use in another country. It's required under the Hague Convention for documents traveling between member countries.
              </p>
              <p className="text-muted-foreground mb-6">
                Think of it as an international seal of approval that verifies your document is legitimate and can be legally recognized abroad. Without an apostille, foreign governments and institutions may not accept your documents.
              </p>
              <div className="bg-muted/30 p-6 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold mb-2">How We Help</h3>
                    <p className="text-sm text-muted-foreground">
                      The apostille process varies by document type and destination country. We notarize your documents (if needed), prepare your apostille application, and can submit it to the PA Department of State on your behalf.
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Our Apostille Process</h2>
            <div className="space-y-6">
              <Card className="p-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Document Review & Notarization</h3>
                    <p className="text-muted-foreground">
                      We verify your documents are eligible for apostille and provide notarization if required ($5-15 per signature as allowed by PA law). Many documents must be notarized before they can receive an apostille.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Apostille Application Preparation</h3>
                    <p className="text-muted-foreground">
                      We prepare your complete apostille application package with all required documentation for submission to the PA Department of State.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Submission to PA Department of State</h3>
                    <p className="text-muted-foreground">
                      We submit your documents to the Pennsylvania Department of State for apostille certification. Typical processing: 2-3 weeks standard; expedited options available.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                    4
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Delivery of Apostilled Documents</h3>
                    <p className="text-muted-foreground">
                      Once the PA Department of State issues the apostille, we return your authenticated documents via secure tracked shipping or local pickup in Erie.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Documents & Countries */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold mb-6">Common Documents</h2>
                <div className="grid grid-cols-2 gap-3">
                  {documents.map((doc, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <FileCheck className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>{doc}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-6">Popular Destinations</h2>
                <div className="grid grid-cols-2 gap-3">
                  {countries.map((country, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <Globe className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>{country}</span>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  And 100+ other Hague Convention member countries
                </p>
              </div>
            </div>
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
                    <h3 className="font-bold">Document Notarization + Apostille Assistance</h3>
                    <p className="text-sm text-muted-foreground">Includes notarization + application preparation + submission assistance</p>
                  </div>
                  <span className="text-2xl font-bold">$175</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b">
                  <div>
                    <h3 className="font-bold">Expedited Service</h3>
                    <p className="text-sm text-muted-foreground">Processing time: 2-3 business days</p>
                  </div>
                  <span className="text-xl font-bold">$275</span>
                </div>
                <div className="flex justify-between items-center pb-4 border-b">
                  <div>
                    <h3 className="font-bold">Rush Service</h3>
                    <p className="text-sm text-muted-foreground">Processing time: 24 hours</p>
                  </div>
                  <span className="text-xl font-bold">$375</span>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-bold">Additional Documents</h3>
                    <p className="text-sm text-muted-foreground">When processed together</p>
                  </div>
                  <span className="text-xl font-bold">$50</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-6 text-center">
                * Prices include notarization ($5-15 per signature per PA law), application preparation, and submission assistance. PA Department of State processing fees and shipping are additional. Processing times reflect PA DOS typical turnaround.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <SocialProof service="apostille" />

      {/* FAQs */}
      <FAQSection 
        faqs={[
          {
            question: "What documents can be apostilled?",
            answer: "Common documents include birth certificates, marriage certificates, diplomas, transcripts, powers of attorney, corporate documents, and court documents. Most public documents can receive an apostille."
          },
          {
            question: "How long does the apostille process take?",
            answer: "Standard processing through PA Department of State takes 2-3 weeks. We offer expedited service (2-3 business days) for $275 and rush service (24 hours) for $375."
          },
          {
            question: "Do all documents need to be notarized before apostille?",
            answer: "Many documents require notarization before they can receive an apostille. We'll review your documents and provide notarization if needed as part of our service."
          },
          {
            question: "Which countries accept apostilles?",
            answer: "Apostilles are accepted by all Hague Convention member countries (100+ nations) including Canada, Mexico, UK, Germany, France, Spain, China, Japan, Australia, and Brazil."
          },
          {
            question: "How much does apostille service cost?",
            answer: "Our complete service starts at $175 (standard 2-3 weeks) and includes document notarization, application preparation, and submission assistance. Expedited and rush options available."
          }
        ]}
      />

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Need Documents Apostilled?</h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Let us handle the complex apostille process for you. Fast, reliable, and stress-free international document authentication.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={scrollToBooking}
              className="bg-white text-primary hover:bg-white/90"
            >
              Start Apostille Process
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-white text-white hover:bg-white/10"
              onClick={() => window.location.href = "tel:814-480-0989"}
            >
              Call (814) 480-0989
            </Button>
          </div>
        </div>
      </section>

      {/* Legal Disclaimer */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <LegalDisclaimer service="apostille" />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Apostille;
