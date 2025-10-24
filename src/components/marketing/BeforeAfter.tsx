import { ArrowRight, Clock, DollarSign, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import ScrollReveal from "../ScrollReveal";
import { Button } from "../ui/button";

const BeforeAfter = () => {
  const scrollToBooking = () => {
    document.getElementById("booking-form")?.scrollIntoView({ behavior: "smooth" });
  };

  const scenarios = [
    {
      before: {
        title: "The Old Way",
        items: [
          "Drive to notary office during business hours",
          "Wait in line for 30-45 minutes",
          "Rush to make copies beforehand",
          "Take time off work ($100+ in lost wages)",
          "Multiple trips if documents aren't right",
          "Hope notary is available"
        ],
        cost: "$150+ in time & money"
      },
      after: {
        title: "The Notroom Way",
        items: [
          "Connect from anywhere via video",
          "Appointment scheduled around YOUR schedule",
          "Digital documents handled instantly",
          "No time off work needed",
          "Everything verified before you start",
          "100% guaranteed availability"
        ],
        cost: "Just $60, done in 15 minutes"
      }
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-muted/30 to-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <div className="inline-block mb-4 px-6 py-2 bg-[hsl(var(--amber))]/10 rounded-full border border-[hsl(var(--amber))]/20">
                <span className="text-[hsl(var(--amber))] font-bold">THE TRANSFORMATION</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                See The Difference
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Why waste hours of your day when you could be done in minutes? Here's what changes when you choose Notroom.
              </p>
            </div>
          </ScrollReveal>

          {scenarios.map((scenario, index) => (
            <ScrollReveal key={index} delay={100}>
              <div className="grid md:grid-cols-2 gap-8 mb-12">
                {/* Before */}
                <Card className="border-2 border-destructive/30 bg-destructive/5">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-3 rounded-lg bg-destructive/10">
                        <Clock className="w-8 h-8 text-destructive" />
                      </div>
                      <h3 className="text-2xl font-bold text-destructive">{scenario.before.title}</h3>
                    </div>
                    <ul className="space-y-3 mb-6">
                      {scenario.before.items.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-muted-foreground">
                          <span className="text-destructive mt-1">✗</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="pt-4 border-t border-destructive/20">
                      <p className="text-sm text-muted-foreground">Hidden Cost:</p>
                      <p className="text-xl font-bold text-destructive">{scenario.before.cost}</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Arrow */}
                <div className="hidden md:flex items-center justify-center absolute left-1/2 transform -translate-x-1/2 z-10">
                  <div className="bg-[hsl(var(--success-green))] text-white p-4 rounded-full shadow-xl">
                    <ArrowRight className="w-8 h-8" />
                  </div>
                </div>

                {/* After */}
                <Card className="border-2 border-[hsl(var(--success-green))]/30 bg-[hsl(var(--success-green))]/5">
                  <CardContent className="p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-3 rounded-lg bg-[hsl(var(--success-green))]/10">
                        <Zap className="w-8 h-8 text-[hsl(var(--success-green))]" />
                      </div>
                      <h3 className="text-2xl font-bold text-[hsl(var(--success-green))]">{scenario.after.title}</h3>
                    </div>
                    <ul className="space-y-3 mb-6">
                      {scenario.after.items.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-[hsl(var(--success-green))] mt-1">✓</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="pt-4 border-t border-[hsl(var(--success-green))]/20">
                      <p className="text-sm text-muted-foreground">Your Investment:</p>
                      <p className="text-xl font-bold text-[hsl(var(--success-green))]">{scenario.after.cost}</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </ScrollReveal>
          ))}

          <ScrollReveal delay={200}>
            <div className="text-center mt-12">
              <Card className="inline-block p-8 bg-gradient-to-r from-[hsl(var(--primary))]/10 to-[hsl(var(--action-cyan))]/10 border-2 border-primary/20">
                <div className="flex items-center justify-center gap-4 mb-4">
                  <DollarSign className="w-12 h-12 text-[hsl(var(--success-green))]" />
                  <div className="text-left">
                    <p className="text-sm text-muted-foreground">Average Savings Per Visit</p>
                    <p className="text-3xl font-bold text-[hsl(var(--success-green))]">$90 + 2 Hours</p>
                  </div>
                </div>
                <Button 
                  size="lg" 
                  variant="amber"
                  onClick={scrollToBooking}
                  className="font-bold text-lg px-8"
                >
                  Start Saving Now →
                </Button>
              </Card>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfter;
