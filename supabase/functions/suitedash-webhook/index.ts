import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface SuitedashWebhookPayload {
  event: string;
  data: {
    id: string;
    contact_id?: string;
    project_id?: string;
    status?: string;
    custom_fields?: {
      booking_id?: string;
    };
  };
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const payload: SuitedashWebhookPayload = await req.json();
    console.log('Received Suitedash webhook:', payload);

    // Map Suitedash events to booking status updates
    const statusMapping: Record<string, string> = {
      'contact.created': 'pending',
      'contact.updated': 'pending',
      'project.created': 'confirmed',
      'project.started': 'confirmed',
      'project.completed': 'completed',
      'project.cancelled': 'cancelled',
    };

    const newStatus = statusMapping[payload.event];
    
    if (!newStatus) {
      console.log('Event type not mapped to status update:', payload.event);
      return new Response(
        JSON.stringify({ success: true, message: 'Event received but not processed' }),
        { status: 200, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    // Find booking by Suitedash contact ID or booking ID from custom fields
    let booking;
    
    if (payload.data.contact_id) {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('suitedash_contact_id', payload.data.contact_id)
        .single();
      
      if (error) {
        console.error('Error finding booking by contact ID:', error);
      } else {
        booking = data;
      }
    }

    // Fallback to custom field booking_id if provided
    if (!booking && payload.data.custom_fields?.booking_id) {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('id', payload.data.custom_fields.booking_id)
        .single();
      
      if (error) {
        console.error('Error finding booking by ID:', error);
      } else {
        booking = data;
      }
    }

    if (!booking) {
      console.error('Booking not found for webhook payload');
      return new Response(
        JSON.stringify({ success: false, error: 'Booking not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
      );
    }

    // Update booking status
    const updateData: any = { status: newStatus };
    
    // Store project ID if this is a project-related event
    if (payload.event.startsWith('project.') && payload.data.project_id) {
      updateData.suitedash_project_id = payload.data.project_id;
    }

    const { error: updateError } = await supabase
      .from('bookings')
      .update(updateData)
      .eq('id', booking.id);

    if (updateError) {
      console.error('Error updating booking:', updateError);
      throw updateError;
    }

    console.log(`Successfully updated booking ${booking.id} to status: ${newStatus}`);

    return new Response(
      JSON.stringify({ 
        success: true, 
        bookingId: booking.id,
        oldStatus: booking.status,
        newStatus: newStatus,
        message: 'Booking status updated successfully' 
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
    console.error('Error in suitedash-webhook function:', error);
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
