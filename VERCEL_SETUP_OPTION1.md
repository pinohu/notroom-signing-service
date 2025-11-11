# 🚀 Vercel GitHub Integration Setup (Option 1)

**Quick Setup Guide - 5 Minutes**

---

## ✅ Step-by-Step Setup

### Step 1: Go to Vercel Dashboard
1. Visit [https://vercel.com/dashboard](https://vercel.com/dashboard)
2. Sign in (or create account if needed)

### Step 2: Import Your GitHub Repository
1. Click **"Add New"** button (top right)
2. Select **"Project"**
3. You'll see your GitHub repositories listed
4. Find and click on **`pinohu/erie-notroom`**
5. Click **"Import"**

### Step 3: Configure Project Settings

Vercel should auto-detect Vite, but verify these settings:

**Framework Preset:** `Vite` ✅ (should be auto-detected)

**Root Directory:** `./` (leave as default)

**Build and Output Settings:**
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

**Environment Variables (if needed):**
- If you have any `.env` variables, add them here
- Common ones: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, etc.
- You can add these later in Project Settings → Environment Variables

### Step 4: Deploy!
1. Click **"Deploy"** button
2. Wait 2-3 minutes for the first deployment
3. You'll get a live URL like: `https://erie-notroom.vercel.app`

---

## 🎉 That's It!

**What happens next:**
- ✅ Every push to `main` branch → Automatic deployment
- ✅ Every pull request → Preview deployment
- ✅ Automatic SSL certificates
- ✅ Global CDN distribution
- ✅ Automatic rollback on build failures

---

## 🔍 Verify It's Working

### Test Automatic Deployment:

1. **Make a small change** (e.g., update a comment in any file)
2. **Commit and push:**
   ```powershell
   git add .
   git commit -m "Test Vercel auto-deploy"
   git push origin main
   ```
3. **Watch the magic:**
   - Go to Vercel Dashboard → Your Project
   - You'll see a new deployment start automatically
   - Wait 1-2 minutes
   - Your site updates! 🎉

---

## 📋 Post-Setup Checklist

- [ ] Project imported to Vercel
- [ ] First deployment successful
- [ ] Got your live URL
- [ ] Tested automatic deployment (made a change and pushed)
- [ ] Verified site is accessible
- [ ] (Optional) Added custom domain

---

## 🔧 Optional: Custom Domain

1. Go to Vercel Dashboard → Your Project → **Settings** → **Domains**
2. Click **"Add Domain"**
3. Enter your domain (e.g., `notroom.com`)
4. Follow DNS configuration instructions
5. Vercel handles SSL automatically

---

## 📊 Monitoring Deployments

**View deployments:**
- Vercel Dashboard → Your Project → **Deployments** tab
- See build logs, deployment status, and URLs

**Deployment notifications:**
- Vercel can email you on deployments
- Configure in Project Settings → Notifications

---

## 🎯 What About the GitHub Actions Workflow?

**Good news:** You don't need to do anything!

- **Option 1 (Vercel Integration)** handles deployments automatically
- The GitHub Actions workflow (`.github/workflows/deploy-vercel.yml`) won't interfere
- You can leave it there (it won't run without Vercel tokens)
- Or delete it if you prefer: `.github/workflows/deploy-vercel.yml`

**Recommendation:** Leave it - it's harmless and gives you flexibility later.

---

## 🚨 Troubleshooting

### Deployment Fails

**Check:**
1. Build logs in Vercel Dashboard
2. Verify `npm run build` works locally
3. Check for TypeScript/ESLint errors
4. Verify environment variables are set

### Site Doesn't Update

**Check:**
1. Verify you pushed to `main` branch
2. Check Vercel deployment logs
3. Clear browser cache
4. Verify deployment completed successfully

### Can't Find Repository

**Solution:**
1. Make sure Vercel has access to your GitHub account
2. Go to Vercel Settings → Git → Connect GitHub
3. Authorize Vercel to access your repositories

---

## 📝 Quick Reference

**Your Repository:** `pinohu/erie-notroom`  
**Vercel Dashboard:** [https://vercel.com/dashboard](https://vercel.com/dashboard)  
**Build Command:** `npm run build`  
**Output Directory:** `dist`  
**Framework:** Vite

---

## 🎊 You're All Set!

Once configured, your workflow is:

1. **Make changes** in Cursor/your editor
2. **Auto-sync** pushes to GitHub (or manual push)
3. **Vercel automatically** builds and deploys
4. **Your site updates** in 1-2 minutes

**No manual steps needed!** 🚀

---

**Need help?** Check `VERCEL_DEPLOYMENT_SETUP.md` for detailed troubleshooting.

