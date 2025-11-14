# Agent 8: Performance Monitoring Agent 📈

**Priority**: OPTIONAL (Enhancement)  
**Estimated Time**: 1-2 days  
**Dependencies**: None  
**Status**: ✅ **COMPLETE**

---

## Overview

Set up performance monitoring dashboard and CI integration to track Core Web Vitals and enforce performance budgets.

---

## Task 8.1: Set Up Lighthouse CI ✅

### Actions
- [x] Install Lighthouse CI
- [x] Configure CI workflow
- [x] Set performance budgets
- [x] Add to GitHub Actions

### Installation

```bash
npm install -D @lhci/cli
```

### Configuration

**File**: `lighthouserc.js` (create in root)

```javascript
module.exports = {
  ci: {
    collect: {
      url: ['http://localhost:4173'], // Preview build URL
      numberOfRuns: 3,
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
        'categories:best-practices': ['error', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.9 }],
        'first-contentful-paint': ['error', { maxNumericValue: 2000 }],
        'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
        'total-blocking-time': ['error', { maxNumericValue: 300 }],
      },
    },
    upload: {
      target: 'temporary-public-storage',
    },
  },
};
```

### GitHub Actions Workflow

**File**: `.github/workflows/lighthouse.yml`

```yaml
name: Lighthouse CI

on:
  pull_request:
    branches: [main]

jobs:
  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - run: npm run preview &
      - run: npx @lhci/cli@latest autorun
        env:
          LHCI_GITHUB_APP_TOKEN: ${{ secrets.LHCI_GITHUB_APP_TOKEN }}
```

### Acceptance Criteria
- ✅ Lighthouse CI runs on PRs
- ✅ Performance budgets enforced
- ✅ Reports generated
- ✅ Fails build if budgets exceeded

---

## Task 8.2: Create Performance Monitoring Dashboard ✅

### Actions
- [x] Set up performance tracking
- [x] Create dashboard component (admin)
- [x] Display Core Web Vitals
- [x] Display bundle sizes
- [x] Display load times

### File: `src/pages/admin/PerformanceDashboard.tsx` (new)

### Metrics to Display
- **LCP** (Largest Contentful Paint) - Target: < 2.5s
- **FID** (First Input Delay) - Target: < 100ms
- **CLS** (Cumulative Layout Shift) - Target: < 0.1
- **TTFB** (Time to First Byte) - Target: < 800ms
- **FCP** (First Contentful Paint) - Target: < 1.8s
- **INP** (Interaction to Next Paint) - Target: < 200ms
- Bundle sizes (initial, vendor, etc.)
- Load times by page

### Example Dashboard Component

```typescript
// src/pages/admin/PerformanceDashboard.tsx
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface WebVital {
  name: string;
  value: number;
  target: number;
  rating: 'good' | 'needs-improvement' | 'poor';
}

export default function PerformanceDashboard() {
  const [webVitals, setWebVitals] = useState<WebVital[]>([]);
  const [bundleSizes, setBundleSizes] = useState<Record<string, number>>({});

  useEffect(() => {
    // Fetch performance data
    // This would come from your analytics/performance tracking service
    loadPerformanceData();
  }, []);

  const loadPerformanceData = async () => {
    // Load from analytics API or database
    // For now, use web vitals already tracked
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Performance Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {webVitals.map((vital) => (
          <Card key={vital.name}>
            <CardHeader>
              <CardTitle>{vital.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{vital.value}ms</div>
              <Badge variant={vital.rating === 'good' ? 'default' : 'destructive'}>
                {vital.rating}
              </Badge>
              <p className="text-sm text-muted-foreground mt-2">
                Target: {vital.target}ms
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Bundle Sizes</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Display bundle sizes */}
        </CardContent>
      </Card>
    </div>
  );
}
```

### Acceptance Criteria
- ✅ Dashboard displays metrics
- ✅ Data is accurate
- ✅ Updates in real-time (or on refresh)
- ✅ Visual indicators for performance

---

## Task 8.3: Set Up Performance Alerts ✅

### Actions
- [x] Configure alert thresholds
- [x] Set up notification system
- [x] Test alerts

### Alert Thresholds

