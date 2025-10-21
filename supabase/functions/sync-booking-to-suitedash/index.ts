import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface BookingData {
  bookingId: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  preferredDate?: string;
  preferredTime?: string;
  documentType?: string;
  numberOfSigners?: number;
  locationAddress?: string;
  urgency?: string;
  message?: string;
  status?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const suitedashApiKey = Deno.env.get('SUITEDASH_API_KEY');
    
    if (!suitedashApiKey) {
      console.error('SUITEDASH_API_KEY not configured');
      throw new Error('Suitedash API key not configured');
    }

    const bookingData: BookingData = await req.json();
    console.log('Received booking data:', bookingData);

    // Map service to readable format
    const serviceMapping: Record<string, string> = {
      'ron': 'Remote Online Notary',
      'mobile': 'Mobile Notary',
      'loan': 'Loan Signing Agent',
      'apostille': 'Apostille Service',
      'i9': 'I-9 Verification'
    };

    const serviceLabel = serviceMapping[bookingData.service] || bookingData.service;

    // Create contact in Suitedash
    const contactPayload = {
      first_name: bookingData.name.split(' ')[0],
      last_name: bookingData.name.split(' ').slice(1).join(' ') || bookingData.name,
      email: bookingData.email,
      phone: bookingData.phone,
      tags: ['Notary Client', serviceLabel],
      custom_fields: {
        booking_id: bookingData.bookingId,
        service_type: serviceLabel,
        preferred_date: bookingData.preferredDate || 'Not specified',
        preferred_time: bookingData.preferredTime || 'Not specified',
        document_type: bookingData.documentType || 'Not specified',
        number_of_signers: bookingData.numberOfSigners || 1,
        location_address: bookingData.locationAddress || 'N/A',
        urgency: bookingData.urgency || 'flexible',
        status: bookingData.status || 'pending'
      },
      notes: bookingData.message || 'No additional notes'
    };

    console.log('Sending contact to Suitedash:', contactPayload);

    // Send to Suitedash API
    const suitedashResponse = await fetch('https://app.suitedash.com/api/v1/contacts', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${suitedashApiKey}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(contactPayload)
    });

    const responseText = await suitedashResponse.text();
    console.log('Suitedash response status:', suitedashResponse.status);
    console.log('Suitedash response body:', responseText);

    if (!suitedashResponse.ok) {
      console.error('Suitedash API error:', responseText);
      throw new Error(`Suitedash API error: ${suitedashResponse.status} - ${responseText}`);
    }

    let suitedashData;
    try {
      suitedashData = JSON.parse(responseText);
    } catch (e) {
      console.error('Failed to parse Suitedash response:', e);
      throw new Error('Invalid response from Suitedash');
    }

    console.log('Successfully created contact in Suitedash:', suitedashData);

    return new Response(
      JSON.stringify({ 
        success: true, 
        suitedashContactId: suitedashData.id || suitedashData.data?.id,
        message: 'Booking synced to Suitedash successfully' 
      }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error('Error in sync-booking-to-suitedash function:', error);
    return new Response(
      JSON.stringify({ 
        success: false,
        error: error.message,
        details: error.toString()
      }),
      {
        status: 500,
        headers: { 
          'Content-Type': 'application/json', 
          ...corsHeaders 
        },
      }
    );
  }
};

serve(handler);
