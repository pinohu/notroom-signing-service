#!/usr/bin/env npx tsx
/**
 * Workflow Runner - Orchestrates development steps locally
 * Windows-safe version that produces artifacts/test.log
 * 
 * Usage:
 *   npx tsx tools/runner/run-workflow.ts [workflow] [--fix]
 *   npx tsx tools/runner/run-workflow.ts --task "..." --acceptance "..." --branch "feature/x"
 */

import { spawn, exec } from "node:child_process"
import { promisify } from "node:util"
import * as fs from "node:fs"
import * as path from "node:path"

const execAsync = promisify(exec)

// Simple color functions (no chalk dependency needed)
const colors = {
  cyan: (s: string) => `\x1b[36m${s}\x1b[0m`,
  green: (s: string) => `\x1b[32m${s}\x1b[0m`,
  red: (s: string) => `\x1b[31m${s}\x1b[0m`,
  blue: (s: string) => `\x1b[34m${s}\x1b[0m`,
  gray: (s: string) => `\x1b[90m${s}\x1b[0m`,
  yellow: (s: string) => `\x1b[33m${s}\x1b[0m`,
}

interface WorkflowStep {
  name: string
  cmd: string
  canFix?: boolean
}

const WORKFLOWS: Record<string, WorkflowStep[]> = {
  lint: [{ name: "ESLint", cmd: "pnpm -s lint", canFix: true }],
  typecheck: [{ name: "TypeScript", cmd: "pnpm -s typecheck" }],
  test: [{ name: "Tests", cmd: "pnpm -s test" }],
  build: [{ name: "Build", cmd: "pnpm -s build" }],
  full: [
    { name: "ESLint", cmd: "pnpm -s lint", canFix: true },
    { name: "TypeScript", cmd: "pnpm -s typecheck" },
    { name: "Tests", cmd: "pnpm -s test" },
    { name: "Build", cmd: "pnpm -s build" },
  ],
  doctor: [{ name: "Environment Check", cmd: "pnpm -s doctor" }],
  "test-all": [{ name: "Full Test Suite", cmd: "pnpm -s test-all" }],
}

interface RunResult {
  step: string
  success: boolean
  duration: number
  output: string
}

interface TaskConfig {
  task: string
  acceptance: string
  branch: string
}

// Collected log for artifacts/test.log
let fullLog: string[] = []

function log(msg: string) {
  console.log(msg)
  fullLog.push(msg)
}

function logError(msg: string) {
  console.error(msg)
  fullLog.push(msg)
}

async function runCommand(cmd: string): Promise<{ success: boolean; output: string }> {
  return new Promise((resolve) => {
    const proc = spawn(cmd, [], {
      shell: true, // Important for Windows
      stdio: ["inherit", "pipe", "pipe"],
      cwd: process.cwd(),
    })

    let output = ""
    proc.stdout?.on("data", (data) => {
      const str = data.toString()
      output += str
      process.stdout.write(data)
      fullLog.push(str)
    })
    proc.stderr?.on("data", (data) => {
      const str = data.toString()
      output += str
      process.stderr.write(data)
      fullLog.push(str)
    })

    proc.on("close", (code) => {
      resolve({ success: code === 0, output })
    })
  })
}

