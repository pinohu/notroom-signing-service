/**
 * Core Web Vitals Tracking
 * Tracks LCP, FID, CLS, FCP, TTFB for performance monitoring
 */

interface Metric {
  name: string;
  value: number;
  id: string;
  delta: number;
  rating: 'good' | 'needs-improvement' | 'poor';
}

// Send metrics to analytics
const sendToAnalytics = (metric: Metric) => {
  // Send to Google Analytics
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', metric.name, {
      event_category: 'Web Vitals',
      value: Math.round(metric.value),
      event_label: metric.id,
      non_interaction: true,
    });
  }

  // Log in development
  if (import.meta.env.DEV) {
    console.log(`[Web Vitals] ${metric.name}:`, {
      value: metric.value,
      rating: metric.rating,
    });
  }
};

// Get rating for metric
const getRating = (name: string, value: number): 'good' | 'needs-improvement' | 'poor' => {
  const thresholds: Record<string, { good: number; poor: number }> = {
    LCP: { good: 2500, poor: 4000 },
    FID: { good: 100, poor: 300 },
    CLS: { good: 0.1, poor: 0.25 },
    FCP: { good: 1800, poor: 3000 },
    TTFB: { good: 800, poor: 1800 },
  };

  const threshold = thresholds[name];
  if (!threshold) return 'good';

  if (value <= threshold.good) return 'good';
  if (value <= threshold.poor) return 'needs-improvement';
  return 'poor';
};

// Initialize Web Vitals tracking
export const initWebVitals = () => {
  // Only track in production
  if (import.meta.env.DEV) {
    return;
  }

  // Dynamic import to avoid bundling in dev
  import('web-vitals').then(({ onCLS, onFID, onFCP, onLCP, onTTFB, onINP }) => {
    onCLS((metric) => {
      sendToAnalytics({
        ...metric,
        rating: getRating('CLS', metric.value),
      });
    });

    onFID((metric) => {
      sendToAnalytics({
        ...metric,
        rating: getRating('FID', metric.value),
      });
    });

    onFCP((metric) => {
      sendToAnalytics({
        ...metric,
        rating: getRating('FCP', metric.value),
      });
    });

    onLCP((metric) => {
      sendToAnalytics({
        ...metric,
        rating: getRating('LCP', metric.value),
      });
    });

    onTTFB((metric) => {
      sendToAnalytics({
        ...metric,
        rating: getRating('TTFB', metric.value),
      });
    });

    // INP (Interaction to Next Paint) - newer metric
    if (onINP) {
      onINP((metric) => {
        sendToAnalytics({
          ...metric,
          rating: getRating('INP', metric.value),
        });
      });
    }
  }).catch(() => {
    // web-vitals not available - continue without tracking
    console.warn('Web Vitals tracking not available');
  });
};

