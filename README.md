# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/4e5e19c0-a121-4703-b8f4-0f5b133d5c62

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/4e5e19c0-a121-4703-b8f4-0f5b133d5c62) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How to Sync Changes to GitHub

This project is already connected to GitHub: **https://github.com/pinohu/erie-notroom**

### 🚀 Automatic Sync (Recommended)

**Auto-sync watches for file changes and automatically commits/pushes to GitHub!**

#### Start Auto-Sync (PowerShell - Windows)
```powershell
# Start the auto-sync watcher
.\auto-sync.ps1
```

#### Start Auto-Sync (Node.js - Cross-platform)
```bash
# Start the auto-sync watcher
npm run auto-sync
# or
node auto-sync.js
```

**How it works:**
- Watches all files in the project directory
- Waits 5 seconds after your last change (debounce)
- Automatically commits and pushes to GitHub
- Ignores `node_modules`, `.git`, `dist`, and other build files
- Press `Ctrl+C` to stop

**Example:**
1. Start auto-sync: `.\auto-sync.ps1`
2. Make changes in Cursor/your editor
3. Save files
4. Wait 5 seconds
5. Changes are automatically synced to GitHub! ✨

### Manual Sync

If you prefer to sync manually:

#### Quick Sync Script
```powershell
# Sync with default message
.\sync-to-github.ps1

# Sync with custom commit message
.\sync-to-github.ps1 "Add new feature X"
```

#### Manual Git Commands
```powershell
# Check what files have changed
git status

# Stage all changes
git add .

# Commit with a descriptive message
git commit -m "Description of your changes"

# Push to GitHub
git push origin main
```

### Verify Connection

```powershell
# Check remote repository
git remote -v

# Should show:
# origin  https://github.com/pinohu/erie-notroom.git (fetch)
# origin  https://github.com/pinohu/erie-notroom.git (push)
```

**Note:** 
- **Auto-sync**: Changes made locally will automatically sync to GitHub when you save files (with 5-second debounce)
- **Manual sync**: Use `.\sync-to-github.ps1` or Git commands for manual control
- **Lovable sync**: Changes made via Lovable will automatically sync to this local repository when you pull

## How can I deploy this project?

### Automatic Deployment to Vercel ✅

**This project is configured for automatic Vercel deployment!**

Every time you push changes to GitHub, the site automatically deploys to Vercel.

**Setup Options:**
1. **Easiest:** Use Vercel's GitHub integration (recommended)
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Import your GitHub repository
   - Vercel handles everything automatically!

2. **More Control:** Use GitHub Actions workflow
   - Already configured in `.github/workflows/deploy-vercel.yml`
   - Requires Vercel token in GitHub Secrets
   - See `VERCEL_DEPLOYMENT_SETUP.md` for detailed instructions

**Full setup guide:** See `VERCEL_DEPLOYMENT_SETUP.md` for complete instructions.

### Alternative: Lovable Deployment

You can also deploy via Lovable:
- Open [Lovable Project](https://lovable.dev/projects/4e5e19c0-a121-4703-b8f4-0f5b133d5c62)
- Click Share → Publish

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
