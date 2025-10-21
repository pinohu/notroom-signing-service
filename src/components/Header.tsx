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
    { label: "Remote Online Notary", path: "/services/remote-online-notary" },
    { label: "Mobile Notary", path: "/services/mobile-notary" },
    { label: "Loan Signing Agent", path: "/services/loan-signing-agent" },
    { label: "Apostille Services", path: "/services/apostille" },
    { label: "I-9 Verification", path: "/services/i9-verification" },
    { label: "Registered Office & Business Filings", path: "/services/registered-office" },
    { label: "Business Retainer Plans", path: "/services/business-retainer" },
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
          ? "bg-background/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button
            onClick={handleLogoClick}
            className="hover:opacity-80 transition-opacity"
          >
            <img src={notroomLogo} alt="Notroom" className="h-10" />
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-foreground hover:text-primary">
                    Services
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="bg-popover">
                    <ul className="grid w-[400px] gap-3 p-4 bg-popover">
                      {services.map((service) => (
                        <li key={service.path}>
                          <NavigationMenuLink asChild>
                            <button
                              onClick={() => navigateToPage(service.path)}
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground w-full text-left"
                            >
                              <div className="text-sm font-medium leading-none">{service.label}</div>
                            </button>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-foreground hover:text-primary">
                    Areas
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="bg-popover">
                    <ul className="grid w-[400px] gap-3 p-4 bg-popover">
                      {areas.map((area) => (
                        <li key={area.path}>
                          <NavigationMenuLink asChild>
                            <button
                              onClick={() => navigateToPage(area.path)}
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground w-full text-left"
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

            <button
              onClick={() => navigateToPage("/pricing")}
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Pricing
            </button>
            <button
              onClick={() => navigateToPage("/subscriptions")}
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Subscriptions
            </button>
            <button
              onClick={() => navigateToPage("/resources/how-ron-works")}
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              How RON Works
            </button>
            <button
              onClick={() => scrollToSection("faq")}
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              FAQ
            </button>
            <button
              onClick={() => navigateToPage("/track-booking")}
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Track Booking
            </button>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:814-480-0989"
              className="flex items-center gap-2 text-foreground hover:text-primary transition-colors font-medium"
            >
              <Phone className="w-4 h-4" />
              (814) 480-0989
            </a>
            <Button
              variant="amber"
              onClick={() => scrollToSection("booking-form")}
            >
              Book Now
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
              <div className="flex flex-col gap-6 mt-8">
                <div className="mb-4">
                  <img src={notroomLogo} alt="Notroom" className="h-10" />
                </div>
                
                {/* Services Dropdown */}
                <div>
                  <div className="text-sm font-semibold text-muted-foreground mb-2">Services</div>
                  <div className="flex flex-col gap-2 pl-2">
                    {services.map((service) => (
                      <button
                        key={service.path}
                        onClick={() => navigateToPage(service.path)}
                        className="text-left text-sm hover:text-primary transition-colors"
                      >
                        {service.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Areas Dropdown */}
                <div>
                  <div className="text-sm font-semibold text-muted-foreground mb-2">Service Areas</div>
                  <div className="flex flex-col gap-2 pl-2">
                    {areas.map((area) => (
                      <button
                        key={area.path}
                        onClick={() => navigateToPage(area.path)}
                        className="text-left text-sm hover:text-primary transition-colors"
                      >
                        {area.label}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => navigateToPage("/pricing")}
                  className="text-left text-lg font-medium hover:text-primary transition-colors"
                >
                  Pricing
                </button>

                <button
                  onClick={() => navigateToPage("/subscriptions")}
                  className="text-left text-lg font-medium hover:text-primary transition-colors"
                >
                  Subscriptions
                </button>

                <button
                  onClick={() => navigateToPage("/resources/how-ron-works")}
                  className="text-left text-lg font-medium hover:text-primary transition-colors"
                >
                  How RON Works
                </button>

                <button
                  onClick={() => scrollToSection("faq")}
                  className="text-left text-lg font-medium hover:text-primary transition-colors"
                >
                  FAQ
                </button>

                <button
                  onClick={() => navigateToPage("/track-booking")}
                  className="text-left text-lg font-medium hover:text-primary transition-colors"
                >
                  Track Booking
                </button>

                <a
                  href="tel:814-480-0989"
                  className="flex items-center gap-2 text-lg font-medium hover:text-primary transition-colors mt-4"
                >
                  <Phone className="w-5 h-5" />
                  (814) 480-0989
                </a>
                <Button
                  variant="amber"
                  className="mt-4"
                  onClick={() => scrollToSection("booking-form")}
                >
                  Book Now
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
