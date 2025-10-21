import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const ExitIntent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const [timeOnPage, setTimeOnPage] = useState(0);

  useEffect(() => {
    // Check if popup was already shown in this session
    const shownInSession = sessionStorage.getItem("exitIntentShown");
    if (shownInSession) {
      setHasShown(true);
      return;
    }

    // Track time on page (minimum 30 seconds before popup can trigger)
    const timer = setInterval(() => {
      setTimeOnPage(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Only enable exit intent after user has been on page for 30 seconds
    if (timeOnPage < 30 || hasShown) return;

    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger if mouse leaves from top 20% of screen with upward motion
      if (e.clientY <= 20 && e.movementY < -10 && !hasShown) {
        setIsOpen(true);
        setHasShown(true);
        sessionStorage.setItem("exitIntentShown", "true");
      }
    };

    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [hasShown, timeOnPage]);

  const scrollToBooking = () => {
    document.getElementById("booking-form")?.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md">
        <div className="text-center space-y-4 py-6">
          <div className="text-6xl mb-4">⏰</div>
          <h3 className="text-2xl font-bold text-foreground">
            Before You Go...
          </h3>
          <p className="text-muted-foreground text-lg">
            Fast, convenient notary services available now in Erie
          </p>
          <div className="bg-accent/10 p-4 rounded-lg space-y-2">
            <div className="flex items-center justify-center gap-2 text-accent font-semibold">
              <span className="text-2xl">⚡</span>
              <span>Book Today</span>
            </div>
            <p className="text-foreground font-bold text-xl">
              Schedule your appointment now and get notarized today
            </p>
            <p className="text-sm text-muted-foreground">
              Online: $60 • Mobile: $125+
            </p>
          </div>
          <div className="flex flex-col gap-3 pt-4">
            <Button
              variant="amber"
              size="lg"
              className="w-full"
              onClick={scrollToBooking}
            >
              Book Now
            </Button>
            <Button
              variant="ghost"
              onClick={() => setIsOpen(false)}
              className="w-full"
            >
              Maybe Later
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ExitIntent;
