import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const ORIGIN_ADDRESS = "6238 Cobblestone Dr, Erie, PA 16509";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { destination } = await req.json();
    
    if (!destination) {
      throw new Error("Destination address is required");
    }

    const apiKey = Deno.env.get('GOOGLE_MAPS_API_KEY');
    
    if (!apiKey) {
      // Return estimate if no API key configured
      return new Response(
        JSON.stringify({
          distance: 15,
          duration: "20 mins",
          error: "Distance calculation unavailable. Estimate shown."
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Call Google Maps Distance Matrix API
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(
      ORIGIN_ADDRESS
    )}&destinations=${encodeURIComponent(
      destination
    )}&units=imperial&key=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.status === "OK" && data.rows[0]?.elements[0]?.status === "OK") {
      const element = data.rows[0].elements[0];
      const distanceInMiles = Math.ceil(element.distance.value / 1609.34);
      
      return new Response(
        JSON.stringify({
          distance: distanceInMiles,
          duration: element.duration.text,
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    } else {
      return new Response(
        JSON.stringify({
          distance: 15,
          duration: "20 mins",
          error: "Could not calculate distance. Estimate shown."
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
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
