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
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Join Our Waitlist Today
          </h2>
          
          {/* Subheading */}
          <p className="text-xl text-white/90 mb-10 leading-relaxed">
            Be among the first to experience fast, professional notary services launching soon in Erie, PA
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <Button 
              size="lg" 
              variant="amber"
              className="text-lg px-8 py-7 h-auto shadow-2xl"
              onClick={scrollToBooking}
            >
              📱 Join Online Waitlist - Starting at $60
            </Button>
            
            <Button 
              size="lg" 
              variant="amberOutline"
              className="text-lg px-8 py-7 h-auto"
              onClick={scrollToBooking}
            >
              🚗 Join Mobile Waitlist - Starting at $125
            </Button>
          </div>

          {/* Trust Line */}
          <div className="flex flex-wrap justify-center gap-6 text-white/90 mb-8">
            <div className="flex items-center gap-2">
              <span className="text-[hsl(var(--success-green))] text-xl">✓</span>
              <span className="font-medium">No Hidden Fees</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[hsl(var(--success-green))] text-xl">✓</span>
              <span className="font-medium">Licensed & Bonded</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[hsl(var(--success-green))] text-xl">✓</span>
              <span className="font-medium">PA State Approved</span>
            </div>
          </div>

          {/* Contact Alternative */}
          <div className="text-white/80 text-lg">
            Have questions?{" "}
            <a 
              href="tel:814-480-0989" 
              className="inline-flex items-center gap-2 text-white font-semibold hover:text-[hsl(var(--urgency-amber))] transition-colors underline underline-offset-4"
            >
              <Phone className="w-5 h-5" />
              Call or text us at (814) 480-0989
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
