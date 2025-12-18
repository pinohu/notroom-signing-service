#!/usr/bin/env npx tsx
/**
 * Generate patch file from current changes
 * Windows-compatible version (no bash required)
 */

import { execSync } from "node:child_process"
import * as fs from "node:fs"
import * as path from "node:path"

const colors = {
  green: (s: string) => `\x1b[32m${s}\x1b[0m`,
  cyan: (s: string) => `\x1b[36m${s}\x1b[0m`,
  gray: (s: string) => `\x1b[90m${s}\x1b[0m`,
}

const artifactsDir = path.join(process.cwd(), "artifacts")

function execQuiet(cmd: string): string {
  try {
    return execSync(cmd, { encoding: "utf8", stdio: ["pipe", "pipe", "pipe"] })
  } catch {
    return ""
  }
}

// Ensure artifacts directory exists
fs.mkdirSync(artifactsDir, { recursive: true })

console.log(colors.cyan("\n📦 Generating artifacts...\n"))

// Generate patch.diff
const patchContent = execQuiet("git diff --patch")
fs.writeFileSync(path.join(artifactsDir, "patch.diff"), patchContent, "utf8")
console.log(colors.gray("  - artifacts/patch.diff"))

// Generate status.txt
const statusContent = execQuiet("git status --porcelain")
fs.writeFileSync(path.join(artifactsDir, "status.txt"), statusContent, "utf8")
console.log(colors.gray("  - artifacts/status.txt"))

// Generate summary.md
const filesChanged = execQuiet("git diff --name-only").trim()
const summary = `# Notroom Autopilot Summary

## Files changed
${filesChanged || "No changes detected"}
`
fs.writeFileSync(path.join(artifactsDir, "summary.md"), summary, "utf8")
console.log(colors.gray("  - artifacts/summary.md"))

// Count changes
const lines = patchContent.split("\n").length
if (patchContent.trim()) {
  console.log(colors.green(`\n✓ Patch created (${lines} lines)\n`))
} else {
  console.log(colors.gray("\nNo changes detected\n"))
}

