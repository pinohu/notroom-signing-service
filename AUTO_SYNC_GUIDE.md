# 🚀 Automatic GitHub Sync Guide

This project includes automatic file watching that commits and pushes changes to GitHub automatically.

## Quick Start

### Option 1: PowerShell (Windows - Recommended)

```powershell
# Start auto-sync watcher
.\auto-sync.ps1
```

### Option 2: Node.js (Cross-platform)

```bash
# Start auto-sync watcher
npm run auto-sync
# or
node auto-sync.js
```

## How It Works

1. **Start the watcher** - Run one of the commands above
2. **Make changes** - Edit files in Cursor or any editor
3. **Save files** - The watcher detects changes
4. **Auto-commit** - After 5 seconds of no changes, it commits
5. **Auto-push** - Changes are automatically pushed to GitHub

## Features

✅ **Debounced commits** - Waits 5 seconds after your last change  
✅ **Smart ignoring** - Ignores `node_modules`, `.git`, `dist`, build files  
✅ **Automatic messages** - Generates commit messages from changed files  
✅ **Error handling** - Shows clear error messages if sync fails  
✅ **Non-blocking** - Runs in background, doesn't interfere with your work  

## Stopping Auto-Sync

Press `Ctrl+C` in the terminal where auto-sync is running.

## Configuration

### Change Debounce Delay

**PowerShell (`auto-sync.ps1`):**
```powershell
$DEBOUNCE_DELAY = 5000  # Change to desired milliseconds
```

**Node.js (`auto-sync.js`):**
```javascript
const DEBOUNCE_DELAY = 5000; // Change to desired milliseconds
```

### Ignore Additional Patterns

Add patterns to the `IGNORE_PATTERNS` array in either script.

## Troubleshooting

### Auto-sync not committing changes

1. **Check Git status**: Run `git status` to see if there are changes
2. **Check remote**: Run `git remote -v` to verify GitHub connection
3. **Check credentials**: Ensure Git credentials are configured
4. **Check logs**: Look at the console output for error messages

### Too many commits

- Increase the `DEBOUNCE_DELAY` to wait longer between commits
- Use manual sync (`.\sync-to-github.ps1`) for more control

### Auto-sync not detecting changes

- Ensure you're saving files (not just typing)
- Check that files aren't in ignored patterns
- Verify the watcher is running (check console output)

## Manual Sync (Alternative)

If you prefer manual control:

```powershell
# Quick sync script
.\sync-to-github.ps1 "Your commit message"

# Or use Git directly
git add .
git commit -m "Your commit message"
git push origin main
```

## Best Practices

1. **Start auto-sync at beginning of work session** - Keeps everything synced
2. **Stop auto-sync before major refactoring** - Use manual commits for large changes
3. **Review commits periodically** - Check GitHub to ensure commits look good
4. **Use descriptive manual commits** - For important changes, use manual sync with clear messages

## Repository

GitHub: https://github.com/pinohu/erie-notroom

---

**Happy coding! 🎉**

