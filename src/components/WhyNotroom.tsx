import { Zap, Lock, Shield, DollarSign } from "lucide-react";
import AnimatedCounter from "./AnimatedCounter";
import ScrollReveal from "./ScrollReveal";

const WhyNotroom = () => {
  const advantages = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Average 5-minute wait for online, 2-hour response for mobile. No more waiting days for an appointment."
    },
    {
      icon: Lock,
      title: "Bank-Level Security",
      description: "SOC 2 compliant platform, encrypted video, secure ID verification. Your documents are protected."
    },
    {
      icon: Shield,
      title: "State Approved",
      description: "PA Department of State approved technology. Our notaries are commissioned, bonded, and background-checked."
    },
    {
      icon: DollarSign,
      title: "Transparent Pricing",
      description: "No hidden fees, no surprises. What you see is what you pay. Satisfaction guaranteed or money back."
    }
  ];

  const stats = [
    { number: "5min", label: "Average Online Wait Time" },
    { number: "2hr", label: "Mobile Response Time" },
    { number: "24/7", label: "Online Availability" },
    { number: "100%", label: "Secure & Encrypted" }
  ];

  return (
    <section id="why-notroom" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Why Erie Trusts Notroom
          </h2>
        </div>

        {/* Advantages Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto mb-16">
          {advantages.map((advantage, index) => {
            const Icon = advantage.icon;
            return (
              <ScrollReveal key={index} delay={index * 100}>
                <div className="text-center">
                  {/* Icon */}
                  <div className="flex justify-center mb-6">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300">
                      <Icon className="w-10 h-10 text-white" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-foreground mb-3">
                    {advantage.title}
                  </h3>

                  {/* Description */}
                  <p className="text-muted-foreground leading-relaxed">
                    {advantage.description}
                  </p>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Stats Bar */}
        <ScrollReveal>
          <div className="bg-gradient-to-br from-primary to-accent rounded-2xl p-8 shadow-2xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                    {stat.number.includes('+') ? (
                      <>
                        <AnimatedCounter end={parseInt(stat.number)} />+
                      </>
                    ) : (
                      stat.number
                    )}
                  </div>
                  <div className="text-white/90 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default WhyNotroom;
