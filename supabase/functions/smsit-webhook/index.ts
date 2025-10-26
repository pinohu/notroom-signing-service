import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[SMSIT-WEBHOOK] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Webhook received");

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!supabaseUrl || !supabaseKey) {
      throw new Error("Supabase configuration missing");
    }

    const supabase = createClient(supabaseUrl, supabaseKey);
    const webhookData = await req.json();

    logStep("Webhook data", { type: webhookData.event_type });

    // Handle different webhook events
    switch (webhookData.event_type) {
      case "message.replied":
        await handleMessageReply(supabase, webhookData);
        break;

      case "link.clicked":
        await handleLinkClick(supabase, webhookData);
        break;

      case "contact.updated":
        await handleContactUpdate(supabase, webhookData);
        break;

      case "campaign.delivered":
        await handleCampaignDelivery(supabase, webhookData);
        break;

      case "task.completed":
        await handleTaskCompletion(supabase, webhookData);
        break;

      default:
        logStep("Unhandled webhook event", { type: webhookData.event_type });
    }

    return new Response(
      JSON.stringify({ success: true, message: "Webhook processed" }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR", { message: errorMessage });
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      }
    );
  }
});

async function handleMessageReply(supabase: any, data: any) {
  logStep("Processing message reply", { contactId: data.contact_id });

  // Find booking by custom field
  const bookingId = data.contact?.custom_fields?.booking_id;
  
  if (bookingId) {
    const { error } = await supabase
      .from('bookings')
      .update({ 
        message: `${data.message} (Replied via SMS)`,
        updated_at: new Date().toISOString()
      })
      .eq('id', bookingId);

    if (error) {
      logStep("Failed to update booking with reply", { error });
    } else {
      logStep("Booking updated with SMS reply");
    }
  }
}

async function handleLinkClick(supabase: any, data: any) {
  logStep("Processing link click", { 
    contactId: data.contact_id,
    link: data.link_url 
  });

  const bookingId = data.contact?.custom_fields?.booking_id;
  
  if (bookingId) {
    // Update booking to show interest
    const { error } = await supabase
      .from('bookings')
      .update({ 
        status: 'confirmed', // Move to interested/high-intent status
        updated_at: new Date().toISOString()
      })
      .eq('id', bookingId)
      .eq('status', 'pending');

    if (error) {
      logStep("Failed to update booking status", { error });
    } else {
      logStep("Booking marked as high-intent after link click");
    }
  }
}

async function handleContactUpdate(supabase: any, data: any) {
  logStep("Processing contact update", { contactId: data.contact_id });

  const bookingId = data.contact?.custom_fields?.booking_id;
  
  if (bookingId && data.tags) {
    // Sync important tag changes back to booking
    if (data.tags.includes('status_vip')) {
      await supabase
        .from('bookings')
        .update({ 
          message: '[VIP Customer] ' + (data.message || ''),
          updated_at: new Date().toISOString()
        })
        .eq('id', bookingId);
      
      logStep("Booking marked as VIP");
    }
  }
}

async function handleCampaignDelivery(supabase: any, data: any) {
  logStep("Campaign delivery recorded", {
    campaign: data.campaign_name,
    status: data.delivery_status
  });
}

async function handleTaskCompletion(supabase: any, data: any) {
  logStep("Task completed", { taskId: data.task_id });
}
