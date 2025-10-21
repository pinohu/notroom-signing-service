import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapPin, Clock, DollarSign, CheckCircle, Phone, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const MercerCounty = () => {
  const scrollToBooking = () => {
    const bookingForm = document.getElementById("booking-form");
    if (bookingForm) {
      bookingForm.scrollIntoView({ behavior: "smooth" });
    }
  };

  const cities = [
    "Sharon", "Hermitage", "Farrell", "Grove City", "Sharpsville",
    "Greenville", "Mercer", "Stoneboro", "Sandy Lake", "Clark"
  ];

  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Notroom Notary Services - Mercer County",
    "description": "Professional mobile and online notary services in Mercer County, PA. Serving Sharon, Hermitage, Grove City, and all surrounding areas.",
    "areaServed": {
      "@type": "State",
      "name": "Pennsylvania",
      "containsPlace": {
        "@type": "City",
        "name": "Mercer County"
      }
    },
    "telephone": "814-480-0989",
    "priceRange": "$60-$150"
  };

  return (
    <Layout>
      <SEO
        title="Mercer County Notary Services | Sharon, Hermitage, Grove City | Mobile & Online"
        description="Professional notary services throughout Mercer County, PA. Mobile service in Sharon, Hermitage, Grove City, and all surrounding areas. Online notarization available statewide. Fast, reliable, licensed."
        keywords="Mercer County notary, Sharon notary, Hermitage notary, Grove City notary, mobile notary Mercer County, online notary Pennsylvania"
        canonical="https://notroom.com/areas/mercer-county"
        schema={schema}
      />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary via-primary-dark to-accent overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-20"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20">
              <MapPin className="w-4 h-4" />
              <span className="text-sm font-medium">Serving All of Mercer County</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Mercer County's Trusted<br />Notary Service
            </h1>
            
            <p className="text-xl md:text-2xl mb-8 text-white/90 leading-relaxed">
              Professional mobile and online notarization serving Sharon, Hermitage, Grove City, and all of Mercer County
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button
                size="lg"
                onClick={scrollToBooking}
                className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6 h-auto shadow-xl"
              >
                Book Mobile Service
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-2 border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-6 h-auto"
              >
                <Link to="/services/remote-online-notary">Get Notarized Online</Link>
              </Button>
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                <span>Licensed & Bonded</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                <span>Same-Day Available</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                <span>Background Checked</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Options */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Choose Your Service</h2>
            <p className="text-xl text-muted-foreground">Flexible options to meet your needs</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="p-8 hover:shadow-lg transition-shadow border-2">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Mobile Notary</h3>
                <div className="text-3xl font-bold text-primary mb-4">$125+</div>
                <p className="text-muted-foreground mb-6">We come to you anywhere in Mercer County</p>
                <ul className="text-left space-y-3 mb-6">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Service at your home, office, or location</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Same-day and after-hours available</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Perfect for multiple documents or signers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>No travel required on your part</span>
                  </li>
                </ul>
                <Button onClick={scrollToBooking} className="w-full" size="lg">
                  Book Mobile Service
                </Button>
              </div>
            </Card>

            <Card className="p-8 hover:shadow-lg transition-shadow border-2 border-primary">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Online Notary (RON)</h3>
                <div className="text-3xl font-bold text-primary mb-4">$60</div>
                <p className="text-muted-foreground mb-6">Fast, secure video notarization</p>
                <ul className="text-left space-y-3 mb-6">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Available 24/7 from anywhere</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Sessions typically under 15 minutes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Legally valid in all 50 states</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>Instant digital delivery</span>
                  </li>
                </ul>
                <Button asChild className="w-full" size="lg">
                  <Link to="/services/remote-online-notary">Get Notarized Online</Link>
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Cities Served */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Communities We Serve</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {cities.map((city) => (
                <div key={city} className="text-center p-4 bg-background rounded-lg shadow-sm hover:shadow-md transition-shadow">
                  <MapPin className="w-5 h-5 text-primary mx-auto mb-2" />
                  <p className="font-medium">{city}</p>
                </div>
              ))}
            </div>
            <p className="text-center text-muted-foreground mt-6">
              And all surrounding Mercer County communities
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Why Mercer County Trusts Notroom</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="p-6 text-center">
                <Clock className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3">Fast Response</h3>
                <p className="text-muted-foreground">Same-day mobile appointments available throughout Mercer County</p>
              </Card>

              <Card className="p-6 text-center">
                <DollarSign className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3">Transparent Pricing</h3>
                <p className="text-muted-foreground">No hidden fees. Know the exact cost before booking</p>
              </Card>

              <Card className="p-6 text-center">
                <CheckCircle className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-3">Fully Licensed</h3>
                <p className="text-muted-foreground">Pennsylvania-commissioned, bonded, and background-checked</p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Book Your Notary Service in Mercer County</h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Book your mobile notary appointment or get notarized online in minutes
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button
              size="lg"
              onClick={scrollToBooking}
              className="bg-white text-primary hover:bg-white/90"
            >
              Book Mobile Service
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="border-2 border-white text-white hover:bg-white hover:text-primary"
            >
              <Link to="/services/remote-online-notary">Online Notarization</Link>
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

export default MercerCounty;