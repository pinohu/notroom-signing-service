import { Calendar, CheckCircle, FileText } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import { Button } from "@/components/ui/button";

const ProcessTimeline = () => {
  const steps = [
    {
      number: "1",
      icon: Calendar,
      title: "Book Your Appointment",
      description: "Choose online (instant) or mobile service (select your time). Upload your document and pay securely online.",
      time: "Takes 2 minutes"
    },
    {
      number: "2",
      icon: CheckCircle,
      title: "Meet Your Notary",
      description: "Join secure video call (online) or welcome our notary to your location (mobile). Show your ID and review documents together.",
      time: "Takes 10-15 minutes"
    },
    {
      number: "3",
      icon: FileText,
      title: "Receive Notarized Documents",
      description: "Get your notarized document instantly via email (online) or in-hand (mobile). Digital certificate included for verification.",
      time: "Instant delivery"
    }
  ];

  const scrollToBooking = () => {
    document.getElementById("booking-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="process" className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            How It Works - 3 Simple Steps
          </h2>
          <p className="text-xl text-muted-foreground">
            Fast and convenient - whether online or in-person
          </p>
        </div>

        {/* Timeline */}
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connecting Line - Desktop Only */}
            <div className="hidden md:block absolute top-20 left-0 right-0 h-0.5 bg-primary/20" style={{ width: 'calc(100% - 8rem)', left: '4rem' }} />
            
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <ScrollReveal key={index} delay={index * 200}>
                  <div className="relative">
                  {/* Step Number Badge */}
                  <div className="flex justify-center mb-6">
                    <div className="relative">
                      <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center text-white text-3xl font-bold shadow-lg z-10 relative">
                        {step.number}
                      </div>
                      <div className="absolute inset-0 rounded-full bg-primary/20 animate-pulse" />
                    </div>
                  </div>

                  {/* Content Card */}
                  <div className="bg-background rounded-xl p-6 shadow-lg text-center">
                    {/* Icon */}
                    <div className="flex justify-center mb-4">
                      <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center">
                        <Icon className="w-8 h-8 text-accent" />
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-foreground mb-3">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {step.description}
                    </p>

                    {/* Time Badge */}
                    <div className="inline-block px-4 py-1 bg-[hsl(var(--success-green))]/10 rounded-full">
                      <span className="text-sm font-semibold text-[hsl(var(--success-green))]">
                        {step.time}
                      </span>
                    </div>
                  </div>
                </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button 
            size="lg" 
            variant="amber"
            className="text-lg px-12 py-7 h-auto shadow-xl"
            onClick={scrollToBooking}
          >
            Book Your Appointment
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProcessTimeline;