async function runWorkflow(workflowName: string, fix: boolean = false): Promise<RunResult[]> {
  const workflow = WORKFLOWS[workflowName]
  if (!workflow) {
    logError(colors.red(`Unknown workflow: ${workflowName}`))
    log(colors.gray(`Available: ${Object.keys(WORKFLOWS).join(", ")}`))
    process.exit(1)
  }

  log(colors.cyan(`\n🚀 Running workflow: ${workflowName}\n`))

  const results: RunResult[] = []
  const startTime = Date.now()

  for (const step of workflow) {
    log(colors.blue(`\n>>> ${step.name}`))
    log(colors.gray(`    ${step.cmd}${fix && step.canFix ? " --fix" : ""}\n`))

    const stepStart = Date.now()
    const cmd = fix && step.canFix ? `${step.cmd} --fix` : step.cmd
    const { success, output } = await runCommand(cmd)

    results.push({
      step: step.name,
      success,
      duration: Date.now() - stepStart,
      output,
    })

    if (!success) {
      log(colors.red(`\n❌ ${step.name} failed\n`))
      break
    }

    log(
      colors.green(`✓ ${step.name} passed (${((Date.now() - stepStart) / 1000).toFixed(1)}s)`)
    )
  }

  // Summary
  const totalDuration = ((Date.now() - startTime) / 1000).toFixed(1)
  const allPassed = results.every((r) => r.success)

  log(colors.cyan("\n" + "=".repeat(50)))
  log(colors.cyan("Summary"))
  log(colors.cyan("=".repeat(50)))

  for (const result of results) {
    const icon = result.success ? colors.green("✓") : colors.red("✗")
    const duration = colors.gray(`(${(result.duration / 1000).toFixed(1)}s)`)
    log(`  ${icon} ${result.step} ${duration}`)
  }

  log(colors.cyan("=".repeat(50)))
  log(
    allPassed
      ? colors.green(`\n✓ All steps passed in ${totalDuration}s\n`)
      : colors.red(`\n✗ Workflow failed after ${totalDuration}s\n`)
  )

  return results
}

async function ensureArtifactsDir() {
  const artifactsDir = path.join(process.cwd(), "artifacts")
  fs.mkdirSync(artifactsDir, { recursive: true })
  return artifactsDir
}

async function saveTestLog(artifactsDir: string) {
  const testLogPath = path.join(artifactsDir, "test.log")
  fs.writeFileSync(testLogPath, fullLog.join("\n"), "utf8")
  log(colors.gray(`  - artifacts/test.log`))
}

async function runPatch() {
  log(colors.cyan("\n📦 Generating artifacts...\n"))
  
  const artifactsDir = await ensureArtifactsDir()
  
  // Generate patch.diff
  try {
    const { stdout: patchContent } = await execAsync("git diff --patch", { cwd: process.cwd() })
    fs.writeFileSync(path.join(artifactsDir, "patch.diff"), patchContent, "utf8")
    log(colors.gray(`  - artifacts/patch.diff`))
  } catch {
    fs.writeFileSync(path.join(artifactsDir, "patch.diff"), "", "utf8")
  }

  // Generate status.txt
  try {
    const { stdout: statusContent } = await execAsync("git status --porcelain", { cwd: process.cwd() })
    fs.writeFileSync(path.join(artifactsDir, "status.txt"), statusContent, "utf8")
    log(colors.gray(`  - artifacts/status.txt`))
  } catch {
    fs.writeFileSync(path.join(artifactsDir, "status.txt"), "", "utf8")
  }

  // Generate summary.md
  try {
    const { stdout: filesChanged } = await execAsync("git diff --name-only", { cwd: process.cwd() })
    const summary = `# Notroom Autopilot Summary

## Files changed
${filesChanged || "No changes detected"}
`
    fs.writeFileSync(path.join(artifactsDir, "summary.md"), summary, "utf8")
    log(colors.gray(`  - artifacts/summary.md`))
  } catch {
    fs.writeFileSync(path.join(artifactsDir, "summary.md"), "# Notroom Autopilot Summary\n\nNo changes detected", "utf8")
  }

  return artifactsDir
}

