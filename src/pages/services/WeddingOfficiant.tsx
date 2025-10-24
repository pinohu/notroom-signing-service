import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, Heart, Shield, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const WeddingOfficiant = () => {
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
        title="Wedding Officiant Services | $200 | Erie, PA"
        description="Professional wedding officiant in Erie, PA. Licensed and experienced. Personalized ceremonies. $200 flat rate."
        keywords="wedding officiant Erie PA, wedding ceremony, marriage officiant, get married Erie"
        canonical="https://notroom.com/services/wedding-officiant"
      />

      <section className="bg-gradient-to-br from-[hsl(var(--hero-gradient-from))] to-[hsl(var(--hero-gradient-to))] text-primary-foreground py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-background/10 backdrop-blur-sm mb-6">
              <Heart className="w-10 h-10" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Wedding Officiant Services</h1>
            <p className="text-xl mb-8 opacity-90">
              Make your special day perfect with a professional, licensed wedding officiant. Personalized ceremonies for your unique love story.
            </p>
            <Button size="lg" variant="amber" onClick={scrollToBooking} className="text-lg px-8 py-6">
              Book Your Ceremony - $200
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <Card className="p-8 border-primary border-2">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">All-Inclusive Pricing</h2>
                <div className="text-5xl font-bold text-primary mb-2">$200</div>
                <p className="text-xl text-muted-foreground">Complete ceremony service</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-4">What's Included:</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                      <span>Licensed wedding officiant</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                      <span>Personalized ceremony script</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                      <span>Marriage license signing</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                      <span>Pre-ceremony consultation</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-4">Ceremony Types:</h3>
                  <ul className="space-y-2 text-sm">
                    <li>• Traditional ceremonies</li>
                    <li>• Non-religious ceremonies</li>
                    <li>• Vow renewals</li>
                    <li>• Intimate elopements</li>
                    <li>• Small gatherings</li>
                    <li>• Custom ceremonies</li>
                    <li>• LGBTQ+ friendly</li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <strong>Planning Your Day:</strong> We'll meet before your ceremony to discuss your preferences and create a personalized script. 
                  We're experienced with all ceremony styles and happy to incorporate your traditions, readings, or special touches.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Ready to Plan Your Ceremony?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Let's create the perfect ceremony for your special day. Professional, personalized, and memorable.
            </p>
            <Button size="lg" variant="amber" onClick={scrollToBooking} className="text-lg px-8">
              Book Consultation
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default WeddingOfficiant;
