// tools/runner/run-workflow.ts
/* eslint-disable no-console */
import { spawn } from "node:child_process";
import * as fs from "node:fs";
import * as path from "node:path";

type Step = {
  name: string;
  cmd: string;
  canFix?: boolean;
};

const repoRoot = process.cwd();
const artifactsDir = path.join(repoRoot, "artifacts");
const testLogPath = path.join(artifactsDir, "test.log");

const WORKFLOWS: Record<string, Step[]> = {
  lint: [{ name: "ESLint", cmd: "pnpm -s lint", canFix: true }],
  typecheck: [{ name: "TypeScript", cmd: "pnpm -s typecheck" }],
  test: [{ name: "Tests", cmd: "pnpm -s test" }],
  build: [{ name: "Build", cmd: "pnpm -s build" }],
  doctor: [{ name: "Environment Check", cmd: "pnpm -s doctor" }],
};

// full = lint + typecheck + test + build
WORKFLOWS.full = [
  ...WORKFLOWS.lint,
  ...WORKFLOWS.typecheck,
  ...WORKFLOWS.test,
  ...WORKFLOWS.build,
];

function ensureArtifactsDir() {
  fs.mkdirSync(artifactsDir, { recursive: true });
}

function nowIso() {
  return new Date().toISOString();
}

function appendLog(lines: string[], chunk: string) {
  // keep CRLF friendly in Windows
  lines.push(chunk.replace(/\r?\n/g, "\n"));
}

function writeTestLog(lines: string[]) {
  ensureArtifactsDir();
  fs.writeFileSync(testLogPath, lines.join(""), "utf8");
}

function safeJsonDecodeMaybe(value?: string): string | undefined {
  if (!value) return value;
  const trimmed = value.trim();
  // MCP call passes JSON.stringify("...") sometimes -> "\"text\""
  if ((trimmed.startsWith('"') && trimmed.endsWith('"')) || trimmed.startsWith("{") || trimmed.startsWith("[")) {
    try {
      const parsed = JSON.parse(trimmed);
      return typeof parsed === "string" ? parsed : JSON.stringify(parsed);
    } catch {
      return value;
    }
  }
  return value;
}

function parseArgs(argv: string[]) {
  // Supports:
  // pnpm workflow full --fix
  // pnpm workflow lint
  // pnpm workflow -- --task "..." --acceptance "..." --branch "..."
  //
  // pnpm adds its own args; we only look at process.argv.slice(2)
  const out: {
    workflow?: string;
    fix?: boolean;
    task?: string;
    acceptance?: string;
    branch?: string;
  } = {};

  // If args include "--", treat everything after as "task mode args"
  const dd = argv.indexOf("--");
  const left = dd >= 0 ? argv.slice(0, dd) : argv.slice();
  const right = dd >= 0 ? argv.slice(dd + 1) : [];

  // left side: workflow name + flags
  // Example: ["full", "--fix"]
  if (left.length > 0 && !left[0].startsWith("-")) out.workflow = left[0];
  out.fix = left.includes("--fix") || left.includes("-f");

  // right side: --task, --acceptance, --branch
  for (let i = 0; i < right.length; i++) {
    const a = right[i];
    const next = right[i + 1];
    if (a === "--task" && next) {
      out.task = safeJsonDecodeMaybe(next);
      i++;
    } else if (a === "--acceptance" && next) {
      out.acceptance = safeJsonDecodeMaybe(next);
      i++;
    } else if (a === "--branch" && next) {
      out.branch = safeJsonDecodeMaybe(next);
      i++;
    }
  }

  return out;
}

function runCommand(cmd: string, log: string[], opts?: { cwd?: string }) {
  return new Promise<{ code: number; stdout: string; stderr: string }>((resolve) => {
    const child = spawn(cmd, {
      cwd: opts?.cwd ?? repoRoot,
      shell: true, // Windows-safe
      env: process.env,
    });

    let stdout = "";
    let stderr = "";

    child.stdout.on("data", (d) => {
      const s = d.toString();
      stdout += s;
      appendLog(log, s);
    });

    child.stderr.on("data", (d) => {
      const s = d.toString();
      stderr += s;
      appendLog(log, s);
    });

    child.on("close", (code) => resolve({ code: code ?? 0, stdout, stderr }));
  });
}

async function gitCheckoutBranch(branch: string, log: string[]) {
  // Create if not exists, otherwise checkout
  appendLog(log, `\n[${nowIso()}] Git: checkout branch ${branch}\n`);
  const r1 = await runCommand(`git checkout ${branch}`, log);
  if (r1.code === 0) return;
  await runCommand(`git checkout -b ${branch}`, log);
}

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

