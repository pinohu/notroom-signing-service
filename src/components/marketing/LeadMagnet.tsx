import { FileText, Download, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";
import ScrollReveal from "../ScrollReveal";

const LeadMagnet = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate download trigger
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success("Check your email! Your free guide is on the way.");
      setEmail("");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const guideFeatures = [
    "✓ Complete notarization checklist",
    "✓ State-by-state requirements",
    "✓ Remote vs Mobile: which is right for you?",
    "✓ Common mistakes to avoid",
    "✓ Money-saving tips",
    "✓ Emergency notarization protocols"
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-[hsl(var(--primary))]/5 to-[hsl(var(--action-cyan))]/5">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal>
            <Card className="border-4 border-[hsl(var(--amber))] shadow-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-[hsl(var(--amber))]/20 to-[hsl(var(--amber))]/10 p-8">
                <div className="text-center mb-8">
                  <div className="inline-flex items-center gap-2 mb-4 px-6 py-2 bg-[hsl(var(--amber))] text-[hsl(var(--amber-foreground))] rounded-full">
                    <Download className="w-5 h-5" />
                    <span className="font-bold">FREE DOWNLOAD</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-bold mb-4">
                    The Complete Notarization Guide
                  </h2>
                  <p className="text-xl text-muted-foreground">
                    Everything you need to know about getting documents notarized in Pennsylvania. 
                    <strong className="text-foreground"> 100% free. No strings attached.</strong>
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 items-center">
                  {/* Features */}
                  <div className="space-y-3">
                    {guideFeatures.map((feature, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-background/50 rounded-lg">
                        <CheckCircle className="w-5 h-5 text-[hsl(var(--success-green))] flex-shrink-0" />
                        <span className="font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Form */}
                  <Card className="bg-background">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-center mb-6">
                        <div className="p-4 rounded-full bg-[hsl(var(--primary))]/10">
                          <FileText className="w-12 h-12 text-[hsl(var(--primary))]" />
                        </div>
                      </div>
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                          <Label htmlFor="email-guide" className="text-base font-semibold">
                            Enter your email to get instant access
                          </Label>
                          <Input
                            id="email-guide"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="your@email.com"
                            required
                            className="mt-2"
                          />
                        </div>
                        <Button
                          type="submit"
                          size="lg"
                          variant="amber"
                          className="w-full font-bold text-lg"
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? "Sending..." : "📥 Download Free Guide"}
                        </Button>
                        <p className="text-xs text-center text-muted-foreground">
                          We respect your privacy. Unsubscribe anytime.
                        </p>
                      </form>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="bg-muted/30 p-6 text-center border-t">
                <p className="text-sm text-muted-foreground">
                  🎁 <strong className="text-foreground">BONUS:</strong> Get our exclusive pricing calculator and save 20% on your first booking
                </p>
              </div>
            </Card>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default LeadMagnet;
