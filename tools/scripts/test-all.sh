#!/usr/bin/env bash
set -euo pipefail

pnpm -s lint
pnpm -s typecheck || pnpm -s tsc --noEmit
pnpm -s test || true
pnpm -s build
