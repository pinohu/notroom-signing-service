# Agent 4: Environment Validation Agent 🔐

**Priority**: HIGH  
**Estimated Time**: 1-2 days  
**Dependencies**: None  
**Status**: ✅ **COMPLETE**

---

## Overview

Add runtime validation for all environment variables (client and edge functions) to catch configuration errors early.

---

## Task 4.1: Create Client-Side Environment Validation

**File**: `src/utils/envValidation.ts` (create or update if exists)

### Actions
- [x] Create validation utility
- [x] Define required environment variables
- [x] Define optional environment variables
- [x] Add helpful error messages
- [x] Client-side validation implemented and called at startup
- [x] Edge function validation implemented

### Code to Create

```typescript
// src/utils/envValidation.ts
interface EnvConfig {
  VITE_SUPABASE_URL: string;
  VITE_SUPABASE_PUBLISHABLE_KEY: string;
  VITE_CLOUDFLARE_TURNSTILE_SITE_KEY?: string;
  VITE_SENTRY_DSN?: string;
  VITE_GA_MEASUREMENT_ID?: string;
  VITE_RESEND_API_KEY?: string;
}

const requiredEnvVars: (keyof EnvConfig)[] = [
  'VITE_SUPABASE_URL',
  'VITE_SUPABASE_PUBLISHABLE_KEY'
];

const optionalEnvVars: (keyof EnvConfig)[] = [
  'VITE_CLOUDFLARE_TURNSTILE_SITE_KEY',
  'VITE_SENTRY_DSN',
  'VITE_GA_MEASUREMENT_ID',
  'VITE_RESEND_API_KEY'
];

export function validateClientEnv(): void {
  const missing: string[] = [];
  
  for (const envVar of requiredEnvVars) {
    if (!import.meta.env[envVar]) {
      missing.push(envVar);
    }
  }
  
  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(', ')}\n` +
      `Please check your .env file and ensure all required variables are set.\n` +
      `See .env.example for reference.`
    );
  }
  
  // Warn about missing optional vars in development
  if (import.meta.env.DEV) {
    for (const envVar of optionalEnvVars) {
      if (!import.meta.env[envVar]) {
        console.warn(`Optional environment variable not set: ${envVar}`);
      }
    }
  }
}

export function getEnvConfig(): EnvConfig {
  validateClientEnv();
  
  return {
    VITE_SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL!,
    VITE_SUPABASE_PUBLISHABLE_KEY: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY!,
    VITE_CLOUDFLARE_TURNSTILE_SITE_KEY: import.meta.env.VITE_CLOUDFLARE_TURNSTILE_SITE_KEY,
    VITE_SENTRY_DSN: import.meta.env.VITE_SENTRY_DSN,
    VITE_GA_MEASUREMENT_ID: import.meta.env.VITE_GA_MEASUREMENT_ID,
    VITE_RESEND_API_KEY: import.meta.env.VITE_RESEND_API_KEY
  };
}
```

### Acceptance Criteria
- ✅ Validation function works
- ✅ Clear error messages
- ✅ Type-safe environment access
- ✅ Helpful error messages

---

## Task 4.2: Add Validation to Main Entry Point

**File**: `src/main.tsx`

### Actions
- [ ] Import validation function
- [ ] Call validation before app initialization
- [ ] Handle validation errors gracefully

### Code to Add

```typescript
// At top of main.tsx, before ReactDOM.createRoot
import { validateClientEnv } from '@/utils/envValidation';

