@echo off
REM Quick Start: Auto-Sync Only
REM Double-click this to start just the auto-sync watcher

echo.
echo Starting auto-sync watcher...
echo.
echo This will watch for file changes and automatically push to GitHub.
echo Close this window to stop auto-sync.
echo.

powershell.exe -File "%~dp0auto-sync.ps1"

pause

