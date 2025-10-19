import { Clock, MapPin, FileCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Services = () => {
  const services = [
    {
      icon: Clock,
      title: "Remote Online Notary",
      price: "$60",
      description: "Available 24/7",
      features: ["Video verification", "E-signature", "Instant completion", "Secure & legal"]
    },
    {
      icon: MapPin,
      title: "Mobile Notary Erie County",
      price: "$125",
      description: "Same-day available",
      features: ["We come to you", "Flexible scheduling", "All documents", "Professional service"]
    },
    {
      icon: FileCheck,
      title: "Loan Signing Agent",
      price: "$200",
      description: "Certified & Bonded",
      features: ["Real estate closings", "Refinancing", "Title documents", "Error-free"]
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Our Services
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Professional notary services tailored to your needs
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <Card 
              key={index} 
              className="hover:shadow-lg transition-all duration-300 border-2 hover:border-primary"
            >
              <CardContent className="p-8">
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <service.icon className="w-8 h-8 text-primary" />
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-center mb-2 text-foreground">
                  {service.title}
                </h3>
                
                <div className="text-center mb-4">
                  <span className="text-4xl font-bold text-primary">{service.price}</span>
                </div>
                
                <p className="text-center text-muted-foreground mb-6 font-medium">
                  {service.description}
                </p>
                
                <ul className="space-y-3">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-foreground">
                      <span className="text-primary mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
