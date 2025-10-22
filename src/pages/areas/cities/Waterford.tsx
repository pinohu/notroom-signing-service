import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Video, Car, FileText, Globe, Users, Building2, MapPin, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Waterford = () => {
  const navigate = useNavigate();
  
  const scrollToBooking = () => {
    navigate("/");
    setTimeout(() => {
      const element = document.getElementById("booking-form");
      element?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const services = [
    { icon: Video, title: "Online Notary (RON)", price: "$45", link: "/services/remote-online-notary" },
    { icon: Car, title: "Mobile Notary", price: "$125+", link: "/services/mobile-notary" },
    { icon: FileText, title: "Loan Signing", price: "$175", link: "/services/loan-signing-agent" },
    { icon: Globe, title: "Apostille", price: "$245+", link: "/services/apostille" },
    { icon: Users, title: "I-9 Verification", price: "$85+", link: "/services/i9-verification" },
    { icon: Building2, title: "Business Formation", price: "$149+", link: "/services/registered-office" }
  ];

  return (
    <Layout>
      <SEO
        title="Waterford PA Notary | Mobile, Online, Apostille, I-9, LLC Formation Services"
        description="Professional notary services in Waterford, PA. Remote online notary, mobile notary, loan signing, apostille services, I-9 verification, LLC formation. Same-day available."
        keywords="Waterford notary, notary Waterford PA, mobile notary Waterford, online notary Waterford, loan signing Waterford, apostille Waterford, I-9 Waterford, LLC Waterford, notary near me Waterford"
        canonical="https://notroom.com/areas/waterford-pa"
      />

      <section className="py-20 bg-gradient-to-br from-primary to-accent text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full mb-6"><MapPin className="w-4 h-4" /><span>Waterford, PA</span></div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Waterford Notary Services</h1>
            <p className="text-xl mb-8">Complete notary and business services for Waterford</p>
            <Button size="lg" onClick={scrollToBooking} className="bg-white text-primary">Book Now</Button>
          </div>
        </div>
      </section>

      <section className="py-4 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm">
            <Link to="/" className="hover:text-primary">Home</Link>
            <ArrowRight className="w-4 h-4" />
            <Link to="/areas/erie-county" className="hover:text-primary">Erie County</Link>
            <ArrowRight className="w-4 h-4" />
            <span>Waterford</span>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {services.map((service, i) => {
              const Icon = service.icon;
              return (
                <Card key={i} className="p-6">
                  <Icon className="w-8 h-8 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                  <div className="text-2xl font-bold text-primary mb-4">{service.price}</div>
                  <Button asChild className="w-full"><Link to={service.link}>Learn More</Link></Button>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Waterford;
