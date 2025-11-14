# Suitedash Integration Guide

This document explains how the Suitedash integration works and how to configure webhooks for two-way synchronization.

## Features Implemented

### ✅ Automatic Contact Creation
When a customer submits a booking through your website:
- A new contact is created in Suitedash with all customer details
- Contact is tagged by service type (Remote Online Notary, Mobile Notary, etc.)
- All booking information is stored in custom fields

### ✅ Automatic Project Creation
For each booking:
- A project is automatically created and linked to the contact
- Project name: `[Service Type] - [Customer Name]`
- Project priority is set based on urgency (same-day = high, within 24hrs = high, other = medium)
- All booking details are included in the project description

### ✅ Two-Way Status Sync
Status updates in Suitedash automatically update your booking status:
- Contact/Project created → Booking status: `pending`
- Project started → Booking status: `confirmed`
- Project completed → Booking status: `completed`
- Project cancelled → Booking status: `cancelled`

## Webhook Configuration

To enable two-way sync, you need to configure webhooks in Suitedash:

### Step 1: Get Your Webhook URL
Your webhook endpoint is:
```
https://brzeuhnscuanypkoqcru.supabase.co/functions/v1/suitedash-webhook
```

### Step 2: Configure Webhooks in Suitedash
1. Log into your Suitedash account
2. Go to **Settings** → **Integrations** → **Webhooks**
3. Click **Add Webhook**
4. Enter the webhook URL from Step 1
5. Select the following events to monitor:
   - `contact.created`
   - `contact.updated`
   - `project.created`
   - `project.started`
   - `project.completed`
   - `project.cancelled`
6. Save the webhook configuration

### Step 3: Test the Integration
1. Submit a test booking through your website
2. Check Suitedash to verify:
   - Contact was created
   - Project was created
3. Change the project status in Suitedash
4. Check your booking tracking page to verify status was updated

## Data Flow

### Booking Submission Flow
```
Customer submits booking
    ↓
Booking saved to database
    ↓
Contact created in Suitedash
    ↓
Project created in Suitedash
    ↓
Suitedash IDs saved to booking record
    ↓
Confirmation email sent to customer
```

### Status Update Flow (from Suitedash)
```
Status changed in Suitedash
    ↓
Webhook triggered
    ↓
Webhook endpoint receives event
    ↓
Booking found by Suitedash contact ID
    ↓
Booking status updated in database
    ↓
Customer sees updated status on tracking page
```

## Synced Data

### Contact Information
- Name (split into first/last name)
- Email
- Phone
- Tags: `Notary Client`, `[Service Type]`

### Custom Fields on Contact
- `booking_id`: Unique booking identifier
- `service_type`: Type of service requested
- `preferred_date`: Customer's preferred date
- `preferred_time`: Customer's preferred time
- `document_type`: Type of document to be notarized
- `number_of_signers`: Number of people signing
- `location_address`: Service location (for mobile services)
- `urgency`: Urgency level
- `status`: Current booking status
- `last_sms_interaction`: Timestamp of last SMS engagement
- `booking_count`: Total number of bookings for this contact (counted by matching email or phone)

### Project Information
- **Name**: `[Service Type] - [Customer Name]`
- **Status**: Active
- **Priority**: Based on urgency (high/medium)
- **Description**: Full booking details including:
  - Booking ID
  - Service type
  - Preferred date/time
  - Customer notes
- **Custom Fields**:
  - `booking_id`
  - `service_type`
  - `document_type`
  - `location`

## Booking Count Logic

The `booking_count` custom field in SuiteDash is automatically populated by counting actual bookings from the `bookings` table that match the contact's email or phone number.

### Matching Logic
- **Primary**: Match by email address
- **Fallback**: Match by phone number
- Uses Supabase `.or()` query to match either field
- Counts all bookings regardless of status (pending, confirmed, completed, cancelled)

### Implementation Details
- Uses efficient count query (`count: 'exact', head: true`) - only counts, doesn't fetch data
- Handles errors gracefully with fallback value of 1
- Ensures minimum value of 1 (since contact exists, they have at least one booking)
- Updates automatically during bi-directional sync (every 6 hours)

### Performance Considerations
- Query is optimized for performance using Supabase count queries
- Consider adding database indexes on `email` and `phone` columns if performance becomes an issue
- Count is calculated on-demand during sync, not cached

## Troubleshooting

### Contacts not appearing in Suitedash
1. Check edge function logs for errors
2. Verify API key is correct
3. Ensure Suitedash account has proper permissions

### Status not updating from Suitedash
1. Verify webhook is configured correctly
2. Check webhook URL is accessible
3. Review webhook logs in Suitedash
4. Check edge function logs for webhook errors

### To view edge function logs
```bash
# Sync function logs
supabase functions logs sync-booking-to-suitedash

# Webhook function logs
supabase functions logs suitedash-webhook
```

## Security Notes

⚠️ **Important Security Considerations:**

1. **JWT Verification Disabled**: These functions have JWT verification disabled to allow:
   - Public booking submissions
   - External webhook calls from Suitedash

2. **Input Validation**: All inputs are validated using Zod schemas before processing

3. **API Key Security**: Suitedash API key is stored as a secret environment variable

4. **Rate Limiting**: Consider implementing rate limiting for production use

5. **Webhook Signature Verification**: For added security, implement Suitedash webhook signature verification (if available)

## Support

For issues or questions:
- Review edge function logs
- Check Suitedash webhook delivery logs
- Verify API credentials
- Contact Suitedash support for API-specific issues
