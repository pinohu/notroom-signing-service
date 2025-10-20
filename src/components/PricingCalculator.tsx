import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Calculator, DollarSign } from "lucide-react";

const PricingCalculator = () => {
  const [service, setService] = useState("ron");
  const [documents, setDocuments] = useState(1);
  const [signers, setSigners] = useState(1);
  const [urgency, setUrgency] = useState("flexible");

  const calculatePrice = () => {
    let basePrice = 0;
    
    if (service === "ron") {
      basePrice = 60;
    } else if (service === "mobile") {
      basePrice = 125;
      // Add per document fee for mobile
      if (documents > 3) {
        basePrice += (documents - 3) * 10;
      }
      // Add per signer fee for mobile
      if (signers > 1) {
        basePrice += (signers - 1) * 15;
      }
    } else if (service === "apostille") {
      basePrice = 100;
      // Add per document for apostille
      if (documents > 1) {
        basePrice += (documents - 1) * 75;
      }
    } else if (service === "loan") {
      basePrice = 150;
    }

    // Urgency multiplier
    if (urgency === "same-day") {
      basePrice *= 1.5;
    } else if (urgency === "urgent") {
      basePrice *= 1.25;
    }

    return Math.round(basePrice);
  };

  const price = calculatePrice();

  return (
    <Card className="p-6 bg-gradient-to-br from-primary/5 to-accent/5 border-2 border-primary/20">
      <div className="flex items-center gap-2 mb-6">
        <Calculator className="w-6 h-6 text-primary" />
        <h3 className="text-2xl font-bold">Instant Price Calculator</h3>
      </div>

      <div className="space-y-4 mb-6">
        <div>
          <Label htmlFor="service-type">Service Type</Label>
          <Select value={service} onValueChange={setService}>
            <SelectTrigger id="service-type">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ron">Remote Online Notary (RON)</SelectItem>
              <SelectItem value="mobile">Mobile Notary</SelectItem>
              <SelectItem value="apostille">Apostille Service</SelectItem>
              <SelectItem value="loan">Loan Signing</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {(service === "mobile" || service === "apostille") && (
          <div>
            <Label htmlFor="documents">Number of Documents</Label>
            <Input
              id="documents"
              type="number"
              min="1"
              max="50"
              value={documents}
              onChange={(e) => setDocuments(parseInt(e.target.value) || 1)}
            />
            {service === "mobile" && documents > 3 && (
              <p className="text-xs text-muted-foreground mt-1">
                $10 per additional document after 3
              </p>
            )}
          </div>
        )}

        {service === "mobile" && (
          <div>
            <Label htmlFor="signers">Number of Signers</Label>
            <Input
              id="signers"
              type="number"
              min="1"
              max="10"
              value={signers}
              onChange={(e) => setSigners(parseInt(e.target.value) || 1)}
            />
            {signers > 1 && (
              <p className="text-xs text-muted-foreground mt-1">
                $15 per additional signer
              </p>
            )}
          </div>
        )}

        <div>
          <Label htmlFor="urgency">Urgency</Label>
          <Select value={urgency} onValueChange={setUrgency}>
            <SelectTrigger id="urgency">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="flexible">Flexible (Standard Rate)</SelectItem>
              <SelectItem value="urgent">Within 48 Hours (+25%)</SelectItem>
              <SelectItem value="same-day">Same Day (+50%)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="border-t-2 border-primary/20 pt-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Estimated Total</p>
            <div className="flex items-center gap-2">
              <DollarSign className="w-8 h-8 text-primary" />
              <span className="text-4xl font-bold text-primary">{price}</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">No hidden fees</p>
            <p className="text-xs text-muted-foreground">Final price confirmed at booking</p>
          </div>
        </div>
      </div>

      <div className="mt-4 p-4 bg-background rounded-lg">
        <h4 className="font-semibold mb-2 text-sm">What's Included:</h4>
        <ul className="text-xs text-muted-foreground space-y-1">
          {service === "ron" && (
            <>
              <li>• Secure video notarization session</li>
              <li>• Digital document delivery</li>
              <li>• Legal in all 50 states</li>
            </>
          )}
          {service === "mobile" && (
            <>
              <li>• Travel to your location</li>
              <li>• Professional notary service</li>
              <li>• Up to 3 documents included</li>
            </>
          )}
          {service === "apostille" && (
            <>
              <li>• Document notarization</li>
              <li>• Apostille filing with PA Dept of State</li>
              <li>• Return shipping included</li>
            </>
          )}
          {service === "loan" && (
            <>
              <li>• Complete loan document package</li>
              <li>• Travel to closing location</li>
              <li>• Scan-back service included</li>
            </>
          )}
        </ul>
      </div>
    </Card>
  );
};

export default PricingCalculator;