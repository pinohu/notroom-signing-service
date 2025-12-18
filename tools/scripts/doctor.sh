#!/bin/bash
# Environment Doctor - Verify development setup

set -e

echo "🔍 Notroom Development Environment Check"
echo "=========================================="

ERRORS=0

# Check Node.js
echo -n "Node.js: "
if command -v node &> /dev/null; then
    NODE_VERSION=$(node -v)
    echo "✓ $NODE_VERSION"
else
    echo "✗ Not installed"
    ERRORS=$((ERRORS + 1))
fi

# Check pnpm
echo -n "pnpm: "
if command -v pnpm &> /dev/null; then
    PNPM_VERSION=$(pnpm -v)
    echo "✓ $PNPM_VERSION"
else
    echo "✗ Not installed (run: npm install -g pnpm)"
    ERRORS=$((ERRORS + 1))
fi

# Check Docker
echo -n "Docker: "
if command -v docker &> /dev/null; then
    if docker info &> /dev/null; then
        DOCKER_VERSION=$(docker -v | cut -d' ' -f3 | tr -d ',')
        echo "✓ $DOCKER_VERSION (running)"
    else
        echo "⚠ Installed but not running"
    fi
else
    echo "✗ Not installed"
    ERRORS=$((ERRORS + 1))
fi

# Check Docker Compose
echo -n "Docker Compose: "
if command -v docker-compose &> /dev/null || docker compose version &> /dev/null 2>&1; then
    echo "✓ Available"
else
    echo "✗ Not installed"
    ERRORS=$((ERRORS + 1))
fi

# Check Git
echo -n "Git: "
if command -v git &> /dev/null; then
    GIT_VERSION=$(git --version | cut -d' ' -f3)
    echo "✓ $GIT_VERSION"
else
    echo "✗ Not installed"
    ERRORS=$((ERRORS + 1))
fi

# Check .env.local
echo -n ".env.local: "
if [ -f ".env.local" ]; then
    echo "✓ Exists"
else
    echo "⚠ Missing (copy from .env.example)"
fi

# Check node_modules
echo -n "Dependencies: "
if [ -d "node_modules" ]; then
    echo "✓ Installed"
else
    echo "⚠ Not installed (run: pnpm install)"
fi

# Check PostgreSQL connection
echo -n "PostgreSQL: "
if docker ps 2>/dev/null | grep -q "notroom-db\|postgres"; then
    echo "✓ Container running"
else
    echo "⚠ Container not running (run: docker-compose up -d)"
fi

# Check Redis connection
echo -n "Redis: "
if docker ps 2>/dev/null | grep -q "notroom-redis\|redis"; then
    echo "✓ Container running"
else
    echo "⚠ Container not running (run: docker-compose up -d)"
fi

# Check Prisma
echo -n "Prisma Client: "
if [ -d "node_modules/.prisma" ]; then
    echo "✓ Generated"
else
    echo "⚠ Not generated (run: pnpm prisma generate)"
fi

echo "=========================================="

if [ $ERRORS -eq 0 ]; then
    echo "✅ Environment is ready!"
    exit 0
else
    echo "❌ Found $ERRORS error(s)"
    exit 1
fi

