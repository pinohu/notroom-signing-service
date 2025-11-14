# Agent 3: Code Quality & Logging Agent 📝

**Priority**: MEDIUM  
**Estimated Time**: 2-3 days  
**Dependencies**: None  
**Status**: ✅ **COMPLETE**

---

## Overview

Replace 287 console.log/error/warn statements in client code with logger utility. Keep console statements in edge functions (server-side acceptable).

---

## Task 3.1: Replace Console Statements in Core Utility Files

### Files:
- `src/utils/webVitals.ts` (3 instances)
- `src/utils/errorTracking.ts` (4 instances)
- `src/utils/pwa.ts` (3 instances)
- `src/utils/analytics.ts` (check for console statements)
- `src/utils/distanceCalculation.ts` (check)
- `src/utils/performance.ts` (check)
- `src/utils/removeBackground.ts` (check)

**Actions**:
- [x] Add `import { logger } from '@/utils/logger'` at top of file
- [x] Replace `console.log` → `logger.log`
- [x] Replace `console.error` → `logger.error`
- [x] Replace `console.warn` → `logger.warn`
- [x] Replace `console.info` → `logger.info`
- [x] Replace `console.debug` → `logger.debug`

**Example**:
```typescript
// Before:
console.log('Web vitals:', metric);

// After:
import { logger } from '@/utils/logger';
logger.log('Web vitals:', metric);
```

**Acceptance Criteria**:
- ✅ All console statements replaced
- ✅ Logger imported correctly
- ✅ No console statements in utility files

---

## Task 3.2: Replace Console Statements in Page Components

### Files:
- `src/pages/TcApplication.tsx` (1 instance)
- `src/pages/TcApplicationSuccess.tsx` (2 instances)
- `src/pages/CropApplication.tsx` (1 instance)
- `src/pages/CropApplicationSuccess.tsx` (check)
- `src/pages/ClientPortal.tsx` (3 instances)
- `src/pages/NotFound.tsx` (1 instance)
- `src/pages/TrackBooking.tsx` (check)
- `src/pages/ProcessPanBadge.tsx` (check)
- `src/pages/LogoProcessor.tsx` (check)
- `src/pages/AllBadgesProcessor.tsx` (check)
- `src/pages/BadgeProcessor.tsx` (check)

**Actions**:
- [x] Add logger import at top of file
- [x] Replace all console statements
- [x] Verify error handling still works

**Example**:
```typescript
// Add import
import { logger } from '@/utils/logger';

// Replace
console.error('Error:', error);
// With
logger.error('Error:', error);
```

**Acceptance Criteria**:
- ✅ All pages updated
- ✅ Error logging still functional
- ✅ No console statements remain

---

## Task 3.3: Replace Console Statements in Admin Pages

### Files:
- `src/pages/admin/TcClients.tsx` (verify - should already use logger)
- `src/pages/admin/CropApplications.tsx` (verify - should already use logger)
- `src/pages/admin/Bookings.tsx` (check)
- `src/pages/admin/AutomationFlows.tsx` (check)
- `src/pages/admin/WhatsAppConfig.tsx` (check)
- `src/pages/admin/VoiceAgent.tsx` (check)

**Actions**:
- [x] Verify logger is already imported (should be)
- [x] Replace any remaining console statements (fixed `PerformanceDashboard.tsx`)
- [x] Ensure consistent logging pattern

**Acceptance Criteria**:
- ✅ All admin pages use logger
- ✅ Consistent error logging

---

## Task 3.4: Replace Console Statements in Components

### Files:
- `src/components/FeedbackWidget.tsx` (2 instances)
- `src/components/ErrorBoundary.tsx` (check)
- `src/components/BookingForm.tsx` (check)

**Actions**:
- [x] Replace console statements (verified - no console statements found)
- [x] Add logger import if missing

**Acceptance Criteria**:
- ✅ Components use logger
- ✅ No console statements

---

## Task 3.5: Replace Console Statements in Hooks

### Files:
- `src/hooks/useAdminAuth.tsx` (1 instance)
- `src/hooks/useLocalStorage.tsx` (check)

**Actions**:
- [x] Replace console statements (verified - no console statements found)
- [x] Add logger import

**Acceptance Criteria**:
- ✅ Hooks use logger
- ✅ No console statements

---

## Task 3.6: Replace Console Statements in Contexts

### Files:
- `src/contexts/AuthContext.tsx` (check)

**Actions**:
- [x] Replace console statements (verified - no console statements found)
- [x] Add logger import

**Acceptance Criteria**:
- ✅ Context uses logger
- ✅ No console statements

---

## Task 3.7: Replace Console Statements in Main Entry Point

### Files:
- `src/main.tsx` (2 instances)

**Actions**:
- [x] Replace `console.warn` with `logger.warn` (verified - no console statements found)
- [x] Add logger import

**Acceptance Criteria**:
- ✅ Main entry uses logger
- ✅ No console statements

---

## Task 3.8: Verify Edge Functions Keep Console Logging

**Action**: Verify edge functions still use `console.*` (acceptable for server-side)  
**Files**: `supabase/functions/**/*.ts`

**Note**: Edge functions SHOULD keep console statements - this is correct for server-side logging.

**Acceptance Criteria**:
- ✅ Edge functions still use console (correct)
- ✅ Client code uses logger (correct)

---

## Task 3.9: Final Verification

**Action**: Search for remaining console statements
```bash
# Search client code only
grep -r "console\." src/ --exclude-dir=node_modules
```

**Expected Result**: Zero matches in `src/` directory

**Acceptance Criteria**:
- ✅ Zero console statements in `src/` directory (except logger.ts and test comments)
- ✅ All use `logger.*` instead
- ✅ Edge functions still use console (acceptable)
- ✅ Logger utility works correctly in all scenarios

---

## Success Criteria

- ✅ All 287 console statements replaced in client code
- ✅ Logger utility used consistently
- ✅ Production-safe logging (no console output in production)
- ✅ Edge functions still use console (correct)
- ✅ No console statements in `src/` directory
- ✅ All error logging functional

---

## Notes

- The `logger` utility is already implemented in `src/utils/logger.ts`
- Logger only outputs in development mode (production-safe)
- Edge functions in `supabase/functions/` should KEEP console statements
- Focus on client-side code in `src/` directory only

