# Stripe Setup Guide - Transaction Coordination

## Overview

This guide walks you through setting up Stripe products and price IDs for Transaction Coordination services.

**🚀 QUICK START: Use the automated script!**

The easiest way is to use the automated edge function:

1. **Go to Supabase Dashboard** → Edge Functions → `create-tc-stripe-products`
2. **Click "Invoke"** button
3. **Copy the price IDs** from the response
4. **Update `src/constants/tcPlans.ts`** with the price IDs

That's it! The function creates all 3 products automatically.

---

## Manual Setup (Alternative)

If you prefer to create products manually:

---

## Step 1: Access Stripe Dashboard

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/)
2. Make sure you're in **Test Mode** first (toggle in top right)
3. Navigate to **Products** → **Add Product**

---

## Step 2: Create Basic Plan Product

1. **Product Name:** `Transaction Coordination - Basic`
2. **Description:** `Essential coordination support for straightforward transactions. Perfect for simple real estate closings or standard contract executions.`
3. **Pricing:**
   - **Price:** `$299.00`
   - **Billing:** `One time` (not recurring)
4. Click **Save Product**
5. **Copy the Price ID** (starts with `price_`, looks like `price_1ABC123...`)
6. Update `src/constants/tcPlans.ts`:
   ```typescript
   basic: {
     priceId: "price_1ABC123...", // Paste your actual price ID here
   ```

---

## Step 3: Create Standard Plan Product

1. **Product Name:** `Transaction Coordination - Standard`
2. **Description:** `Comprehensive coordination for moderate complexity transactions. Includes document review, negotiation support, and multi-party coordination.`
3. **Pricing:**
   - **Price:** `$599.00`
   - **Billing:** `One time`
4. Click **Save Product**
5. **Copy the Price ID**
6. Update `src/constants/tcPlans.ts`:
   ```typescript
   standard: {
     priceId: "price_1XYZ789...", // Paste your actual price ID here
   ```

---

## Step 4: Create Premium Plan Product

1. **Product Name:** `Transaction Coordination - Premium`
2. **Description:** `White-glove coordination for complex, high-stakes transactions. Dedicated coordinator, expedited processing, and comprehensive support.`
3. **Pricing:**
   - **Price:** `$1,299.00`
   - **Billing:** `One time`
4. Click **Save Product**
5. **Copy the Price ID**
6. Update `src/constants/tcPlans.ts`:
   ```typescript
   premium: {
     priceId: "price_1DEF456...", // Paste your actual price ID here
   ```

---

## Step 5: Update Code

**File:** `src/constants/tcPlans.ts`

Replace all three placeholder price IDs:

```typescript
export const TC_PLANS = {
  basic: {
    priceId: "price_1ABC123...", // ⚠️ REPLACE with actual price ID
    // ... rest of config
  },
  standard: {
    priceId: "price_1XYZ789...", // ⚠️ REPLACE with actual price ID
    // ... rest of config
  },
  premium: {
    priceId: "price_1DEF456...", // ⚠️ REPLACE with actual price ID
    // ... rest of config
  }
}
```

---

## Step 6: Test in Test Mode

1. **Test Mode:** Use test card numbers from [Stripe Testing](https://stripe.com/docs/testing)
   - Success: `4242 4242 4242 4242`
   - Decline: `4000 0000 0000 0002`
2. **Test the checkout flow:**
   - Submit a Transaction Coordination application
   - Select a plan
   - Complete test payment
   - Verify success page loads
   - Check Stripe Dashboard → Payments to see test payment

---

## Step 7: Switch to Live Mode

1. **Create products in Live Mode:**
   - Toggle to **Live Mode** in Stripe Dashboard
   - Repeat Steps 2-4 to create live products
   - **Important:** Live mode products are separate from test mode
2. **Update code with live price IDs:**
   - Replace test price IDs with live price IDs
   - Or use environment variables to switch between test/live

---

## Step 8: Verify Configuration

After updating price IDs, the system will:
- ✅ Validate price IDs are not placeholders
- ✅ Validate Stripe price ID format
- ✅ Show clear error if placeholders detected
- ✅ Allow checkout only with valid price IDs

---

## Troubleshooting

### Error: "Payment processing is not yet configured"
- **Cause:** Price IDs are still placeholders
- **Fix:** Follow Steps 2-5 above to create products and update code

### Error: "Invalid Stripe price ID format"
- **Cause:** Price ID doesn't match Stripe format
- **Fix:** Ensure price ID starts with `price_` and is 24+ characters

### Checkout fails with Stripe error
- **Check:** Stripe secret key is set in Supabase Edge Function secrets
- **Check:** Price IDs exist in your Stripe account
- **Check:** Products are active (not archived) in Stripe Dashboard

---

## Security Notes

- ✅ Price IDs are safe to expose in client code (they're public)
- ✅ Never expose your Stripe Secret Key
- ✅ Secret Key should only be in Supabase Edge Function secrets
- ✅ Test mode and live mode use different keys

---

## Quick Reference

**File to Update:** `src/constants/tcPlans.ts`

**Price IDs Format:** `price_XXXXXXXXXXXXXXXXXXXXXX` (24+ characters)

**Test Mode Cards:**
- Success: `4242 4242 4242 4242`
- Any future expiry date
- Any 3-digit CVC

**Support:** If you need help, contact Stripe support or check [Stripe Documentation](https://stripe.com/docs)

