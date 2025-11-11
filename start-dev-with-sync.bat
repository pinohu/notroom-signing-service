@echo off
REM Start Development Server with Auto-Sync (Windows Batch)
REM Double-click this file to start dev server + auto-sync

echo.
echo Starting development environment...
echo.

REM Start auto-sync in background
start "Auto-Sync Watcher" /min powershell.exe -File "%~dp0auto-sync.ps1"

REM Wait a moment for auto-sync to start
timeout /t 2 /nobreak >nul

REM Start dev server
echo Starting Vite development server...
echo.
npm run dev

pause

