#!/usr/bin/env bash
set -euo pipefail

mkdir -p artifacts
git diff --patch > artifacts/patch.diff
git status --porcelain > artifacts/status.txt

echo "# Notroom Autopilot Summary" > artifacts/summary.md
echo "" >> artifacts/summary.md
echo "## Files changed" >> artifacts/summary.md
git diff --name-only >> artifacts/summary.md
