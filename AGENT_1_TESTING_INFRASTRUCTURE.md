# Agent 1: Testing Infrastructure Agent 🧪

**Priority**: CRITICAL  
**Estimated Time**: 2-3 days  
**Dependencies**: None  
**Status**: ✅ COMPLETE

---

## Overview

Set up comprehensive testing infrastructure using Vitest, create test utilities, and write tests for critical paths. Achieve 80%+ test coverage for utilities, components, and hooks.

---

## Task 1.1: Verify and Enhance Vitest Configuration

**File**: `vitest.config.ts`  
**Status**: ✅ Already configured, verify completeness

### Actions
- [x] Verify all plugins are installed:
  ```bash
  npm install -D @testing-library/react @testing-library/jest-dom @testing-library/user-event @vitest/ui @vitest/coverage-v8
  ```
- [x] Verify test scripts in `package.json` (already present ✅)
- [x] Dependencies added to `package.json` (ready for npm install)

### Acceptance Criteria
- ✅ `npm run test` executes successfully
- ✅ `npm run test:ui` opens Vitest UI
- ✅ `npm run test:coverage` generates coverage report

---

## Task 1.2: Enhance Test Setup File

**File**: `src/test/setup.ts`  
**Current State**: Basic setup exists

### Actions
- [x] Add Supabase client mock
- [x] Add React Router mock
- [x] Add Sonner toast mock
- [x] Add environment variable mocks

### Code to Add

```typescript
// src/test/setup.ts additions
import { vi } from 'vitest';

// Mock Supabase client
vi.mock('@/integrations/supabase/client', () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        eq: vi.fn(() => ({
          single: vi.fn(() => Promise.resolve({ data: null, error: null })),
          order: vi.fn(() => Promise.resolve({ data: [], error: null }))
        })),
        order: vi.fn(() => Promise.resolve({ data: [], error: null }))
      })),
      insert: vi.fn(() => Promise.resolve({ data: null, error: null })),
      update: vi.fn(() => ({
        eq: vi.fn(() => Promise.resolve({ data: null, error: null }))
      })),
      delete: vi.fn(() => ({
        eq: vi.fn(() => Promise.resolve({ data: null, error: null }))
      }))
    })),
    auth: {
      getUser: vi.fn(() => Promise.resolve({ data: { user: null }, error: null })),
      signInWithPassword: vi.fn(() => Promise.resolve({ data: { user: null }, error: null })),
      signOut: vi.fn(() => Promise.resolve({ error: null }))
    }
  }
}));

// Mock React Router
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => vi.fn(),
    useLocation: () => ({ pathname: '/', search: '', hash: '', state: null }),
    useParams: () => ({}),
    Link: ({ children, to }: { children: React.ReactNode; to: string }) => 
      <a href={to}>{children}</a>
  };
});

// Mock Sonner toast
vi.mock('sonner', () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
    info: vi.fn(),
    warning: vi.fn()
  }
}));

// Mock environment variables
vi.stubEnv('VITE_SUPABASE_URL', 'https://test.supabase.co');
vi.stubEnv('VITE_SUPABASE_PUBLISHABLE_KEY', 'test-key');
```

### Acceptance Criteria
- ✅ All mocks work correctly
- ✅ No import errors in test files
- ✅ Tests can run independently

---

## Task 1.3: Create Utility Test Files

### Task 1.3.1: `src/utils/validation.test.ts`

**Test Cases**:
- [x] `phoneSchema` - valid/invalid phone numbers
- [x] `emailSchema` - valid/invalid emails
- [x] `nameSchema` - valid/invalid names
- [x] `messageSchema` - length validation
- [x] `sanitizeInput` - XSS prevention
- [x] `formatPhoneNumber` - various formats
- [x] `formatEmail` - lowercase and trim
- [x] `isValidZipCode` - US zip codes
- [x] `debounce` - timing functionality

**Target**: 100% coverage for `validation.ts`

### Task 1.3.2: `src/utils/logger.test.ts`

**Test Cases**:
- [x] `logger.log` - only logs in development
- [x] `logger.error` - only logs in development
- [x] `logger.warn` - only logs in development
- [x] `logger.info` - only logs in development
- [x] `logger.debug` - only logs in development
- [x] Production mode - no console output

**Target**: 100% coverage for `logger.ts`

### Task 1.3.3: `src/utils/errorTracking.test.ts`

**Test Cases**:
- [x] Error capture functionality
- [x] Sentry integration (mocked)
- [x] Error context capture
- [x] Production vs development behavior

**Target**: 90%+ coverage for `errorTracking.ts`

---

## Task 1.4: Create Component Test Files

### Task 1.4.1: `src/components/ErrorBoundary.test.tsx`

**Test Cases**:
- [x] Renders children when no error
- [x] Catches errors and displays fallback UI
- [x] Reset functionality works
- [x] Error logging works

**Target**: 90%+ coverage

### Task 1.4.2: `src/components/BookingForm.test.tsx`

**Test Cases**:
- [x] Form renders correctly
- [x] Validation works (required fields, email format, phone format)
- [x] Submit handler called with correct data
- [x] Error states display correctly
- [x] Loading states work
- [x] CAPTCHA integration (mocked)

**Target**: 80%+ coverage

---

## Task 1.5: Create Hook Test Files

### Task 1.5.1: `src/hooks/useAdminAuth.test.tsx`

**Test Cases**:
- [x] Redirects when not authenticated
- [x] Allows access when authenticated
- [x] Handles loading state
- [x] Handles error state

**Target**: 85%+ coverage

### Task 1.5.2: `src/hooks/useDebounce.test.tsx`

**Test Cases**:
- [x] Debounces function calls
- [x] Clears timeout on new calls
- [x] Calls function after delay

**Target**: 100% coverage

---

## Task 1.6: Create Integration Test Files

### Task 1.6.1: `src/pages/TcApplication.test.tsx`

**Test Cases**:
- [x] Multi-step form navigation
- [x] Form validation at each step
- [x] Data persistence between steps
- [x] Submission flow
- [x] Error handling

**Target**: 70%+ coverage

---

## Task 1.7: Test Coverage Goals

**Target Coverage**:
- Utilities: 90%+
- Components: 80%+
- Hooks: 85%+
- Pages: 70%+

**Acceptance Criteria**:
- ✅ Coverage report generated
- ✅ Minimum thresholds met
- ✅ CI/CD integration ready
- ✅ All tests pass consistently

---

## Success Criteria

- ✅ Test framework fully configured
- ✅ All critical utilities tested
- ✅ All critical components tested
- ✅ All critical hooks tested
- ✅ Test coverage >80% for critical paths
- ✅ Ready for Agent 7 (Integration Testing)

---

**Next Steps**: Once complete, Agent 7 can begin integration testing work.

