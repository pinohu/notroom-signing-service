#!/usr/bin/env npx tsx
/**
 * Workflow Runner - Orchestrates development steps locally
 * 
 * Usage:
 *   npx tsx tools/runner/run-workflow.ts [workflow] [--fix]
 *   npx tsx tools/runner/run-workflow.ts --task "..." --acceptance "..." --branch "feature/x"
 */

import { spawn, exec } from "child_process"
import { promisify } from "util"
import fs from "fs/promises"
import path from "path"

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
  doctor: [{ name: "Environment Check", cmd: "bash tools/scripts/doctor.sh" }],
  "test-all": [{ name: "Full Test Suite", cmd: "bash tools/scripts/test-all.sh" }],
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

async function runCommand(cmd: string): Promise<{ success: boolean; output: string }> {
  return new Promise((resolve) => {
    const [command, ...args] = cmd.split(" ")
    const proc = spawn(command, args, {
      shell: true,
      stdio: ["inherit", "pipe", "pipe"],
    })

    let output = ""
    proc.stdout?.on("data", (data) => {
      output += data.toString()
      process.stdout.write(data)
    })
    proc.stderr?.on("data", (data) => {
      output += data.toString()
      process.stderr.write(data)
    })

    proc.on("close", (code) => {
      resolve({ success: code === 0, output })
    })
  })
}

async function runWorkflow(workflowName: string, fix: boolean = false): Promise<RunResult[]> {
  const workflow = WORKFLOWS[workflowName]
  if (!workflow) {
    console.error(colors.red(`Unknown workflow: ${workflowName}`))
    console.log(colors.gray(`Available: ${Object.keys(WORKFLOWS).join(", ")}`))
    process.exit(1)
  }

  console.log(colors.cyan(`\n🚀 Running workflow: ${workflowName}\n`))

  const results: RunResult[] = []
  const startTime = Date.now()

  for (const step of workflow) {
    console.log(colors.blue(`\n>>> ${step.name}`))
    console.log(colors.gray(`    ${step.cmd}${fix && step.canFix ? " --fix" : ""}\n`))

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
      console.log(colors.red(`\n❌ ${step.name} failed\n`))
      break
    }

    console.log(
      colors.green(`✓ ${step.name} passed (${((Date.now() - stepStart) / 1000).toFixed(1)}s)`)
    )
  }

  // Summary
  const totalDuration = ((Date.now() - startTime) / 1000).toFixed(1)
  const allPassed = results.every((r) => r.success)

  console.log(colors.cyan("\n" + "=".repeat(50)))
  console.log(colors.cyan("Summary"))
  console.log(colors.cyan("=".repeat(50)))

  for (const result of results) {
    const icon = result.success ? colors.green("✓") : colors.red("✗")
    const duration = colors.gray(`(${(result.duration / 1000).toFixed(1)}s)`)
    console.log(`  ${icon} ${result.step} ${duration}`)
  }

  console.log(colors.cyan("=".repeat(50)))
  console.log(
    allPassed
      ? colors.green(`\n✓ All steps passed in ${totalDuration}s\n`)
      : colors.red(`\n✗ Workflow failed after ${totalDuration}s\n`)
  )

  return results
}

async function runTaskMode(config: TaskConfig): Promise<void> {
  console.log(colors.cyan("\n🤖 Notroom Autopilot - Task Mode\n"))
  console.log(colors.yellow(`Task: ${config.task}`))
  console.log(colors.yellow(`Acceptance: ${config.acceptance}`))
  console.log(colors.yellow(`Branch: ${config.branch}\n`))

  // Ensure artifacts directory exists
  await fs.mkdir("artifacts", { recursive: true })

  // Create or checkout branch
  try {
    await execAsync(`git checkout -b ${config.branch} 2>/dev/null || git checkout ${config.branch}`)
    console.log(colors.green(`✓ On branch: ${config.branch}`))
  } catch (error) {
    console.log(colors.yellow(`⚠ Could not switch to branch ${config.branch}, continuing on current branch`))
  }

  // Write task context to artifacts
  const context = {
    task: config.task,
    acceptance: config.acceptance,
    branch: config.branch,
    startedAt: new Date().toISOString(),
  }
  await fs.writeFile("artifacts/task-context.json", JSON.stringify(context, null, 2))

  // Run full workflow
  const results = await runWorkflow("full", true)
  const allPassed = results.every((r) => r.success)

  // Generate test log
  const testLog = results.map((r) => 
    `[${r.success ? "PASS" : "FAIL"}] ${r.step} (${(r.duration / 1000).toFixed(1)}s)\n${r.output}`
  ).join("\n\n")
  await fs.writeFile("artifacts/test.log", testLog)

  // Generate patch and summary
  await execAsync("bash tools/scripts/patch.sh")

  // Update summary with task info
  const summaryPath = "artifacts/summary.md"
  let summary = ""
  try {
    summary = await fs.readFile(summaryPath, "utf-8")
  } catch {
    summary = "# Notroom Autopilot Summary\n"
  }

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
${summary.split("## Files changed")[1] || "No changes detected"}
`

  await fs.writeFile(summaryPath, updatedSummary)

  console.log(colors.cyan("\n📦 Artifacts generated:"))
  console.log(colors.gray("  - artifacts/patch.diff"))
  console.log(colors.gray("  - artifacts/summary.md"))
  console.log(colors.gray("  - artifacts/test.log"))
  console.log(colors.gray("  - artifacts/status.txt"))
  console.log(colors.gray("  - artifacts/task-context.json"))

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
      task = args[++i]
    } else if (arg === "--acceptance" && args[i + 1]) {
      acceptance = args[++i]
    } else if (arg === "--branch" && args[i + 1]) {
      branch = args[++i]
    } else if (!arg.startsWith("--")) {
      result.workflow = arg
    }
  }

  if (task && acceptance && branch) {
    result.taskConfig = { task, acceptance, branch }
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
  --acceptance "..." - Acceptance criteria (required with --task)
  --branch "..."     - Branch name (required with --task)
  --help             - Show this help

Task Mode (for n8n integration):
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
  runWorkflow(parsed.workflow || "full", parsed.fix).then((results) => {
    const allPassed = results.every((r) => r.success)
    process.exit(allPassed ? 0 : 1)
  })
}
