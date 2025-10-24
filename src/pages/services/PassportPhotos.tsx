import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, Camera, Shield, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PassportPhotos = () => {
  const navigate = useNavigate();

  const scrollToBooking = () => {
    navigate("/");
    setTimeout(() => {
      document.getElementById("booking-form")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <Layout>
      <SEO
        title="Passport Photo Services | $15 | Erie, PA"
        description="Professional passport and visa photos in Erie, PA. Compliant with all government requirements. Quick service, $15 per session."
        keywords="passport photos Erie PA, visa photos, passport picture, ID photo service"
        canonical="https://notroom.com/services/passport-photos"
      />

      <section className="bg-gradient-to-br from-[hsl(var(--hero-gradient-from))] to-[hsl(var(--hero-gradient-to))] text-primary-foreground py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-background/10 backdrop-blur-sm mb-6">
              <Camera className="w-10 h-10" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Passport & Visa Photo Services</h1>
            <p className="text-xl mb-8 opacity-90">
              Professional passport photos that meet all government requirements. Quick, affordable, and compliant.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="amber" onClick={scrollToBooking} className="text-lg px-8 py-6">
                Book Now - $15
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <Card className="p-8 border-primary border-2">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Simple Pricing</h2>
                <div className="text-5xl font-bold text-primary mb-2">$15</div>
                <p className="text-xl text-muted-foreground">Per photo session</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-4">What's Included:</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                      <span>Government-compliant photos</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                      <span>Professional backdrop & lighting</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                      <span>2 printed photos included</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                      <span>Quick 5-minute service</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-4">Accepted For:</h3>
                  <ul className="space-y-2 text-sm">
                    <li>• US Passport applications</li>
                    <li>• Visa applications</li>
                    <li>• Green card renewals</li>
                    <li>• Naturalization forms</li>
                    <li>• Global Entry/TSA PreCheck</li>
                    <li>• International travel documents</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose Notroom?</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="p-6">
                <Shield className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Guaranteed Compliance</h3>
                <p className="text-muted-foreground">
                  Photos meet all government specifications. If rejected, we'll retake for free.
                </p>
              </Card>

              <Card className="p-6">
                <Clock className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Same-Day Service</h3>
                <p className="text-muted-foreground">
                  Walk-ins welcome. Most sessions completed in under 5 minutes.
                </p>
              </Card>

              <Card className="p-6">
                <Camera className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Professional Quality</h3>
                <p className="text-muted-foreground">
                  Professional equipment and proper lighting ensure perfect results every time.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Need Passport Photos Today?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Quick, professional passport photos. Just $15 per session.
            </p>
            <Button size="lg" variant="amber" onClick={scrollToBooking} className="text-lg px-8">
              Book Appointment
            </Button>
            <p className="text-sm text-muted-foreground mt-6">
              Questions? Call <a href="tel:814-480-0989" className="text-primary hover:underline">(814) 480-0989</a>
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PassportPhotos;
