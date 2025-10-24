import { AlertTriangle, TrendingDown, Clock, DollarSign } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import ScrollReveal from "../ScrollReveal";
import { Button } from "../ui/button";

const CostOfInaction = () => {
  const scrollToBooking = () => {
    document.getElementById("booking-form")?.scrollIntoView({ behavior: "smooth" });
  };

  const costs = [
    {
      icon: Clock,
      title: "Every Day You Wait",
      impact: "Your documents remain unnotarized",
      realCost: "Delayed closings cost $150-500/day in interest & fees"
    },
    {
      icon: DollarSign,
      title: "Traditional Notary Visits",
      impact: "2-3 hours of your time wasted",
      realCost: "Lost wages + gas + parking = $100-200 per trip"
    },
    {
      icon: TrendingDown,
      title: "Missed Opportunities",
      impact: "Unable to complete time-sensitive deals",
      realCost: "Lost contracts, expired offers, legal penalties"
    },
    {
      icon: AlertTriangle,
      title: "Last-Minute Scrambles",
      impact: "Urgent notarization at premium prices",
      realCost: "Pay 2-3x more in rush fees ($200-400)"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-destructive/5 to-amber/5 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,hsl(var(--destructive))_25%,hsl(var(--destructive))_50%,transparent_50%,transparent_75%,hsl(var(--destructive))_75%)] bg-[length:20px_20px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 mb-4 px-6 py-2 bg-destructive/10 rounded-full border border-destructive/20">
                <AlertTriangle className="w-5 h-5 text-destructive" />
                <span className="text-destructive font-bold">THE HIDDEN COST</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                What Waiting <span className="text-destructive">Actually Costs You</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Most people don't realize that procrastinating on notarization isn't just inconvenient—it's expensive. Here's what delay really costs.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {costs.map((cost, index) => {
              const Icon = cost.icon;
              return (
                <ScrollReveal key={index} delay={index * 100}>
                  <Card className="border-2 border-destructive/20 hover:border-destructive/40 transition-all duration-300 h-full">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-xl bg-destructive/10 flex-shrink-0">
                          <Icon className="w-8 h-8 text-destructive" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-bold mb-2">{cost.title}</h3>
                          <p className="text-muted-foreground mb-3">{cost.impact}</p>
                          <div className="bg-destructive/5 rounded-lg p-3 border-l-4 border-destructive">
                            <p className="text-sm font-semibold text-destructive">{cost.realCost}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </ScrollReveal>
              );
            })}
          </div>

          <ScrollReveal delay={400}>
            <Card className="bg-gradient-to-r from-[hsl(var(--success-green))]/10 to-[hsl(var(--primary))]/10 border-2 border-[hsl(var(--success-green))]/30 p-8">
              <div className="max-w-3xl mx-auto text-center">
                <h3 className="text-3xl font-bold mb-4">The Solution is Simple</h3>
                <p className="text-lg text-muted-foreground mb-6">
                  Book with Notroom today and avoid all these hidden costs. Our remote service takes 15 minutes, 
                  costs just $60, and can be done from anywhere. <strong className="text-foreground">No more delays. No more excuses. No more hidden costs.</strong>
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-6">
                  <div className="text-center">
                    <p className="text-4xl font-bold text-[hsl(var(--success-green))]">$60</p>
                    <p className="text-sm text-muted-foreground">One transparent price</p>
                  </div>
                  <div className="hidden sm:block w-px h-12 bg-border" />
                  <div className="text-center">
                    <p className="text-4xl font-bold text-[hsl(var(--success-green))]">15 min</p>
                    <p className="text-sm text-muted-foreground">Start to finish</p>
                  </div>
                  <div className="hidden sm:block w-px h-12 bg-border" />
                  <div className="text-center">
                    <p className="text-4xl font-bold text-[hsl(var(--success-green))]">$0</p>
                    <p className="text-sm text-muted-foreground">Hidden fees</p>
                  </div>
                </div>
                <Button 
                  size="lg" 
                  variant="amber"
                  onClick={scrollToBooking}
                  className="font-bold text-lg px-8"
                >
                  Stop Losing Money - Book Now →
                </Button>
              </div>
            </Card>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default CostOfInaction;
