import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Monitor, Car, Home, Check } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const Services = () => {
  const services = [
    {
      icon: Monitor,
      badge: "Most Popular",
      title: "Remote Online Notary (RON)",
      price: "$60",
      priceDetail: "$15 notary + $45 platform fee",
      description: "Notarize from anywhere via secure video call. Perfect for powers of attorney, affidavits, contracts, and most legal documents.",
      features: [
        "Available by appointment, including evenings & weekends",
        "Average 5-minute sessions",
        "Legally valid in all 50 states",
        "Instant digital delivery"
      ],
      ctaText: "Book Now",
      featured: true
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
      ctaText: "Book Now",
      featured: false
    },
    {
      icon: Home,
      badge: "Certified",
      title: "Loan Signing Agent",
      price: "$150",
      priceDetail: "$15 notary + $135 agent fee",
      description: "Certified signing agent for real estate transactions. Working with title companies, lenders, and real estate professionals.",
      features: [
        "NNA certified & background-checked",
        "Experienced with all loan types",
        "$100K E&O insurance",
        "Print, scan & ship included"
      ],
      ctaText: "Book Now",
      featured: false
    }
  ];

  const scrollToBooking = () => {
    document.getElementById("booking-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="services" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4 px-4 py-2 bg-primary/10 rounded-full">
            <span className="text-primary font-semibold text-sm">Three Ways We Serve You</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Professional Notary Services in Erie & Surrounding Counties
          </h2>
        </div>

        {/* Service Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <ScrollReveal key={index} delay={index * 150}>
                <Card 
                  className={`relative transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${
                    service.featured ? 'border-[hsl(var(--urgency-amber))] border-4' : ''
                  }`}
                >
                {/* Badge */}
                {service.badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                    <Badge className="bg-[hsl(var(--urgency-amber))] text-white px-4 py-1 text-sm font-semibold shadow-lg">
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
                    onClick={scrollToBooking}
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
};

export default Services;
