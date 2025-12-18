# Emailit.com API Setup Instructions

## Step 1: Add API Key to Environment Variables

Create or update your `.env` file in the project root with the following:

```bash
# Email Service (Emailit.com)
VITE_EMAILIT_API_KEY=em_Rdv81BisdMCws2bkTT2LqSPDruAeg7iC
VITE_EMAILIT_API_URL=https://api.emailit.com/v1
```

## Step 2: Verify API Endpoint Format

The current implementation assumes a standard REST API format. You may need to adjust:

1. **API Endpoint**: Currently set to `https://api.emailit.com/v1/send`
   - Check Emailit.com documentation for the correct endpoint
   - Update `VITE_EMAILIT_API_URL` if different

2. **Authentication Format**: Currently using `Bearer` token
   - May need to change to `X-API-Key` header format
   - Check `src/services/emailService.ts` line 63 for adjustment

3. **Request Body Format**: Currently sending:
   ```json
   {
     "from": "email@domain.com",
     "to": "recipient@domain.com",
     "subject": "Subject",
     "html": "<html>...</html>"
   }
   ```
   - Verify this matches Emailit.com's expected format

## Step 3: Test the Integration

1. Restart your development server after adding the `.env` file
2. Test email sending through:
   - Lead magnet form
   - Booking confirmation
   - TC application success
   - CROP application success

## Step 4: Monitor Email Delivery

- Check Emailit.com dashboard for delivery status
- Monitor rate limits (5,000 emails/day, 1,000/hour initially)
- Check application logs for any API errors

## Important Security Notes

⚠️ **NEVER commit your `.env` file to git** - it contains sensitive API keys!

The `.env` file should be in `.gitignore` and kept local only.

## Troubleshooting

If emails aren't sending:

1. **Check API Key**: Verify the key is correct in `.env`
2. **Check API Endpoint**: Verify the endpoint URL matches Emailit.com docs
3. **Check Auth Format**: May need to change from `Bearer` to `X-API-Key` header
4. **Check Request Format**: Verify the JSON body structure matches Emailit.com's API
5. **Check Browser Console**: Look for API error messages
6. **Check Emailit.com Dashboard**: Verify account status and limits

## Support

- Emailit.com Support: support@emailit.com
- Check Emailit.com API documentation for exact endpoint and format details




