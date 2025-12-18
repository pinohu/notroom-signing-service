#!/usr/bin/env node
/**
 * MCP Server for Notroom Signing Service
 * Exposes: run_workflow, status, apply_patch
 */

import { Server } from "@modelcontextprotocol/sdk/server/index.js"
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js"
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js"
import { exec } from "child_process"
import { promisify } from "util"
import fs from "fs/promises"
import path from "path"

const execAsync = promisify(exec)

// Workflow state
interface WorkflowState {
  id: string
  status: "idle" | "running" | "completed" | "failed"
  currentStep: string
  steps: string[]
  output: string[]
  startedAt?: Date
  completedAt?: Date
  error?: string
}

let currentWorkflow: WorkflowState = {
  id: "",
  status: "idle",
  currentStep: "",
  steps: [],
  output: [],
}

// Tool definitions
const tools = [
  {
    name: "run_workflow",
    description: `Execute a development task autonomously. Returns patch.diff + test logs.
    
For simple workflows (lint/build), just pass the workflow name.
For full task automation, pass task + acceptance criteria.

Examples:
- run_workflow({ workflow: "lint" }) - just lint
- run_workflow({ workflow: "full" }) - lint + typecheck + test + build
- run_workflow({ task: "Add dark mode", acceptance: "Toggle persists to localStorage" }) - full automation`,
    inputSchema: {
      type: "object" as const,
      properties: {
        workflow: {
          type: "string",
          enum: ["lint", "typecheck", "test", "build", "full", "doctor"],
          description: "Simple workflow to run (optional if task is provided)",
        },
        task: {
          type: "string",
          description: "Task description for full automation mode",
        },
        acceptance: {
          type: "string",
          description: "Acceptance criteria for the task",
        },
        fix: {
          type: "boolean",
          description: "Auto-fix issues where possible",
          default: true,
        },
      },
    },
  },
  {
    name: "status",
    description: "Get current workflow status and output",
    inputSchema: {
      type: "object" as const,
      properties: {},
    },
  },
  {
    name: "apply_patch",
    description: "Apply a git patch file to the codebase",
    inputSchema: {
      type: "object" as const,
      properties: {
        patchFile: {
          type: "string",
          description: "Path to patch file (relative to artifacts/)",
        },
        dryRun: {
          type: "boolean",
          description: "Check if patch applies without applying",
          default: false,
        },
      },
      required: ["patchFile"],
    },
  },
]

interface WorkflowResult {
  success: boolean
  summary: string
  patch?: string
  testLog?: string
  filesChanged?: string[]
  error?: string
}

async function runTaskWorkflow(task: string, acceptance: string): Promise<WorkflowResult> {
  const branch = `feature/${task.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 30)}`
  
  currentWorkflow = {
    id: `task-${Date.now()}`,
    status: "running",
    currentStep: "Starting task automation",
    steps: ["setup", "lint", "typecheck", "test", "build", "artifacts"],
    output: [],
    startedAt: new Date(),
  }

  try {
    // Run the workflow runner with task mode
    const cmd = `npx tsx tools/runner/run-workflow.ts --task "${task.replace(/"/g, '\\"')}" --acceptance "${acceptance.replace(/"/g, '\\"')}" --branch "${branch}"`
    
    currentWorkflow.output.push(`>>> Running: ${cmd}`)
    
    const { stdout, stderr } = await execAsync(cmd, {
      cwd: process.cwd(),
      maxBuffer: 10 * 1024 * 1024,
    })

    currentWorkflow.output.push(stdout)
    if (stderr) currentWorkflow.output.push(stderr)

    // Read artifacts
    let patch = ""
    let summary = ""
    let testLog = ""
    let filesChanged: string[] = []

    try {
      patch = await fs.readFile(path.join(process.cwd(), "artifacts/patch.diff"), "utf-8")
    } catch { /* no patch */ }

    try {
      summary = await fs.readFile(path.join(process.cwd(), "artifacts/summary.md"), "utf-8")
    } catch { /* no summary */ }

    try {
      testLog = await fs.readFile(path.join(process.cwd(), "artifacts/test.log"), "utf-8")
    } catch { /* no test log */ }

    try {
      const status = await fs.readFile(path.join(process.cwd(), "artifacts/status.txt"), "utf-8")
      filesChanged = status.split("\n").filter(Boolean).map(line => line.slice(3)) // Remove git status prefix
    } catch { /* no status */ }

    currentWorkflow.status = "completed"
    currentWorkflow.completedAt = new Date()

    return {
      success: true,
      summary,
      patch: patch || undefined,
      testLog: testLog || undefined,
      filesChanged,
    }
  } catch (err: unknown) {
    const error = err as { stdout?: string; stderr?: string; message: string }
    
    currentWorkflow.status = "failed"
    currentWorkflow.error = error.message
    currentWorkflow.completedAt = new Date()

    // Still try to read artifacts on failure
    let testLog = ""
    try {
      testLog = await fs.readFile(path.join(process.cwd(), "artifacts/test.log"), "utf-8")
    } catch { /* no test log */ }

    return {
      success: false,
      summary: `Task failed: ${error.message}`,
      testLog: testLog || error.stdout || error.stderr,
      error: error.message,
    }
  }
}

