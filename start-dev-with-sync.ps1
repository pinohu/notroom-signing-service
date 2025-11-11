# Start Development Server with Auto-Sync
# This script starts both the Vite dev server and the auto-sync watcher

Write-Host "🚀 Starting development environment..." -ForegroundColor Cyan
Write-Host ""

# Check if auto-sync is already running
$autoSyncProcess = Get-Process -Name "powershell" -ErrorAction SilentlyContinue | Where-Object {
    $_.CommandLine -like "*auto-sync.ps1*"
}

if ($autoSyncProcess) {
    Write-Host "⚠️  Auto-sync is already running!" -ForegroundColor Yellow
    Write-Host ""
} else {
    Write-Host "📡 Starting auto-sync watcher..." -ForegroundColor Cyan
    
    # Start auto-sync in a new PowerShell window
    Start-Process powershell -ArgumentList "-NoExit", "-File", "$PSScriptRoot\auto-sync.ps1" -WindowStyle Minimized
    
    Write-Host "✅ Auto-sync started in background window" -ForegroundColor Green
    Write-Host ""
}

# Start Vite dev server
Write-Host "⚡ Starting Vite development server..." -ForegroundColor Cyan
Write-Host ""
Write-Host "💡 Tip: Auto-sync will automatically commit & push changes to GitHub" -ForegroundColor Gray
Write-Host "💡 Tip: Press Ctrl+C to stop the dev server (auto-sync keeps running)" -ForegroundColor Gray
Write-Host ""

npm run dev

