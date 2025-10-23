import { memo } from "react";
import { cn } from "@/lib/utils";

interface LoadingSkeletonProps {
  className?: string;
  variant?: "text" | "card" | "avatar" | "button";
  lines?: number;
}

const LoadingSkeleton = memo(({ className, variant = "text", lines = 1 }: LoadingSkeletonProps) => {
  const baseClasses = "animate-pulse bg-muted rounded";
  
  if (variant === "text") {
    return (
      <div className={cn("space-y-2", className)}>
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={cn(baseClasses, "h-4 w-full", i === lines - 1 && lines > 1 && "w-3/4")}
          />
        ))}
      </div>
    );
  }
  
  if (variant === "card") {
    return (
      <div className={cn("p-6 space-y-4", baseClasses, className)}>
        <div className="h-8 w-3/4 bg-muted-foreground/20 rounded" />
        <div className="space-y-2">
          <div className="h-4 bg-muted-foreground/20 rounded" />
          <div className="h-4 w-5/6 bg-muted-foreground/20 rounded" />
        </div>
      </div>
    );
  }
  
  if (variant === "avatar") {
    return <div className={cn(baseClasses, "w-12 h-12 rounded-full", className)} />;
  }
  
  if (variant === "button") {
    return <div className={cn(baseClasses, "h-10 w-24", className)} />;
  }
  
  return null;
});

LoadingSkeleton.displayName = 'LoadingSkeleton';

export default LoadingSkeleton;