function defaultBranchFromTask(task: string) {
  return `feature/${slugify(task) || "task"}`;
}

async function maybeFixLint(step: Step, log: string[]) {
  // Try to run ESLint with --fix using pnpm script passthrough
  // Your lint script is "eslint", so: pnpm -s lint -- --fix
  appendLog(log, `\n[${nowIso()}] Attempting auto-fix: ${step.name}\n`);
  return runCommand(`pnpm -s lint -- --fix`, log);
}

async function runWorkflow(workflowName: string, fix: boolean, log: string[]) {
  const steps = WORKFLOWS[workflowName];
  if (!steps) {
    throw new Error(
      `Unknown workflow "${workflowName}". Available: ${Object.keys(WORKFLOWS).sort().join(", ")}`
    );
  }

  for (const step of steps) {
    appendLog(log, `\n============================================================\n`);
    appendLog(log, `[${nowIso()}] STEP: ${step.name}\n`);
    appendLog(log, `CMD: ${step.cmd}\n`);
    appendLog(log, `============================================================\n`);

    const r = await runCommand(step.cmd, log);

    if (r.code === 0) {
      appendLog(log, `\n[${nowIso()}] OK: ${step.name}\n`);
      continue;
    }

    appendLog(log, `\n[${nowIso()}] FAIL (${r.code}): ${step.name}\n`);

    if (fix && step.canFix) {
      const fixRes = await maybeFixLint(step, log);
      if (fixRes.code === 0) {
        appendLog(log, `\n[${nowIso()}] Auto-fix succeeded. Re-running: ${step.name}\n`);
        const rerun = await runCommand(step.cmd, log);
        if (rerun.code === 0) {
          appendLog(log, `\n[${nowIso()}] OK after fix: ${step.name}\n`);
          continue;
        }
        appendLog(log, `\n[${nowIso()}] Still failing after fix: ${step.name}\n`);
        throw new Error(`Step failed after fix: ${step.name}`);
      } else {
        appendLog(log, `\n[${nowIso()}] Auto-fix failed (${fixRes.code}): ${step.name}\n`);
        throw new Error(`Auto-fix failed: ${step.name}`);
      }
    }

    throw new Error(`Step failed: ${step.name}`);
  }
}

async function generateArtifacts(log: string[]) {
  appendLog(log, `\n[${nowIso()}] Generating artifacts via pnpm patch\n`);
  const r = await runCommand(`pnpm -s patch`, log);
  if (r.code !== 0) {
    throw new Error("Artifact generation failed: pnpm patch");
  }
}

async function main() {
  ensureArtifactsDir();

  const log: string[] = [];
  appendLog(log, `\n[${nowIso()}] Notroom workflow runner starting...\n`);

  const args = parseArgs(process.argv.slice(2));

  // Decide mode:
  // - Task mode: if --task provided, default workflow = full
  // - Manual mode: workflow name is first arg
  const isTaskMode = !!args.task;

  const workflowName = args.workflow ?? (isTaskMode ? "full" : "full");
  const fix = !!args.fix;

  if (isTaskMode) {
    appendLog(log, `\n[${nowIso()}] MODE: task\n`);
    appendLog(log, `Task: ${args.task}\n`);
    if (args.acceptance) appendLog(log, `Acceptance: ${args.acceptance}\n`);

    const branch = args.branch || defaultBranchFromTask(args.task!);
    await gitCheckoutBranch(branch, log);

    // In task mode, we DO NOT implement code changes here
    // because Cursor Agent performs edits. This runner is the verifier + artifact producer.
    // If you later add an "agent CLI" step, it would go here.
  } else {
    appendLog(log, `\n[${nowIso()}] MODE: manual\n`);
  }

  try {
    await runWorkflow(workflowName, fix, log);
    await generateArtifacts(log);

    appendLog(log, `\n[${nowIso()}] DONE: workflow=${workflowName}\n`);
    writeTestLog(log);
    process.exit(0);
  } catch (err: any) {
    appendLog(log, `\n[${nowIso()}] ERROR: ${err?.message || String(err)}\n`);
    // still try to generate patch artifacts so Cursor can inspect partial changes
    try {
      await generateArtifacts(log);
    } catch (e: any) {
      appendLog(log, `\n[${nowIso()}] (artifact generation also failed): ${e?.message || String(e)}\n`);
    }
    writeTestLog(log);
    process.exit(1);
  }
}

main().catch((e) => {
  try {
    ensureArtifactsDir();
    fs.writeFileSync(
      testLogPath,
      `\n[${nowIso()}] FATAL: ${e?.message || String(e)}\n`,
      "utf8"
    );
  } catch {
    // ignore
  }
  console.error(e);
  process.exit(1);
});
