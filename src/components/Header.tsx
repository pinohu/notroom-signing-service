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

  const services = [
    { label: "Remote Online Notary", path: "/services/remote-online-notary" },
    { label: "Mobile Notary", path: "/services/mobile-notary" },
    { label: "Loan Signing Agent", path: "/services/loan-signing-agent" },
    { label: "Business Retainer Plans", path: "/services/business-retainer" },
    { label: "Apostille Services", path: "/services/apostille" },
  ];

  const areas = [
    { label: "Erie County", path: "/areas/erie-county" },
    { label: "Crawford County", path: "/areas/crawford-county" },
    { label: "Warren County", path: "/areas/warren-county" },
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
            className="text-2xl font-bold text-primary hover:text-accent transition-colors"
          >
            NOTROOM
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
                              onClick={() => navigate(service.path)}
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
                              onClick={() => navigate(area.path)}
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
              onClick={() => navigate("/pricing")}
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              Pricing
            </button>
            <button
              onClick={() => navigate("/resources/how-ron-works")}
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
                <div className="text-2xl font-bold text-primary mb-4">
                  NOTROOM
                </div>
                
                {/* Services Dropdown */}
                <div>
                  <div className="text-sm font-semibold text-muted-foreground mb-2">Services</div>
                  <div className="flex flex-col gap-2 pl-2">
                    {services.map((service) => (
                      <button
                        key={service.path}
                        onClick={() => {
                          navigate(service.path);
                          setMobileMenuOpen(false);
                        }}
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
                        onClick={() => {
                          navigate(area.path);
                          setMobileMenuOpen(false);
                        }}
                        className="text-left text-sm hover:text-primary transition-colors"
                      >
                        {area.label}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => {
                    navigate("/pricing");
                    setMobileMenuOpen(false);
                  }}
                  className="text-left text-lg font-medium hover:text-primary transition-colors"
                >
                  Pricing
                </button>

                <button
                  onClick={() => {
                    navigate("/resources/how-ron-works");
                    setMobileMenuOpen(false);
                  }}
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
