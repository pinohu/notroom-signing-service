#!/bin/bash
# Full Test Suite - lint + typecheck + test + build

set -e

echo "🧪 Notroom Full Test Suite"
echo "=========================="

START_TIME=$(date +%s)

# Lint
echo -e "\n📝 Step 1/4: Linting..."
pnpm lint || { echo "❌ Linting failed"; exit 1; }

# Type check
echo -e "\n🔍 Step 2/4: Type checking..."
pnpm tsc --noEmit || { echo "❌ Type checking failed"; exit 1; }

# Tests
echo -e "\n🧪 Step 3/4: Running tests..."
if [ -f "vitest.config.ts" ] || [ -f "vitest.config.js" ] || [ -f "jest.config.js" ]; then
    pnpm test || { echo "❌ Tests failed"; exit 1; }
else
    echo "⚠ No test runner configured - skipping"
fi

# Build
echo -e "\n🏗️ Step 4/4: Building..."
pnpm build || { echo "❌ Build failed"; exit 1; }

END_TIME=$(date +%s)
DURATION=$((END_TIME - START_TIME))

echo -e "\n=========================="
echo "✅ All checks passed in ${DURATION}s"

