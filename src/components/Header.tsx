import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useNavigate, useLocation } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import notroomLogo from "@/assets/notroom-logo.png";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  const handleLogoClick = () => {
    navigate("/");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navigateToPage = (path: string) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  const services = [
    { label: "Remote Online Notary (RON)", path: "/services/remote-online-notary", desc: "Notarize from anywhere via video" },
    { label: "Mobile Notary Service", path: "/services/mobile-notary", desc: "We come to your location" },
    { label: "Loan Signing Agent", path: "/services/loan-signing-agent", desc: "Certified for real estate closings" },
    { label: "Apostille Services", path: "/services/apostille", desc: "International document authentication" },
    { label: "I-9 Verification", path: "/services/i9-verification", desc: "Employment verification for employers" },
    { label: "Registered Office & Filings", path: "/services/registered-office", desc: "PA business formation & compliance" },
    { label: "Business Retainer Plans", path: "/services/business-retainer", desc: "Volume discounts for companies" },
  ];

  const areas = [
    { label: "Erie County", path: "/areas/erie-county" },
    { label: "Crawford County", path: "/areas/crawford-county" },
    { label: "Warren County", path: "/areas/warren-county" },
    { label: "Mercer County", path: "/areas/mercer-county" },
    { label: "Venango County", path: "/areas/venango-county" },
    { label: "Statewide Online", path: "/areas/statewide-online" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/98 backdrop-blur-md shadow-lg border-b border-border/50"
          : "bg-background/80 backdrop-blur-sm shadow-sm"
      }`}
      role="banner"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button
            onClick={handleLogoClick}
            className="hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary rounded"
            aria-label="Notroom home"
          >
            <img src={notroomLogo} alt="Notroom Logo" className="h-10" />
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6" aria-label="Main navigation">
            <NavigationMenu>
              <NavigationMenuList>
                {/* Services Dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger 
                    className="text-foreground hover:text-primary focus:text-primary font-medium bg-transparent hover:bg-accent/50"
                    aria-label="Services menu"
                  >
                    Services
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="bg-card border border-border shadow-xl z-50">
                    <ul className="grid w-[500px] gap-2 p-4 bg-card" role="menu">
                      {services.map((service) => (
                        <li key={service.path} role="none">
                          <NavigationMenuLink asChild>
                            <button
                              onClick={() => navigateToPage(service.path)}
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground w-full text-left bg-card"
                              role="menuitem"
                            >
                              <div className="text-sm font-medium leading-none">{service.label}</div>
                              <p className="text-xs text-muted-foreground leading-snug mt-1">
                                {service.desc}
                              </p>
                            </button>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Service Areas Dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger 
                    className="text-foreground hover:text-primary focus:text-primary font-medium bg-transparent hover:bg-accent/50"
                    aria-label="Service areas menu"
                  >
                    Service Areas
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="bg-card border border-border shadow-xl z-50">
                    <ul className="grid w-[300px] gap-2 p-4 bg-card" role="menu">
                      {areas.map((area) => (
                        <li key={area.path} role="none">
                          <NavigationMenuLink asChild>
                            <button
                              onClick={() => navigateToPage(area.path)}
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground w-full text-left bg-card"
                              role="menuitem"
                            >
                              <div className="text-sm font-medium leading-none">{area.label}</div>
                            </button>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {/* Primary Navigation Links */}
            <button
              onClick={() => navigateToPage("/pricing")}
              className="text-foreground hover:text-primary transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-primary rounded px-2 py-1"
            >
              Pricing
            </button>

            <button
              onClick={() => navigateToPage("/resources/how-ron-works")}
              className="text-foreground hover:text-primary transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-primary rounded px-2 py-1"
            >
              Resources
            </button>
            
            <button
              onClick={() => scrollToSection("faq")}
              className="text-foreground hover:text-primary transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-primary rounded px-2 py-1"
            >
              FAQ
            </button>
          </nav>

          {/* Desktop CTA Section */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Phone Number - Prominent */}
            <a
              href="tel:814-480-0989"
              className="flex items-center gap-2 text-foreground hover:text-primary transition-colors font-semibold focus:outline-none focus:ring-2 focus:ring-primary rounded px-2 py-1"
              aria-label="Call us at 814-480-0989"
            >
              <Phone className="w-4 h-4" />
              <span className="hidden xl:inline">(814) 480-0989</span>
            </a>

            {/* Secondary Actions */}
            <button
              onClick={() => navigateToPage("/track-booking")}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded px-2 py-1"
              aria-label="Track your booking"
            >
              Track Booking
            </button>

            <a
              href="https://app.suitedash.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-primary rounded px-2 py-1"
              aria-label="Customer portal (opens in new tab)"
            >
              Portal
            </a>

            {/* Primary CTA */}
            <Button
              variant="amber"
              onClick={() => scrollToSection("booking-form")}
              className="font-semibold shadow-lg hover:shadow-xl transition-all focus:ring-2 focus:ring-offset-2"
              aria-label="Book a notary appointment"
            >
              Book Now
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button 
                variant="ghost" 
                size="icon"
                aria-label="Open menu"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] overflow-y-auto">
              <nav className="flex flex-col gap-6 mt-8" aria-label="Mobile navigation">
                <div className="mb-4">
                  <img src={notroomLogo} alt="Notroom Logo" className="h-10" />
                </div>

                {/* Primary CTA - Top of mobile menu */}
                <Button
                  variant="amber"
                  size="lg"
                  onClick={() => scrollToSection("booking-form")}
                  className="w-full font-semibold"
                >
                  Book Now
                </Button>

                {/* Phone Number */}
                <a
                  href="tel:814-480-0989"
                  className="flex items-center gap-2 text-lg font-semibold hover:text-primary transition-colors p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <Phone className="w-5 h-5" />
                  (814) 480-0989
                </a>

                <div className="border-t pt-4">
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                    Services
                  </h3>
                  <div className="flex flex-col gap-2 pl-2">
                    {services.map((service) => (
                      <button
                        key={service.path}
                        onClick={() => navigateToPage(service.path)}
                        className="text-left text-sm hover:text-primary transition-colors py-2 focus:outline-none focus:text-primary"
                      >
                        {service.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                    Service Areas
                  </h3>
                  <div className="flex flex-col gap-2 pl-2">
                    {areas.map((area) => (
                      <button
                        key={area.path}
                        onClick={() => navigateToPage(area.path)}
                        className="text-left text-sm hover:text-primary transition-colors py-2 focus:outline-none focus:text-primary"
                      >
                        {area.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="border-t pt-4 flex flex-col gap-3">
                  <button
                    onClick={() => navigateToPage("/pricing")}
                    className="text-left text-base font-medium hover:text-primary transition-colors focus:outline-none focus:text-primary"
                  >
                    Pricing
                  </button>

                  <button
                    onClick={() => navigateToPage("/subscriptions")}
                    className="text-left text-base font-medium hover:text-primary transition-colors focus:outline-none focus:text-primary"
                  >
                    Subscriptions
                  </button>

                  <button
                    onClick={() => navigateToPage("/resources/how-ron-works")}
                    className="text-left text-base font-medium hover:text-primary transition-colors focus:outline-none focus:text-primary"
                  >
                    How RON Works
                  </button>

                  <button
                    onClick={() => scrollToSection("faq")}
                    className="text-left text-base font-medium hover:text-primary transition-colors focus:outline-none focus:text-primary"
                  >
                    FAQ
                  </button>

                  <button
                    onClick={() => navigateToPage("/track-booking")}
                    className="text-left text-base font-medium hover:text-primary transition-colors focus:outline-none focus:text-primary"
                  >
                    Track Booking
                  </button>

                  <a
                    href="https://app.suitedash.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-left text-base font-medium hover:text-primary transition-colors focus:outline-none focus:text-primary"
                  >
                    Customer Portal
                  </a>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
