import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Video, Car, FileText, Globe, Users, Building2, Phone, MapPin, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Hermitage = () => {
  const navigate = useNavigate();
  
  const scrollToBooking = () => {
    navigate("/");
    setTimeout(() => {
      const element = document.getElementById("booking-form");
      element?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const services = [
    { icon: Video, title: "Remote Online Notary", price: "$45", link: "/services/remote-online-notary" },
    { icon: Car, title: "Mobile Notary", price: "$125+", link: "/services/mobile-notary" },
    { icon: FileText, title: "Loan Signing", price: "$175", link: "/services/loan-signing-agent" },
    { icon: Globe, title: "Apostille", price: "$245+", link: "/services/apostille" },
    { icon: Users, title: "I-9 Verification", price: "$85+", link: "/services/i9-verification" },
    { icon: Building2, title: "LLC Formation", price: "$149+", link: "/services/registered-office" }
  ];

  return (
    <Layout>
      <SEO
        title="Hermitage PA Notary Services | Mobile, Online, Apostille, I-9, LLC Formation"
        description="Professional notary services in Hermitage, PA. RON $45, mobile notary $125+, loan signing, apostille, I-9 verification, LLC formation. Same-day service available."
        keywords="Hermitage notary, notary Hermitage PA, mobile notary Hermitage, online notary Hermitage, loan signing Hermitage, apostille Hermitage, I-9 Hermitage, LLC Hermitage, notary near me Hermitage"
        canonical="https://notroom.com/areas/hermitage-pa"
      />

      <section className="py-20 bg-gradient-to-br from-primary to-accent text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full mb-6"><MapPin className="w-4 h-4" /><span>Hermitage, PA</span></div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Hermitage Notary Services</h1>
            <p className="text-xl mb-8">Complete notary and business services for Hermitage residents</p>
            <Button size="lg" onClick={scrollToBooking} className="bg-white text-primary hover:bg-white/90">Book Service</Button>
          </div>
        </div>
      </section>

      <section className="py-4 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm">
            <Link to="/" className="hover:text-primary">Home</Link>
            <ArrowRight className="w-4 h-4" />
            <Link to="/areas/mercer-county" className="hover:text-primary">Mercer County</Link>
            <ArrowRight className="w-4 h-4" />
            <span>Hermitage</span>
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

export default Hermitage;
