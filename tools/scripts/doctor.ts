#!/usr/bin/env npx tsx
/**
 * Environment Doctor - Verify development setup
 * Windows-compatible version (no bash required)
 */

import { execSync } from "node:child_process"
import * as fs from "node:fs"
import * as path from "node:path"

const colors = {
  green: (s: string) => `\x1b[32m${s}\x1b[0m`,
  red: (s: string) => `\x1b[31m${s}\x1b[0m`,
  yellow: (s: string) => `\x1b[33m${s}\x1b[0m`,
  cyan: (s: string) => `\x1b[36m${s}\x1b[0m`,
  gray: (s: string) => `\x1b[90m${s}\x1b[0m`,
}

function check(name: string, fn: () => string | null): boolean {
  process.stdout.write(`${name}: `)
  try {
    const result = fn()
    if (result) {
      console.log(colors.green(`✓ ${result}`))
      return true
    } else {
      console.log(colors.yellow(`⚠ Not available`))
      return true // warning, not error
    }
  } catch (e) {
    console.log(colors.red(`✗ ${(e as Error).message}`))
    return false
  }
}

function execQuiet(cmd: string): string {
  return execSync(cmd, { encoding: "utf8", stdio: ["pipe", "pipe", "pipe"] }).trim()
}

function fileExists(p: string): boolean {
  return fs.existsSync(path.join(process.cwd(), p))
}

function dirExists(p: string): boolean {
  const full = path.join(process.cwd(), p)
  return fs.existsSync(full) && fs.statSync(full).isDirectory()
}

console.log(colors.cyan("\n🔍 Notroom Development Environment Check"))
console.log(colors.cyan("==========================================\n"))

let errors = 0

// Node.js
if (!check("Node.js", () => execQuiet("node -v"))) errors++

// pnpm
if (!check("pnpm", () => execQuiet("pnpm -v"))) errors++

// Git
if (!check("Git", () => execQuiet("git --version").split(" ")[2])) errors++

// Docker (optional)
check("Docker", () => {
  try {
    const version = execQuiet("docker -v").match(/Docker version ([^,]+)/)?.[1]
    if (version) {
      try {
        execQuiet("docker info")
        return `${version} (running)`
      } catch {
        return `${version} (not running)`
      }
    }
    return null
  } catch {
    return null
  }
})

// TypeScript
check("TypeScript", () => {
  try {
    return execQuiet("npx tsc --version").split(" ")[1]
  } catch {
    return null
  }
})

// .env.local
check(".env.local", () => {
  if (fileExists(".env.local")) {
    return "Exists"
  }
  throw new Error("Missing (copy from .env.example)")
})

// node_modules
check("Dependencies", () => {
  if (dirExists("node_modules")) {
    return "Installed"
  }
  throw new Error("Not installed (run: pnpm install)")
})

// Prisma Client
check("Prisma Client", () => {
  if (dirExists("node_modules/.prisma")) {
    return "Generated"
  }
  throw new Error("Not generated (run: pnpm prisma generate)")
})

// artifacts directory
check("artifacts/", () => {
  if (dirExists("artifacts")) {
    return "Exists"
  }
  fs.mkdirSync(path.join(process.cwd(), "artifacts"), { recursive: true })
  return "Created"
})

console.log(colors.cyan("\n=========================================="))

if (errors === 0) {
  console.log(colors.green("✅ Environment is ready!\n"))
  process.exit(0)
} else {
  console.log(colors.red(`❌ Found ${errors} error(s)\n`))
  process.exit(1)
}

