#!/bin/bash
# Generate patch file from current changes

set -e

TIMESTAMP=$(date +%Y%m%d_%H%M%S)
PATCH_DIR="artifacts/patches"
PATCH_FILE="$PATCH_DIR/changes_$TIMESTAMP.patch"

# Create artifacts directory
mkdir -p "$PATCH_DIR"

# Check for changes
if git diff --quiet && git diff --staged --quiet; then
    echo "No changes to create patch from"
    exit 0
fi

# Generate patch
echo "📦 Generating patch..."

# Include both staged and unstaged changes
git diff HEAD > "$PATCH_FILE"

if [ -s "$PATCH_FILE" ]; then
    LINES=$(wc -l < "$PATCH_FILE")
    echo "✓ Patch created: $PATCH_FILE ($LINES lines)"
    
    # Also create a summary
    SUMMARY_FILE="$PATCH_DIR/changes_$TIMESTAMP.txt"
    echo "Patch Summary - $TIMESTAMP" > "$SUMMARY_FILE"
    echo "=========================" >> "$SUMMARY_FILE"
    git diff --stat HEAD >> "$SUMMARY_FILE"
    echo "" >> "$SUMMARY_FILE"
    echo "Files changed:" >> "$SUMMARY_FILE"
    git diff --name-only HEAD >> "$SUMMARY_FILE"
    
    echo "✓ Summary created: $SUMMARY_FILE"
else
    rm "$PATCH_FILE"
    echo "No changes detected"
fi

