# ✅ Phase 7: Two-Way Sync Setup Checklist

Use this checklist to ensure Phase 7 is properly configured and running.

---

## Pre-Deployment Checklist

- [x] Edge function `suitedash-contact-sync` deployed
- [x] Edge function `suitedash-webhook` enhanced with new events
- [x] Edge function `sync-booking-to-suitedash` updated for B2B tracking
- [x] All code changes merged and built successfully

---

## Configuration Checklist

### 1. Supabase Configuration

- [x] **Cron Job Created** (Bi-directional sync every 6 hours) ✅ AUTOMATED
  ```sql
  SELECT * FROM cron.job WHERE jobname = 'suitedash-contact-sync';
  ```
  - Cron job automatically configured to run every 6 hours

- [x] **Secrets Verified** ✅ ALL SET
  - `SUITEDASH_API_KEY` is set ✓
  - `SMSIT_API_KEY` is set ✓
  - `SUPABASE_URL` is set ✓
  - `SUPABASE_SERVICE_ROLE_KEY` is set ✓

  All required secrets are configured in your backend

- [x] **Function Deployed** ✅ AUTOMATED
  - `suitedash-contact-sync` is deployed and ready
  - All edge functions auto-deploy with your project

### 2. SuiteDash Configuration (⚠️ MANUAL STEPS REQUIRED)

- [ ] **Webhook URL Configured** ⚠️ YOU MUST DO THIS
  - URL: `https://brzeuhnscuanypkoqcru.supabase.co/functions/v1/suitedash-webhook`
  - Navigate to: SuiteDash → Integrations → Webhooks → Add the URL above

- [ ] **Webhook Events Enabled** (9 total) ⚠️ YOU MUST ENABLE THESE
  - [x] contact.created (already configured)
  - [x] contact.updated (already configured)
  - [x] project.created (already configured)
  - [x] project.started (already configured)
  - [x] project.completed (already configured)
  - [x] project.cancelled (already configured)
  - [ ] **project.milestone_reached** (NEW - Enable this in SuiteDash)
  - [ ] **project.delayed** (NEW - Enable this in SuiteDash)
  - [ ] **project.invoice_sent** (NEW - Enable this in SuiteDash)

- [ ] **API Access Verified**
  - Test API key works: Make a test call to `/contacts` endpoint
  - Verify rate limits are sufficient (check SuiteDash plan)

### 3. SMS-iT Configuration

- [ ] **API Key Active**
  - Login to SMS-iT dashboard
  - Verify API key is not expired or rate-limited

- [ ] **SMS Credits Sufficient**
  - Check credit balance
  - Set up low-balance alerts
  - Minimum recommended: 1,000 credits

---

## Testing Checklist

### Manual Sync Test

- [ ] **Test Bi-Directional Sync**
  ```bash
  curl -X POST https://brzeuhnscuanypkoqcru.supabase.co/functions/v1/suitedash-contact-sync \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer YOUR_ANON_KEY"
  ```
  
  **Expected:** Success response with sync stats

- [ ] **Check Sync Logs**
  ```bash
  supabase functions logs suitedash-contact-sync --tail 50
  ```
  
  **Expected:** No errors, shows sync stats

### Webhook Event Tests

- [ ] **Test `project.started` Event**
  1. In SuiteDash, change project status to "Started"
  2. Check SMS-iT or customer phone for notification
  3. Verify booking status updated in database
  
  **Expected SMS:** "Great news! We've started your [Service]..."

- [ ] **Test `project.delayed` Event**
  1. In SuiteDash, mark project as delayed with reason
  2. Customer receives SMS about delay
  3. Manager gets urgent task in SMS-iT (due in 1 hour)
  
  **Expected SMS:** "Update on your [Service]: [reason]..."
  **Expected Task:** "URGENT: Project Delayed - [Name]"

- [ ] **Test `project.milestone_reached` Event**
  1. In SuiteDash, log a project milestone
  2. Customer receives milestone update SMS
  
  **Expected SMS:** "Milestone reached! [Details]"

