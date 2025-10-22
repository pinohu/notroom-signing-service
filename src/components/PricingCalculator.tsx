import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calculator, DollarSign, MapPin, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PRICING } from "@/constants/pricing";
import { calculateDistance, getOriginAddress, calculateRoundTripDistance } from "@/utils/distanceCalculation";
import { Alert, AlertDescription } from "@/components/ui/alert";

const PricingCalculator = () => {
  const navigate = useNavigate();
  const [service, setService] = useState("ron");
  const [documents, setDocuments] = useState(1);
  const [signers, setSigners] = useState(1);
  const [urgency, setUrgency] = useState("flexible");
  const [destinationAddress, setDestinationAddress] = useState("");
  const [distance, setDistance] = useState<number | null>(null);
  const [isCalculatingDistance, setIsCalculatingDistance] = useState(false);
  const [distanceError, setDistanceError] = useState<string | null>(null);

  // Calculate distance when address changes (debounced)
  useEffect(() => {
    if (service === "mobile" && destinationAddress.length > 10) {
      const timer = setTimeout(async () => {
        setIsCalculatingDistance(true);
        setDistanceError(null);
        const result = await calculateDistance(destinationAddress);
        setDistance(result.distance);
        if (result.error) {
          setDistanceError(result.error);
        }
        setIsCalculatingDistance(false);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [destinationAddress, service]);

  const calculatePriceBreakdown = () => {
    let breakdown: {
      baseNotaryFee?: number;
      technologyFee?: number;
      serviceFee?: number;
      mileageFee?: number;
      distance?: number;
      agentFee?: number;
      processingFee?: number;
      urgencyMultiplier?: number;
      total: number;
    } = { total: 0 };
    
    if (service === "ron") {
      breakdown.baseNotaryFee = PRICING.RON.notaryFee;
      breakdown.technologyFee = PRICING.RON.technologyFee;
      breakdown.total = PRICING.RON.total;
    } else if (service === "mobile") {
      breakdown.baseNotaryFee = PRICING.MOBILE.notaryFee;
      breakdown.serviceFee = PRICING.MOBILE.serviceFee;
      breakdown.total = PRICING.MOBILE.baseTotal;
      
      // Add mileage if distance is calculated
      if (distance !== null) {
        const roundTripDistance = calculateRoundTripDistance(distance);
        breakdown.distance = roundTripDistance;
        breakdown.mileageFee = roundTripDistance * PRICING.MOBILE.mileageRate;
        breakdown.total += breakdown.mileageFee;
      }
    } else if (service === "apostille") {
      breakdown.baseNotaryFee = PRICING.APOSTILLE.notaryFee;
      breakdown.processingFee = PRICING.APOSTILLE.processingFee;
      breakdown.total = PRICING.APOSTILLE.baseTotal;
    } else if (service === "loan") {
      breakdown.baseNotaryFee = PRICING.LOAN_SIGNING.notaryFee;
      breakdown.agentFee = PRICING.LOAN_SIGNING.agentFee;
      breakdown.total = PRICING.LOAN_SIGNING.total;
    } else if (service === "i9") {
      breakdown.total = urgency === "remote" 
        ? PRICING.I9_VERIFICATION.remote 
        : PRICING.I9_VERIFICATION.inPerson;
    }

    return breakdown;
  };

  const breakdown = calculatePriceBreakdown();
  const price = Math.round(breakdown.total);

  const getServiceRoute = () => {
    const routes = {
      ron: "/services/remote-online-notary",
      mobile: "/services/mobile-notary",
      apostille: "/services/apostille",
      loan: "/services/loan-signing-agent",
      i9: "/services/i9-verification"
    };
    return routes[service as keyof typeof routes] || "/";
  };

  const scrollToBooking = () => {
    if (service === "ron" || service === "mobile") {
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById("booking-form");
        element?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      navigate(getServiceRoute());
    }
  };

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
              <SelectItem value="i9">I-9 Verification</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {service === "mobile" && (
          <div>
            <Label htmlFor="destination">Your Address (for distance calculation)</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="destination"
                type="text"
                placeholder="Enter your full address (e.g., 123 Main St, City, PA 12345)"
                value={destinationAddress}
                onChange={(e) => setDestinationAddress(e.target.value)}
                className="pl-10"
              />
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Distance calculated from our Erie location
            </p>
            {isCalculatingDistance && (
              <p className="text-xs text-primary mt-1 animate-pulse">
                Calculating distance...
              </p>
            )}
            {distanceError && (
              <Alert className="mt-2">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="text-xs">
                  {distanceError}
                </AlertDescription>
              </Alert>
            )}
          </div>
        )}

        {service === "i9" && (
          <div>
            <Label htmlFor="urgency">Verification Type</Label>
            <Select value={urgency} onValueChange={setUrgency}>
              <SelectTrigger id="urgency">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="inPerson">In-Person Verification</SelectItem>
                <SelectItem value="remote">Remote Verification</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      <div className="border-t-2 border-primary/20 pt-6">
        {/* Price Breakdown */}
        <div className="bg-background rounded-lg p-4 mb-4 space-y-2">
          <h4 className="font-semibold text-sm mb-3">Price Breakdown:</h4>
          
          {breakdown.baseNotaryFee !== undefined && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">PA Notary Fee</span>
              <span className="font-medium">${breakdown.baseNotaryFee}</span>
            </div>
          )}
          
          {breakdown.technologyFee !== undefined && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Technology Platform Fee</span>
              <span className="font-medium">${breakdown.technologyFee}</span>
            </div>
          )}
          
          {breakdown.serviceFee !== undefined && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Service Fee</span>
              <span className="font-medium">${breakdown.serviceFee}</span>
            </div>
          )}
          
          {breakdown.agentFee !== undefined && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Signing Agent Fee</span>
              <span className="font-medium">${breakdown.agentFee}</span>
            </div>
          )}
          
          {breakdown.processingFee !== undefined && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Processing & Coordination</span>
              <span className="font-medium">${breakdown.processingFee}+</span>
            </div>
          )}
          
          {service === "mobile" && breakdown.distance !== undefined && breakdown.mileageFee !== undefined && (
            <>
              <div className="flex justify-between text-sm border-t pt-2">
                <span className="text-muted-foreground">
                  Travel Distance (round-trip)
                </span>
                <span className="font-medium">{breakdown.distance.toFixed(1)} miles</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  Mileage Fee (${PRICING.MOBILE.mileageRate}/mile)
                </span>
                <span className="font-medium">${breakdown.mileageFee.toFixed(2)}</span>
              </div>
            </>
          )}
          
          {service === "mobile" && !distance && (
            <div className="flex justify-between text-sm border-t pt-2">
              <span className="text-muted-foreground italic">
                + Travel mileage (enter address above)
              </span>
              <span className="font-medium text-muted-foreground">$?.??</span>
            </div>
          )}
          
          <div className="flex justify-between text-lg font-bold border-t-2 pt-3 mt-2">
            <span>Total</span>
            <span className="text-primary">${price}{service === "mobile" && !distance && "+"}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Your Total</p>
            <div className="flex items-center gap-2">
              <DollarSign className="w-8 h-8 text-primary" />
              <span className="text-4xl font-bold text-primary">{price}{service === "mobile" && !distance && "+"}</span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">100% Transparent</p>
            <p className="text-xs text-muted-foreground">No hidden fees</p>
          </div>
        </div>
        <Button 
          onClick={scrollToBooking} 
          className="w-full"
          size="lg"
        >
          Book This Service
        </Button>
      </div>

      <div className="mt-4 p-4 bg-background rounded-lg">
        <h4 className="font-semibold mb-2 text-sm">What's Included:</h4>
        <ul className="text-xs text-muted-foreground space-y-1">
          {service === "ron" && (
            <>
              <li>• PA state-mandated notary fee: ${PRICING.RON.notaryFee}</li>
              <li>• Secure video platform & identity verification</li>
              <li>• Digital certificate & audit trail</li>
              <li>• Available 24/7 by appointment</li>
            </>
          )}
          {service === "mobile" && (
            <>
              <li>• PA state-mandated notary fee: ${PRICING.MOBILE.notaryFee}</li>
              <li>• Service fee: ${PRICING.MOBILE.serviceFee}</li>
              <li>• Round-trip mileage: ${PRICING.MOBILE.mileageRate}/mile from Erie</li>
              <li>• All notarial supplies included</li>
            </>
          )}
          {service === "apostille" && (
            <>
              <li>• PA notarization: ${PRICING.APOSTILLE.notaryFee}</li>
              <li>• PA state apostille fee (additional)</li>
              <li>• Document coordination & expediting</li>
              <li>• Service & return shipping included</li>
            </>
          )}
          {service === "loan" && (
            <>
              <li>• PA notarization: ${PRICING.LOAN_SIGNING.notaryFee}</li>
              <li>• Certified signing agent service</li>
              <li>• Document printing if needed</li>
              <li>• Scan back & FedEx return included</li>
            </>
          )}
          {service === "i9" && (
            <>
              <li>• In-person: ${PRICING.I9_VERIFICATION.inPerson}</li>
              <li>• Remote I-9: ${PRICING.I9_VERIFICATION.remote}</li>
              <li>• E-Verify coordination available</li>
              <li>• Volume discounts available</li>
            </>
          )}
        </ul>
      </div>
    </Card>
  );
};

export default PricingCalculator;