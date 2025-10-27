import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.75.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface CallScalerEvent {
  event_type: 'call.started' | 'call.answered' | 'call.missed' | 'call.completed';
  call_id: string;
  tracking_number: string;
  caller_number: string;
  duration?: number;
  recording_url?: string;
  timestamp: string;
  metadata?: {
    source?: string;
    campaign?: string;
    channel?: string;
  };
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const payload: CallScalerEvent = await req.json();
    console.log('CallScaler webhook received:', payload);

    // Store call event
    const { data: callEvent, error: eventError } = await supabase
      .from('call_events')
      .insert({
        event_type: payload.event_type.replace('call.', ''),
        tool: 'callscaler',
        tracking_number: payload.tracking_number,
        caller_number: payload.caller_number,
        duration: payload.duration,
        recording_url: payload.recording_url,
        metadata: payload.metadata || {},
      })
      .select()
      .single();

    if (eventError) {
      console.error('Error storing call event:', eventError);
    }

    // Handle specific event types
    switch (payload.event_type) {
      case 'call.started':
        await handleCallStarted(supabase, payload);
        break;
      case 'call.answered':
        await handleCallAnswered(supabase, payload);
        break;
      case 'call.missed':
        await handleCallMissed(supabase, payload);
        break;
      case 'call.completed':
        await handleCallCompleted(supabase, payload);
        break;
    }

    return new Response(
      JSON.stringify({ success: true, event_id: callEvent?.id }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('CallScaler webhook error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});

async function handleCallStarted(supabase: any, payload: CallScalerEvent) {
  // Check if booking already exists for this caller
  const { data: existingBooking } = await supabase
    .from('bookings')
    .select('id')
    .eq('phone', payload.caller_number)
    .eq('status', 'pending')
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (existingBooking) {
    // Update existing booking with call tracking data
    await supabase
      .from('bookings')
      .update({
        tracking_number: payload.tracking_number,
        marketing_source: payload.metadata?.source || payload.metadata?.channel,
      })
      .eq('id', existingBooking.id);
  }

  console.log('Call started:', payload.call_id);
}

async function handleCallAnswered(supabase: any, payload: CallScalerEvent) {
  console.log('Call answered:', payload.call_id);
  
  // Update call event with answered status
  await supabase
    .from('call_events')
    .update({ metadata: { ...payload.metadata, answered: true } })
    .eq('tool', 'callscaler')
    .eq('tracking_number', payload.tracking_number);
}

async function handleCallMissed(supabase: any, payload: CallScalerEvent) {
  console.log('Call missed:', payload.call_id, '- triggering SMS recovery');

  // Find or create lead/booking for this missed call
  const { data: booking } = await supabase
    .from('bookings')
    .select('id, phone, name, email')
    .eq('phone', payload.caller_number)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (booking) {
    // Trigger SMS-iT auto-followup for missed call recovery
    try {
      await supabase.functions.invoke('smsit-auto-followup', {
        body: {
          bookingId: booking.id,
          trigger: 'missed_call',
          urgency: 'high',
        },
      });
      console.log('Triggered SMS recovery for booking:', booking.id);
    } catch (error) {
      console.error('Failed to trigger SMS recovery:', error);
    }
  } else {
    console.log('No existing booking found for missed call from:', payload.caller_number);
    // Could create a new lead record here if desired
  }
}

async function handleCallCompleted(supabase: any, payload: CallScalerEvent) {
  console.log('Call completed:', payload.call_id, 'Duration:', payload.duration);

  // Update booking with call duration and recording
  const { data: booking } = await supabase
    .from('bookings')
    .select('id')
    .eq('phone', payload.caller_number)
    .eq('tracking_number', payload.tracking_number)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (booking) {
    await supabase
      .from('bookings')
      .update({
        call_duration: payload.duration,
        call_recording_url: payload.recording_url,
      })
      .eq('id', booking.id);

    // Link call event to booking
    await supabase
      .from('call_events')
      .update({ booking_id: booking.id })
      .eq('tracking_number', payload.tracking_number)
      .eq('caller_number', payload.caller_number)
      .is('booking_id', null);
  }
}
