// tools/mcp/server.ts
// Windows-safe MCP server for Notroom local loop

import { spawn } from "node:child_process";
import * as fs from "node:fs";
import * as path from "node:path";

// MCP TypeScript SDK (official)
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

type RunWorkflowArgs = {
  task: string;
  acceptance?: string;
  branch?: string;
};

const repoRoot = process.cwd();
const artifactsDir = path.join(repoRoot, "artifacts");

function run(cmd: string, args: string[], opts: { cwd?: string } = {}) {
  return new Promise<{ code: number; stdout: string; stderr: string }>((resolve) => {
    const child = spawn(cmd, args, {
      cwd: opts.cwd ?? repoRoot,
      shell: true, // important for Windows
      env: process.env,
    });

    let stdout = "";
    let stderr = "";

    child.stdout.on("data", (d) => (stdout += d.toString()));
    child.stderr.on("data", (d) => (stderr += d.toString()));

    child.on("close", (code) => resolve({ code: code ?? 0, stdout, stderr }));
  });
}

function safeRead(filePath: string) {
  try {
    return fs.readFileSync(filePath, "utf8");
  } catch {
    return "";
  }
}

const server = new Server(
  { name: "notroom-local-loop", version: "1.0.0" },
  { capabilities: { tools: {} } }
);

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "run_workflow",
        description:
          "Runs the local Notroom workflow runner (pnpm workflow) and returns patch + logs from artifacts/.",
        inputSchema: {
          type: "object",
          properties: {
            task: { type: "string" },
            acceptance: { type: "string" },
            branch: { type: "string" },
          },
          required: ["task"],
        },
      },
      {
        name: "read_artifacts",
        description: "Reads artifacts produced by the workflow (patch.diff, summary.md, test.log).",
        inputSchema: {
          type: "object",
          properties: {},
          required: [],
        },
      },
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (req) => {
  if (req.params.name === "run_workflow") {
    const args = req.params.arguments as RunWorkflowArgs;

    // Ensure artifacts folder exists
    fs.mkdirSync(artifactsDir, { recursive: true });

    // Run your existing runner
    // We pass task/acceptance/branch as CLI args
    const cmd = "pnpm";
    const cmdArgs = [
      "-s",
      "workflow",
      "--",
      "--task",
      JSON.stringify(args.task),
      ...(args.acceptance ? ["--acceptance", JSON.stringify(args.acceptance)] : []),
      ...(args.branch ? ["--branch", JSON.stringify(args.branch)] : []),
    ];

    const result = await run(cmd, cmdArgs);

    const patch = safeRead(path.join(artifactsDir, "patch.diff"));
    const summary = safeRead(path.join(artifactsDir, "summary.md"));
    const testLog = safeRead(path.join(artifactsDir, "test.log"));

    const ok = result.code === 0;

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(
            {
              ok,
              exitCode: result.code,
              runnerStdout: result.stdout.slice(-8000),
              runnerStderr: result.stderr.slice(-8000),
              artifacts: {
                patchDiff: patch.slice(0, 200000),
                summaryMd: summary.slice(0, 200000),
                testLog: testLog.slice(0, 200000),
              },
            },
            null,
            2
          ),
        },
      ],
    };
  }

  if (req.params.name === "read_artifacts") {
    const patch = safeRead(path.join(artifactsDir, "patch.diff"));
    const summary = safeRead(path.join(artifactsDir, "summary.md"));
    const testLog = safeRead(path.join(artifactsDir, "test.log"));

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(
            {
              artifacts: { patchDiff: patch, summaryMd: summary, testLog },
            },
            null,
            2
          ),
        },
      ],
    };
  }

  throw new Error(`Unknown tool: ${req.params.name}`);
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
