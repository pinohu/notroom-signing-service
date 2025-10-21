import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Users, Video, MapPin, Building2, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import LegalDisclaimer from "@/components/LegalDisclaimer";
import SocialProof from "@/components/marketing/SocialProof";
import TrustIndicators from "@/components/marketing/TrustIndicators";
import FAQSection from "@/components/marketing/FAQSection";

const I9Verification = () => {
  const navigate = useNavigate();

  const scrollToBooking = () => {
    navigate("/");
    setTimeout(() => {
      const element = document.getElementById("booking-form");
      element?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const remoteFeatures = [
    "DHS-compliant alternative procedure for E-Verify employers",
    "Video-based identity document verification",
    "Same-day or next-day availability",
    "Volume discounts for multiple hires",
    "Secure digital recordkeeping",
    "Completion within 15 minutes per employee"
  ];

  const mobileFeatures = [
    "In-person verification as authorized representative",
    "Onsite service at your location (Erie & surrounding counties)",
    "Multi-employee sessions available",
    "Same-day appointments",
    "Review Section 2 with employer after verification",
    "Professional documentation handling"
  ];

  const whoNeedsThis = [
    { type: "Staffing Agencies", desc: "High-volume hiring with recurring verification needs" },
    { type: "Seasonal Employers", desc: "Restaurant, retail, hospitality hiring surges" },
    { type: "Small Businesses", desc: "New hires needing compliant I-9 completion" },
    { type: "Remote Companies", desc: "E-Verify employers hiring PA-based employees" },
    { type: "Healthcare Facilities", desc: "Nursing homes, hospitals with frequent onboarding" },
    { type: "Construction Firms", desc: "Project-based hiring requiring immediate compliance" }
  ];

  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "I-9 Employment Verification Service",
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
    "description": "Professional I-9 employment verification services for employers. Remote and mobile options available for compliant employee onboarding.",
    "offers": {
      "@type": "Offer",
      "price": "35",
      "priceCurrency": "USD"
    }
  };

  return (
    <Layout>
      <SEO
        title="I-9 Employment Verification Services PA - Remote & Mobile"
        description="Professional I-9 verification services for employers in Pennsylvania. DHS-compliant remote and mobile I-9 completion. Staffing agencies, seasonal employers, small businesses. From $35/employee."
        keywords="I-9 verification Pennsylvania, employment verification service, I-9 authorized representative, remote I-9 E-Verify, mobile I-9 service Erie PA"
        canonical="https://notroom.com/services/i9-verification"
        schema={schema}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[hsl(var(--hero-gradient-from))] to-[hsl(var(--hero-gradient-to))] text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-[hsl(var(--action-cyan))] text-white border-0">
              DHS-Compliant I-9 Services
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              I-9 Employment Verification Services
            </h1>
            <p className="text-xl mb-6 text-white/90">
              Professional I-9 document verification for employers. Remote service for E-Verify employers and mobile in-person verification for all businesses. Compliant, fast, and affordable.
            </p>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-4 mb-8 text-sm">
              <p className="font-semibold mb-2">⚠️ Important Notice</p>
              <p className="text-white/90">
                <strong>This is NOT a notarization service.</strong> I-9 verification is performed as an Authorized Representative on behalf of employers. No notary seal or commission is used in this process, per Pennsylvania Department of State guidance. I am not an attorney and do not provide legal or immigration advice.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={scrollToBooking}
                className="bg-white text-primary hover:bg-white/90"
              >
                Get Started - From $35
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

      {/* Service Options */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Choose Your I-9 Verification Method</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="p-8 border-primary border-2">
              <MapPin className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-2xl font-bold mb-4">In-Person I-9 Verification</h3>
              <p className="text-muted-foreground mb-6">
                In-person I-9 completion as your authorized representative. We come to your location.
              </p>
              <div className="space-y-3 mb-6">
                {mobileFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
              <div className="bg-primary/10 p-4 rounded-lg mb-6">
                <p className="text-2xl font-bold text-primary">$85</p>
                <p className="text-sm text-muted-foreground">Per employee verification</p>
                <div className="mt-3 text-xs bg-background/50 p-2 rounded">
                  <div className="flex justify-between mb-1">
                    <span className="text-muted-foreground">Verification service:</span>
                    <span>$85</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground text-[10px]">
                    <span>Includes travel to location + document review</span>
                  </div>
                </div>
              </div>
              <Button className="w-full" onClick={scrollToBooking}>
                Book In-Person I-9
              </Button>
            </Card>

            <Card className="p-8">
              <Video className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-2xl font-bold mb-4">Remote I-9 (E-Verify Employers)</h3>
              <p className="text-muted-foreground mb-6">
                For E-Verify employers using DHS alternative procedure. Complete I-9 verification via secure video call.
              </p>
              <div className="space-y-3 mb-6">
                {remoteFeatures.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
              <div className="bg-primary/10 p-4 rounded-lg mb-6">
                <p className="text-2xl font-bold text-primary">$125</p>
                <p className="text-sm text-muted-foreground">Per employee (E-Verify employers only)</p>
                <div className="mt-3 text-xs bg-background/50 p-2 rounded">
                  <div className="flex justify-between mb-1">
                    <span className="text-muted-foreground">Remote verification + technology:</span>
                    <span>$125</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground text-[10px]">
                    <span>Video platform + document analysis + DHS compliance</span>
                  </div>
                </div>
              </div>
              <Button className="w-full" onClick={scrollToBooking}>
                Book Remote I-9
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Who Needs This */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Who Needs I-9 Verification Services?</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {whoNeedsThis.map((item, index) => (
                <Card key={index} className="p-6">
                  <Building2 className="w-8 h-8 text-primary mb-3" />
                  <h3 className="font-bold text-lg mb-2">{item.type}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-background">
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
                    <h3 className="text-xl font-bold mb-2">Employer Books Service</h3>
                    <p className="text-muted-foreground">
                      Schedule remote or mobile I-9 verification. Provide employee details and preferred date/time.
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
                    <h3 className="text-xl font-bold mb-2">Employee Session</h3>
                    <p className="text-muted-foreground">
                      <strong>Remote:</strong> Employee joins secure video call with valid ID documents.<br />
                      <strong>Mobile:</strong> We meet employee at your location to review documents in person.
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
                    <h3 className="text-xl font-bold mb-2">Document Verification</h3>
                    <p className="text-muted-foreground">
                      We verify identity and employment authorization documents as the authorized representative, completing Section 2 of Form I-9.
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
                    <h3 className="text-xl font-bold mb-2">Completed Form Returned</h3>
                    <p className="text-muted-foreground">
                      Employer receives completed I-9 form with Section 2 filled out. For remote, E-Verify must be initiated within 3 business days.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Transparent Pricing</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6 border-primary border-2">
                <h3 className="text-xl font-bold mb-4">In-Person I-9 Verification</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b">
                    <span>Single employee</span>
                    <span className="font-bold text-lg">$85</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b">
                    <span>2-5 employees (same visit)</span>
                    <span className="font-bold text-lg">$75 each</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>6+ employees (same visit)</span>
                    <span className="font-bold text-lg">$65 each</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-4">Travel to your location included for Erie County</p>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Remote I-9 (E-Verify Employers)</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b">
                    <span>Per employee</span>
                    <span className="font-bold text-lg">$125</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b">
                    <span>5+ employees/month</span>
                    <span className="font-bold text-lg">$110 each</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>10+ employees/month</span>
                    <span className="font-bold text-lg">$100 each</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-4">Requires E-Verify enrollment by employer</p>
              </Card>
            </div>
            <p className="text-sm text-muted-foreground text-center mt-6">
              * Recurring monthly bundles available for staffing agencies and high-volume employers. Contact us for custom pricing.
            </p>
          </div>
        </div>
      </section>


      {/* FAQs */}
      <FAQSection 
        faqs={[
          {
            question: "What is I-9 verification and why do I need it?",
            answer: "Form I-9 is required by federal law for all US employers to verify each employee's identity and work authorization. We act as your authorized representative to complete Section 2 of the I-9 form."
          },
          {
            question: "What's the difference between remote and in-person I-9 verification?",
            answer: "In-person I-9 ($85) is available for all employers and done at your location. Remote I-9 ($125) uses video calls and is only available for E-Verify employers using the DHS alternative procedure, with added technology costs."
          },
          {
            question: "How quickly can you complete I-9 verification?",
            answer: "Most verifications are completed within 15 minutes per employee. Same-day and next-day appointments are available for both remote and mobile services."
          },
          {
            question: "Do you offer volume discounts for multiple employees?",
            answer: "Yes! Volume discounts are available starting at 5 employees per month for remote verification, and for multiple employees during the same mobile visit."
          },
          {
            question: "Is this service compliant with DHS requirements?",
            answer: "Absolutely. We follow all Department of Homeland Security guidelines for I-9 verification. Note: This is NOT a notarization service—it's performed as an authorized representative per DHS rules."
          }
        ]}
      />

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Simplify Your I-9 Compliance</h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Professional I-9 verification that keeps your business compliant. Remote or mobile options to fit your needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={scrollToBooking}
              className="bg-white text-primary hover:bg-white/90"
            >
              Schedule I-9 Verification
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
            <LegalDisclaimer service="i9" />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default I9Verification;