- [ ] **Test `project.invoice_sent` Event**
  1. Send invoice from SuiteDash
  2. Customer receives payment reminder SMS
  
  **Expected SMS:** "Your invoice for [Service] is ready..."

### B2B Company Tracking Test

- [ ] **Test B2B Booking Flow**
  1. Submit test booking with:
     - `companyName`: "Test Company LLC"
     - `isBusinessClient`: true
     - `companySize`: "10-50 employees"
  
  2. Check SuiteDash for new company created
  3. Verify contact is linked to company
  4. Confirm tags include 'B2B' and 'Business Account'
  
  **Expected:** Company created, contact linked, correct tags applied

---

## Monitoring Checklist (First 7 Days)

### Daily Checks

- [ ] **Day 1-2: Monitor Logs Closely**
  ```bash
  # Watch sync function
  supabase functions logs suitedash-contact-sync --follow
  
  # Watch webhook function  
  supabase functions logs suitedash-webhook --follow
  ```
  
  **Look for:** Any errors, unusual patterns, sync failures

- [ ] **Day 3-4: Verify Data Accuracy**
  - Spot-check 5-10 contacts in both systems
  - Confirm data matches (phone, email, tags, status)
  - Verify no duplicate contacts created

- [ ] **Day 5-7: Monitor Performance**
  - Sync duration should be <30 seconds
  - Success rate should be >99%
  - No accumulating errors

### Weekly Checks (Ongoing)

- [ ] **Check Sync Stats**
  ```sql
  -- Run in Supabase SQL Editor
  SELECT 
    DATE(created_at) as sync_date,
    COUNT(*) as sync_runs,
    COUNT(CASE WHEN status = 'success' THEN 1 END) as successful_syncs,
    AVG(EXTRACT(EPOCH FROM (completed_at - created_at))) as avg_duration_seconds
  FROM edge_function_logs
  WHERE function_name = 'suitedash-contact-sync'
  GROUP BY DATE(created_at)
  ORDER BY sync_date DESC
  LIMIT 7;
  ```

- [ ] **Review Error Logs**
  - Any patterns in failures?
  - Are errors transient or persistent?
  - Do errors require code fixes?

- [ ] **Customer Feedback**
  - Are customers receiving project update SMS?
  - Any complaints about timing or content?
  - Any SMS delivery failures?

---

## Success Criteria

Phase 7 is considered **fully operational** when:

- ✅ Cron job running every 6 hours without failures (7+ days)
- ✅ Sync success rate >99%
- ✅ Zero data discrepancies between systems
- ✅ All 9 webhook events triggering SMS notifications correctly
- ✅ B2B company creation working for business clients
- ✅ Average sync duration <30 seconds
- ✅ No customer complaints about SMS notifications
- ✅ Manager receiving urgent tasks for project delays

---

## Rollback Plan

**If Phase 7 causes issues:**

1. **Disable Cron Job:**
   ```sql
   SELECT cron.unschedule('suitedash-contact-sync');
   ```

2. **Revert Webhook Events** (in SuiteDash):
   - Remove newly added events (milestone, delayed, invoice)
   - Keep only original 6 events

3. **Monitor for 24 hours** to ensure stability

4. **Report issues** for debugging before re-enabling

---

## Post-Deployment Actions

Once Phase 7 is stable (7+ days of successful operation):

- [ ] **Update Documentation**
  - Note any configuration tweaks made
  - Document any edge cases discovered
  - Update troubleshooting guide with real scenarios

- [ ] **Train Team** (if applicable)
  - Show team how to check sync logs
  - Explain what SMS notifications customers receive
  - Demonstrate B2B company tracking

- [ ] **Plan Phase 8**
  - Review strategic roadmap
  - Decide if ready for Phase 8 (Voice + MMS)
  - Schedule implementation

---

**Questions?** See `PHASE_7_TWO_WAY_SYNC_GUIDE.md` for detailed setup instructions.

**Last Updated:** 2025-01-26
