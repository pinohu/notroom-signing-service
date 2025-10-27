# Phase 3: Multi-Channel Communication with WhatsApp

## Overview
Phase 3 implements WhatsApp Business API integration via WbizTool to provide multi-channel communication capabilities alongside SMS. This enables richer messaging experiences with media support, higher engagement rates, and customer channel preferences.

## Key Features Implemented

### 1. WhatsApp Message Sending (`wbiztool-send-whatsapp`)
- **Direct messaging** with text and media support
- **Media types supported**: Images, documents, videos
- **Message preview** with link unfurling
- **Delivery tracking** via WhatsApp API webhooks
- **Fallback handling** to SMS if WhatsApp fails

### 2. WhatsApp Template Messages (`wbiztool-send-template`)
- **Pre-approved templates** for regulatory compliance
- **Variable substitution** for personalization
- **Language support** with locale codes
- **Template management** via WbizTool dashboard
- **Fast delivery** for time-sensitive notifications

### 3. Multi-Channel Notification System
- **Updated `send-sms-notification`** function with channel preference
- **Smart routing**: WhatsApp-first for opted-in customers
- **Automatic fallback**: SMS if WhatsApp delivery fails
- **Unified API** for notifications across channels

### 4. Customer Preferences
- **WhatsApp opt-in** field in bookings table
- **Separate WhatsApp number** support (if different from phone)
- **Channel preference tracking** in database
- **GDPR-compliant** opt-in/opt-out management

## Database Schema

### Bookings Table Additions
```sql
ALTER TABLE public.bookings 
ADD COLUMN whatsapp_opt_in boolean DEFAULT false;

ALTER TABLE public.bookings 
ADD COLUMN whatsapp_number text;
```

## Edge Functions

### 1. `wbiztool-send-whatsapp`
**Purpose**: Send WhatsApp messages with text and optional media

**Endpoint**: `${SUPABASE_URL}/functions/v1/wbiztool-send-whatsapp`

**Request Body**:
```json
{
  "phone": "+12345678900",
  "message": "Your appointment is confirmed for tomorrow at 2 PM.",
  "mediaUrl": "https://example.com/image.jpg",
  "bookingId": "uuid-here"
}
```

**Response**:
```json
{
  "success": true,
  "message": "WhatsApp message sent successfully"
}
```

### 2. `wbiztool-send-template`
**Purpose**: Send pre-approved WhatsApp templates

**Endpoint**: `${SUPABASE_URL}/functions/v1/wbiztool-send-template`

**Request Body**:
```json
{
  "phone": "+12345678900",
  "templateName": "booking_confirmation",
  "templateParams": ["John Doe", "2025-02-15", "2:00 PM"],
  "languageCode": "en"
}
```

**Response**:
```json
{
  "success": true,
  "messageId": "wamid.ABCxyz123..."
}
```

### 3. `send-sms-notification` (Updated)
**Purpose**: Multi-channel notification with smart routing

**Endpoint**: `${SUPABASE_URL}/functions/v1/send-sms-notification`

**Request Body**:
```json
{
  "phone": "+12345678900",
  "message": "Your booking has been confirmed.",
  "bookingId": "uuid-here",
  "preferWhatsApp": true
}
```

**Logic**:
- If `preferWhatsApp = true`: Try WhatsApp → Fallback to SMS-iT → Fallback to Twilio
- If `preferWhatsApp = false`: Try SMS-iT → Fallback to Twilio

## Setup Instructions

