import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface InsightoWebhook {
  event: string;
  conversation_id: string;
  caller_number?: string;
  transcript?: string;
  intent?: string;
  confidence?: number;
  extracted_data?: {
    name?: string;
    email?: string;
    service?: string;
    location?: string;
    urgency?: string;
    preferred_time?: string;
    document_type?: string;
  };
  recording_url?: string;
  timestamp: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
  );

  try {
    const payload: InsightoWebhook = await req.json();
    console.log('Insighto webhook received:', payload);

    const eventType = payload.event.replace('.', '_');
    let leadId: string | null = null;

    // If this is a booking request from the AI agent
    if (payload.intent === 'NOTARY_NOW' || payload.intent === 'APOSTILLE' || payload.intent === 'FORMATION') {
      const data = payload.extracted_data || {};
      
      // Create or update booking
      const bookingData = {
        name: data.name || 'AI Caller',
        phone: payload.caller_number || 'unknown',
        email: data.email || `ai-${payload.conversation_id}@pending.notroom.com`,
        service: data.service || payload.intent,
        document_type: data.document_type,
        location_address: data.location,
        urgency: data.urgency || 'flexible',
        preferred_time: data.preferred_time,
        status: 'pending',
        ai_booked: true,
        ai_confidence: payload.confidence,
        agent_provider: 'insighto',
        call_transcript: payload.transcript,
        call_recording_url: payload.recording_url,
      };

      const { data: booking, error: bookingError } = await supabase
        .from('bookings')
        .insert(bookingData)
        .select('id')
        .single();

      if (bookingError) {
        console.error('Error creating booking:', bookingError);
        throw bookingError;
      }

      leadId = booking.id;
      console.log('Created AI booking:', leadId);

      // Trigger confirmation flow
      await fetch(`${Deno.env.get('SUPABASE_URL')}/functions/v1/smsit-booking-confirm`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bookingId: leadId }),
      }).catch(err => console.error('Failed to send confirmation:', err));

      // Send WhatsApp checklist if opted in
      if (bookingData.phone !== 'unknown') {
        await fetch(`${Deno.env.get('SUPABASE_URL')}/functions/v1/wbiztool-send-checklist`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            bookingId: leadId,
            phone: bookingData.phone,
            service: bookingData.service,
          }),
        }).catch(err => console.error('Failed to send WhatsApp checklist:', err));
      }
    }

    // Log the event
    const { error: eventError } = await supabase
      .from('call_events')
      .insert({
        booking_id: leadId,
        event_type: eventType,
        tool: 'insighto',
        caller_number: payload.caller_number,
        transcript: payload.transcript,
        recording_url: payload.recording_url,
        metadata: {
          conversation_id: payload.conversation_id,
          intent: payload.intent,
          confidence: payload.confidence,
          extracted_data: payload.extracted_data,
        },
      });

    if (eventError) {
      console.error('Error logging event:', eventError);
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        leadId,
        message: leadId ? 'Booking created successfully' : 'Event logged'
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Insighto webhook error:', error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : 'Unknown error' }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
