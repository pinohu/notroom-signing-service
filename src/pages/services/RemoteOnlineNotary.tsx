import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Video, Clock, Shield, Globe, FileCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

const RemoteOnlineNotary = () => {
  const navigate = useNavigate();

  const scrollToBooking = () => {
    navigate("/");
    setTimeout(() => {
      const element = document.getElementById("booking-form");
      element?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const features = [
    "Complete notarization in 5 minutes",
    "Available 24/7 including weekends",
    "Legally valid in all 50 states",
    "Bank-level encryption & security",
    "Digital certificate included",
    "Record stored securely for 10 years"
  ];

  const documents = [
    "Real estate documents",
    "Powers of attorney",
    "Affidavits & sworn statements",
    "Business contracts",
    "Healthcare directives",
    "Loan documents"
  ];

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Remote Online Notary (RON) Service",
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
    "areaServed": {
      "@type": "State",
      "name": "Pennsylvania"
    },
    "description": "Remote online notarization service available 24/7 in Pennsylvania. Get documents notarized via secure video call.",
    "offers": {
      "@type": "Offer",
      "price": "60",
      "priceCurrency": "USD"
    }
  };

  return (
    <Layout>
      <SEO
        title="Remote Online Notary (RON) Service in PA"
        description="Get documents notarized online in 5 minutes with Notroom's RON service in Pennsylvania. Available 24/7, legally valid nationwide. $60 per session. Book now!"
        keywords="remote online notary pennsylvania, RON service PA, online notarization erie pa, 24/7 notary service, virtual notary pennsylvania"
        canonical="https://notroom.com/services/remote-online-notary"
        schema={schema}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[hsl(var(--hero-gradient-from))] to-[hsl(var(--hero-gradient-to))] text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-[hsl(var(--action-cyan))] text-white border-0">
              Available 24/7
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Remote Online Notary (RON) Service
            </h1>
            <p className="text-xl mb-8 text-white/90">
              Get your documents notarized from anywhere in Pennsylvania. Secure, fast, and legally binding video notarization available 24/7.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={scrollToBooking}
                className="bg-white text-primary hover:bg-white/90"
              >
                Book Online Session - $60
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-white text-white hover:bg-white/10"
                onClick={() => navigate("/resources/how-ron-works")}
              >
                How RON Works
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose Remote Online Notarization?</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="p-6">
                <Clock className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Save Time</h3>
                <p className="text-muted-foreground">
                  Complete notarization in as little as 5 minutes. No travel, no waiting rooms, no scheduling conflicts.
                </p>
              </Card>
              <Card className="p-6">
                <Shield className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Maximum Security</h3>
                <p className="text-muted-foreground">
                  Bank-level 256-bit encryption, multi-factor authentication, and secure document storage for 10 years.
                </p>
              </Card>
              <Card className="p-6">
                <Globe className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Legally Valid</h3>
                <p className="text-muted-foreground">
                  RON notarizations are legally recognized in all 50 states and comply with Pennsylvania state law.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Upload Your Document</h3>
                  <p className="text-muted-foreground">
                    After booking, securely upload your document to our encrypted platform. We accept PDF, Word, and most common file formats.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Verify Your Identity</h3>
                  <p className="text-muted-foreground">
                    Present a valid government-issued photo ID during the video call. Our system performs knowledge-based authentication (KBA) as required by PA law.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Meet with Licensed Notary</h3>
                  <p className="text-muted-foreground">
                    Connect via secure video call with a Pennsylvania-licensed notary public. The entire session is recorded and stored as required by law.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                  4
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Receive Notarized Document</h3>
                  <p className="text-muted-foreground">
                    Your notarized document with digital certificate is emailed to you immediately. Original is stored securely for 10 years.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold mb-6">What's Included</h2>
                <ul className="space-y-3">
                  {features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-6">Accepted Documents</h2>
                <ul className="space-y-3">
                  {documents.map((doc, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <FileCheck className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>{doc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Book your remote online notary session now. Available 24/7 with instant confirmation.
          </p>
          <Button 
            size="lg" 
            onClick={scrollToBooking}
            className="bg-white text-primary hover:bg-white/90"
          >
            Book RON Session - $60
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default RemoteOnlineNotary;