try {
  validateClientEnv();
} catch (error) {
  const errorMessage = error instanceof Error ? error.message : 'Unknown error';
  console.error('Environment validation failed:', errorMessage);
  
  // Show user-friendly error in production
  if (!import.meta.env.DEV) {
    document.body.innerHTML = `
      <div style="padding: 2rem; text-align: center; font-family: sans-serif; max-width: 600px; margin: 2rem auto;">
        <h1 style="color: #dc2626;">Configuration Error</h1>
        <p style="color: #6b7280; margin: 1rem 0;">The application is not properly configured.</p>
        <p style="color: #6b7280;">Please contact support if this issue persists.</p>
      </div>
    `;
  }
  throw error;
}
```

### Acceptance Criteria
- ✅ Validation runs on app startup
- ✅ Errors handled gracefully
- ✅ Development errors are visible
- ✅ Production shows user-friendly error

---

## Task 4.3: Create Edge Function Environment Validation

**File**: `supabase/functions/_shared/envValidation.ts` (new file)

### Actions
- [ ] Create shared validation utility for edge functions
- [ ] Define required environment variables
- [ ] Add validation function
- [ ] Helper for webhook functions

### Code to Create

```typescript
// supabase/functions/_shared/envValidation.ts
interface EdgeFunctionEnv {
  SUPABASE_URL: string;
  SUPABASE_SERVICE_ROLE_KEY: string;
  // Webhook secrets (optional, but validated if webhook function)
  CALLSCALER_WEBHOOK_SECRET?: string;
  INSIGHTO_WEBHOOK_SECRET?: string;
  SMSIT_WEBHOOK_SECRET?: string;
  SUITEDASH_WEBHOOK_SECRET?: string;
  // API keys (optional, but validated if used)
  SMSIT_API_KEY?: string;
  WBIZTOOL_API_KEY?: string;
  SUITEDASH_API_KEY?: string;
  STRIPE_SECRET_KEY?: string;
}

export function validateEdgeEnv(required: (keyof EdgeFunctionEnv)[]): EdgeFunctionEnv {
  const missing: string[] = [];
  const env: Partial<EdgeFunctionEnv> = {};
  
  // Always required
  const alwaysRequired: (keyof EdgeFunctionEnv)[] = [
    'SUPABASE_URL',
    'SUPABASE_SERVICE_ROLE_KEY'
  ];
  
  const allRequired = [...alwaysRequired, ...required];
  
  for (const envVar of allRequired) {
    const value = Deno.env.get(envVar);
    if (!value) {
      missing.push(envVar);
    } else {
      env[envVar] = value as EdgeFunctionEnv[keyof EdgeFunctionEnv];
    }
  }
  
  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(', ')}\n` +
      `Please set these in your Supabase project settings.\n` +
      `Go to: Project Settings > Edge Functions > Secrets`
    );
  }
  
  return env as EdgeFunctionEnv;
}

// Helper for webhook functions
export function validateWebhookEnv(webhookName: string): EdgeFunctionEnv {
  const webhookSecretMap: Record<string, keyof EdgeFunctionEnv> = {
    'callscaler': 'CALLSCALER_WEBHOOK_SECRET',
    'insighto': 'INSIGHTO_WEBHOOK_SECRET',
    'smsit': 'SMSIT_WEBHOOK_SECRET',
    'suitedash': 'SUITEDASH_WEBHOOK_SECRET'
  };
  
  const webhookSecret = webhookSecretMap[webhookName.toLowerCase()];
  const required = webhookSecret ? [webhookSecret] : [];
  
  return validateEdgeEnv(required);
}

// Helper for API key functions
export function validateApiKeyEnv(apiKeyName: string): EdgeFunctionEnv {
  const apiKeyMap: Record<string, keyof EdgeFunctionEnv> = {
    'smsit': 'SMSIT_API_KEY',
    'wbiztool': 'WBIZTOOL_API_KEY',
    'suitedash': 'SUITEDASH_API_KEY',
    'stripe': 'STRIPE_SECRET_KEY'
  };
  
  const apiKey = apiKeyMap[apiKeyName.toLowerCase()];
  const required = apiKey ? [apiKey] : [];
  
  return validateEdgeEnv(required);
}
```

### Acceptance Criteria
- ✅ Validation utility works
- ✅ Can be imported by all edge functions
- ✅ Clear error messages
- ✅ Helpers for common patterns

---

## Task 4.4: Update Edge Functions to Use Validation

### Priority Functions:
- [ ] `supabase/functions/callscaler-webhook/index.ts`
- [ ] `supabase/functions/insighto-webhook/index.ts`
- [ ] `supabase/functions/smsit-webhook/index.ts`
- [ ] `supabase/functions/suitedash-webhook/index.ts`
- [ ] `supabase/functions/create-payment-secure/index.ts`
- [ ] `supabase/functions/smsit-sync/index.ts`
- [ ] `supabase/functions/suitedash-contact-sync/index.ts`

