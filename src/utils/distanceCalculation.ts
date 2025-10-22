// Distance calculation utilities for mobile notary pricing

const ORIGIN_ADDRESS = "6238 Cobblestone Dr, Erie, PA 16509";

/**
 * Calculate distance between two addresses using Google Maps Distance Matrix API
 * This is a client-side implementation that requires VITE_GOOGLE_MAPS_API_KEY
 */
export const calculateDistance = async (
  destinationAddress: string
): Promise<{ distance: number; duration: string; error?: string }> => {
  try {
    // For now, return a mock calculation based on simple geocoding
    // In production, this would use Google Maps Distance Matrix API
    
    // Check if we have the API key
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    
    if (!apiKey) {
      // Fallback: estimate based on PA averages
      return {
        distance: 15, // Default estimate
        duration: "20 mins",
        error: "Distance calculation unavailable. Estimate shown. Actual distance will be calculated at booking."
      };
    }

    // Use Google Maps Distance Matrix API
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(
        ORIGIN_ADDRESS
      )}&destinations=${encodeURIComponent(
        destinationAddress
      )}&units=imperial&key=${apiKey}`
    );

    const data = await response.json();

    if (data.status === "OK" && data.rows[0]?.elements[0]?.status === "OK") {
      const element = data.rows[0].elements[0];
      const distanceInMiles = element.distance.value / 1609.34; // Convert meters to miles
      
      return {
        distance: Math.ceil(distanceInMiles), // Round up to nearest mile
        duration: element.duration.text,
      };
    } else {
      return {
        distance: 15,
        duration: "20 mins",
        error: "Could not calculate distance. Estimate shown."
      };
    }
  } catch (error) {
    console.error("Distance calculation error:", error);
    return {
      distance: 15,
      duration: "20 mins",
      error: "Distance calculation error. Estimate shown."
    };
  }
};

/**
 * Calculate round-trip distance
 */
export const calculateRoundTripDistance = (oneWayDistance: number): number => {
  return oneWayDistance * 2;
};

/**
 * Format distance for display
 */
export const formatDistance = (miles: number): string => {
  return `${miles.toFixed(1)} miles`;
};

/**
 * Get origin address for display
 */
export const getOriginAddress = (): string => {
  return ORIGIN_ADDRESS;
};
