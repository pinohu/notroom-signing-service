# Agent 2: TypeScript Type Safety Agent 🔷

**Priority**: HIGH  
**Estimated Time**: 2-3 days  
**Dependencies**: None  
**Status**: ✅ **COMPLETE**

---

## Overview

Eliminate all 39 instances of `any` types and improve type safety across the codebase. Ensure all code compiles in TypeScript strict mode.

---

## Task 2.1: Fix Admin Component `any` Types

### Task 2.1.1: `src/pages/admin/TcClients.tsx`
**Current State**: ✅ Already uses `TcClientStatusUpdate` type (line 101)  
**Action**: Verify no other `any` types exist
- [x] Search for `: any` or `as any`
- [x] Verify all types are properly defined
- [x] Fixed error handlers to use `unknown` type

### Task 2.1.2: `src/pages/admin/CropApplications.tsx`
**Action**: Find and fix `any` types
- [x] Search for `const updates: any`
- [x] Create proper interface (already using `CropApplicationStatusUpdate`)

**Code to Add**:
```typescript
// Add to src/types/admin.ts or create new interface
interface CropApplicationStatusUpdate {
  status: 'pending' | 'active' | 'completed' | 'cancelled';
  updated_at: string;
  started_at?: string;
  completed_at?: string;
  cancelled_at?: string;
}
```

**Replace**:
```typescript
// Before:
const updates: any = { status, updated_at: new Date().toISOString() };

// After:
const updates: CropApplicationStatusUpdate = { 
  status: status as CropApplicationStatusUpdate['status'], 
  updated_at: new Date().toISOString() 
};
```

**Acceptance Criteria**:
- ✅ No `any` types in file
- ✅ TypeScript compiles without errors
- ✅ All status updates properly typed

---

### Task 2.1.3: `src/pages/admin/CallScaler.tsx`
**Lines**: 38, 74, 121, 143  
**Actions**:
- [x] Line 38: Type `metadata` property properly (using `CallEventMetadata` interface)
- [x] Lines 74, 121: Type error handlers properly (using `unknown` type)
- [x] Line 143: Type filter callback properly (using `number` type)

**Code Fixes**:
```typescript
// Line 38 - Create interface for metadata
interface CallScalerMetadata {
  [key: string]: string | number | boolean | null;
}

// Replace:
metadata?: any;
// With:
metadata?: CallScalerMetadata;

// Lines 74, 121 - Type error properly
catch (error: unknown) {
  const errorMessage = error instanceof Error ? error.message : 'Unknown error';
  logger.error('Error:', errorMessage);
}

// Line 143 - Type filter callback
const updatedPool = config.number_pool.filter((_, i: number) => i !== index);
```

**Acceptance Criteria**:
- ✅ All `any` types removed
- ✅ Proper error typing
- ✅ TypeScript strict mode passes

---

### Task 2.1.4: `src/pages/admin/Bookings.tsx`
**Lines**: 60, 99  
**Actions**:
- [x] Type error handlers properly (already using `unknown` type)

**Code Fix**:
```typescript
// Replace:
catch (error: any) {
  logger.error('Error:', error);
}

// With:
catch (error: unknown) {
  const errorMessage = error instanceof Error ? error.message : 'Unknown error';
  logger.error('Error fetching bookings:', errorMessage);
  toast.error('Failed to load bookings');
}
```

**Acceptance Criteria**:
- ✅ Error handling properly typed
- ✅ No `any` types

---

### Task 2.1.5: `src/pages/admin/AutomationFlows.tsx`
**Lines**: 76, 108, 153  
**Actions**:
- [x] Type all error handlers (already using `unknown` type)

**Code Fix**:
```typescript
catch (error: unknown) {
  const errorMessage = error instanceof Error ? error.message : 'Unknown error';
  logger.error('Error:', errorMessage);
  toast.error('Operation failed');
}
```

**Acceptance Criteria**:
- ✅ All error handlers typed
- ✅ Consistent error handling pattern

---

### Task 2.1.6: `src/pages/admin/WhatsAppConfig.tsx`
**Lines**: 50, 94  
**Actions**:
- [x] Type error handlers (already using `unknown` type)

