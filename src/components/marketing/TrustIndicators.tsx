import { Shield, Award, CheckCircle, Star } from "lucide-react";
import { Card } from "@/components/ui/card";

const TrustIndicators = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <Card className="p-4 text-center">
        <Shield className="w-8 h-8 text-primary mx-auto mb-2" />
        <div className="text-2xl font-bold text-primary">100%</div>
        <div className="text-xs text-muted-foreground">Compliant</div>
      </Card>
      <Card className="p-4 text-center">
        <Award className="w-8 h-8 text-primary mx-auto mb-2" />
        <div className="text-2xl font-bold text-primary">Licensed</div>
        <div className="text-xs text-muted-foreground">& Bonded</div>
      </Card>
      <Card className="p-4 text-center">
        <CheckCircle className="w-8 h-8 text-primary mx-auto mb-2" />
        <div className="text-2xl font-bold text-primary">500+</div>
        <div className="text-xs text-muted-foreground">Clients Served</div>
      </Card>
      <Card className="p-4 text-center">
        <Star className="w-8 h-8 text-primary mx-auto mb-2" />
        <div className="text-2xl font-bold text-primary">4.9/5</div>
        <div className="text-xs text-muted-foreground">Rating</div>
      </Card>
    </div>
  );
};

export default TrustIndicators;
