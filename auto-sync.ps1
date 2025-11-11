# PowerShell Auto-Sync Script - Watches for file changes and automatically commits/pushes to GitHub
# Usage: .\auto-sync.ps1

$ErrorActionPreference = "Stop"

# Configuration
$DEBOUNCE_DELAY = 5000  # Wait 5 seconds after last change before committing
$IGNORE_PATTERNS = @(
    "node_modules",
    "\.git",
    "dist",
    "\.next",
    "\.vite",
    "\.cache",
    "\.DS_Store",
    "\.log$",
    "\.lock$",
    "bun\.lockb$"
)

$script:changeTimer = $null
$script:isCommitting = $false
$script:pendingChanges = @()

function Write-ColorOutput {
    param(
        [string]$Message,
        [string]$Color = "White"
    )
    $timestamp = Get-Date -Format "HH:mm:ss"
    Write-Host "[$timestamp] " -NoNewline -ForegroundColor Gray
    Write-Host $Message -ForegroundColor $Color
}

function Should-Ignore {
    param([string]$FilePath)
    
    $relativePath = $FilePath.Replace($PWD.Path + "\", "").Replace($PWD.Path + "/", "")
    
    foreach ($pattern in $IGNORE_PATTERNS) {
        if ($relativePath -match $pattern) {
            return $true
        }
    }
    return $false
}

function Get-CommitMessage {
    param([array]$ChangedFiles)
    
    $fileCount = $ChangedFiles.Count
    $fileList = ($ChangedFiles | Select-Object -First 5 | ForEach-Object { 
        $_.Replace($PWD.Path + "\", "").Replace($PWD.Path + "/", "")
    }) -join ", "
    
    if ($fileCount -gt 5) {
        return "Auto-sync: Update $fileList and $($fileCount - 5) more"
    } else {
        return "Auto-sync: Update $fileList"
    }
}

function Sync-ToGitHub {
    if ($script:isCommitting) {
        Write-ColorOutput "Sync already in progress, skipping..." "Yellow"
        return
    }

    $script:isCommitting = $true
    $filesToCommit = $script:pendingChanges.Clone()
    $script:pendingChanges = @()

    try {
        Write-ColorOutput "[SYNC] Syncing $($filesToCommit.Count) file(s) to GitHub..." "Cyan"

        # Check if there are actual changes
        $statusOutput = git status --porcelain 2>&1
        if (-not $statusOutput) {
            Write-ColorOutput "[OK] No changes to commit" "Green"
            $script:isCommitting = $false
            return
        }

        # Show what will be committed
        Write-ColorOutput "[INFO] Changes to be committed:" "Yellow"
        git status --short

        # Stage all changes
        Write-ColorOutput "[STAGE] Staging all changes..." "Cyan"
        git add . 2>&1 | Out-Null

        # Generate commit message
        $commitMessage = Get-CommitMessage -ChangedFiles $filesToCommit
        
        # Commit changes
        Write-ColorOutput "[COMMIT] Committing changes..." "Cyan"
        git commit -m $commitMessage 2>&1 | Out-Null

        if ($LASTEXITCODE -ne 0) {
            throw "Commit failed"
        }

        # Push to GitHub
        Write-ColorOutput "[PUSH] Pushing to GitHub..." "Cyan"
        git push origin main 2>&1 | Out-Null

        if ($LASTEXITCODE -eq 0) {
            Write-ColorOutput "[SUCCESS] Successfully synced to GitHub!" "Green"
            Write-ColorOutput "[LINK] Repository: https://github.com/pinohu/erie-notroom" "Cyan"
        } else {
            throw "Push failed"
        }

    } catch {
        Write-ColorOutput "[ERROR] Sync failed: $_" "Red"
    } finally {
        $script:isCommitting = $false
    }
}

function Handle-FileChange {
    param(
        [string]$FilePath
    )

    if (Should-Ignore -FilePath $FilePath) {
        return
    }

    if ($script:pendingChanges -notcontains $FilePath) {
        $script:pendingChanges += $FilePath
    }

    # Clear existing timer
    if ($script:changeTimer) {
        $script:changeTimer.Dispose()
    }

    # Set new timer
    $script:changeTimer = New-Object System.Timers.Timer
    $script:changeTimer.Interval = $DEBOUNCE_DELAY
    $script:changeTimer.AutoReset = $false
    $script:changeTimer.Add_Elapsed({
        Sync-ToGitHub
        $script:changeTimer.Dispose()
        $script:changeTimer = $null
    })
    $script:changeTimer.Start()

    $relativePath = $FilePath.Replace($PWD.Path + "\", "").Replace($PWD.Path + "/", "")
    Write-ColorOutput "[WATCH] File changed: $relativePath" "Gray"
}

function Start-Watcher {
    Write-ColorOutput "Starting auto-sync watcher..." "Cyan"
    Write-ColorOutput "Watching: $PWD" "Cyan"
    Write-ColorOutput "Debounce delay: $($DEBOUNCE_DELAY / 1000)s" "Cyan"
    Write-Host ""

    # Verify Git is initialized
    try {
        git status 2>&1 | Out-Null
        if ($LASTEXITCODE -ne 0) {
            throw "Git not initialized"
        }
    } catch {
        Write-ColorOutput "[ERROR] Git repository not found. Please initialize Git first." "Red"
        exit 1
    }

    # Verify remote is configured
    try {
        $remoteUrl = git remote get-url origin 2>&1
        if ($LASTEXITCODE -eq 0) {
            Write-ColorOutput "Remote: $remoteUrl" "Cyan"
        } else {
            Write-ColorOutput "[WARNING] No remote configured. Auto-push will fail." "Yellow"
        }
    } catch {
        Write-ColorOutput "[WARNING] No remote configured. Auto-push will fail." "Yellow"
    }

    Write-Host ""
    Write-ColorOutput "Watcher started. Making changes will auto-sync to GitHub." "Green"
    Write-ColorOutput "Press Ctrl+C to stop." "Gray"
    Write-Host ""

    # Create FileSystemWatcher
    $watcher = New-Object System.IO.FileSystemWatcher
    $watcher.Path = $PWD.Path
    $watcher.IncludeSubdirectories = $true
    $watcher.EnableRaisingEvents = $true
    $watcher.NotifyFilter = [System.IO.NotifyFilters]::LastWrite -bor 
                            [System.IO.NotifyFilters]::FileName -bor
                            [System.IO.NotifyFilters]::DirectoryName

    # Register event handlers
    $action = {
        $path = $Event.SourceEventArgs.FullPath
        $changeType = $Event.SourceEventArgs.ChangeType
        Handle-FileChange -FilePath $path
    }

    Register-ObjectEvent -InputObject $watcher -EventName "Changed" -Action $action | Out-Null
    Register-ObjectEvent -InputObject $watcher -EventName "Created" -Action $action | Out-Null
    Register-ObjectEvent -InputObject $watcher -EventName "Deleted" -Action $action | Out-Null
    Register-ObjectEvent -InputObject $watcher -EventName "Renamed" -Action $action | Out-Null

    # Handle process termination
    [Console]::TreatControlCAsInput = $false
    
    # Keep script running
    try {
        while ($true) {
            Start-Sleep -Seconds 1
        }
    } catch {
        # Handle any errors
    } finally {
        Write-Host ""
        Write-ColorOutput "Stopping auto-sync watcher..." "Yellow"
        if ($script:changeTimer) {
            $script:changeTimer.Dispose()
        }
        $watcher.Dispose()
    }
}

# Start the watcher
Start-Watcher

