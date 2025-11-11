// Auto-sync script - Watches for file changes and automatically commits/pushes to GitHub
// Usage: node auto-sync.js

import { watch } from 'fs';
import { exec } from 'child_process';
import { promisify } from 'util';
import { resolve, relative } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const execAsync = promisify(exec);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = resolve(__dirname);

// Configuration
const DEBOUNCE_DELAY = 5000; // Wait 5 seconds after last change before committing
const IGNORE_PATTERNS = [
  /node_modules/,
  /\.git/,
  /dist/,
  /\.next/,
  /\.vite/,
  /\.cache/,
  /\.DS_Store/,
  /\.log$/,
  /\.lock$/,
  /bun\.lockb$/,
];

let changeTimer = null;
let isCommitting = false;
let pendingChanges = new Set();

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  cyan: '\x1b[36m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  gray: '\x1b[90m',
};

function log(message, color = 'reset') {
  const timestamp = new Date().toLocaleTimeString();
  console.log(`${colors.gray}[${timestamp}]${colors.reset} ${colors[color]}${message}${colors.reset}`);
}

function shouldIgnore(filePath) {
  const relativePath = relative(projectRoot, filePath);
  return IGNORE_PATTERNS.some(pattern => pattern.test(relativePath));
}

async function getCommitMessage(changedFiles) {
  const files = Array.from(changedFiles).slice(0, 5);
  const fileList = files.map(f => relative(projectRoot, f)).join(', ');
  const more = changedFiles.size > 5 ? ` and ${changedFiles.size - 5} more` : '';
  return `Auto-sync: Update ${fileList}${more}`;
}

async function syncToGitHub() {
  if (isCommitting) {
    log('Sync already in progress, skipping...', 'yellow');
    return;
  }

  isCommitting = true;
  const filesToCommit = new Set(pendingChanges);
  pendingChanges.clear();

  try {
    log(`[SYNC] Syncing ${filesToCommit.size} file(s) to GitHub...`, 'cyan');

    // Check if there are actual changes
    const { stdout: statusOutput } = await execAsync('git status --porcelain', { cwd: projectRoot });
    if (!statusOutput.trim()) {
      log('[OK] No changes to commit', 'green');
      isCommitting = false;
      return;
    }

    // Show what will be committed
    log('[INFO] Changes to be committed:', 'yellow');
    const { stdout: statusShort } = await execAsync('git status --short', { cwd: projectRoot });
    console.log(statusShort.trim());

    // Stage all changes
    log('[STAGE] Staging all changes...', 'cyan');
    await execAsync('git add .', { cwd: projectRoot });

    // Generate commit message
    const commitMessage = await getCommitMessage(filesToCommit);
    
    // Commit changes
    log('[COMMIT] Committing changes...', 'cyan');
    await execAsync(`git commit -m "${commitMessage.replace(/"/g, '\\"')}"`, { cwd: projectRoot });

    // Push to GitHub
    log('[PUSH] Pushing to GitHub...', 'cyan');
    await execAsync('git push origin main', { cwd: projectRoot });

    log('[SUCCESS] Successfully synced to GitHub!', 'green');
    log(`[LINK] Repository: https://github.com/pinohu/erie-notroom`, 'cyan');

  } catch (error) {
    log(`[ERROR] Sync failed: ${error.message}`, 'red');
    if (error.stdout) console.log(error.stdout);
    if (error.stderr) console.log(error.stderr);
  } finally {
    isCommitting = false;
  }
}

function handleFileChange(eventType, filename) {
  if (!filename) return;
  
  const filePath = resolve(projectRoot, filename);
  
  if (shouldIgnore(filePath)) {
    return;
  }

  pendingChanges.add(filePath);

  // Clear existing timer
  if (changeTimer) {
    clearTimeout(changeTimer);
  }

  // Set new timer
  changeTimer = setTimeout(() => {
    syncToGitHub();
  }, DEBOUNCE_DELAY);

  log(`[WATCH] File changed: ${relative(projectRoot, filePath)}`, 'gray');
}

function watchDirectory(dir, watcher) {
  watch(dir, { recursive: true }, (eventType, filename) => {
    if (filename) {
      handleFileChange(eventType, filename);
    }
  });
}

async function startWatcher() {
  log('🚀 Starting auto-sync watcher...', 'cyan');
  log(`📁 Watching: ${projectRoot}`, 'cyan');
  log(`⏱️  Debounce delay: ${DEBOUNCE_DELAY / 1000}s`, 'cyan');
  log('', 'reset');

  // Verify Git is initialized
  try {
    await execAsync('git status', { cwd: projectRoot });
  } catch (error) {
    log('[ERROR] Git repository not found. Please initialize Git first.', 'red');
    process.exit(1);
  }

  // Verify remote is configured
  try {
    const { stdout } = await execAsync('git remote get-url origin', { cwd: projectRoot });
    log(`🔗 Remote: ${stdout.trim()}`, 'cyan');
  } catch (error) {
    log('[WARNING] No remote configured. Auto-push will fail.', 'yellow');
  }

  log('', 'reset');
  log('✅ Watcher started. Making changes will auto-sync to GitHub.', 'green');
  log('Press Ctrl+C to stop.', 'gray');
  log('', 'reset');

  // Start watching
  watchDirectory(projectRoot);

  // Handle process termination
  process.on('SIGINT', () => {
    log('', 'reset');
    log('🛑 Stopping auto-sync watcher...', 'yellow');
    if (changeTimer) {
      clearTimeout(changeTimer);
    }
    process.exit(0);
  });
}

// Start the watcher
startWatcher().catch(error => {
  log(`[ERROR] Failed to start watcher: ${error.message}`, 'red');
  process.exit(1);
});

