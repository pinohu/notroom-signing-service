import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const ORIGIN_COORDS = { lat: 42.0708, lon: -80.0434 }; // 6238 Cobblestone Dr, Erie, PA 16509

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Haversine formula to calculate distance between two coordinates
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 3959; // Earth's radius in miles
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Geocode address using Nominatim (free OpenStreetMap service)
async function geocodeAddress(address: string): Promise<{ lat: number; lon: number } | null> {
  try {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`;
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'NotaryApp/1.0' // Nominatim requires a User-Agent
      }
    });
    
    const data = await response.json();
    
    if (data && data.length > 0) {
      return {
        lat: parseFloat(data[0].lat),
        lon: parseFloat(data[0].lon)
      };
    }
    return null;
  } catch (error) {
    console.error('Geocoding error:', error);
    return null;
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { destination } = await req.json();
    
    if (!destination) {
      throw new Error("Destination address is required");
    }

    console.log('Geocoding destination:', destination);
    
    // Geocode the destination address
    const destCoords = await geocodeAddress(destination);
    
    if (!destCoords) {
      console.log('Could not geocode address, returning estimate');
      return new Response(
        JSON.stringify({
          distance: 15,
          duration: "20 mins",
          error: "Could not find address. Please enter a complete address with city and state."
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Calculate distance using Haversine formula
    const distanceInMiles = calculateDistance(
      ORIGIN_COORDS.lat,
      ORIGIN_COORDS.lon,
      destCoords.lat,
      destCoords.lon
    );
    
    const roundedDistance = Math.ceil(distanceInMiles);
    const estimatedMinutes = Math.ceil(distanceInMiles * 1.5); // Rough estimate: 1.5 minutes per mile
    
    console.log('Distance calculated:', roundedDistance, 'miles');
    
    return new Response(
      JSON.stringify({
        distance: roundedDistance,
        duration: `${estimatedMinutes} mins`,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error("Distance calculation error:", error);
    return new Response(
      JSON.stringify({
        distance: 15,
        duration: "20 mins",
        error: "Distance calculation error. Estimate shown."
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    );
  }
});
