# 🔄 Automatic GitHub Sync - Auto-Start Guide

Your project now has **automatic GitHub syncing** that can start automatically!

---

## 🚀 Quick Start Options

### Option 1: Start Dev Server + Auto-Sync Together (Recommended)

**Double-click:** `start-dev-with-sync.bat`

This will:
- ✅ Start the auto-sync watcher in background
- ✅ Start your Vite dev server
- ✅ Both run together automatically

**Or use PowerShell:**
```powershell
npm run dev:sync
```

---

### Option 2: Start Auto-Sync Only

**Double-click:** `start-auto-sync.bat`

This starts just the auto-sync watcher (useful if dev server is already running).

**Or use command line:**
```powershell
.\auto-sync.ps1
# or
npm run auto-sync:ps
```

---

### Option 3: Start Auto-Sync on Windows Startup

**Make auto-sync start automatically when Windows starts:**

1. **Press `Win + R`** to open Run dialog
2. Type: `shell:startup` and press Enter
3. **Create a shortcut:**
   - Right-click in the Startup folder
   - New → Shortcut
   - Browse to: `C:\Users\polyc\Documents\GitHub\erie-notroom\start-auto-sync.bat`
   - Name it: "Notroom Auto-Sync"
   - Click Finish

**Now auto-sync will start automatically every time you log in!**

---

## 🎯 How It Works

### When Auto-Sync is Running:

1. **You edit files** in Cursor/your editor
2. **You save files**
3. **Auto-sync detects changes** (watches file system)
4. **Waits 5 seconds** after your last change (debounce)
5. **Automatically commits** with descriptive message
6. **Automatically pushes** to GitHub
7. **Vercel detects push** (if configured)
8. **Site deploys automatically** 🎉

**You don't need to do anything!** Just save your files.

---

## 📋 What Gets Synced

**Auto-sync watches:**
- ✅ All files in your project
- ✅ Changes to `.tsx`, `.ts`, `.css`, `.json`, etc.
- ✅ New files you create
- ✅ Files you delete

**Auto-sync ignores:**
- ❌ `node_modules/` folder
- ❌ `.git/` folder
- ❌ `dist/` build folder
- ❌ `.log` files
- ❌ Lock files (`package-lock.json`, `bun.lockb`)

---

## 🛑 Stopping Auto-Sync

### If Started via Batch File:
- Close the PowerShell window that's running auto-sync

### If Started via npm script:
- Press `Ctrl+C` in the terminal

### If Running in Background:
1. Open Task Manager (`Ctrl+Shift+Esc`)
2. Find "Windows PowerShell" processes
3. Look for one running `auto-sync.ps1`
4. End the process

---

## 🔍 Check if Auto-Sync is Running

**Look for:**
- A minimized PowerShell window
- Console output showing `[WATCH] File changed:` messages
- Recent commits in GitHub (check your repo)

**Or check Task Manager:**
- Look for PowerShell processes
- Check command line for `auto-sync.ps1`

---

## ⚙️ Configuration

### Change Debounce Delay

Edit `auto-sync.ps1`:
```powershell
$DEBOUNCE_DELAY = 5000  # Change to desired milliseconds (default: 5 seconds)
```

**Recommendations:**
- `3000` (3 seconds) - Faster commits, more frequent pushes
- `5000` (5 seconds) - Balanced (default)
- `10000` (10 seconds) - Slower, batches more changes

### Ignore Additional Files

Edit `auto-sync.ps1`:
```powershell
$IGNORE_PATTERNS = @(
    "node_modules",
    "\.git",
    "dist",
    "your-custom-pattern",  # Add your patterns here
)
```

---

## 🎨 Development Workflow

### Recommended Workflow:

1. **Start your day:**
   ```powershell
   # Option A: Start everything together
   npm run dev:sync
   
   # Option B: Start separately
   npm run dev          # Terminal 1
   npm run auto-sync:ps # Terminal 2
   ```

2. **Work normally:**
   - Edit files in Cursor
   - Save files
   - Auto-sync handles GitHub commits/pushes

3. **End of day:**
   - Stop dev server (`Ctrl+C`)
   - Close auto-sync window (if separate)

---

## 🚨 Troubleshooting

### Auto-Sync Not Committing Changes

**Check:**
1. Is auto-sync actually running? (check Task Manager)
2. Are you saving files? (auto-sync only detects saved changes)
3. Check console output for errors
4. Verify Git is configured correctly: `git remote -v`

### Too Many Commits

**Solution:**
- Increase `DEBOUNCE_DELAY` in `auto-sync.ps1`
- Or use manual sync for important changes: `.\sync-to-github.ps1 "Important change"`

### Auto-Sync Window Closes Immediately

**Solution:**
- Make sure PowerShell execution policy allows scripts:
  ```powershell
  Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
  ```

### Changes Not Pushing to GitHub

**Check:**
1. Git credentials configured?
2. Remote URL correct? (`git remote -v`)
3. Check console for error messages
4. Try manual push: `git push origin main`

---

## 💡 Pro Tips

1. **Use manual sync for important changes:**
   ```powershell
   .\sync-to-github.ps1 "Major feature: Add new component"
   ```

2. **Check GitHub before important work:**
   - Verify your last auto-sync worked
   - Review recent commits

3. **Stop auto-sync before major refactoring:**
   - Use manual commits for large changes
   - Restart auto-sync after

4. **Monitor auto-sync:**
   - Keep the window visible (don't minimize) to see activity
   - Or check GitHub commits regularly

---

## 📊 Complete Automation Flow

```
You edit files in Cursor
    ↓
Save files (Ctrl+S)
    ↓
Auto-sync detects changes
    ↓
Waits 5 seconds (debounce)
    ↓
Auto-commits to Git
    ↓
Auto-pushes to GitHub
    ↓
Vercel detects push (if configured)
    ↓
Auto-deploys to production
    ↓
Your site updates automatically! 🎉
```

**Zero manual steps!** Just save your files.

---

## ✅ Quick Reference

**Start Everything:**
- Double-click: `start-dev-with-sync.bat`
- Or: `npm run dev:sync`

**Start Auto-Sync Only:**
- Double-click: `start-auto-sync.bat`
- Or: `npm run auto-sync:ps`
- Or: `.\auto-sync.ps1`

**Manual Sync:**
- `.\sync-to-github.ps1 "Your commit message"`

**Stop Auto-Sync:**
- Close the PowerShell window
- Or end process in Task Manager

---

**Setup Complete!** 🎉

Your development environment now automatically syncs to GitHub on every file save!

