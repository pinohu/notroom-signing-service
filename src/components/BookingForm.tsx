import { useState } from "react";
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
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

const bookingSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  phone: z.string().trim().min(1, "Phone number is required").max(20, "Phone number must be less than 20 characters"),
  service: z.enum(["ron", "mobile", "loan"], { required_error: "Please select a service" }),
  message: z.string().max(1000, "Message must be less than 1000 characters").optional(),
});

const BookingForm = () => {
  const [formData, setFormData] = useState<{
    name: string;
    email: string;
    phone: string;
    service: string;
    message: string;
  }>({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate form data
      const validatedData = bookingSchema.parse({
        ...formData,
        message: formData.message || undefined
      });

      // Insert booking into database
      const { error } = await supabase
        .from("bookings")
        .insert([{
          name: validatedData.name,
          email: validatedData.email,
          phone: validatedData.phone,
          service: validatedData.service,
          message: validatedData.message || null
        }]);

      if (error) {
        console.error("Booking submission error:", error);
        toast.error("Failed to submit booking. Please try again.");
        return;
      }

      toast.success("Thank you! We'll contact you within 2 hours to confirm your appointment.");
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        phone: "",
        service: "",
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
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Book Your Notary Service
            </h2>
            <p className="text-xl text-muted-foreground">
              Complete the form below and we'll contact you within 2 hours to schedule your appointment.
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="John Doe"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="john@example.com"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="(814) 555-0123"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="service">Select Service *</Label>
              <Select 
                value={formData.service}
                onValueChange={(value) => setFormData({ ...formData, service: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ron">Remote Online Notary ($60)</SelectItem>
                  <SelectItem value="mobile">Mobile Notary Erie County ($125)</SelectItem>
                  <SelectItem value="loan">Loan Signing Agent ($200)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="message">Additional Information (Optional)</Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Tell us about your document and preferred date/time"
                rows={4}
              />
            </div>
            
            <Button 
              type="submit" 
              size="lg" 
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Request Appointment"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default BookingForm;
