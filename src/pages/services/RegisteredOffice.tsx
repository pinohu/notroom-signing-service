import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Building, FileText, Bell, Shield, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import LegalDisclaimer from "@/components/LegalDisclaimer";
import SocialProof from "@/components/marketing/SocialProof";
import TrustIndicators from "@/components/marketing/TrustIndicators";
import FAQSection from "@/components/marketing/FAQSection";

const RegisteredOffice = () => {
  const navigate = useNavigate();

  const scrollToBooking = () => {
    navigate("/");
    setTimeout(() => {
      const element = document.getElementById("booking-form");
      element?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const registeredOfficeFeatures = [
    "PA-compliant Commercial Registered Office Provider (CROP)",
    "Professional business address for your LLC/Corporation",
    "Mail scanning & digital forwarding",
    "Service of process acceptance",
    "Annual report reminders",
    "Secure document vault"
  ];

  const filingServices = [
    { service: "LLC Formation", desc: "Complete setup with Articles of Organization", price: "$149" },
    { service: "Corporation Formation", desc: "Articles of Incorporation filing", price: "$199" },
    { service: "DBA/Fictitious Name", desc: "Trade name registration", price: "$99" },
    { service: "Annual Report Filing", desc: "On-time PA corporate filings", price: "$79" },
    { service: "EIN Assistance", desc: "Federal tax ID number application", price: "$49" },
    { service: "Operating Agreement", desc: "Customized LLC templates", price: "$99" }
  ];

  const complianceClubFeatures = [
    "Automatic annual report reminders",
    "FinCEN BOI deadline tracking",
    "Document storage & retrieval",
    "Secretary of State filing monitoring",
    "Priority email support",
    "10% discount on all filings"
  ];

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Pennsylvania Registered Office & Business Filing Services",
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
    "description": "Pennsylvania Commercial Registered Office Provider (CROP) and business filing services. LLC formation, registered office address, annual reports, and compliance management.",
    "offers": {
      "@type": "Offer",
      "price": "99",
      "priceCurrency": "USD"
    }
  };

  return (
    <Layout>
      <SEO
        title="PA Registered Office & Business Filing Services - CROP"
        description="Pennsylvania Commercial Registered Office Provider (CROP) services. LLC formation, registered office address, annual reports, DBA filing. From $99/year. Erie, PA."
        keywords="Pennsylvania registered office, PA CROP, LLC formation Pennsylvania, registered agent PA, business filing service Erie, annual report PA"
        canonical="https://notroom.com/services/registered-office"
        schema={schema}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[hsl(var(--hero-gradient-from))] to-[hsl(var(--hero-gradient-to))] text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-[hsl(var(--action-cyan))] text-white border-0">
              PA-Compliant CROP Services
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Pennsylvania Registered Office & Business Filing Services
            </h1>
            <p className="text-xl mb-8 text-white/90">
              Professional registered office address and business filing concierge for Pennsylvania LLCs and corporations. Stay compliant without the hassle.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={scrollToBooking}
                className="bg-white text-primary hover:bg-white/90"
              >
                Get Started - $99/year
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
          <div className="max-w-6xl mx-auto">
            <TrustIndicators />
          </div>
        </div>
      </section>

      {/* What is CROP */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">What is a Commercial Registered Office Provider (CROP)?</h2>
            <Card className="p-8">
              <p className="text-lg mb-4">
                In Pennsylvania, businesses must maintain a registered office address—a physical location where legal documents and official correspondence can be received. A CROP provides this service professionally.
              </p>
              <p className="text-muted-foreground mb-6">
                Unlike a registered agent, Pennsylvania's unique CROP system allows third-party providers to serve as your official registered office, handling mail, service of process, and state correspondence on your behalf.
              </p>
              <div className="bg-primary/10 p-6 rounded-lg">
                <div className="flex items-start gap-3">
                  <Shield className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold mb-2">Why Use Our CROP Service?</h3>
                    <p className="text-sm text-muted-foreground">
                      Protect your privacy by keeping your home address off public records. Get professional mail handling, digital scanning, and compliance reminders—all in one place.
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Service Options */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
            {/* Registered Office */}
            <Card className="p-6">
              <Building className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-4">Registered Office</h3>
              <p className="text-3xl font-bold text-primary mb-2">$99-149/year</p>
              <p className="text-sm text-muted-foreground mb-6">Professional PA registered office address</p>
              <ul className="space-y-3 mb-6">
                {registeredOfficeFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button className="w-full" onClick={scrollToBooking}>
                Get Started
              </Button>
            </Card>

            {/* Business Filings */}
            <Card className="p-6 border-primary border-2">
              <FileText className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-4">Business Filings</h3>
              <p className="text-3xl font-bold text-primary mb-2">$49-199</p>
              <p className="text-sm text-muted-foreground mb-6">LLC, DBA, annual reports & more</p>
              <div className="space-y-3 mb-6">
                {filingServices.slice(0, 4).map((item, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span>{item.service}</span>
                    <span className="font-bold">{item.price}</span>
                  </div>
                ))}
              </div>
              <Button className="w-full" onClick={scrollToBooking}>
                View All Filings
              </Button>
            </Card>

            {/* Compliance Club */}
            <Card className="p-6">
              <Bell className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-4">Compliance Club</h3>
              <p className="text-3xl font-bold text-primary mb-2">$19-39/mo</p>
              <p className="text-sm text-muted-foreground mb-6">Never miss a deadline</p>
              <ul className="space-y-3 mb-6">
                {complianceClubFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button className="w-full" onClick={scrollToBooking}>
                Join Club
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Filing Services Detail */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Complete Business Filing Services</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {filingServices.map((item, index) => (
                <Card key={index} className="p-6">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="font-bold text-lg">{item.service}</h3>
                    <span className="text-xl font-bold text-primary">{item.price}+</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </Card>
              ))}
            </div>
            <p className="text-sm text-muted-foreground text-center mt-6">
              * Prices shown are service fees. PA state filing fees are additional and vary by filing type.
            </p>
          </div>
        </div>
      </section>

      {/* Business Launch Pack */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4 bg-white text-primary border-0">
              Best Value
            </Badge>
            <h2 className="text-3xl font-bold mb-6">Business Launch Pack</h2>
            <Card className="p-8 bg-white/10 border-white/20 text-white">
              <p className="text-5xl font-bold mb-4">$349</p>
              <p className="text-lg mb-8 text-white/90">+ PA state fees</p>
              <div className="grid md:grid-cols-2 gap-4 mb-8 text-left">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                  <span className="text-sm">LLC formation filing</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Registered office (1 year)</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                  <span className="text-sm">EIN application assistance</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Operating agreement template</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                  <span className="text-sm">Compliance calendar</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                  <span className="text-sm">2 RON credits included</span>
                </div>
              </div>
              <Button 
                size="lg" 
                onClick={scrollToBooking}
                className="bg-white text-primary hover:bg-white/90 w-full"
              >
                Launch Your Business
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
            <div className="space-y-6">
              <Card className="p-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Choose Your Service</h3>
                    <p className="text-muted-foreground">
                      Select registered office, business filing, or the complete Business Launch Pack.
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
                    <h3 className="text-xl font-bold mb-2">We Handle the Paperwork</h3>
                    <p className="text-muted-foreground">
                      We prepare and file all documents with the PA Department of State. You'll receive updates throughout the process.
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
                    <h3 className="text-xl font-bold mb-2">Get Your Documents</h3>
                    <p className="text-muted-foreground">
                      Receive your stamped certificates, EIN confirmation, and all supporting documents digitally and by mail.
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
                    <h3 className="text-xl font-bold mb-2">Stay Compliant</h3>
                    <p className="text-muted-foreground">
                      We monitor deadlines and send reminders for annual reports, FinCEN BOI filings, and other requirements.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>


      {/* FAQs */}
      <FAQSection 
        faqs={[
          {
            question: "What's the difference between a registered office and a registered agent?",
            answer: "In Pennsylvania, CROP (Commercial Registered Office Provider) is the official term. We provide a physical address for your business and handle legal correspondence, service of process, and state filings on your behalf."
          },
          {
            question: "Can I use your address as my business address?",
            answer: "Yes! Our registered office address can be used as your business address on all state filings, keeping your personal address private from public records."
          },
          {
            question: "How long does LLC formation take?",
            answer: "Standard LLC formation through PA Department of State typically takes 5-7 business days. Expedited processing options are available for faster turnaround."
          },
          {
            question: "What's included in the Business Launch Pack?",
            answer: "The $349 pack includes LLC formation filing, 1 year of registered office service, EIN application assistance, operating agreement template, compliance calendar, and 2 RON credits—everything you need to launch your business."
          },
          {
            question: "Do you handle ongoing compliance reminders?",
            answer: "Yes! All registered office clients receive automatic reminders for annual reports, FinCEN BOI filings, and other compliance deadlines. Compliance Club members get enhanced monitoring and priority support."
          }
        ]}
      />

      {/* CTA Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start or Maintain Your Pennsylvania Business?</h2>
          <p className="text-xl mb-8 text-muted-foreground max-w-2xl mx-auto">
            Professional registered office and filing services that keep your business compliant and your privacy protected.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={scrollToBooking}
            >
              Get Started Today
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => window.location.href = "tel:814-480-0989"}
            >
              Call (814) 480-0989
            </Button>
          </div>
        </div>
      </section>

      {/* Legal Disclaimer */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <LegalDisclaimer service="business" />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default RegisteredOffice;
