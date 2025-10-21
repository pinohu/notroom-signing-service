import { Shield, CheckCircle, Clock, RefreshCw } from "lucide-react";
import { Card } from "@/components/ui/card";

const GuaranteeSection = () => {
  const guarantees = [
    {
      icon: Shield,
      title: "100% Satisfaction Guarantee",
      desc: "If you're not completely satisfied with our service, we'll make it right or refund your money."
    },
    {
      icon: CheckCircle,
      title: "Legally Compliant",
      desc: "All notarizations meet Pennsylvania state law requirements. Fully insured and bonded for your protection."
    },
    {
      icon: Clock,
      title: "On-Time Promise",
      desc: "We show up when we say we will. Your time is valuable, and we respect that commitment."
    },
    {
      icon: RefreshCw,
      title: "Error-Free Service",
      desc: "Meticulous attention to detail ensures documents are completed correctly the first time, every time."
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Guarantee to You</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We stand behind our work with industry-leading guarantees and professional standards
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {guarantees.map((guarantee, index) => (
              <Card key={index} className="p-6 text-center">
                <guarantee.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-bold mb-2">{guarantee.title}</h3>
                <p className="text-sm text-muted-foreground">{guarantee.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GuaranteeSection;
