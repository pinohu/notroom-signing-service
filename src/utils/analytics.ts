/**
 * Analytics utility functions for tracking user interactions
 * Replace with actual analytics service in production (Google Analytics, Mixpanel, etc.)
 */

interface EventProperties {
  [key: string]: string | number | boolean | undefined;
}

export const trackEvent = (eventName: string, properties?: EventProperties) => {
  if (import.meta.env.DEV) {
    console.log('[Analytics]', eventName, properties);
    return;
  }

  // Add your analytics service integration here
  // Example: window.gtag?.('event', eventName, properties);
  // Example: window.mixpanel?.track(eventName, properties);
};

export const trackPageView = (path: string, title: string) => {
  if (import.meta.env.DEV) {
    console.log('[Analytics] Page view:', path, title);
    return;
  }

  // Add your analytics service integration here
  // Example: window.gtag?.('config', 'GA_MEASUREMENT_ID', { page_path: path });
};

export const trackBooking = (service: string, location?: string) => {
  trackEvent('booking_initiated', {
    service,
    location: location || 'not_specified',
    timestamp: Date.now(),
  });
};

export const trackFormSubmission = (formName: string, success: boolean) => {
  trackEvent('form_submission', {
    form_name: formName,
    success,
    timestamp: Date.now(),
  });
};

export const trackPhoneClick = () => {
  trackEvent('phone_clicked', {
    timestamp: Date.now(),
  });
};

export const trackEmailClick = () => {
  trackEvent('email_clicked', {
    timestamp: Date.now(),
  });
};

export const trackCTAClick = (ctaLocation: string, ctaText: string) => {
  trackEvent('cta_clicked', {
    location: ctaLocation,
    text: ctaText,
    timestamp: Date.now(),
  });
};