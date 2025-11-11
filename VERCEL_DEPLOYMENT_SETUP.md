# 🚀 Automatic Vercel Deployment Setup Guide

This guide will help you set up automatic deployments to Vercel whenever you push changes to GitHub.

---

## ✅ What's Been Set Up

### 1. GitHub Actions Workflow ✅
**File:** `.github/workflows/deploy-vercel.yml`

Automatically triggers on:
- Push to `main` branch
- Manual workflow dispatch (via GitHub Actions UI)

**What it does:**
1. Checks out your code
2. Installs Node.js and dependencies
3. Builds your project
4. Deploys to Vercel production

### 2. Vercel Configuration ✅
**File:** `vercel.json`

Configured for:
- Vite React framework
- SPA routing (all routes → index.html)
- Security headers
- Build settings

---

## 🎯 Two Setup Options

### Option 1: Vercel GitHub Integration (Easiest - Recommended) ⭐

**This is the simplest method - Vercel handles everything automatically!**

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **Add New** → **Project**
3. Import your GitHub repository: `pinohu/erie-notroom`
4. Configure:
   - **Framework Preset:** Vite
   - **Root Directory:** `./` (default)
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`
5. Click **Deploy**

**That's it!** Vercel will automatically:
- ✅ Deploy on every push to `main`
- ✅ Create preview deployments for pull requests
- ✅ Handle all the GitHub integration
- ✅ Set up webhooks automatically

**No GitHub Actions workflow needed!** You can skip to "How It Works" section below.

---

### Option 2: GitHub Actions Workflow (More Control)

**Use this if you want more control over the deployment process.**

## 🔧 Setup Steps (One-Time Configuration)

### Step 1: Get Your Vercel Token

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click on your profile icon (top right)
3. Go to **Settings** → **Tokens**
4. Click **Create Token**
5. Name it: `GitHub Actions Deploy`
6. Set expiration: **No expiration** (or your preferred duration)
7. Click **Create**
8. **Copy the token** (you'll only see it once!)

### Step 2: Add Token to GitHub Secrets

1. Go to your GitHub repository: `https://github.com/pinohu/erie-notroom`
2. Click **Settings** (top menu)
3. Click **Secrets and variables** → **Actions** (left sidebar)
4. Click **New repository secret**
5. Name: `VERCEL_TOKEN`
6. Value: Paste your Vercel token
7. Click **Add secret**

### Step 3: Link Your Project to Vercel (If Not Already Done)

**Option A: Via Vercel Dashboard (Recommended)**
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **Add New** → **Project**
3. Import your GitHub repository: `pinohu/erie-notroom`
4. Configure:
   - **Framework Preset:** Vite
   - **Root Directory:** `./` (default)
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`
5. Click **Deploy**

**Option B: Via Vercel CLI**
```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Link your project
vercel link
```

### Step 4: Get Your Vercel Project ID and Organization ID

After linking your project:

1. Go to your project in Vercel Dashboard
2. Click **Settings** → **General**
3. Copy:
   - **Project ID** (you'll need this)
   - **Organization ID** (you'll need this)

### Step 5: Add Project Info to GitHub Secrets (Recommended)

1. Go to GitHub → Settings → Secrets and variables → Actions
2. Add these secrets:
   - `VERCEL_ORG_ID` - Your Vercel organization ID
   - `VERCEL_PROJECT_ID` - Your Vercel project ID

**How to find these:**
- Go to Vercel Dashboard → Your Project → Settings → General
- **Organization ID:** Found in the URL or under "Organization"
- **Project ID:** Found under "Project ID" section

**Note:** These are optional but recommended - they make deployments faster and more reliable.

---

## 🎯 How It Works

### Automatic Deployment Flow:

**Option 1 (Vercel GitHub Integration):**
```
You make changes locally
    ↓
Auto-sync pushes to GitHub (main branch)
    ↓
Vercel webhook detects push
    ↓
Vercel automatically builds & deploys
    ↓
Your site is live! 🎉
```

**Option 2 (GitHub Actions):**
```
You make changes locally
    ↓
Auto-sync pushes to GitHub (main branch)
    ↓
GitHub Actions workflow triggers
    ↓
Builds your project
    ↓
Deploys to Vercel production
    ↓
Your site is live! 🎉
```

### Manual Deployment:

You can also trigger deployments manually:

1. Go to GitHub → **Actions** tab
2. Select **Deploy to Vercel** workflow
3. Click **Run workflow**
4. Select branch: `main`
5. Click **Run workflow**

---

## 🔍 Verifying It Works

### Test the Setup:

1. Make a small change (e.g., update a comment)
2. Commit and push:
   ```powershell
   git add .
   git commit -m "Test Vercel deployment"
   git push origin main
   ```
3. Check GitHub Actions:
   - Go to GitHub → **Actions** tab
   - You should see "Deploy to Vercel" workflow running
   - Wait for it to complete (usually 2-3 minutes)
4. Check Vercel Dashboard:
   - Go to your project in Vercel
   - You should see a new deployment
   - Click on it to see the deployment URL

---

## 📋 Troubleshooting

### Workflow Fails with "Vercel Token Invalid"

**Solution:**
- Verify `VERCEL_TOKEN` is set correctly in GitHub Secrets
- Make sure the token hasn't expired
- Regenerate token in Vercel if needed

### Workflow Fails with "Project Not Found"

**Solution:**
- Make sure you've linked the project in Vercel Dashboard
- Or add `VERCEL_ORG_ID` and `VERCEL_PROJECT_ID` to GitHub Secrets
- Verify project name matches in Vercel

### Build Fails

**Solution:**
- Check build logs in GitHub Actions
- Verify `npm run build` works locally
- Check for TypeScript/ESLint errors
- Review `vercel.json` configuration

### Deployment Succeeds But Site Doesn't Update

**Solution:**
- Check Vercel deployment logs
- Verify the correct branch is being deployed
- Clear browser cache
- Check Vercel project settings for correct branch

---

## 🎨 Customization Options

### Deploy to Preview Instead of Production

Edit `.github/workflows/deploy-vercel.yml`:

```yaml
- name: Deploy Project Artifacts to Vercel
  run: vercel deploy --prebuilt --token=${{ secrets.VERCEL_TOKEN }}
  # Remove --prod flag for preview deployments
```

### Deploy Only on Specific Branches

Edit `.github/workflows/deploy-vercel.yml`:

```yaml
on:
  push:
    branches:
      - main
      - production  # Add more branches
```

### Add Environment Variables

1. Go to Vercel Dashboard → Project → Settings → Environment Variables
2. Add your variables (e.g., `VITE_SUPABASE_URL`, `VITE_STRIPE_KEY`)
3. They'll be available during build automatically

---

## 📊 Deployment Status

You can check deployment status:

- **GitHub Actions:** Repository → Actions tab
- **Vercel Dashboard:** Your project → Deployments tab
- **Vercel CLI:** `vercel ls` (if installed locally)

---

## 🔐 Security Notes

- ✅ Vercel token is stored securely in GitHub Secrets
- ✅ Token has limited scope (project-specific)
- ✅ Workflow only runs on `main` branch pushes
- ✅ Build artifacts are cleaned up after deployment

---

## 🚀 Next Steps

1. ✅ Complete the setup steps above
2. ✅ Test with a small change
3. ✅ Verify deployment works
4. ✅ Enjoy automatic deployments!

---

## 📝 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Vercel CLI Reference](https://vercel.com/docs/cli)

---

**Setup Complete!** 🎉

Once configured, every push to `main` will automatically deploy to Vercel.

