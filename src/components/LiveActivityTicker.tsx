import { useEffect, useState } from "react";
import { CheckCircle } from "lucide-react";

const LiveActivityTicker = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentActivity, setCurrentActivity] = useState(0);

  const activities = [
    { name: "Sarah M.", location: "Erie, PA", service: "Power of Attorney", time: "2 minutes ago" },
    { name: "Michael K.", location: "Millcreek, PA", service: "Affidavit", time: "8 minutes ago" },
    { name: "Jennifer T.", location: "Harborcreek, PA", service: "Real Estate Closing", time: "15 minutes ago" },
    { name: "David R.", location: "Erie, PA", service: "Business Contract", time: "23 minutes ago" },
  ];

  useEffect(() => {
    const showInterval = setInterval(() => {
      setIsVisible(true);
      setTimeout(() => setIsVisible(false), 5000);
    }, 15000);

    const activityInterval = setInterval(() => {
      setCurrentActivity((prev) => (prev + 1) % activities.length);
    }, 15000);

    return () => {
      clearInterval(showInterval);
      clearInterval(activityInterval);
    };
  }, []);

  const activity = activities[currentActivity];

  return (
    <div
      className={`fixed bottom-24 left-4 md:left-8 z-40 bg-background border border-border rounded-lg shadow-2xl p-4 max-w-sm transition-all duration-500 ${
        isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-full pointer-events-none"
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0">
          <CheckCircle className="w-6 h-6 text-success" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-foreground">
            {activity.name} from {activity.location}
          </p>
          <p className="text-sm text-muted-foreground">
            Just completed: {activity.service}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            {activity.time}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LiveActivityTicker;
