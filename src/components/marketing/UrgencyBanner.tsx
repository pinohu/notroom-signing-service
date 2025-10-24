import { useState, useEffect } from "react";
import { Clock, Users, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const UrgencyBanner = () => {
  const [spotsLeft, setSpotsLeft] = useState(3);
  const [recentBookings, setRecentBookings] = useState(12);
  const [isVisible, setIsVisible] = useState(true);

  const scrollToBooking = () => {
    document.getElementById("booking-form")?.scrollIntoView({ behavior: "smooth" });
    setIsVisible(false);
  };

  // Simulate dynamic updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRecentBookings(prev => prev + Math.floor(Math.random() * 3));
      if (Math.random() > 0.7) {
        setSpotsLeft(prev => Math.max(1, prev - 1));
      }
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 animate-in slide-in-from-bottom duration-500">
      <Card className="m-4 border-4 border-[hsl(var(--amber))] bg-gradient-to-r from-[hsl(var(--amber))]/95 to-[hsl(var(--amber))]/90 backdrop-blur-md shadow-2xl">
        <div className="p-4 md:p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Left: Urgency Message */}
            <div className="flex items-start gap-3 flex-1">
              <div className="p-2 rounded-lg bg-white/20">
                <Clock className="w-6 h-6 text-[hsl(var(--amber-foreground))]" />
              </div>
              <div>
                <h4 className="text-lg md:text-xl font-bold text-[hsl(var(--amber-foreground))] mb-1">
                  ⚡ Limited Availability This Week
                </h4>
                <p className="text-sm md:text-base text-[hsl(var(--amber-foreground))]/90">
                  Only <strong className="text-xl font-bold">{spotsLeft} spots</strong> remaining for same-day service
                </p>
              </div>
            </div>

            {/* Center: Social Proof */}
            <div className="flex items-center gap-4 px-4 py-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-[hsl(var(--amber-foreground))]" />
                <div className="text-center">
                  <p className="text-2xl font-bold text-[hsl(var(--amber-foreground))]">{recentBookings}</p>
                  <p className="text-xs text-[hsl(var(--amber-foreground))]/80">booked today</p>
                </div>
              </div>
              <div className="w-px h-10 bg-white/30" />
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-[hsl(var(--amber-foreground))]" />
                <div className="text-center">
                  <p className="text-2xl font-bold text-[hsl(var(--amber-foreground))]">247%</p>
                  <p className="text-xs text-[hsl(var(--amber-foreground))]/80">demand surge</p>
                </div>
              </div>
            </div>

            {/* Right: CTA */}
            <div className="flex items-center gap-3">
              <Button
                size="lg"
                onClick={scrollToBooking}
                className="bg-[hsl(var(--amber-foreground))] text-[hsl(var(--amber))] hover:bg-[hsl(var(--amber-foreground))]/90 font-bold text-lg px-8 shadow-xl"
              >
                Book Your Spot Now →
              </Button>
              <button
                onClick={() => setIsVisible(false)}
                className="text-[hsl(var(--amber-foreground))]/70 hover:text-[hsl(var(--amber-foreground))] text-sm underline"
                aria-label="Close banner"
              >
                Maybe Later
              </button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default UrgencyBanner;
