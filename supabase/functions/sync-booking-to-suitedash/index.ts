import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

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
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
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

    const suitedashContactId = suitedashData.id || suitedashData.data?.id;

    // Create a project for this booking
    let suitedashProjectId = null;
    try {
      const projectPayload = {
        contact_id: suitedashContactId,
        name: `${serviceLabel} - ${bookingData.name}`,
        description: `Booking ID: ${bookingData.bookingId}\n\nService: ${serviceLabel}\nPreferred Date: ${bookingData.preferredDate || 'Not specified'}\nPreferred Time: ${bookingData.preferredTime || 'Not specified'}\n\nNotes: ${bookingData.message || 'None'}`,
        status: 'active',
        priority: bookingData.urgency === 'same_day' ? 'high' : bookingData.urgency === 'within_24hrs' ? 'high' : 'medium',
        custom_fields: {
          booking_id: bookingData.bookingId,
          service_type: serviceLabel,
          document_type: bookingData.documentType || 'Not specified',
          location: bookingData.locationAddress || 'N/A'
        }
      };

      console.log('Creating project in Suitedash:', projectPayload);

      const projectResponse = await fetch('https://app.suitedash.com/api/v1/projects', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${suitedashApiKey}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(projectPayload)
      });

      if (projectResponse.ok) {
        const projectData = await projectResponse.json();
        suitedashProjectId = projectData.id || projectData.data?.id;
        console.log('Successfully created project in Suitedash:', projectData);
      } else {
        const errorText = await projectResponse.text();
        console.error('Failed to create project in Suitedash:', errorText);
      }
    } catch (projectError) {
      console.error('Error creating project:', projectError);
      // Don't fail the whole sync if project creation fails
    }

    // Update booking with Suitedash IDs
    try {
      const { error: updateError } = await supabase
        .from('bookings')
        .update({
          suitedash_contact_id: suitedashContactId,
          suitedash_project_id: suitedashProjectId,
          suitedash_synced_at: new Date().toISOString()
        })
        .eq('id', bookingData.bookingId);

      if (updateError) {
        console.error('Error updating booking with Suitedash IDs:', updateError);
      } else {
        console.log('Successfully updated booking with Suitedash IDs');
      }
    } catch (dbError) {
      console.error('Database update error:', dbError);
      // Don't fail the sync if DB update fails
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        suitedashContactId: suitedashContactId,
        suitedashProjectId: suitedashProjectId,
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