async function runTaskMode(config: TaskConfig): Promise<void> {
  log(colors.cyan("\n🤖 Notroom Autopilot - Task Mode\n"))
  log(colors.yellow(`Task: ${config.task}`))
  log(colors.yellow(`Acceptance: ${config.acceptance}`))
  log(colors.yellow(`Branch: ${config.branch}\n`))

  const artifactsDir = await ensureArtifactsDir()

  // Write task context to artifacts
  const context = {
    task: config.task,
    acceptance: config.acceptance,
    branch: config.branch,
    startedAt: new Date().toISOString(),
  }
  fs.writeFileSync(path.join(artifactsDir, "task-context.json"), JSON.stringify(context, null, 2), "utf8")

  // Create or checkout branch
  try {
    await execAsync(`git checkout -b ${config.branch} 2>nul || git checkout ${config.branch}`, { cwd: process.cwd() })
    log(colors.green(`✓ On branch: ${config.branch}`))
  } catch {
    log(colors.yellow(`⚠ Could not switch to branch ${config.branch}, continuing on current branch`))
  }

  // Run full workflow
  const results = await runWorkflow("full", true)
  const allPassed = results.every((r) => r.success)

  // Generate patch and summary
  await runPatch()

  // Save test log
  await saveTestLog(artifactsDir)

  // Update summary with task info
  const summaryPath = path.join(artifactsDir, "summary.md")
  let existingSummary = ""
  try {
    existingSummary = fs.readFileSync(summaryPath, "utf8")
  } catch { /* ignore */ }

  const filesSection = existingSummary.split("## Files changed")[1] || "No changes detected"

  const updatedSummary = `# Notroom Autopilot Summary

## Task
${config.task}

## Acceptance Criteria
${config.acceptance}

## Branch
${config.branch}

## Status
${allPassed ? "✅ All checks passed" : "❌ Some checks failed"}

## Test Results
${results.map((r) => `- ${r.success ? "✅" : "❌"} ${r.step}`).join("\n")}

## Files Changed
${filesSection}
`

  fs.writeFileSync(summaryPath, updatedSummary, "utf8")

  log(colors.cyan("\n📦 Artifacts generated:"))
  log(colors.gray("  - artifacts/patch.diff"))
  log(colors.gray("  - artifacts/summary.md"))
  log(colors.gray("  - artifacts/test.log"))
  log(colors.gray("  - artifacts/status.txt"))
  log(colors.gray("  - artifacts/task-context.json"))

  process.exit(allPassed ? 0 : 1)
}

function parseArgs(args: string[]): { workflow?: string; fix: boolean; taskConfig?: TaskConfig } {
  const result: { workflow?: string; fix: boolean; taskConfig?: TaskConfig } = { fix: false }

  let task: string | undefined
  let acceptance: string | undefined
  let branch: string | undefined

  for (let i = 0; i < args.length; i++) {
    const arg = args[i]

    if (arg === "--fix") {
      result.fix = true
    } else if (arg === "--task" && args[i + 1]) {
      // Handle JSON-encoded strings from MCP
      let val = args[++i]
      try {
        val = JSON.parse(val)
      } catch { /* use as-is */ }
      task = val
    } else if (arg === "--acceptance" && args[i + 1]) {
      let val = args[++i]
      try {
        val = JSON.parse(val)
      } catch { /* use as-is */ }
      acceptance = val
    } else if (arg === "--branch" && args[i + 1]) {
      let val = args[++i]
      try {
        val = JSON.parse(val)
      } catch { /* use as-is */ }
      branch = val
    } else if (!arg.startsWith("--")) {
      result.workflow = arg
    }
  }

  if (task) {
    result.taskConfig = {
      task,
      acceptance: acceptance || "No acceptance criteria provided",
      branch: branch || `feature/${task.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 30)}`,
    }
  }

  return result
}

// Parse args
const args = process.argv.slice(2)

if (args.includes("--help") || args.includes("-h")) {
  console.log(`
Usage: npx tsx tools/runner/run-workflow.ts [workflow] [options]

Workflows:
  lint       - Run ESLint
  typecheck  - Run TypeScript type checking
  test       - Run tests
  build      - Build the application
  full       - Run all steps (default)
  doctor     - Check environment setup
  test-all   - Run full test suite with all checks

Options:
  --fix              - Auto-fix issues where possible
  --task "..."       - Task description (enables task mode)
  --acceptance "..." - Acceptance criteria (optional with --task)
  --branch "..."     - Branch name (optional, auto-generated)
  --help             - Show this help

Task Mode (for MCP integration):
  npx tsx tools/runner/run-workflow.ts \\
    --task "Add user authentication" \\
    --acceptance "Users can login with email/password" \\
    --branch "feature/auth"

  This will:
  1. Create/checkout the branch
  2. Run full workflow (lint, typecheck, test, build)
  3. Generate artifacts: patch.diff, summary.md, test.log
`)
  process.exit(0)
}

const parsed = parseArgs(args)

if (parsed.taskConfig) {
  runTaskMode(parsed.taskConfig)
} else {
  runWorkflow(parsed.workflow || "full", parsed.fix).then(async (results) => {
    const allPassed = results.every((r) => r.success)
    
    // Always generate artifacts
    const artifactsDir = await runPatch()
    await saveTestLog(artifactsDir)
    
    process.exit(allPassed ? 0 : 1)
  })
}
