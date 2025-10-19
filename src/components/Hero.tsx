import { Button } from "@/components/ui/button";
import { Mail, Phone } from "lucide-react";

const Hero = () => {
  const scrollToBooking = () => {
    document.getElementById("booking-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-[hsl(var(--hero-gradient-from))] to-[hsl(var(--hero-gradient-to))] overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20" />
      
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Eyebrow */}
          <div className="inline-block mb-6 px-6 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
            <span className="text-white font-semibold">⭐ Erie's Trusted Notary Service</span>
          </div>
          
          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Online or Mobile Notary in Erie, PA
            <span className="block text-[hsl(var(--action-cyan))] mt-2 text-5xl md:text-6xl lg:text-7xl">
              Available Now
            </span>
          </h1>
          
          {/* Subheading */}
          <p className="text-xl md:text-2xl text-white/90 mb-10 leading-relaxed max-w-4xl mx-auto">
            Get documents notarized in minutes with fast, convenient notary services. Online or mobile 
            notarization with licensed, bonded, and background-checked Pennsylvania notaries.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              variant="amber"
              className="text-lg px-8 py-7 h-auto shadow-2xl"
              onClick={scrollToBooking}
            >
              <div className="flex flex-col items-start">
                <span className="text-xl">📱 Online Notary - Starting at $60</span>
                <span className="text-sm font-normal opacity-90">Book Now</span>
              </div>
            </Button>
            <Button 
              size="lg" 
              variant="amberOutline"
              className="text-lg px-8 py-7 h-auto"
              onClick={scrollToBooking}
            >
              <div className="flex flex-col items-start">
                <span className="text-xl">🚗 Mobile Notary - Starting at $125</span>
                <span className="text-sm font-normal opacity-90">Book Now</span>
              </div>
            </Button>
          </div>
          
          {/* Trust Bar */}
          <div className="flex flex-wrap justify-center gap-6 text-white/90 text-base">
            <div className="flex items-center gap-2">
              <span className="text-[hsl(var(--success-green))] text-xl">✓</span>
              <span className="font-medium">PA State Approved Technology</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[hsl(var(--success-green))] text-xl">✓</span>
              <span className="font-medium">Licensed & Bonded</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[hsl(var(--success-green))] text-xl">✓</span>
              <span className="font-medium">Background Checked</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[hsl(var(--success-green))] text-xl">✓</span>
              <span className="font-medium">Secure & Encrypted</span>
            </div>
          </div>
          
          {/* Contact Info */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center text-white/80 mt-8">
            <a 
              href="mailto:support@notroom.com" 
              className="flex items-center gap-2 hover:text-white transition-colors"
            >
              <Mail className="w-5 h-5" />
              <span>support@notroom.com</span>
            </a>
            <a 
              href="tel:814-480-0989" 
              className="flex items-center gap-2 hover:text-white transition-colors"
            >
              <Phone className="w-5 h-5" />
              <span>(814) 480-0989</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