### Step 1: Get WbizTool Account
1. Sign up at [wbiztool.com](https://wbiztool.com)
2. Complete business verification with Meta
3. Get WhatsApp Business Phone Number ID
4. Generate API access token

### Step 2: Configure Credentials
Add these secrets in Lovable Cloud Secrets:
- `WBIZTOOL_API_KEY` - Your API access token
- `WBIZTOOL_PHONE_NUMBER_ID` - Your WhatsApp Business phone number ID

### Step 3: Create Message Templates
1. Go to WbizTool Dashboard → Templates
2. Create templates for:
   - `booking_confirmation` - New booking confirmation
   - `appointment_reminder_48h` - 48-hour reminder
   - `appointment_reminder_24h` - 24-hour reminder
   - `appointment_reminder_2h` - 2-hour reminder
   - `rating_request` - Post-service feedback
   - `follow_up` - General follow-up

3. Wait for Meta approval (usually 24-48 hours)

### Step 4: Test Integration
1. Navigate to `/admin/whatsapp` in your admin panel
2. Use the test tools to send:
   - Test WhatsApp message (text)
   - Test template message
3. Verify delivery on your WhatsApp Business account

### Step 5: Update Automation Flows
Update existing automation functions to support WhatsApp:

```typescript
// In your automation functions
const { data: booking } = await supabase
  .from('bookings')
  .select('phone, whatsapp_opt_in')
  .eq('id', bookingId)
  .single();

await supabase.functions.invoke('send-sms-notification', {
  body: {
    phone: booking.phone,
    message: "Your reminder message",
    bookingId: bookingId,
    preferWhatsApp: booking.whatsapp_opt_in
  }
});
```

## Recommended Templates

### Template 1: booking_confirmation
```
Hello {{1}},

Your booking for {{2}} has been confirmed!

📅 Date: {{3}}
🕐 Time: {{4}}
📍 Location: {{5}}

We'll send you a reminder before your appointment.

Book again: https://notroom.com

- NotaryFlow Team
```

### Template 2: appointment_reminder_24h
```
Hi {{1}},

Reminder: Your {{2}} appointment is tomorrow!

🕐 {{3}} at {{4}}
📍 {{5}}

Need to reschedule? Reply to this message.

- NotaryFlow
```

### Template 3: rating_request
```
Hi {{1}},

Thanks for choosing NotaryFlow! 

How was your experience? Rate us:
⭐⭐⭐⭐⭐ - https://notroom.com/rate/{{2}}

Your feedback helps us improve.

- NotaryFlow Team
```

## Best Practices

### 1. Message Timing
- **Business hours only**: 9 AM - 8 PM local time
- **Avoid weekends** for non-urgent messages
- **Respect opt-outs** immediately

### 2. Content Guidelines
- Keep messages **under 160 characters** when possible
- Use **emojis sparingly** for visual appeal
- Include **clear call-to-action** (CTA)
- Add **unsubscribe option** in marketing messages

### 3. Template Management
- Create templates for **all automated messages**
- Get **Meta approval** before using
- Test templates with **sample data** first
- Monitor **delivery rates** and adjust

### 4. Compliance
- **GDPR**: Get explicit opt-in for WhatsApp
- **TCPA**: Honor do-not-contact lists
- **Business hours**: Respect time zones
- **Opt-out**: Process within 24 hours

## Integration with Existing Flows

### Appointment Reminders
Update `smsit-appointment-reminders`:
```typescript
if (booking.whatsapp_opt_in) {
  await supabase.functions.invoke('wbiztool-send-template', {
    body: {
      phone: booking.phone,
      templateName: 'appointment_reminder_24h',
      templateParams: [booking.name, booking.service, booking.preferred_time, booking.location_address]
    }
  });
} else {
  // Existing SMS logic
}
```

### Post-Service Follow-up
Update `smsit-post-service`:
```typescript
if (booking.whatsapp_opt_in) {
  await supabase.functions.invoke('wbiztool-send-template', {
    body: {
      phone: booking.phone,
      templateName: 'rating_request',
      templateParams: [booking.name, booking.id]
    }
  });
}
```

## Expected Results

### Engagement Improvements
- **60-80% open rates** on WhatsApp (vs 20% SMS)
- **Higher response rates** due to rich media
- **Lower costs** per message vs SMS
- **Better customer experience** with preferred channel

### Delivery Metrics
- **98%+ delivery rate** with approved templates
- **Sub-second delivery** for most messages
- **Read receipts** for confirmation
- **Reply tracking** for engagement

## Troubleshooting

### Template Not Sending
**Symptoms**: Template send fails with error
**Checks**:
- Verify template is approved in WbizTool dashboard
- Check template name matches exactly (case-sensitive)
- Ensure parameter count matches template variables
- Confirm phone number format (+1234567890)

### WhatsApp Message Not Delivered
**Symptoms**: Message accepted but not received
**Checks**:
- Verify recipient has WhatsApp installed
- Check phone number is correct (+country code)
- Ensure WBIZTOOL_PHONE_NUMBER_ID is correct
- Check Meta Business Manager for restrictions

### Fallback to SMS Not Working
**Symptoms**: WhatsApp fails but SMS doesn't send
**Checks**:
- Verify SMS-iT credentials are configured
- Check Twilio credentials as secondary fallback
- Review `send-sms-notification` function logs
- Ensure booking has valid phone number

## Monitoring

### Key Metrics to Track
1. **WhatsApp vs SMS usage** - Channel preference trends
2. **Delivery rates** - Success rate by channel
3. **Response rates** - Engagement by channel
4. **Cost per message** - ROI analysis
5. **Opt-in rates** - Customer preference adoption

### Dashboard Queries
```sql
-- WhatsApp opt-in rate
SELECT 
  COUNT(*) FILTER (WHERE whatsapp_opt_in = true) * 100.0 / COUNT(*) as opt_in_percentage
FROM bookings
WHERE created_at > NOW() - INTERVAL '30 days';

-- Message volume by channel
SELECT 
  CASE WHEN whatsapp_opt_in THEN 'WhatsApp' ELSE 'SMS' END as channel,
  COUNT(*) as message_count
FROM bookings
WHERE created_at > NOW() - INTERVAL '30 days'
GROUP BY whatsapp_opt_in;
```

## Next Steps

After successful Phase 3 implementation:
1. ✅ WhatsApp integration complete
2. ✅ Multi-channel notifications working
3. ✅ Admin UI for testing
4. → **Phase 4**: Enhanced SMS-iT journeys with segmentation
5. → **Phase 5**: Master automation & event bus
6. → **Phase 6**: Novocall callback widgets

## Support

For issues with:
- **WbizTool setup**: Contact WbizTool support
- **Template approval**: Check Meta Business Manager
- **Edge functions**: Review Lovable Cloud logs at `/admin/bookings`
- **Integration**: Check this guide and test with admin UI
