import { Button } from "@/components/ui/button";
import { Mail, Phone } from "lucide-react";

const Hero = () => {
  const scrollToBooking = () => {
    document.getElementById("booking-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-hero-gradient-start to-hero-gradient-end overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block mb-6 px-4 py-2 bg-background/10 backdrop-blur-sm rounded-full border border-background/20">
            <span className="text-primary-foreground font-medium">Erie's Most Trusted Notary Service</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6 leading-tight">
            Erie's Fastest Notary Service
          </h1>
          
          <p className="text-2xl md:text-3xl text-primary-foreground/90 mb-8 font-light">
            Online in 5 Minutes, Mobile in 2 Hours
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              variant="hero"
              className="text-lg px-8 py-6 h-auto"
              onClick={scrollToBooking}
            >
              Book RON Now - $60
            </Button>
            <Button 
              size="lg" 
              variant="heroOutline"
              className="text-lg px-8 py-6 h-auto"
              onClick={scrollToBooking}
            >
              Request Mobile - $125
            </Button>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center text-primary-foreground/90">
            <a 
              href="mailto:support@notroom.com" 
              className="flex items-center gap-2 hover:text-primary-foreground transition-colors"
            >
              <Mail className="w-5 h-5" />
              <span>support@notroom.com</span>
            </a>
            <a 
              href="tel:814-480-0989" 
              className="flex items-center gap-2 hover:text-primary-foreground transition-colors"
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
