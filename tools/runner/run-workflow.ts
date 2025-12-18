#!/usr/bin/env npx tsx
/**
 * Workflow Runner - Orchestrates development steps locally
 * Usage: npx tsx tools/runner/run-workflow.ts [workflow] [--fix]
 */

import { spawn } from "child_process"

// Simple color functions (no chalk dependency needed)
const colors = {
  cyan: (s: string) => `\x1b[36m${s}\x1b[0m`,
  green: (s: string) => `\x1b[32m${s}\x1b[0m`,
  red: (s: string) => `\x1b[31m${s}\x1b[0m`,
  blue: (s: string) => `\x1b[34m${s}\x1b[0m`,
  gray: (s: string) => `\x1b[90m${s}\x1b[0m`,
}

interface WorkflowStep {
  name: string
  cmd: string
  canFix?: boolean
}

const WORKFLOWS: Record<string, WorkflowStep[]> = {
  lint: [{ name: "ESLint", cmd: "pnpm lint", canFix: true }],
  typecheck: [{ name: "TypeScript", cmd: "pnpm tsc --noEmit" }],
  test: [{ name: "Tests", cmd: "pnpm test" }],
  build: [{ name: "Build", cmd: "pnpm build" }],
  full: [
    { name: "ESLint", cmd: "pnpm lint", canFix: true },
    { name: "TypeScript", cmd: "pnpm tsc --noEmit" },
    { name: "Tests", cmd: "pnpm test" },
    { name: "Build", cmd: "pnpm build" },
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

async function runWorkflow(workflowName: string, fix: boolean = false): Promise<void> {
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

  process.exit(allPassed ? 0 : 1)
}

// Parse args
const args = process.argv.slice(2)
const workflow = args[0] || "full"
const fix = args.includes("--fix")

if (args.includes("--help") || args.includes("-h")) {
  console.log(`
Usage: npx tsx tools/runner/run-workflow.ts [workflow] [--fix]

Workflows:
  lint       - Run ESLint
  typecheck  - Run TypeScript type checking
  test       - Run tests
  build      - Build the application
  full       - Run all steps (default)
  doctor     - Check environment setup
  test-all   - Run full test suite with all checks

Options:
  --fix      - Auto-fix issues where possible
  --help     - Show this help
`)
  process.exit(0)
}

runWorkflow(workflow, fix)

