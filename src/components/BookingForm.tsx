import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";
import { format } from "date-fns";
import { CalendarIcon, MapPin, FileText, Users, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { CommunityData } from "@/data/communityData";
import { formatPhoneNumber } from "@/utils/validation";

const bookingSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  phone: z.string().trim().min(1, "Phone number is required").max(20, "Phone number must be less than 20 characters"),
  service: z.enum(["ron", "mobile", "loan"], { required_error: "Please select a service" }),
  preferred_date: z.date().optional(),
  preferred_time: z.string().optional(),
  document_type: z.string().max(100).optional(),
  number_of_signers: z.number().min(1).max(20).default(1),
  location_address: z.string().max(300).optional(),
  urgency: z.enum(["flexible", "within_week", "within_24hrs", "same_day"]).default("flexible"),
  message: z.string().max(1000, "Message must be less than 1000 characters").optional(),
});

interface BookingFormProps {
  community?: CommunityData;
}

const BookingForm = ({ community }: BookingFormProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeSuggestionField, setActiveSuggestionField] = useState<string | null>(null);
  const suggestionRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    phone: string;
    service: string;
    preferred_date?: Date;
    preferred_time: string;
    document_type: string;
    number_of_signers: number;
    location_address: string;
    urgency: string;
    message: string;
  }>({
    name: "",
    email: "",
    phone: "",
    service: "",
    preferred_time: "",
    document_type: "",
    number_of_signers: 1,
    location_address: "",
    urgency: "flexible",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const canProceedFromStep1 = formData.name && formData.email && formData.phone;
  const canProceedFromStep2 = formData.service && (formData.service !== "mobile" || formData.location_address);

  const getServiceTitle = () => {
    const communityName = community?.name || "";
    const titles: Record<string, string> = {
      ron: `Book Your Remote Online Notary${communityName ? ` - ${communityName}` : ""}`,
      mobile: `Book Your Mobile Notary${communityName ? ` in ${communityName}` : " Service"}`,
      loan: `Book Your Loan Signing Agent${communityName ? ` - ${communityName}` : ""}`,
      apostille: `Book Your Apostille Service${communityName ? ` - ${communityName}` : ""}`,
      i9: `Book Your I-9 Verification${communityName ? ` - ${communityName}` : ""}`,
    };
    return formData.service ? titles[formData.service] || `Book Your Notary Service${communityName ? ` in ${communityName}` : ""}` : `Book Your Notary Service${communityName ? ` in ${communityName}` : ""}`;
  };

  // Common PA street names for autocomplete
  const getLocationSuggestions = (input: string) => {
    const paAddresses = [
      "Main Street",
      "State Street",
      "Peach Street",
      "West 8th Street",
      "East 12th Street",
      "26th Street",
      "38th Street",
      "Peninsula Drive",
      "Interchange Road",
      ...(community?.landmarks || [])
    ];
    
    return paAddresses
      .filter(addr => addr.toLowerCase().includes(input.toLowerCase()))
      .slice(0, 5)
      .map(addr => `${addr}${community?.name ? `, ${community.name}, PA` : ", PA"}`);
  };

  // Handle phone number formatting
  const handlePhoneChange = (value: string) => {
    const formatted = formatPhoneNumber(value);
    setFormData({ ...formData, phone: formatted });
  };

  // Handle location input with suggestions
  const handleLocationChange = (value: string) => {
    setFormData({ ...formData, location_address: value });
    if (value.length > 2) {
      const locationSuggestions = getLocationSuggestions(value);
      setSuggestions(locationSuggestions);
      setShowSuggestions(locationSuggestions.length > 0);
      setActiveSuggestionField('location');
    } else {
      setShowSuggestions(false);
    }
  };

  // Handle suggestion selection
  const handleSuggestionClick = (suggestion: string) => {
    if (activeSuggestionField === 'location') {
      setFormData({ ...formData, location_address: suggestion });
    }
    setShowSuggestions(false);
    setSuggestions([]);
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (suggestionRef.current && !suggestionRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate form data
      const validatedData = bookingSchema.parse({
        ...formData,
        preferred_date: formData.preferred_date || undefined,
        preferred_time: formData.preferred_time || undefined,
        document_type: formData.document_type || undefined,
        location_address: formData.location_address || undefined,
        message: formData.message || undefined
      });

      // Insert booking into database
      const { data: bookingData, error } = await supabase
        .from("bookings")
        .insert([{
          name: validatedData.name,
          email: validatedData.email,
          phone: validatedData.phone,
          service: validatedData.service,
          preferred_date: validatedData.preferred_date ? format(validatedData.preferred_date, "yyyy-MM-dd") : null,
          preferred_time: validatedData.preferred_time || null,
          document_type: validatedData.document_type || null,
          number_of_signers: validatedData.number_of_signers,
          location_address: validatedData.location_address || null,
          urgency: validatedData.urgency,
          message: validatedData.message || null
        }])
        .select()
        .single();

      if (error) {
        console.error("Booking submission error:", error);
        toast.error("Failed to submit booking. Please try again.");
        return;
      }

      // Send confirmation email
      try {
        await supabase.functions.invoke('send-booking-confirmation', {
          body: {
            name: validatedData.name,
            email: validatedData.email,
            service: validatedData.service,
            preferredDate: validatedData.preferred_date ? format(validatedData.preferred_date, "PPP") : undefined,
            preferredTime: validatedData.preferred_time || undefined,
            bookingId: bookingData.id
          }
        });
      } catch (emailError) {
        console.error("Email sending error:", emailError);
        // Don't fail the booking if email fails
      }

      // Sync booking to Suitedash
      try {
        await supabase.functions.invoke('sync-booking-to-suitedash', {
          body: {
            bookingId: bookingData.id,
            name: validatedData.name,
            email: validatedData.email,
            phone: validatedData.phone,
            service: validatedData.service,
            preferredDate: validatedData.preferred_date ? format(validatedData.preferred_date, "yyyy-MM-dd") : undefined,
            preferredTime: validatedData.preferred_time || undefined,
            documentType: validatedData.document_type || undefined,
            numberOfSigners: validatedData.number_of_signers,
            locationAddress: validatedData.location_address || undefined,
            urgency: validatedData.urgency,
            message: validatedData.message || undefined,
            status: 'pending'
          }
        });
        console.log("Booking synced to Suitedash successfully");
      } catch (suitedashError) {
        console.error("Suitedash sync error:", suitedashError);
        // Don't fail the booking if Suitedash sync fails
      }

      toast.success("Thank you! We'll contact you within 2 hours to confirm your appointment.");
      
      // Reset form
      setCurrentStep(1);
      setFormData({
        name: "",
        email: "",
        phone: "",
        service: "",
        preferred_date: undefined,
        preferred_time: "",
        document_type: "",
        number_of_signers: 1,
        location_address: "",
        urgency: "flexible",
        message: ""
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Show first validation error
        toast.error(error.errors[0].message);
      } else {
        toast.error("Something went wrong. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="booking-form" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              {getServiceTitle()}
            </h2>
            <p className="text-xl text-muted-foreground">
              {community 
                ? `Trusted by ${community.name} residents and businesses. Complete the form below for fast, professional notary service.`
                : formData.service 
                  ? "Complete the form below and we'll contact you within 2 hours to confirm your appointment."
                  : "Select a service and complete the form below. We'll contact you within 2 hours to confirm your appointment."}
            </p>
          </div>

          {/* Progress Indicator */}
          <div 
            className="mb-8" 
            role="progressbar" 
            aria-valuenow={currentStep} 
            aria-valuemin={1} 
            aria-valuemax={3}
            aria-valuetext={`Step ${currentStep} of 3: ${['Contact Information', 'Service Details', 'Scheduling Preferences'][currentStep-1]}`}
          >
            <div className="flex items-center justify-between max-w-md mx-auto">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                      currentStep >= step
                        ? "bg-primary text-primary-foreground shadow-lg"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {step}
                  </div>
                  {step < 3 && (
                    <div
                      className={`flex-1 h-1 mx-2 transition-all ${
                        currentStep > step ? "bg-primary" : "bg-muted"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between max-w-md mx-auto mt-2">
              <span className={`text-xs ${currentStep >= 1 ? "text-foreground font-semibold" : "text-muted-foreground"}`}>
                Contact
              </span>
              <span className={`text-xs ${currentStep >= 2 ? "text-foreground font-semibold" : "text-muted-foreground"}`}>
                Service
              </span>
              <span className={`text-xs ${currentStep >= 3 ? "text-foreground font-semibold" : "text-muted-foreground"}`}>
                Schedule
              </span>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Step 1: Contact Information */}
            {currentStep === 1 && (
              <div className="space-y-6 p-6 rounded-lg border border-border bg-card animate-in fade-in slide-in-from-bottom-4 duration-300">
                <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Contact Information
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">
                      Full Name <span className="text-destructive" aria-label="required">*</span>
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="John Doe"
                      required
                      aria-required="true"
                      aria-invalid={!formData.name && currentStep > 1}
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">
                      Phone Number <span className="text-destructive" aria-label="required">*</span>
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      inputMode="tel"
                      value={formData.phone}
                      onChange={(e) => handlePhoneChange(e.target.value)}
                      placeholder="(814) 555-0123"
                      required
                      aria-required="true"
                      aria-invalid={!formData.phone && currentStep > 1}
                    />
                    <p className="text-xs text-muted-foreground mt-1">Format applied automatically</p>
                  </div>
                </div>
                <div>
                  <Label htmlFor="email">
                    Email Address <span className="text-destructive" aria-label="required">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    inputMode="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="john@example.com"
                    required
                    aria-required="true"
                    aria-invalid={!formData.email && currentStep > 1}
                  />
                </div>
                <Button 
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  disabled={!canProceedFromStep1}
                  className="w-full"
                >
                  Continue to Service Details
                </Button>
              </div>
            )}

            {/* Step 2: Service Details */}
            {currentStep === 2 && (
              <div className="space-y-6 p-6 rounded-lg border border-border bg-card animate-in fade-in slide-in-from-bottom-4 duration-300">
                <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Service Details
                </h3>
                <div>
                  <Label htmlFor="service">
                    Select Service <span className="text-destructive" aria-label="required">*</span>
                  </Label>
                  <Select 
                    value={formData.service}
                    onValueChange={(value) => setFormData({ ...formData, service: value })}
                  >
                    <SelectTrigger aria-required="true">
                      <SelectValue placeholder="Choose your service" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover/98 backdrop-blur-md z-[100]">
                      <SelectItem value="ron">Remote Online Notary ($60: $15 notary + $45 platform)</SelectItem>
                      <SelectItem value="mobile">Mobile Notary Erie County ($125+: $5-15 notary + travel)</SelectItem>
                      <SelectItem value="loan">Loan Signing Agent ($150: $15 notary + $135 agent fee)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="document_type">Document Type (Optional)</Label>
                  <Select 
                    value={formData.document_type}
                    onValueChange={(value) => setFormData({ ...formData, document_type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="What needs to be notarized?" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover/98 backdrop-blur-md z-[100]">
                      <SelectItem value="real_estate">Real Estate Document</SelectItem>
                      <SelectItem value="power_of_attorney">Power of Attorney</SelectItem>
                      <SelectItem value="affidavit">Affidavit</SelectItem>
                      <SelectItem value="loan_documents">Loan Documents</SelectItem>
                      <SelectItem value="will">Will/Trust</SelectItem>
                      <SelectItem value="contract">Contract/Agreement</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="number_of_signers">Number of Signers</Label>
                  <Input
                    id="number_of_signers"
                    type="number"
                    min="1"
                    max="20"
                    value={formData.number_of_signers}
                    onChange={(e) => setFormData({ ...formData, number_of_signers: parseInt(e.target.value) || 1 })}
                  />
                </div>

                {formData.service === "mobile" && (
                  <div className="animate-in fade-in slide-in-from-top-2 duration-300 relative">
                    <Label htmlFor="location_address" className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Service Location *
                    </Label>
                    <Input
                      id="location_address"
                      type="text"
                      value={formData.location_address}
                      onChange={(e) => handleLocationChange(e.target.value)}
                      onFocus={() => setActiveSuggestionField('location')}
                      placeholder={community ? `123 Main St, ${community.name}, PA` : "123 Main St, Erie, PA 16501"}
                      required={formData.service === "mobile"}
                      autoComplete="off"
                    />
                    {showSuggestions && activeSuggestionField === 'location' && suggestions.length > 0 && (
                      <div 
                        ref={suggestionRef}
                        className="absolute z-50 w-full mt-1 bg-popover border border-border rounded-md shadow-lg max-h-60 overflow-auto"
                      >
                        {suggestions.map((suggestion, index) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="w-full text-left px-4 py-2 hover:bg-accent hover:text-accent-foreground text-sm transition-colors"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                    )}
                    <p className="text-sm text-muted-foreground mt-1">
                      {community 
                        ? `Mobile service available throughout ${community.name} and ${community.county}`
                        : "Mobile service is available within Erie County"}
                    </p>
                  </div>
                )}

                <div className="flex gap-4">
                  <Button 
                    type="button"
                    variant="outline"
                    onClick={() => setCurrentStep(1)}
                    className="w-full"
                  >
                    Back
                  </Button>
                  <Button 
                    type="button"
                    onClick={() => setCurrentStep(3)}
                    disabled={!canProceedFromStep2}
                    className="w-full"
                  >
                    Continue to Scheduling
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Scheduling */}
            {currentStep === 3 && (
              <div className="space-y-6 p-6 rounded-lg border border-border bg-card animate-in fade-in slide-in-from-bottom-4 duration-300">
                <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Scheduling Preferences
                </h3>
                
                <div>
                  <Label>Urgency</Label>
                  <Select 
                    value={formData.urgency}
                    onValueChange={(value) => setFormData({ ...formData, urgency: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-popover/98 backdrop-blur-md z-[100]">
                      <SelectItem value="flexible">Flexible - Any time works</SelectItem>
                      <SelectItem value="within_week">Within a week</SelectItem>
                      <SelectItem value="within_24hrs">Within 24 hours</SelectItem>
                      <SelectItem value="same_day">Same day (if available)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>Preferred Date (Optional)</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !formData.preferred_date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {formData.preferred_date ? format(formData.preferred_date, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 bg-popover z-50" align="start">
                        <Calendar
                          mode="single"
                          selected={formData.preferred_date}
                          onSelect={(date) => setFormData({ ...formData, preferred_date: date })}
                          disabled={(date) => date < new Date()}
                          initialFocus
                          className="pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div>
                    <Label htmlFor="preferred_time">Preferred Time (Optional)</Label>
                    <Select 
                      value={formData.preferred_time}
                      onValueChange={(value) => setFormData({ ...formData, preferred_time: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent className="bg-popover z-50">
                        <SelectItem value="morning">Morning (8 AM - 12 PM)</SelectItem>
                        <SelectItem value="afternoon">Afternoon (12 PM - 5 PM)</SelectItem>
                        <SelectItem value="evening">Evening (5 PM - 8 PM)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="message">Additional Information (Optional)</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Any special requirements or questions?"
                    rows={4}
                    className="resize-none"
                  />
                </div>

                <div className="flex gap-4">
                  <Button 
                    type="button"
                    variant="outline"
                    onClick={() => setCurrentStep(2)}
                    className="w-full"
                  >
                    Back
                  </Button>
                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Request Appointment"}
                  </Button>
                </div>
                
                <p className="text-center text-sm text-muted-foreground">
                  We'll review your request and contact you within 2 hours to confirm your appointment
                </p>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default BookingForm;
