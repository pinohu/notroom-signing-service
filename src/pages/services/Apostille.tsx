import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Globe, FileCheck, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

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
              Apostille Services in Pennsylvania
            </h1>
            <p className="text-xl mb-8 text-white/90">
              Get your documents authenticated for international use. We handle the entire apostille process with the Pennsylvania Department of State.
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

      {/* What is Apostille */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">What is an Apostille?</h2>
            <Card className="p-8">
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
                    <h3 className="font-bold mb-2">Important Note</h3>
                    <p className="text-sm text-muted-foreground">
                      The apostille process varies by document type and destination country. We'll guide you through the specific requirements for your situation and ensure everything is done correctly.
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
                    <h3 className="text-xl font-bold mb-2">Document Review</h3>
                    <p className="text-muted-foreground">
                      We verify your documents are eligible for apostille and determine if any preliminary notarization is needed before submission to the PA Department of State.
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
                    <h3 className="text-xl font-bold mb-2">Notarization (If Required)</h3>
                    <p className="text-muted-foreground">
                      Many documents must be notarized before they can receive an apostille. We handle this step immediately if needed.
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
                    <h3 className="text-xl font-bold mb-2">State Submission</h3>
                    <p className="text-muted-foreground">
                      We submit your documents to the Pennsylvania Department of State for apostille certification. Standard processing is 3-5 business days; expedited available.
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
                    <h3 className="text-xl font-bold mb-2">Delivery</h3>
                    <p className="text-muted-foreground">
                      Once apostilled, we return your documents via secure tracked shipping or you can arrange local pickup in Erie.
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
                    <h3 className="font-bold">Standard Apostille Service</h3>
                    <p className="text-sm text-muted-foreground">Processing time: 5-7 business days</p>
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
                * Prices include notarization if required and state apostille fees
              </p>
            </Card>
          </div>
        </div>
      </section>

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
    </Layout>
  );
};

export default Apostille;
