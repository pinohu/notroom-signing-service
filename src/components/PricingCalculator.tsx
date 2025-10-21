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
      basePrice = 35; // Standard notarization
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
      basePrice = 195; // Standard apostille service
      // Add per document for apostille
      if (documents > 1) {
        basePrice += (documents - 1) * 100;
      }
    } else if (service === "loan") {
      basePrice = 150;
    }

    // Urgency adjustments
    if (service === "apostille") {
      if (urgency === "same-day") {
        basePrice = 295; // Expedited apostille flat rate
      }
    } else {
      if (urgency === "same-day") {
        basePrice *= 1.5;
      } else if (urgency === "urgent") {
        basePrice *= 1.25;
      }
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
              <li>• PA notary fee: $5 per signature</li>
              <li>• Technology platform fee: $30</li>
              <li>• Real estate docs: $75 total</li>
            </>
          )}
          {service === "mobile" && (
            <>
              <li>• PA notary fee: $5-15 per signature</li>
              <li>• Travel service fee included</li>
              <li>• Up to 3 documents included</li>
            </>
          )}
          {service === "apostille" && (
            <>
              <li>• PA state apostille fee: $15</li>
              <li>• Document notarization included</li>
              <li>• Service & return shipping included</li>
            </>
          )}
          {service === "loan" && (
            <>
              <li>• PA notary fee: $5-15 per signature</li>
              <li>• Document printing & travel included</li>
              <li>• FedEx return shipping included</li>
            </>
          )}
        </ul>
      </div>
    </Card>
  );
};

export default PricingCalculator;