**Acceptance Criteria**:
- ✅ Consistent with other admin files

---

### Task 2.1.7: `src/pages/admin/Login.tsx`
**Line**: 45  
**Actions**:
- [x] Type error handler (already using `unknown` type)

**Acceptance Criteria**:
- ✅ Proper error typing

---

## Task 2.2: Fix Client Component `any` Types

### Task 2.2.1: `src/pages/TcApplication.tsx`
**Line**: Error handler  
**Actions**:
- [x] Type error handler properly (verified - no `any` types found)

**Acceptance Criteria**:
- ✅ Error handling typed

---

### Task 2.2.2: `src/pages/CropApplication.tsx`
**Line**: Error handler  
**Actions**:
- [x] Type error handler (verified - no `any` types found)

**Acceptance Criteria**:
- ✅ Consistent error typing

---

## Task 2.3: Fix Utility File `any` Types

### Task 2.3.1: `src/utils/webVitals.ts`
**Lines**: Window object extensions  
**Actions**:
- [x] Create proper type definitions (already defined in `src/types/global.d.ts`)

**Code Fix**:
```typescript
// Add to src/types/global.d.ts or create new file
interface Window {
  gtag?: (
    command: string,
    targetId: string,
    config?: Record<string, unknown>
  ) => void;
  dataLayer?: unknown[];
}

// Replace:
(window as any).gtag
// With:
window.gtag?.('event', 'web_vitals', { ... });
```

**Acceptance Criteria**:
- ✅ Window extensions properly typed
- ✅ No `as any` casts

---

### Task 2.3.2: `src/utils/analytics.ts`
**Lines**: 4 instances  
**Actions**:
- [x] Type window.gtag properly (using global type definition)
- [x] Type all function parameters (using `EventProperties` interface)

**Acceptance Criteria**:
- ✅ All window extensions typed
- ✅ No `any` types

---

### Task 2.3.3: `src/components/BookingForm.tsx`
**Lines**: 6 instances  
**Actions**:
- [x] Type window.gtag (using global type definition)
- [x] Type Cloudflare Turnstile types (already defined in `src/types/global.d.ts`)

**Code Fix**:
```typescript
// Add Cloudflare Turnstile types
interface Turnstile {
  render: (element: string | HTMLElement, options: {
    sitekey: string;
    callback?: (token: string) => void;
    'error-callback'?: () => void;
  }) => string;
  reset: (widgetId: string) => void;
  remove: (widgetId: string) => void;
}

declare global {
  interface Window {
    turnstile?: Turnstile;
  }
}
```

**Acceptance Criteria**:
- ✅ All window extensions typed
- ✅ Cloudflare types defined

---

## Task 2.4: Fix Context `any` Types

### Task 2.4.1: `src/contexts/AuthContext.tsx`
**Lines**: 7 instances  
**Actions**:
- [x] Type all function parameters (all properly typed)
- [x] Create proper interfaces for auth state (using `AuthContextType`, `UserMetadata`, `ProfileUpdateData`)

**Code Fix**:
```typescript
// Create interfaces
interface AuthUser {
  id: string;
  email: string;
  // ... other user properties
}

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  // ... other methods
}

// Type all function parameters
const signIn = async (email: string, password: string): Promise<void> => {
  // Implementation
};
```

**Acceptance Criteria**:
- ✅ All context methods typed
- ✅ No `any` parameters
- ✅ TypeScript strict mode passes

---

## Task 2.5: Verify All `any` Types Removed
**Action**: Run comprehensive search
```bash
# Search for remaining any types
grep -r ": any" src/
grep -r "as any" src/
```

**Acceptance Criteria**:
- ✅ Zero `any` types in client code (except acceptable error handlers with `unknown`)
- ✅ All files compile in strict mode
- ✅ No type errors
- ✅ All error handlers use `unknown` instead of `any`

---

## Success Criteria

- ✅ All 39 `any` types eliminated
- ✅ All code compiles in TypeScript strict mode
- ✅ Proper error typing throughout
- ✅ Window object extensions properly typed
- ✅ Context and hooks properly typed
- ✅ No type safety compromises

---

**Note**: Error handlers should use `unknown` type, not `any`, and check with `instanceof Error` before accessing properties.

