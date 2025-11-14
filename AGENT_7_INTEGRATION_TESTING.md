# Agent 7: Integration Testing Agent 🔗

**Priority**: MEDIUM  
**Estimated Time**: 3-4 days  
**Dependencies**: Agent 1 (Testing Infrastructure) must be complete  
**Status**: ✅ COMPLETE

---

## Overview

Create comprehensive integration and E2E tests for critical user flows. Requires test infrastructure from Agent 1.

---

## Prerequisites

- ✅ Agent 1 complete (test infrastructure ready)
- ✅ All mocks configured
- ✅ Test utilities available
- ✅ Test database or test Supabase project configured

---

## Task 7.1: Set Up Integration Test Environment

### Actions
- [x] Configure test database (or use test Supabase project)
- [x] Set up test API keys (mock or test keys)
- [x] Create test fixtures
- [x] Set up test cleanup (beforeEach/afterEach)
- [x] Configure test data seeding

### Test Database Setup

```typescript
// src/test/integration/setup.ts
import { createClient } from '@supabase/supabase-js';

const testSupabaseUrl = import.meta.env.VITE_TEST_SUPABASE_URL || 'https://test.supabase.co';
const testSupabaseKey = import.meta.env.VITE_TEST_SUPABASE_KEY || 'test-key';

export const testSupabase = createClient(testSupabaseUrl, testSupabaseKey);

export async function cleanupTestData() {
  // Clean up test data after each test
  await testSupabase.from('bookings').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  await testSupabase.from('tc_clients').delete().neq('id', '00000000-0000-0000-0000-000000000000');
  // ... other tables
}
```

### Acceptance Criteria
- ✅ Test environment isolated
- ✅ Can run tests independently
- ✅ Cleanup works correctly
- ✅ Test data doesn't affect production

---

## Task 7.2: Test Booking Flow End-to-End

**File**: `src/test/integration/BookingFlow.test.tsx` (integration test)

### Test Cases
- [x] User fills out booking form
- [x] Form validation works (required fields, email format, phone format)
- [x] CAPTCHA verification (mocked)
- [x] Payment processing (mocked)
- [x] Booking created in database
- [x] Confirmation email sent (mocked)
- [x] SMS sent (mocked)
- [x] SuiteDash sync (mocked)
- [x] SMS-iT sync (mocked)
- [x] Success page displays
- [x] Error handling works

### Example Test Structure

```typescript
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BookingForm } from '@/components/BookingForm';

describe('Booking Flow Integration', () => {
  beforeEach(() => {
    // Setup mocks
    vi.clearAllMocks();
  });

  it('should complete full booking flow', async () => {
    const user = userEvent.setup();
    
    // Render form
    render(<BookingForm />);
    
    // Fill out form
    await user.type(screen.getByLabelText(/email/i), 'test@example.com');
    await user.type(screen.getByLabelText(/phone/i), '1234567890');
    // ... fill other fields
    
    // Submit form
    await user.click(screen.getByRole('button', { name: /submit/i }));
    
    // Wait for booking creation
    await waitFor(() => {
      expect(screen.getByText(/booking confirmed/i)).toBeInTheDocument();
    });
    
    // Verify database entry (mocked)
    // Verify email sent (mocked)
    // Verify SMS sent (mocked)
  });
});
```

### Acceptance Criteria
- ✅ Complete flow tested
- ✅ All integrations mocked properly
- ✅ Edge cases covered
- ✅ Error scenarios tested

---

## Task 7.3: Test TC Application Flow

**File**: `src/test/integration/TcApplicationFlow.test.tsx` (integration test)

### Test Cases
- [x] Multi-step form navigation
- [x] Data validation at each step
- [x] Data persistence between steps
- [x] Payment processing (mocked)
- [x] Application saved to database
- [x] Confirmation email sent (mocked)
- [x] Admin notification (if applicable)
- [x] Success page displays
- [x] Error handling works

### Test Structure

```typescript
describe('TC Application Flow Integration', () => {
  it('should complete multi-step TC application', async () => {
    const user = userEvent.setup();
    
    render(<TcApplication />);
    
    // Step 1: Client Information
    await user.type(screen.getByLabelText(/name/i), 'John Doe');
    await user.type(screen.getByLabelText(/email/i), 'john@example.com');
    await user.click(screen.getByRole('button', { name: /next/i }));
    
    // Step 2: Transaction Details
    // ... fill transaction details
    await user.click(screen.getByRole('button', { name: /next/i }));
    
    // Step 3: Plan Selection
    await user.click(screen.getByLabelText(/standard plan/i));
    await user.click(screen.getByRole('button', { name: /submit/i }));
    
    // Verify success
    await waitFor(() => {
      expect(screen.getByText(/application submitted/i)).toBeInTheDocument();
    });
  });
});
```

### Acceptance Criteria
- ✅ Complete TC flow tested
- ✅ All steps work together
- ✅ Error scenarios handled
- ✅ Payment flow tested

---

## Task 7.4: Test CROP Application Flow

**File**: `src/test/integration/CropApplicationFlow.test.tsx` (integration test)

### Test Cases
- [x] Similar to TC application flow
- [x] CROP-specific validation
- [x] Payment processing
- [x] Database updates
- [x] Email notifications
- [x] Success page

### Acceptance Criteria
- ✅ Complete CROP flow tested
- ✅ All integrations work
- ✅ Error handling works

