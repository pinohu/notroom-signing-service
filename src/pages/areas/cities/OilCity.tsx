import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Video, Car, FileText, Globe, Users, Building2, CheckCircle, Phone, Mail, Briefcase, MapPin, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const OilCity = () => {
  const navigate = useNavigate();
  
  const scrollToBooking = () => {
    navigate("/");
    setTimeout(() => {
      const element = document.getElementById("booking-form");
      element?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const services = [
    {
      icon: Video,
      title: "Remote Online Notary (RON)",
      price: "$45",
      description: "Online notarization available 24/7 for Oil City residents",
      keywords: ["oil city online notary", "ron oil city pa", "virtual notary oil city"],
      link: "/services/remote-online-notary"
    },
    {
      icon: Car,
      title: "Mobile Notary",
      price: "$125+",
      description: "We come to your home, office, or business in Oil City",
      keywords: ["mobile notary oil city", "traveling notary oil city pa", "notary at home oil city"],
      link: "/services/mobile-notary"
    },
    {
      icon: FileText,
      title: "Loan Signing Agent",
      price: "$175",
      description: "Real estate closing services throughout Oil City",
      keywords: ["loan signing oil city", "closing agent oil city pa", "mortgage notary oil city"],
      link: "/services/loan-signing-agent"
    },
    {
      icon: Globe,
      title: "Apostille Services",
      price: "$245+",
      description: "International document authentication for Oil City residents",
      keywords: ["apostille oil city pa", "document authentication oil city", "state dept oil city"],
      link: "/services/apostille"
    },
    {
      icon: Users,
      title: "I-9 Verification",
      price: "$85+",
      description: "Employment verification for Oil City area businesses",
      keywords: ["i9 verification oil city", "employment eligibility oil city", "i9 notary oil city pa"],
      link: "/services/i9-verification"
    },
    {
      icon: Building2,
      title: "Registered Office & LLC Formation",
      price: "$149+",
      description: "Start your business in Oil City with our formation services",
      keywords: ["llc formation oil city", "registered agent oil city pa", "start business oil city"],
      link: "/services/registered-office"
    },
    {
      icon: Briefcase,
      title: "Business Retainer Plans",
      price: "$399+",
      description: "Monthly plans for Oil City businesses",
      keywords: ["business notary oil city", "corporate notary oil city pa", "bulk notary oil city"],
      link: "/services/business-retainer"
    }
  ];

  const neighborhoods = [
    "Downtown Oil City",
    "East End",
    "West Side",
    "North Oil City",
    "South Oil City",
    "Plumer",
    "Siverly"
  ];

  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Notroom - Notary & Business Services - Oil City, PA",
    "description": "Complete notary and business services in Oil City, Pennsylvania. Remote online notary, mobile notary, loan signing agent, apostille, I-9 verification, LLC formation, and registered office services. Serving all Oil City neighborhoods including Downtown, East End, West Side.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Oil City",
      "addressRegion": "PA",
      "addressCountry": "US"
    },
    "areaServed": {
      "@type": "City",
      "name": "Oil City",
      "containedInPlace": {
        "@type": "AdministrativeArea",
        "name": "Venango County"
      }
    },
    "telephone": "814-480-0989",
    "email": "support@notroom.com",
    "priceRange": "$45-$500"
  };

  return (
    <Layout>
      <SEO
        title="Oil City PA Notary Services | Mobile Notary, RON, Apostille, I-9, LLC Formation | Same-Day Available"
        description="Professional notary and business services in Oil City, PA. Remote online notary (RON) $45, mobile notary $125+, loan signing agent, apostille services, I-9 verification, LLC formation. Serving Downtown Oil City, East End, West Side, and all neighborhoods. Same-day available. Licensed & bonded Pennsylvania notary."
        keywords="Oil City notary, notary Oil City PA, mobile notary Oil City, online notary Oil City, RON Oil City Pennsylvania, loan signing agent Oil City, apostille Oil City PA, I-9 verification Oil City, LLC formation Oil City, registered agent Oil City PA, notary near me Oil City, notary public Oil City, business formation Oil City, Venango County notary Oil City"
        canonical="https://notroom.com/areas/oil-city-pa"
        schema={schema}
      />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary via-primary-dark to-accent overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-20"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20">
              <MapPin className="w-4 h-4" />
              <span className="text-sm font-medium">Serving All of Oil City, PA</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Oil City's Complete<br />Notary & Business Services
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 text-white/90 leading-relaxed">
              Professional RON, Mobile Notary, Loan Signing, Apostille, I-9, LLC Formation & More in Oil City, Pennsylvania
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button
                size="lg"
                onClick={scrollToBooking}
                className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6 h-auto shadow-xl"
              >
                Book Service in Oil City
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-2 border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-6 h-auto"
              >
                <a href="tel:814-480-0989">Call (814) 480-0989</a>
              </Button>
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                <span>Same-Day Available</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                <span>PA Licensed & Bonded</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                <span>All Oil City Neighborhoods</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Breadcrumb */}
      <section className="py-4 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary">Home</Link>
            <ArrowRight className="w-4 h-4" />
            <Link to="/areas/venango-county" className="hover:text-primary">Venango County</Link>
            <ArrowRight className="w-4 h-4" />
            <span className="text-foreground">Oil City</span>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">All Services Available in Oil City</h2>
            <p className="text-xl text-muted-foreground">Professional notary and business services at your doorstep</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                  <div className="text-2xl font-bold text-primary mb-3">{service.price}</div>
                  <p className="text-muted-foreground mb-4 text-sm">{service.description}</p>
                  <Button asChild className="w-full">
                    <Link to={service.link}>Learn More</Link>
                  </Button>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Neighborhoods */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">We Serve All Oil City Neighborhoods</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {neighborhoods.map((neighborhood) => (
                <div key={neighborhood} className="text-center p-4 bg-background rounded-lg shadow-sm">
                  <CheckCircle className="w-5 h-5 text-primary mx-auto mb-2" />
                  <p className="font-medium text-sm">{neighborhood}</p>
                </div>
              ))}
            </div>
            <p className="text-center text-muted-foreground mt-6">
              Mobile service available throughout Oil City and surrounding areas
            </p>
          </div>
        </div>
      </section>

      {/* Local SEO Content */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose prose-lg">
            <h2 className="text-3xl font-bold mb-6">Professional Notary Services Throughout Oil City, PA</h2>
            
            <p className="text-lg text-muted-foreground mb-6">
              Notroom provides comprehensive notary and business services to residents and businesses throughout Oil City, Pennsylvania. Whether you're in Downtown Oil City, the East End, West Side, or any neighborhood, we offer convenient mobile service and 24/7 online notarization.
            </p>

            <h3 className="text-2xl font-bold mb-4">Why Oil City Residents Choose Notroom</h3>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Card className="p-6">
                <h4 className="font-bold mb-3">Local Mobile Service</h4>
                <p className="text-muted-foreground text-sm">
                  We travel throughout Oil City - from Downtown to Siverly, East End to West Side. Same-day appointments available for homes, offices, hospitals, and care facilities.
                </p>
              </Card>
              <Card className="p-6">
                <h4 className="font-bold mb-3">24/7 Online Notary</h4>
                <p className="text-muted-foreground text-sm">
                  Can't meet in person? Get notarized online from anywhere in Oil City via secure video call. Perfect for powers of attorney, affidavits, and most documents.
                </p>
              </Card>
              <Card className="p-6">
                <h4 className="font-bold mb-3">Real Estate Services</h4>
                <p className="text-muted-foreground text-sm">
                  NNA-certified loan signing agent for Oil City home purchases, refinances, and HELOCs. We handle all closing documents with professionalism.
                </p>
              </Card>
              <Card className="p-6">
                <h4 className="font-bold mb-3">Business Formation</h4>
                <p className="text-muted-foreground text-sm">
                  Starting a business in Oil City? We handle LLC formation, registered office service, and compliance management so you can focus on growing your business.
                </p>
              </Card>
            </div>

            <h3 className="text-2xl font-bold mb-4">Serving Oil City & Venango County</h3>
            <p className="text-muted-foreground mb-4">
              As part of our Venango County service area, Oil City residents benefit from fast, professional notary services. We're familiar with local businesses, banks, title companies, and legal offices throughout the area.
            </p>
            
            <div className="bg-primary/10 p-6 rounded-lg border border-primary/20">
              <p className="font-semibold mb-2">Ready to get started?</p>
              <p className="text-muted-foreground mb-4">Book your notary appointment in Oil City today. Same-day mobile service available throughout all neighborhoods.</p>
              <div className="flex gap-4">
                <Button onClick={scrollToBooking}>Book Now</Button>
                <Button variant="outline" asChild><a href="tel:814-480-0989">Call (814) 480-0989</a></Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Book Your Oil City Notary Service Today</h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Serving all of Oil City with professional notary and business services
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button
              size="lg"
              onClick={scrollToBooking}
              className="bg-white text-primary hover:bg-white/90"
            >
              Book Any Service
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="border-2 border-white text-white hover:bg-white hover:text-primary"
            >
              <Link to="/areas/venango-county">View All Venango County Services</Link>
            </Button>
          </div>
          <div className="flex flex-col sm:flex-row gap-6 justify-center text-sm">
            <a href="tel:814-480-0989" className="flex items-center gap-2 hover:underline">
              <Phone className="w-4 h-4" />
              814-480-0989
            </a>
            <a href="mailto:support@notroom.com" className="flex items-center gap-2 hover:underline">
              <Mail className="w-4 h-4" />
              support@notroom.com
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default OilCity;
