import { Button } from "@/components/ui/button";
import { Phone } from "lucide-react";

const FinalCTA = () => {
  const scrollToBooking = () => {
    document.getElementById("booking-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-20 bg-gradient-to-br from-[hsl(var(--hero-gradient-from))] to-[hsl(var(--hero-gradient-to))]">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Heading */}
          <h2 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
            Ready to Get Started?
          </h2>
          
          {/* Subheading */}
          <p className="text-xl text-primary-foreground/90 mb-10 leading-relaxed">
            Professional notary, business filing, and compliance services available now in Erie, PA. Remote, mobile, or concierge—we're here to help.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <Button 
              size="lg" 
              variant="amber"
              className="text-lg px-8 py-7 h-auto shadow-2xl"
              onClick={scrollToBooking}
            >
              📅 Book Any Service Now
            </Button>
            
            <Button 
              size="lg" 
              variant="amberOutline"
              className="text-lg px-8 py-7 h-auto"
              onClick={() => window.location.href = "tel:814-480-0989"}
            >
              📞 Call (814) 480-0989
            </Button>
          </div>

          {/* Trust Line */}
          <div className="flex flex-wrap justify-center gap-6 text-primary-foreground/90 mb-8">
            <div className="flex items-center gap-2">
              <span className="text-[hsl(var(--success-green))] text-xl">✓</span>
              <span className="font-medium">6 Services Available</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[hsl(var(--success-green))] text-xl">✓</span>
              <span className="font-medium">Fully Licensed</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[hsl(var(--success-green))] text-xl">✓</span>
              <span className="font-medium">Transparent Pricing</span>
            </div>
          </div>

          {/* Contact Alternative */}
          <div className="text-primary-foreground/80 text-lg">
            Questions about which service you need?{" "}
            <a 
              href="tel:814-480-0989" 
              className="inline-flex items-center gap-2 text-primary-foreground font-semibold hover:text-amber transition-colors underline underline-offset-4"
            >
              <Phone className="w-5 h-5" />
              Call us at (814) 480-0989
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