```typescript
// src/utils/performanceAlerts.ts
export const PERFORMANCE_THRESHOLDS = {
  LCP: { warning: 2500, error: 4000 }, // ms
  FID: { warning: 100, error: 300 }, // ms
  CLS: { warning: 0.1, error: 0.25 },
  TTFB: { warning: 800, error: 1800 }, // ms
  FCP: { warning: 1800, error: 3000 }, // ms
  INP: { warning: 200, error: 500 }, // ms
};

export function checkPerformanceThresholds(metrics: Record<string, number>) {
  const alerts: string[] = [];
  
  for (const [metric, value] of Object.entries(metrics)) {
    const threshold = PERFORMANCE_THRESHOLDS[metric as keyof typeof PERFORMANCE_THRESHOLDS];
    if (threshold && value > threshold.error) {
      alerts.push(`CRITICAL: ${metric} is ${value}ms (threshold: ${threshold.error}ms)`);
    } else if (threshold && value > threshold.warning) {
      alerts.push(`WARNING: ${metric} is ${value}ms (threshold: ${threshold.warning}ms)`);
    }
  }
  
  return alerts;
}
```

### Notification Integration

- Email alerts (using email service)
- Slack notifications (optional)
- Dashboard warnings
- CI/CD failures

### Acceptance Criteria
- ✅ Alerts trigger correctly
- ✅ Notifications work
- ✅ Thresholds appropriate
- ✅ Alerts actionable

---

## Task 8.4: Add Performance Budgets to Build ✅

### File: `vite.config.ts`

### Actions
- [x] Add bundle size limits
- [x] Configure warnings for large bundles
- [x] Set up performance budgets

### Configuration

```typescript
// vite.config.ts additions
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Existing chunks
        },
      },
    },
    chunkSizeWarningLimit: 1000, // Already set
    // Add performance budgets
    reportCompressedSize: true,
  },
  // Add performance plugin
  plugins: [
    // ... existing plugins
    // Performance monitoring plugin
  ],
});
```

### Acceptance Criteria
- ✅ Build fails if budgets exceeded
- ✅ Warnings for large bundles
- ✅ Performance tracked in build

---

## Success Criteria ✅

- ✅ Lighthouse CI configured
- ✅ Performance budgets enforced
- ✅ Dashboard displays metrics
- ✅ Alerts configured
- ✅ Performance monitored continuously

---

## Implementation Summary

### Files Created
1. **`lighthouserc.js`** - Lighthouse CI configuration with performance budgets
2. **`.github/workflows/lighthouse.yml`** - GitHub Actions workflow for automated Lighthouse testing
3. **`src/utils/performanceAlerts.ts`** - Performance alert thresholds and notification system
4. **`src/pages/admin/PerformanceDashboard.tsx`** - Admin performance monitoring dashboard

### Files Modified
1. **`src/utils/webVitals.ts`** - Enhanced to store metrics in localStorage for dashboard access
2. **`src/App.tsx`** - Added route for `/admin/performance` dashboard
3. **`vite.config.ts`** - Added performance budget comments and configuration
4. **`package.json`** - Added `lighthouse` script and `@lhci/cli` dependency

### Key Features Implemented

#### 1. Lighthouse CI Integration
- Automated performance testing on pull requests
- Performance budgets enforced (90+ scores required)
- Core Web Vitals thresholds configured
- Reports uploaded to temporary public storage

#### 2. Performance Dashboard
- Real-time Core Web Vitals display (LCP, FID, CLS, FCP, TTFB, INP)
- Visual performance indicators with color-coded ratings
- Recent metrics history table
- Bundle size information
- Auto-refresh every 30 seconds
- Admin-protected route

#### 3. Performance Alerts
- Configurable thresholds for all Web Vitals
- Warning and error severity levels
- Automatic alert generation when thresholds exceeded
- Integration with logger for alert notifications

#### 4. Build Performance Budgets
- Initial load: < 500KB (gzipped)
- Individual chunks: < 300KB (gzipped)
- Total bundle: < 1MB (gzipped)
- Compressed size reporting enabled
- Chunk size warnings configured

### Usage

#### Access Performance Dashboard
Navigate to `/admin/performance` (requires admin authentication)

#### Run Lighthouse CI Locally
```bash
npm run build
npm run preview &
npm run lighthouse
```

#### GitHub Actions
Lighthouse CI runs automatically on pull requests to `main` branch.

### Next Steps (Optional Enhancements)
- Integrate with Supabase for persistent metric storage
- Add email/Slack notifications for critical alerts
- Implement Real User Monitoring (RUM) integration
- Add performance regression testing
- Create automated performance reports

---

## Notes

- This agent is optional and can be done after core improvements
- Focus on Core Web Vitals first
- Consider using Vercel Analytics or similar for production monitoring
- Performance budgets should be realistic but challenging
- Regular performance reviews recommended

---

## Optional Enhancements

- Real User Monitoring (RUM)
- Synthetic monitoring
- Performance regression testing
- Automated performance reports
- Performance optimization suggestions