### Actions
- [ ] Import validation utility
- [ ] Call validation at function start
- [ ] Handle validation errors

### Example

```typescript
// At top of edge function
import { validateWebhookEnv } from '../_shared/envValidation.ts';

Deno.serve(async (req) => {
  try {
    // Validate environment
    const env = validateWebhookEnv('callscaler');
    
    // Rest of function...
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ 
        error: 'Configuration error',
        message: errorMessage 
      }),
      { 
        status: 500, 
        headers: { 'Content-Type': 'application/json' } 
      }
    );
  }
});
```

### Acceptance Criteria
- ✅ All edge functions validate env vars
- ✅ Errors returned properly
- ✅ No runtime env errors
- ✅ Clear error messages

---

## Task 4.5: Create/Update .env.example

**File**: `.env.example` (root directory)

### Actions
- [ ] List all required variables
- [ ] List all optional variables
- [ ] Add comments explaining each variable
- [ ] Add example values (not real secrets)

### Example Content

```bash
# ============================================
# Required Environment Variables
# ============================================

# Supabase Configuration
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your-publishable-key-here

# ============================================
# Optional Environment Variables
# ============================================

# Cloudflare Turnstile (CAPTCHA)
# Get from: https://developers.cloudflare.com/turnstile/
VITE_CLOUDFLARE_TURNSTILE_SITE_KEY=your-site-key-here

# Sentry Error Tracking
# Get from: https://sentry.io/
VITE_SENTRY_DSN=https://your-sentry-dsn@sentry.io/project-id

# Google Analytics
# Get from: https://analytics.google.com/
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Email Service (Resend)
# Get from: https://resend.com/
VITE_RESEND_API_KEY=re_your_api_key_here

# ============================================
# Edge Function Secrets (Set in Supabase Dashboard)
# ============================================
# Go to: Project Settings > Edge Functions > Secrets
#
# SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
# CALLSCALER_WEBHOOK_SECRET=your-webhook-secret
# INSIGHTO_WEBHOOK_SECRET=your-webhook-secret
# SMSIT_WEBHOOK_SECRET=your-webhook-secret
# SUITEDASH_WEBHOOK_SECRET=your-webhook-secret
# SMSIT_API_KEY=your-api-key
# WBIZTOOL_API_KEY=your-api-key
# SUITEDASH_API_KEY=your-api-key
# STRIPE_SECRET_KEY=your-stripe-secret-key
```

### Acceptance Criteria
- ✅ All variables documented
- ✅ Clear comments
- ✅ Example values provided
- ✅ Instructions for where to get values

---

## Task 4.6: Add Validation Tests

**File**: `src/utils/envValidation.test.ts` (new file)

### Test Cases
- [ ] Validates required variables
- [ ] Throws error on missing variables
- [ ] Returns config object when valid
- [ ] Warns about optional variables in dev
- [ ] Handles edge cases

### Example Test

```typescript
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { validateClientEnv, getEnvConfig } from './envValidation';

describe('envValidation', () => {
  beforeEach(() => {
    // Reset env vars
    vi.stubEnv('VITE_SUPABASE_URL', 'https://test.supabase.co');
    vi.stubEnv('VITE_SUPABASE_PUBLISHABLE_KEY', 'test-key');
  });

  it('should validate required variables', () => {
    expect(() => validateClientEnv()).not.toThrow();
  });

  it('should throw error on missing required variables', () => {
    vi.stubEnv('VITE_SUPABASE_URL', '');
    expect(() => validateClientEnv()).toThrow('Missing required');
  });

  it('should return config object when valid', () => {
    const config = getEnvConfig();
    expect(config.VITE_SUPABASE_URL).toBe('https://test.supabase.co');
  });
});
```

### Acceptance Criteria
- ✅ Tests pass
- ✅ Edge cases covered
- ✅ Error messages tested

---

## Success Criteria

- ✅ Client-side validation runs on startup
- ✅ Edge function validation runs on function call
- ✅ Clear error messages for missing variables
- ✅ .env.example file complete
- ✅ Tests written and passing
- ✅ No runtime configuration errors

---

## Notes

- Client-side validation should run early (in `main.tsx`)
- Edge function validation should run at function start
- Error messages should be helpful and actionable
- Production errors should be user-friendly
- Development errors should be detailed

