import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Monitor, Car, Home, Check, Users, Building, Globe, FileCheck, FileText, Fingerprint, UserCheck } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import { useNavigate } from "react-router-dom";
import { memo } from "react";

const Services = memo(() => {
  const navigate = useNavigate();

  const services = [
    {
      icon: Monitor,
      badge: "Most Popular",
      title: "Remote Online Notary (RON)",
      price: "$45",
      priceDetail: "Standard docs | Real estate $95",
      description: "Notarize from anywhere via secure video call. Perfect for powers of attorney, affidavits, contracts, and most legal documents.",
      features: [
        "Available by appointment, including evenings & weekends",
        "Average 5-minute sessions",
        "Business subscription: $399/mo for 10 acts",
        "Instant digital delivery"
      ],
      ctaText: "Learn More",
      featured: true,
      link: "/services/remote-online-notary"
    },
    {
      icon: Car,
      badge: "Same-Day",
      title: "Mobile Notary Service",
      price: "$125+",
      priceDetail: "$5-15 notary + travel fees",
      description: "We'll come to you anywhere in Erie County. Home, office, hospital, or care facility. Perfect for those who prefer in-person service.",
      features: [
        "Same-day appointments available",
        "Evening & weekend appointments",
        "Serving Erie, Crawford, Warren counties",
        "Itemized pricing (notary + travel + admin)"
      ],
      ctaText: "Learn More",
      featured: false,
      link: "/services/mobile-notary"
    },
    {
      icon: Home,
      badge: "Certified",
      title: "Loan Signing Agent",
      price: "$175",
      priceDetail: "Purchase/refi | Hybrid e-closing $225",
      description: "Certified signing agent for real estate transactions. Working with title companies, lenders, and real estate professionals.",
      features: [
        "NNA certified & background-checked",
        "Experienced with all loan types",
        "$100K E&O insurance",
        "Print, scan & ship included"
      ],
      ctaText: "Learn More",
      featured: false,
      link: "/services/loan-signing-agent"
    },
    {
      icon: Globe,
      badge: "International",
      title: "Apostille Services",
      price: "$245",
      priceDetail: "7-10 days | Expedited $395",
      description: "Professional apostille assistance for international documents. We handle PA Department of State submissions.",
      features: [
        "PA state fee $15 included",
        "Document notarization included",
        "Application prep & submission",
        "Full-chain authentication $495"
      ],
      ctaText: "Learn More",
      featured: false,
      link: "/services/apostille"
    },
    {
      icon: Users,
      badge: "Employers",
      title: "I-9 Verification",
      price: "$85",
      priceDetail: "In-person | Remote $125",
      description: "DHS-compliant I-9 employment verification. In-person at your location or remote for E-Verify employers.",
      features: [
        "E-Verify alternative procedure",
        "Authorized representative service",
        "Volume discounts: $65-75 each",
        "Same-day appointments"
      ],
      ctaText: "Learn More",
      featured: false,
      link: "/services/i9-verification"
    },
    {
      icon: Building,
      badge: "Business",
      title: "Registered Office & Filings",
      price: "$149",
      priceDetail: "Annual office | LLC formation $249",
      description: "PA Commercial Registered Office Provider (CROP). LLC formation, annual reports, and business compliance services.",
      features: [
        "Professional registered office address",
        "LLC formation with EIN: $249",
        "Annual renewals & mail: $99",
        "Registered CROP with PA DOS"
      ],
      ctaText: "Learn More",
      featured: false,
      link: "/services/registered-office"
    },
    {
      icon: FileCheck,
      badge: "Quick",
      title: "Certified Copies",
      price: "$20",
      priceDetail: "Per document | Same-day available",
      description: "Official certified copies of important documents. Birth certificates, diplomas, passports. Accepted for legal and immigration purposes.",
      features: [
        "Official notary seal & signature",
        "Same-day service available",
        "Legally valid worldwide",
        "All document types accepted"
      ],
      ctaText: "Learn More",
      featured: false,
      link: "/services/certified-copies"
    },
    {
      icon: FileText,
      badge: "Affordable",
      title: "Document Preparation",
      price: "$100+",
      priceDetail: "Varies by complexity",
      description: "Professional document preparation. Affidavits, contracts, agreements, legal forms. Save money vs attorney fees.",
      features: [
        "Professional formatting",
        "Quick turnaround (1-2 days)",
        "Review for completeness",
        "Affordable alternative to lawyers"
      ],
      ctaText: "Learn More",
      featured: false,
      link: "/services/document-preparation"
    },
    {
      icon: Fingerprint,
      badge: "Mobile",
      title: "Fingerprinting",
      price: "$35+",
      priceDetail: "$35 + $1.50/mile travel",
      description: "FBI-approved electronic fingerprinting. For teaching licenses, adoptions, background checks. We come to you.",
      features: [
        "FBI-approved equipment",
        "Mobile service available",
        "Teaching & professional licenses",
        "Electronic submission"
      ],
      ctaText: "Learn More",
      featured: false,
      link: "/services/fingerprinting"
    },
    {
      icon: UserCheck,
      badge: "Neutral",
      title: "Professional Witness",
      price: "$60+",
      priceDetail: "$60 + $1.50/mile travel",
      description: "Neutral third-party witness for private agreements and contracts. Lower cost alternative when notarization isn't required.",
      features: [
        "Professional verification",
        "Mobile service available",
        "Private contracts & agreements",
        "Impartial third-party"
      ],
      ctaText: "Learn More",
      featured: false,
      link: "/services/witness-service"
    }
  ];

  const handleServiceClick = (link: string) => {
    navigate(link);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToBooking = () => {
    document.getElementById("booking-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="services" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4 px-4 py-2 bg-primary/10 rounded-full">
            <span className="text-primary font-semibold text-sm">Complete Notary & Business Services</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Professional Services in Erie & Surrounding Counties
          </h2>
        </div>

        {/* Service Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <ScrollReveal key={index} delay={index * 150}>
                <Card 
                  className={`relative transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 group ${
                    service.featured ? 'border-[hsl(var(--urgency-amber))] border-4' : ''
                  }`}
                  role="article"
                  aria-label={`${service.title} service card`}
                >
                {/* Badge */}
                {service.badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                    <Badge className="bg-amber text-primary-foreground px-4 py-1 text-sm font-semibold shadow-lg">
                      {service.badge}
                    </Badge>
                  </div>
                )}

                <CardContent className="p-8">
                  {/* Icon */}
                  <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                      <Icon className="w-10 h-10 text-primary" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-center mb-3 text-foreground">
                    {service.title}
                  </h3>

                  {/* Price */}
                  <div className="text-center mb-6">
                    <div className="text-4xl font-bold text-primary">{service.price}</div>
                    <div className="text-sm text-muted-foreground">{service.priceDetail}</div>
                  </div>

                  {/* Description */}
                  <p className="text-center text-muted-foreground mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-[hsl(var(--success-green))] flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <Button 
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6 shadow-md hover:shadow-lg transition-all"
                    onClick={() => handleServiceClick(service.link)}
                  >
                    {service.ctaText} →
                  </Button>
                </CardContent>
              </Card>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
});

Services.displayName = 'Services';

export default Services;
