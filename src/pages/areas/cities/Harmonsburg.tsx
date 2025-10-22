import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Video, Car, FileText, Globe, Users, Building2, Briefcase, MapPin, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Harmonsburg = () => {
  const navigate = useNavigate();
  
  const scrollToBooking = () => {
    navigate("/");
    setTimeout(() => {
      const element = document.getElementById("booking-form");
      element?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const services = [
    { icon: Video, title: "Remote Online Notary (RON)", price: "$50", description: "Online notarization available 24/7 for Harmonsburg residents from anywhere", link: "/services/remote-online-notary" },
    { icon: Car, title: "Mobile Notary", price: "$50 + mileage", description: "We travel to your home, office, or location in Harmonsburg", link: "/services/mobile-notary" },
    { icon: FileText, title: "Loan Signing Agent", price: "$175", description: "Professional real estate closing services in Harmonsburg", link: "/services/loan-signing-agent" },
    { icon: Globe, title: "Apostille Services", price: "$245+", description: "International document authentication for travel and business", link: "/services/apostille" },
    { icon: Users, title: "I-9 Verification", price: "$85+", description: "Employment verification services for Harmonsburg businesses", link: "/services/i9-verification" },
    { icon: Building2, title: "LLC Formation", price: "$149+", description: "Start your Harmonsburg business with professional LLC filing", link: "/services/registered-office" },
    { icon: Briefcase, title: "Business Retainer", price: "$399+", description: "Monthly retainer plans for ongoing notary and business needs", link: "/services/business-retainer" }
  ];

  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Notroom - Notary & Business Services - Harmonsburg, PA",
    "address": { "@type": "PostalAddress", "addressLocality": "Harmonsburg", "addressRegion": "PA", "addressCountry": "US" },
    "telephone": "814-480-0989",
    "priceRange": "$45-$500"
  };

  return (
    <Layout>
      <SEO
        title="Harmonsburg PA Notary Services | Mobile Notary, RON, Apostille, I-9, LLC Formation | Same-Day"
        description="Professional notary services in Harmonsburg, PA. Remote online notary $45, mobile notary $125+, loan signing, apostille, I-9 verification, LLC formation. Same-day available. Licensed Pennsylvania notary."
        keywords="Harmonsburg notary, notary Harmonsburg PA, mobile notary Harmonsburg, online notary Harmonsburg, RON Harmonsburg Pennsylvania, loan signing Harmonsburg, apostille Harmonsburg PA, I-9 Harmonsburg, LLC Harmonsburg, notary near me Harmonsburg, Crawford County notary"
        canonical="https://notroom.com/areas/harmonsburg-pa"
        schema={schema}
      />

      <section className="relative py-20 bg-gradient-to-br from-primary via-primary-dark to-accent overflow-hidden text-primary-foreground">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-primary-foreground/20">
              <MapPin className="w-4 h-4" />
              <span className="text-sm font-medium">Serving All of Harmonsburg, PA</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">Harmonsburg's Complete<br />Notary & Business Services</h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">Professional RON, Mobile Notary, Loan Signing & More in Harmonsburg, Pennsylvania</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button size="lg" onClick={scrollToBooking} variant="secondary" className="text-lg px-8 py-6 h-auto shadow-xl">Book Service in Harmonsburg</Button>
              <Button size="lg" variant="outline" asChild className="border-2 border-primary-foreground/20 hover:bg-primary-foreground/10 text-lg px-8 py-6 h-auto"><a href="tel:814-480-0989">Call (814) 480-0989</a></Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-4 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary">Home</Link>
            <ArrowRight className="w-4 h-4" />
            <Link to="/areas/crawford-county" className="hover:text-primary">Crawford County</Link>
            <ArrowRight className="w-4 h-4" />
            <span className="text-foreground">Harmonsburg</span>
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">All Services Available in Harmonsburg</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4"><Icon className="w-6 h-6 text-primary" /></div>
                  <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                  <div className="text-2xl font-bold text-primary mb-3">{service.price}</div>
                  <p className="text-muted-foreground mb-4 text-sm">{service.description}</p>
                  <Button asChild className="w-full"><Link to={service.link}>Learn More</Link></Button>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Book Your Harmonsburg Notary Service Today</h2>
          <p className="text-xl mb-8 opacity-90">Serving Harmonsburg with professional notary and business services</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={scrollToBooking} variant="secondary">Book Now</Button>
            <Button size="lg" variant="outline" asChild className="border-2 border-primary-foreground/20 hover:bg-primary-foreground/10"><Link to="/areas/crawford-county">View Crawford County Services</Link></Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Harmonsburg;
