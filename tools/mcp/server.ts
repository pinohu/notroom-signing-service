#!/usr/bin/env node
/**
 * Notroom MCP Server - Local Loop
 * 
 * Exposes exactly 3 tools to Cursor:
 * 1. run_workflow({ task, acceptance, branch? }) -> { ok, artifacts }
 * 2. get_status({ runId }) -> { state, lastLogLines }
 * 3. apply_patch({ patchPath }) -> { ok }
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

// Run state storage
interface RunState {
  runId: string
  state: "pending" | "running" | "completed" | "failed"
  task: string
  acceptance: string
  branch: string
  startedAt: Date
  completedAt?: Date
  lastLogLines: string[]
  error?: string
}

const runs: Map<string, RunState> = new Map()
let currentRunId: string | null = null

// Tool definitions - exactly 3 tools
const tools = [
  {
    name: "run_workflow",
    description: `Execute a development task autonomously. Returns artifacts (patch.diff, test.log, summary.md).

Call this with task + acceptance criteria. The loop runs until tests pass or it fails.
Returns structured output - never asks questions.

Example:
  run_workflow({
    task: "Add dark mode toggle",
    acceptance: "Toggle in settings, persists to localStorage"
  })`,
    inputSchema: {
      type: "object" as const,
      properties: {
        task: {
          type: "string",
          description: "Task description",
        },
        acceptance: {
          type: "string",
          description: "Acceptance criteria",
        },
        branch: {
          type: "string",
          description: "Branch name (auto-generated if not provided)",
        },
      },
      required: ["task", "acceptance"],
    },
  },
  {
    name: "get_status",
    description: "Get status of a running or completed workflow",
    inputSchema: {
      type: "object" as const,
      properties: {
        runId: {
          type: "string",
          description: "Run ID (omit for current/latest run)",
        },
      },
    },
  },
  {
    name: "apply_patch",
    description: "Apply a patch file to the codebase",
    inputSchema: {
      type: "object" as const,
      properties: {
        patchPath: {
          type: "string",
          description: "Path to patch file (default: artifacts/patch.diff)",
          default: "artifacts/patch.diff",
        },
      },
    },
  },
]

interface WorkflowArtifacts {
  patch: string | null
  testLog: string | null
  summary: string | null
  status: string | null
  filesChanged: string[]
}

async function readArtifacts(): Promise<WorkflowArtifacts> {
  const artifactsDir = path.join(process.cwd(), "artifacts")
  
  const readFile = async (name: string): Promise<string | null> => {
    try {
      return await fs.readFile(path.join(artifactsDir, name), "utf-8")
    } catch {
      return null
    }
  }

  const patch = await readFile("patch.diff")
  const testLog = await readFile("test.log")
  const summary = await readFile("summary.md")
  const status = await readFile("status.txt")

  const filesChanged = status
    ? status.split("\n").filter(Boolean).map(line => line.slice(3).trim())
    : []

  return { patch, testLog, summary, status, filesChanged }
}

async function runWorkflow(
  task: string,
  acceptance: string,
  branch?: string
): Promise<{ ok: boolean; runId: string; artifacts: WorkflowArtifacts; error?: string }> {
  
  const runId = `run-${Date.now()}`
  const branchName = branch || `feature/${task.toLowerCase().replace(/[^a-z0-9]+/g, "-").slice(0, 30)}`

  const state: RunState = {
    runId,
    state: "running",
    task,
    acceptance,
    branch: branchName,
    startedAt: new Date(),
    lastLogLines: [],
  }

  runs.set(runId, state)
  currentRunId = runId

  try {
    // Call the runner directly (fastest path - no n8n)
    const cmd = `npx tsx tools/runner/run-workflow.ts --task "${task.replace(/"/g, '\\"')}" --acceptance "${acceptance.replace(/"/g, '\\"')}" --branch "${branchName}"`

    state.lastLogLines.push(`>>> ${cmd}`)

    const { stdout, stderr } = await execAsync(cmd, {
      cwd: process.cwd(),
      maxBuffer: 10 * 1024 * 1024,
      timeout: 300000, // 5 minute timeout
    })

    // Capture last 50 log lines
    const allOutput = (stdout + "\n" + stderr).split("\n")
    state.lastLogLines = allOutput.slice(-50)

    state.state = "completed"
    state.completedAt = new Date()

    const artifacts = await readArtifacts()

    return { ok: true, runId, artifacts }

  } catch (err: unknown) {
    const error = err as { stdout?: string; stderr?: string; message: string }

    state.state = "failed"
    state.error = error.message
    state.completedAt = new Date()

    if (error.stdout || error.stderr) {
      const allOutput = ((error.stdout || "") + "\n" + (error.stderr || "")).split("\n")
      state.lastLogLines = allOutput.slice(-50)
    }

    const artifacts = await readArtifacts()

    return { ok: false, runId, artifacts, error: error.message }
  }
}

async function getStatus(runId?: string): Promise<RunState | null> {
  const id = runId || currentRunId
  if (!id) return null
  return runs.get(id) || null
}

async function applyPatch(patchPath: string = "artifacts/patch.diff"): Promise<{ ok: boolean; message: string }> {
  const fullPath = path.isAbsolute(patchPath)
    ? patchPath
    : path.join(process.cwd(), patchPath)

  try {
    await fs.access(fullPath)
  } catch {
    return { ok: false, message: `Patch file not found: ${fullPath}` }
  }

  try {
    // Check if patch applies cleanly
    await execAsync(`git apply --check "${fullPath}"`, { cwd: process.cwd() })

    // Apply the patch
    const { stdout } = await execAsync(`git apply "${fullPath}"`, { cwd: process.cwd() })

    return { ok: true, message: `Patch applied successfully: ${patchPath}\n${stdout}` }

  } catch (err: unknown) {
    const error = err as Error
    return { ok: false, message: `Failed to apply patch: ${error.message}` }
  }
}

// Create MCP server
const server = new Server(
  {
    name: "notroom-local-loop",
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
        const task = args?.task as string
        const acceptance = args?.acceptance as string
        const branch = args?.branch as string | undefined

        if (!task || !acceptance) {
          return {
            content: [{ type: "text" as const, text: "Error: task and acceptance are required" }],
            isError: true,
          }
        }

        const result = await runWorkflow(task, acceptance, branch)

        // Format response
        let response = `## ${result.ok ? "✅ Workflow Completed" : "❌ Workflow Failed"}\n\n`
        response += `**Run ID:** ${result.runId}\n\n`

        if (result.error) {
          response += `**Error:** ${result.error}\n\n`
        }

        if (result.artifacts.summary) {
          response += `### Summary\n${result.artifacts.summary}\n\n`
        }

        if (result.artifacts.filesChanged.length > 0) {
          response += `### Files Changed (${result.artifacts.filesChanged.length})\n`
          response += result.artifacts.filesChanged.map(f => `- \`${f}\``).join("\n")
          response += "\n\n"
        }

        if (result.artifacts.patch) {
          const patchPreview = result.artifacts.patch.slice(0, 4000)
          const truncated = result.artifacts.patch.length > 4000
          response += `### Patch (\`artifacts/patch.diff\`)\n\`\`\`diff\n${patchPreview}${truncated ? "\n... (truncated, see full file)" : ""}\n\`\`\`\n\n`
        }

        if (result.artifacts.testLog) {
          const logPreview = result.artifacts.testLog.slice(-2000)
          response += `### Test Log (last 2000 chars)\n\`\`\`\n${logPreview}\n\`\`\`\n`
        }

        return {
          content: [{ type: "text" as const, text: response }],
          isError: !result.ok,
        }
      }

      case "get_status": {
        const state = await getStatus(args?.runId as string | undefined)

        if (!state) {
          return {
            content: [{ type: "text" as const, text: "No workflow runs found" }],
          }
        }

        const response = {
          runId: state.runId,
          state: state.state,
          task: state.task,
          branch: state.branch,
          startedAt: state.startedAt.toISOString(),
          completedAt: state.completedAt?.toISOString(),
          error: state.error,
          lastLogLines: state.lastLogLines.slice(-20),
        }

        return {
          content: [{ type: "text" as const, text: JSON.stringify(response, null, 2) }],
        }
      }

      case "apply_patch": {
        const result = await applyPatch(args?.patchPath as string)

        return {
          content: [{ type: "text" as const, text: result.ok ? `✅ ${result.message}` : `❌ ${result.message}` }],
          isError: !result.ok,
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
  console.error("Notroom MCP server (local-loop) running on stdio")
}

main().catch(console.error)
