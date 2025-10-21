import { Clock, Calendar, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

interface UrgencyBannerProps {
  type?: "limited" | "booking" | "seasonal";
  message?: string;
}

const UrgencyBanner = ({ type = "booking", message }: UrgencyBannerProps) => {
  const banners = {
    limited: {
      icon: Clock,
      badge: "Limited Availability",
      text: message || "Only 3 appointment slots remaining this week"
    },
    booking: {
      icon: Calendar,
      badge: "Book Now",
      text: message || "Same-day appointments filling fast - schedule today!"
    },
    seasonal: {
      icon: TrendingUp,
      badge: "High Demand",
      text: message || "Peak season - book early to secure your preferred time"
    }
  };

  const banner = banners[type];
  const Icon = banner.icon;

  return (
    <Card className="p-4 bg-[hsl(var(--urgency-amber))]/10 border-[hsl(var(--urgency-amber))]">
      <div className="flex items-center gap-4">
        <Icon className="w-6 h-6 text-[hsl(var(--urgency-amber))] flex-shrink-0" />
        <div className="flex-1">
          <Badge className="mb-2 bg-[hsl(var(--urgency-amber))] text-white">
            {banner.badge}
          </Badge>
          <p className="text-sm font-medium">{banner.text}</p>
        </div>
      </div>
    </Card>
  );
};

export default UrgencyBanner;
