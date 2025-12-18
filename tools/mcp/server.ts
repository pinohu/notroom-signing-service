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
    description: "Execute a development workflow (lint, typecheck, test, build)",
    inputSchema: {
      type: "object" as const,
      properties: {
        workflow: {
          type: "string",
          enum: ["lint", "typecheck", "test", "build", "full", "doctor"],
          description: "Workflow to run",
        },
        fix: {
          type: "boolean",
          description: "Auto-fix issues where possible",
          default: false,
        },
      },
      required: ["workflow"],
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

// Workflow commands
const WORKFLOWS: Record<string, string[]> = {
  lint: ["pnpm lint"],
  typecheck: ["pnpm tsc --noEmit"],
  test: ["pnpm test"],
  build: ["pnpm build"],
  full: ["pnpm lint", "pnpm tsc --noEmit", "pnpm test", "pnpm build"],
  doctor: ["bash tools/scripts/doctor.sh"],
}

async function runWorkflow(workflow: string, fix: boolean = false): Promise<string> {
  const steps = WORKFLOWS[workflow]
  if (!steps) {
    throw new Error(`Unknown workflow: ${workflow}`)
  }

  currentWorkflow = {
    id: `${workflow}-${Date.now()}`,
    status: "running",
    currentStep: "",
    steps: [...steps],
    output: [],
    startedAt: new Date(),
  }

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

        if (stdout) currentWorkflow.output.push(stdout)
        if (stderr) currentWorkflow.output.push(stderr)
      } catch (err: unknown) {
        const error = err as { stdout?: string; stderr?: string; message: string }
        currentWorkflow.output.push(error.stdout || "")
        currentWorkflow.output.push(error.stderr || "")
        throw new Error(`Step failed: ${step}\n${error.message}`)
      }
    }

    currentWorkflow.status = "completed"
    currentWorkflow.completedAt = new Date()
    return currentWorkflow.output.join("\n")
  } catch (err: unknown) {
    const error = err as Error
    currentWorkflow.status = "failed"
    currentWorkflow.error = error.message
    currentWorkflow.completedAt = new Date()
    throw err
  }
}

async function getStatus(): Promise<WorkflowState> {
  return { ...currentWorkflow }
}

async function applyPatch(patchFile: string, dryRun: boolean = false): Promise<string> {
  const patchPath = path.join(process.cwd(), "artifacts", patchFile)

  // Check if patch exists
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
        const result = await runWorkflow(
          args?.workflow as string,
          args?.fix as boolean
        )
        return {
          content: [{ type: "text" as const, text: result }],
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

