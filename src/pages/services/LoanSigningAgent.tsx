import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Clock, Shield, CheckCircle, Award, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SocialProof from "@/components/marketing/SocialProof";
import TrustIndicators from "@/components/marketing/TrustIndicators";
import FAQSection from "@/components/marketing/FAQSection";

const LoanSigningAgent = () => {
  const navigate = useNavigate();

  const scrollToBooking = () => {
    navigate("/");
    setTimeout(() => {
      const element = document.getElementById("booking-form");
      element?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const loanTypes = [
    "Purchase mortgages",
    "Refinance loans",
    "Home equity lines of credit (HELOC)",
    "Reverse mortgages",
    "Commercial real estate loans",
    "Construction loans"
  ];

  const qualifications = [
    { icon: Award, title: "NNA Certified", desc: "National Notary Association certified signing agent" },
    { icon: Shield, title: "$100K E&O Insurance", desc: "Comprehensive errors and omissions coverage" },
    { icon: FileText, title: "MISMO Standards", desc: "Compliant with mortgage industry standards" },
    { icon: Clock, title: "Flexible Scheduling", desc: "Available by appointment including evenings and weekends" }
  ];

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Loan Signing Agent Service Erie PA",
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
    "description": "Professional loan signing agent services in Erie, PA. NNA certified with $100K E&O insurance. Specializing in mortgage closings and real estate transactions.",
    "offers": {
      "@type": "Offer",
      "price": "175",
      "priceCurrency": "USD"
    }
  };

  return (
    <Layout>
      <SEO
        title="Loan Signing Agent in Erie, PA - NNA Certified"
        description="Professional loan signing agent in Erie, PA. NNA certified with $100K E&O insurance. Specializing in mortgage closings, refinances, and real estate transactions. Available by appointment."
        keywords="loan signing agent erie pa, notary signing agent pennsylvania, mortgage closing notary, real estate notary erie, certified signing agent"
        canonical="https://notroom.com/services/loan-signing-agent"
        schema={schema}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[hsl(var(--hero-gradient-from))] to-[hsl(var(--hero-gradient-to))] text-primary-foreground py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-accent text-accent-foreground border-0">
              NNA Certified
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Professional Loan Signing Agent in Erie, PA
            </h1>
              <p className="text-xl mb-8 opacity-90">
                NNA-certified loan signing agent for mortgage closings, refinances, and real estate transactions. $100K E&O insurance and MISMO compliant. Pennsylvania does not require separate state licensing for signing agents—certification through the National Notary Association is the industry standard recognized by title companies and lenders.
              </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={scrollToBooking}
                variant="secondary"
              >
                Schedule Signing - From $175
              </Button>
              <p className="text-sm opacity-80 mt-2">
                Purchase/Refi $175 | Hybrid/e-Closing $225
              </p>
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
          <div className="max-w-6xl mx-auto">
            <TrustIndicators />
          </div>
        </div>
      </section>

      {/* Qualifications Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Why Title Companies & Lenders Trust Us</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {qualifications.map((qual, index) => (
                <Card key={index} className="p-6">
                  <qual.icon className="w-12 h-12 text-primary mb-4" />
                  <h3 className="text-lg font-bold mb-2">{qual.title}</h3>
                  <p className="text-sm text-muted-foreground">{qual.desc}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold mb-6">Loan Types We Handle</h2>
                <ul className="space-y-3">
                  {loanTypes.map((type, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                      <span>{type}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-6">Our Process</h2>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                      1
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">Receive Documents</h3>
                      <p className="text-sm text-muted-foreground">We review closing package in advance</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                      2
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">Print & Prepare</h3>
                      <p className="text-sm text-muted-foreground">High-quality printing of all loan documents</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                      3
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">Conduct Signing</h3>
                      <p className="text-sm text-muted-foreground">Professional, thorough signing at borrower's location</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">
                      4
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">Return Documents</h3>
                      <p className="text-sm text-muted-foreground">Same-day shipping back to title company</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* For Title Companies */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">For Title Companies & Lenders</h2>
            <Card className="p-8">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <TrendingUp className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold mb-2">Reliable & On-Time</h3>
                    <p className="text-muted-foreground">
                      99.8% on-time performance rate. We understand the importance of closing deadlines and coordinate seamlessly with your team.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Shield className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold mb-2">Fully Insured & Bonded</h3>
                    <p className="text-muted-foreground">
                      $100,000 errors and omissions insurance provides peace of mind for your transactions. Pennsylvania notary fee ($15 per signature) is separate from signing agent services as required by law.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <FileText className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold mb-2">Background Checked</h3>
                    <p className="text-muted-foreground">
                      Comprehensive background screening ensures client safety and professional standards.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-8 pt-6 border-t">
                <p className="text-center text-sm text-muted-foreground mb-4">
                  Set up a signing agent account for seamless ordering
                </p>
                <div className="flex justify-center">
                  <Button onClick={scrollToBooking}>Contact Us for Account Setup</Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>


      {/* Pricing Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Transparent Pricing</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Purchase/Refinance Closing</h3>
                <div className="text-3xl font-bold mb-4">$175</div>
                <div className="bg-muted/50 p-4 rounded text-sm space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">PA notary fee (per signature):</span>
                    <span className="font-semibold">$5-15</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Signing agent service fee:</span>
                    <span className="font-semibold">$160</span>
                  </div>
                </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                    <span>Document printing included</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                    <span>Travel to closing location</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                    <span>Same-day FedEx return shipping</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                    <span>$100K E&O insurance coverage</span>
                  </li>
                </ul>
              </Card>

              <Card className="p-6 border-primary border-2">
                <h3 className="text-xl font-bold mb-4">Hybrid/e-Closing</h3>
                <div className="text-3xl font-bold mb-4">$225</div>
                <div className="bg-muted/50 p-4 rounded text-sm space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">PA notary fee (per signature):</span>
                    <span className="font-semibold">$5-15</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Digital closing service fee:</span>
                    <span className="font-semibold">$210</span>
                  </div>
                </div>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                    <span>Electronic document handling</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                    <span>Hybrid wet/e-signing coordination</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                    <span>Digital scan-back service</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-success flex-shrink-0 mt-0.5" />
                    <span>Platform integration support</span>
                  </li>
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <FAQSection 
        faqs={[
          {
            question: "What makes you different from other signing agents?",
            answer: "We're NNA certified with $100K E&O insurance, MISMO compliant, and maintain a 99.8% on-time performance rate. We treat every signing with professionalism and understand the importance of closing deadlines."
          },
          {
            question: "Do you handle all types of loan signings?",
            answer: "Yes! We handle purchases, refinances, HELOCs, reverse mortgages, commercial loans, and construction loans. We also specialize in hybrid and electronic closings."
          },
          {
            question: "How far in advance should we book a signing?",
            answer: "We can accommodate most signings within 24-48 hours. For rush closings, call us directly at (814) 480-0989."
          },
          {
            question: "What's the difference between standard and hybrid/e-closing pricing?",
            answer: "Standard purchase/refi closings are $175. Hybrid or electronic closings are $225 due to additional technology integration, digital document handling, and electronic signature coordination."
          },
          {
            question: "How do title companies set up an account with you?",
            answer: "Contact us to set up a signing agent account. We'll provide all necessary documentation including W-9, E&O certificate, background check, and NNA certification."
          }
        ]}
      />

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Need a Certified Loan Signing Agent?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Professional, reliable service for title companies, lenders, and borrowers throughout Erie County.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={scrollToBooking}
              variant="secondary"
            >
              Schedule Loan Signing
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

export default LoanSigningAgent;
