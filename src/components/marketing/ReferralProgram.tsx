import { Gift, Users, DollarSign, Share2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ScrollReveal from "../ScrollReveal";

const ReferralProgram = () => {
  const scrollToBooking = () => {
    document.getElementById("booking-form")?.scrollIntoView({ behavior: "smooth" });
  };

  const benefits = [
    {
      icon: Gift,
      title: "You Get $25",
      description: "Credit toward your next service for every friend you refer"
    },
    {
      icon: Users,
      title: "They Get 15% Off",
      description: "Your friends save on their first booking with Notroom"
    },
    {
      icon: DollarSign,
      title: "Unlimited Earnings",
      description: "No cap on referrals. Refer 10 friends = $250 in credits"
    }
  ];

  const howItWorks = [
    { step: "1", text: "Book your first service with Notroom" },
    { step: "2", text: "Share your unique referral link" },
    { step: "3", text: "Your friend books and saves 15%" },
    { step: "4", text: "You both win - they save, you earn!" }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-[hsl(var(--success-green))]/5 to-[hsl(var(--primary))]/5">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 mb-4 px-6 py-2 bg-[hsl(var(--success-green))]/10 rounded-full border border-[hsl(var(--success-green))]/20">
                <Share2 className="w-5 h-5 text-[hsl(var(--success-green))]" />
                <span className="text-[hsl(var(--success-green))] font-bold">REFER & EARN</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Share Notroom, Earn Rewards
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Love our service? Share it with friends and family. When they book, you both win. It's that simple.
              </p>
            </div>
          </ScrollReveal>

          {/* Benefits */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <ScrollReveal key={index} delay={index * 100}>
                  <Card className="border-2 border-[hsl(var(--success-green))]/20 hover:border-[hsl(var(--success-green))] hover:shadow-xl transition-all duration-300 text-center h-full">
                    <CardContent className="p-8">
                      <div className="inline-flex items-center justify-center p-4 rounded-full bg-[hsl(var(--success-green))]/10 mb-4">
                        <Icon className="w-10 h-10 text-[hsl(var(--success-green))]" />
                      </div>
                      <h3 className="text-2xl font-bold mb-3">{benefit.title}</h3>
                      <p className="text-muted-foreground">{benefit.description}</p>
                    </CardContent>
                  </Card>
                </ScrollReveal>
              );
            })}
          </div>

          {/* How It Works */}
          <ScrollReveal delay={300}>
            <Card className="bg-gradient-to-r from-[hsl(var(--primary))]/10 to-[hsl(var(--action-cyan))]/10 border-2 border-primary/20">
              <CardContent className="p-8 md:p-12">
                <h3 className="text-3xl font-bold text-center mb-8">How It Works</h3>
                <div className="grid md:grid-cols-4 gap-6 mb-8">
                  {howItWorks.map((item, index) => (
                    <div key={index} className="text-center">
                      <div className="w-16 h-16 rounded-full bg-[hsl(var(--primary))] text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                        {item.step}
                      </div>
                      <p className="font-medium">{item.text}</p>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div className="text-center bg-background/50 rounded-lg p-8 border-2 border-[hsl(var(--amber))]">
                  <h4 className="text-2xl font-bold mb-4">Ready to Start Earning?</h4>
                  <p className="text-muted-foreground mb-6">
                    Book your first service today and unlock your referral link immediately after completion.
                  </p>
                  <Button 
                    size="lg" 
                    variant="amber"
                    onClick={scrollToBooking}
                    className="font-bold text-lg px-8"
                  >
                    Book Now & Get Your Link →
                  </Button>
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>

          {/* Social Proof */}
          <ScrollReveal delay={400}>
            <div className="text-center mt-12">
              <Card className="inline-block p-6 bg-muted/30">
                <p className="text-muted-foreground mb-2">Already Active Referrers</p>
                <div className="flex items-center justify-center gap-4">
                  <div className="text-center">
                    <p className="text-4xl font-bold text-[hsl(var(--success-green))]">847</p>
                    <p className="text-sm text-muted-foreground">Happy Referrers</p>
                  </div>
                  <div className="w-px h-12 bg-border" />
                  <div className="text-center">
                    <p className="text-4xl font-bold text-[hsl(var(--success-green))]">$21,175</p>
                    <p className="text-sm text-muted-foreground">Credits Earned</p>
                  </div>
                </div>
              </Card>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default ReferralProgram;
