import { Button } from "@/components/ui/button";
import { Mail, Phone } from "lucide-react";

const Hero = () => {
  const scrollToBooking = () => {
    document.getElementById("booking-form")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToServices = () => {
    document.getElementById("services")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-[hsl(var(--hero-gradient-from))] to-[hsl(var(--hero-gradient-to))] overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20" />
      
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Professional Badge */}
          <div className="inline-block mb-6 px-6 py-2 bg-background/10 backdrop-blur-sm rounded-full border border-background/20">
            <span className="text-primary-foreground font-semibold">🏛️ Professional Notary & Business Services</span>
          </div>
          
          {/* Main Heading - Clear Value Proposition */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground mb-6 leading-tight">
            Pennsylvania Notary & Business Filing Services
            <span className="block text-[hsl(var(--action-cyan))] mt-2 text-5xl md:text-6xl lg:text-7xl">
              Licensed. Certified. Reliable.
            </span>
          </h1>
          
          {/* Subheading - Professional Value */}
          <p className="text-lg md:text-xl lg:text-2xl text-primary-foreground/90 mb-10 leading-relaxed max-w-4xl mx-auto">
            From remote online notarization to comprehensive business services—professional, efficient, and fully compliant. 
            <strong className="text-primary-foreground"> PA State Licensed • NNA Certified • $100K E&O Insured</strong>
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              variant="amber"
              className="text-lg sm:text-xl px-8 py-7 h-auto shadow-2xl font-bold"
              onClick={scrollToServices}
              aria-label="View all services"
            >
              <div className="flex flex-col items-center sm:items-start gap-1">
                <span>View All Services</span>
                <span className="text-sm font-normal opacity-90">Notary • Business • Compliance</span>
              </div>
            </Button>
            <Button 
              size="lg" 
              variant="amberOutline"
              className="text-lg sm:text-xl px-8 py-7 h-auto font-bold"
              onClick={scrollToBooking}
              aria-label="Book a service"
            >
              <div className="flex flex-col items-center sm:items-start gap-1">
                <span>📅 Book Now</span>
                <span className="text-sm font-normal opacity-90">From $45</span>
              </div>
            </Button>
          </div>
          
          {/* Professional Credentials */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-8 text-primary-foreground/90 text-sm md:text-base mb-8">
            <div className="flex items-center gap-2 bg-background/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <span className="text-[hsl(var(--success-green))] text-xl">★</span>
              <span className="font-semibold">4.9/5 Rating</span>
            </div>
            <div className="flex items-center gap-2 bg-background/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <span className="text-[hsl(var(--success-green))] text-xl">✓</span>
              <span className="font-medium">2,800+ Clients Served</span>
            </div>
            <div className="flex items-center gap-2 bg-background/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <span className="text-[hsl(var(--success-green))] text-xl">🏛️</span>
              <span className="font-medium">Since 2020</span>
            </div>
          </div>
          
          {/* Certifications */}
          <div className="flex flex-wrap justify-center gap-4 text-primary-foreground/80 text-xs md:text-sm">
            <span>📜 PA State Licensed</span>
            <span>•</span>
            <span>🏆 NNA Certified</span>
            <span>•</span>
            <span>🔒 $100K E&O Insured</span>
            <span>•</span>
            <span>🎓 Background Checked</span>
          </div>
          
          {/* Contact Info */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center text-primary-foreground/80 mt-8">
            <a 
              href="mailto:support@notroom.com" 
              className="flex items-center gap-2 hover:text-primary-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary-foreground rounded px-2 py-1"
              aria-label="Email us at support@notroom.com"
            >
              <Mail className="w-5 h-5" />
              <span className="text-sm sm:text-base">support@notroom.com</span>
            </a>
            <a 
              href="tel:814-480-0989" 
              className="flex items-center gap-2 hover:text-primary-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary-foreground rounded px-2 py-1"
              aria-label="Call us at 814-480-0989"
            >
              <Phone className="w-5 h-5" />
              <span className="text-sm sm:text-base">(814) 480-0989</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
