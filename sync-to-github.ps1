# PowerShell script to sync local changes to GitHub
# Usage: .\sync-to-github.ps1 "Your commit message"

param(
    [Parameter(Mandatory=$false)]
    [string]$Message = "Update project files"
)

Write-Host "[SYNC] Syncing changes to GitHub..." -ForegroundColor Cyan

# Check if there are any changes
$status = git status --porcelain
if ([string]::IsNullOrWhiteSpace($status)) {
    Write-Host "[OK] No changes to commit. Working tree is clean." -ForegroundColor Green
    exit 0
}

# Show what will be committed
Write-Host "`n[INFO] Changes to be committed:" -ForegroundColor Yellow
git status --short

# Add all changes
Write-Host "`n[STAGE] Staging all changes..." -ForegroundColor Cyan
git add .

# Commit changes
Write-Host "[COMMIT] Committing changes..." -ForegroundColor Cyan
git commit -m $Message

if ($LASTEXITCODE -ne 0) {
    Write-Host "[ERROR] Commit failed!" -ForegroundColor Red
    exit 1
}

# Push to GitHub
Write-Host "[PUSH] Pushing to GitHub..." -ForegroundColor Cyan
git push origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host "`n[SUCCESS] Successfully synced to GitHub!" -ForegroundColor Green
    Write-Host "[LINK] Repository: https://github.com/pinohu/erie-notroom" -ForegroundColor Cyan
} else {
    Write-Host "`n[ERROR] Push failed! Check your Git credentials." -ForegroundColor Red
    exit 1
}