async function runSimpleWorkflow(workflow: string, fix: boolean = true): Promise<WorkflowResult> {
  const WORKFLOWS: Record<string, string[]> = {
    lint: ["pnpm -s lint"],
    typecheck: ["pnpm -s typecheck"],
    test: ["pnpm -s test"],
    build: ["pnpm -s build"],
    full: ["pnpm -s lint", "pnpm -s typecheck", "pnpm -s test", "pnpm -s build"],
    doctor: ["bash tools/scripts/doctor.sh"],
  }

  const steps = WORKFLOWS[workflow]
  if (!steps) {
    return { success: false, summary: `Unknown workflow: ${workflow}`, error: `Unknown workflow: ${workflow}` }
  }

  currentWorkflow = {
    id: `${workflow}-${Date.now()}`,
    status: "running",
    currentStep: "",
    steps: [...steps],
    output: [],
    startedAt: new Date(),
  }

  const results: string[] = []

  try {
    for (const step of steps) {
      currentWorkflow.currentStep = step
      currentWorkflow.output.push(`\n>>> Running: ${step}`)

      const command = fix && step.includes("lint") ? `${step} --fix` : step

      try {
        const { stdout, stderr } = await execAsync(command, {
          cwd: process.cwd(),
          maxBuffer: 10 * 1024 * 1024,
        })

        if (stdout) {
          currentWorkflow.output.push(stdout)
          results.push(`✓ ${step}`)
        }
        if (stderr) currentWorkflow.output.push(stderr)
      } catch (err: unknown) {
        const error = err as { stdout?: string; stderr?: string; message: string }
        results.push(`✗ ${step}: ${error.message}`)
        throw error
      }
    }

    currentWorkflow.status = "completed"
    currentWorkflow.completedAt = new Date()

    // Generate patch after workflow
    try {
      await execAsync("bash tools/scripts/patch.sh", { cwd: process.cwd() })
    } catch { /* patch generation optional */ }

    let patch = ""
    try {
      patch = await fs.readFile(path.join(process.cwd(), "artifacts/patch.diff"), "utf-8")
    } catch { /* no patch */ }

    return {
      success: true,
      summary: `Workflow '${workflow}' completed successfully.\n\n${results.join("\n")}`,
      patch: patch || undefined,
      testLog: currentWorkflow.output.join("\n"),
    }
  } catch (err: unknown) {
    const error = err as Error
    currentWorkflow.status = "failed"
    currentWorkflow.error = error.message
    currentWorkflow.completedAt = new Date()

    return {
      success: false,
      summary: `Workflow '${workflow}' failed.\n\n${results.join("\n")}`,
      testLog: currentWorkflow.output.join("\n"),
      error: error.message,
    }
  }
}

async function getStatus(): Promise<WorkflowState> {
  return { ...currentWorkflow }
}

async function applyPatch(patchFile: string, dryRun: boolean = false): Promise<string> {
  const patchPath = path.join(process.cwd(), "artifacts", patchFile)

  try {
    await fs.access(patchPath)
  } catch {
    throw new Error(`Patch file not found: ${patchPath}`)
  }

  const command = dryRun
    ? `git apply --check ${patchPath}`
    : `git apply ${patchPath}`

  try {
    const { stdout, stderr } = await execAsync(command, { cwd: process.cwd() })
    return dryRun
      ? `Patch can be applied cleanly: ${patchFile}`
      : `Patch applied successfully: ${patchFile}\n${stdout}${stderr}`
  } catch (err: unknown) {
    const error = err as Error
    throw new Error(`Failed to apply patch: ${error.message}`)
  }
}

// Create MCP server
const server = new Server(
  {
    name: "notroom-mcp",
    version: "1.0.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
)

// Handle list tools
server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools,
}))

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params

  try {
    switch (name) {
      case "run_workflow": {
        let result: WorkflowResult

        // Task mode: full automation with artifacts
        if (args?.task && args?.acceptance) {
          result = await runTaskWorkflow(args.task as string, args.acceptance as string)
        }
        // Simple workflow mode
        else if (args?.workflow) {
          result = await runSimpleWorkflow(args.workflow as string, args?.fix !== false)
        }
        // Default to full workflow
        else {
          result = await runSimpleWorkflow("full", args?.fix !== false)
        }

        // Format response with patch and logs
        let response = `## ${result.success ? "✅ Success" : "❌ Failed"}\n\n`
        response += `### Summary\n${result.summary}\n\n`

        if (result.filesChanged?.length) {
          response += `### Files Changed\n${result.filesChanged.map(f => `- ${f}`).join("\n")}\n\n`
        }

        if (result.patch) {
          response += `### Patch (artifacts/patch.diff)\n\`\`\`diff\n${result.patch.slice(0, 5000)}${result.patch.length > 5000 ? "\n... (truncated)" : ""}\n\`\`\`\n\n`
        }

        if (result.testLog) {
          const truncatedLog = result.testLog.slice(-3000)
          response += `### Test Log (last 3000 chars)\n\`\`\`\n${truncatedLog}\n\`\`\`\n`
        }

        return {
          content: [{ type: "text" as const, text: response }],
          isError: !result.success,
        }
      }

      case "status": {
        const status = await getStatus()
        return {
          content: [{ type: "text" as const, text: JSON.stringify(status, null, 2) }],
        }
      }

      case "apply_patch": {
        const result = await applyPatch(
          args?.patchFile as string,
          args?.dryRun as boolean
        )
        return {
          content: [{ type: "text" as const, text: result }],
        }
      }

      default:
        throw new Error(`Unknown tool: ${name}`)
    }
  } catch (err: unknown) {
    const error = err as Error
    return {
      content: [{ type: "text" as const, text: `Error: ${error.message}` }],
      isError: true,
    }
  }
})

// Start server
async function main() {
  const transport = new StdioServerTransport()
  await server.connect(transport)
  console.error("Notroom MCP server running on stdio")
}

main().catch(console.error)
