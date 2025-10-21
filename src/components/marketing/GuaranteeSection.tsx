import { Shield, CheckCircle, Clock, FileCheck } from "lucide-react";
import { Card } from "@/components/ui/card";

const GuaranteeSection = () => {
  const commitments = [
    {
      icon: Shield,
      title: "Pennsylvania Licensed",
      desc: "State-commissioned notary public with required bonding and errors & omissions insurance coverage."
    },
    {
      icon: CheckCircle,
      title: "RULONA Compliant",
      desc: "All notarizations follow Pennsylvania state law (57 Pa.C.S. Chapter 3) and Act 79 of 2020 for RON services."
    },
    {
      icon: Clock,
      title: "Professional Service",
      desc: "Punctual, organized, and detail-oriented service for all notarization and business filing needs."
    },
    {
      icon: FileCheck,
      title: "Secure & Confidential",
      desc: "All documents handled with strict confidentiality. RON sessions recorded and stored for 10 years per PA law."
    }
  ];

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Commitment</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Professional notary and business services following Pennsylvania state regulations
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {commitments.map((commitment, index) => (
              <Card key={index} className="p-6 text-center">
                <commitment.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-bold mb-2">{commitment.title}</h3>
                <p className="text-sm text-muted-foreground">{commitment.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GuaranteeSection;