---

## Task 7.5: Test Admin Dashboard Flows

**Files**: `src/test/integration/AdminDashboardFlow.test.tsx`

### Test Cases

#### Admin Login Flow
- [x] Login with valid credentials
- [x] Login with invalid credentials
- [x] Redirect after login
- [x] Session persistence

#### View Bookings List
- [x] Load bookings
- [x] Filter bookings
- [x] Sort bookings
- [x] Pagination works

#### Update Booking Status
- [x] Update status to confirmed
- [x] Update status to completed
- [x] Update status to cancelled
- [x] Bulk status updates

#### View TC Clients
- [x] Load TC clients
- [x] Filter by status
- [x] View client details
- [x] Update client status

#### View CROP Applications
- [x] Load CROP applications
- [x] Filter applications
- [x] View application details
- [x] Update application status

#### Bulk Operations
- [x] Select multiple items
- [x] Bulk update status
- [x] Bulk delete (if applicable)

### Acceptance Criteria
- ✅ Admin flows tested
- ✅ Authentication works
- ✅ CRUD operations work
- ✅ Bulk operations work

---

## Task 7.6: Test Webhook Integrations

**Files**: `src/test/integration/WebhookIntegration.test.ts`

### Test Cases

#### CallScaler Webhook
- [x] Receives webhook data
- [x] Validates signature
- [x] Processes webhook
- [x] Updates database
- [x] Handles invalid signature
- [x] Handles malformed data

#### Insighto Webhook
- [x] Receives webhook data
- [x] Validates signature
- [x] Processes webhook
- [x] Updates database

#### SMS-iT Webhook
- [x] Receives webhook data
- [x] Validates signature
- [x] Processes webhook
- [x] Updates database

#### SuiteDash Webhook
- [x] Receives webhook data
- [x] Validates signature
- [x] Processes webhook
- [x] Updates database

### Test Structure

```typescript
describe('Webhook Integration Tests', () => {
  it('should process CallScaler webhook', async () => {
    const webhookPayload = {
      // Test payload
    };
    
    const signature = generateSignature(webhookPayload);
    
    const response = await fetch('/api/webhooks/callscaler', {
      method: 'POST',
      headers: {
        'x-callscaler-signature': signature,
        'content-type': 'application/json'
      },
      body: JSON.stringify(webhookPayload)
    });
    
    expect(response.status).toBe(200);
    // Verify database updates
  });
});
```

### Acceptance Criteria
- ✅ Webhooks tested (mocked)
- ✅ Signature verification works
- ✅ Error handling works
- ✅ Database updates verified

---

## Task 7.7: Test Authentication Flows

**Files**: `src/test/integration/AuthFlow.test.tsx`

### Test Cases

#### User Login
- [x] Login with valid credentials
- [x] Login with invalid credentials
- [x] Redirect after login
- [x] Session persistence

#### User Signup
- [x] Signup with valid data
- [x] Signup with invalid data
- [x] Email verification flow
- [x] Redirect after signup

#### Admin Login
- [x] Admin login flow
- [x] Admin authentication
- [x] Admin session

#### Logout
- [x] Logout clears session
- [x] Redirect after logout
- [x] Protected routes inaccessible

#### Protected Routes
- [x] Redirects when not authenticated
- [x] Allows access when authenticated
- [x] Admin routes protected

#### Session Management
- [x] Session refresh
- [x] Session expiration
- [x] Multiple tabs

### Acceptance Criteria
- ✅ Auth flows tested
- ✅ Security verified
- ✅ Edge cases handled
- ✅ Session management works

---

## Task 7.8: Test Coverage Goals

### Target Coverage
- Integration tests: 70%+ of critical flows ✅
- E2E tests: All critical user journeys ✅
- Webhook tests: All webhook endpoints ✅
- Auth tests: All authentication flows ✅

### Acceptance Criteria
- ✅ Coverage report generated (via `npm run test:coverage`)
- ✅ Minimum thresholds met (70%+ integration coverage)
- ✅ All critical flows tested
- ✅ Tests run in CI/CD (ready for integration)

---

## Success Criteria

- ✅ All integration tests pass
- ✅ E2E flows tested
- ✅ Test coverage >70% (integration tests)
- ✅ Webhooks tested
- ✅ Auth flows tested
- ✅ Admin flows tested
- ✅ Error scenarios covered

## Files Created

1. `src/test/integration/setup.ts` - Integration test setup and fixtures
2. `src/test/integration/BookingFlow.test.tsx` - Booking flow integration tests
3. `src/test/integration/TcApplicationFlow.test.tsx` - TC application flow tests
4. `src/test/integration/CropApplicationFlow.test.tsx` - CROP application flow tests
5. `src/test/integration/AdminDashboardFlow.test.tsx` - Admin dashboard tests
6. `src/test/integration/AuthFlow.test.tsx` - Authentication flow tests
7. `src/test/integration/WebhookIntegration.test.ts` - Webhook integration tests

## Running Tests

```bash
# Run all integration tests
npm run test

# Run integration tests with UI
npm run test:ui

# Generate coverage report
npm run test:coverage
```

---

## Notes

- Use mocks for external services (email, SMS, payment)
- Use test database for database operations
- Clean up test data after each test
- Consider using Playwright for true E2E tests
- Focus on critical user journeys first

