# 🚀 Vercel Deployment - Step-by-Step Guide

Complete walkthrough to deploy the web application to Vercel in 5 minutes.

## Prerequisites

- Vercel account ([vercel.com](https://vercel.com)) - Free
- API key from one provider:
  - Claude: https://console.anthropic.com/
  - Gemini: https://makersuite.google.com/app/apikey
  - OpenAI: https://platform.openai.com/api-keys

## Method 1: Deploy with Git (Recommended)

### Step 1: Prepare Your Code

```bash
# Initialize Git if needed
git init
git add .
git commit -m "Initial commit: Job Search Optimizer web app"

# Create GitHub repository
# Go to github.com/new
# Name it "job-search-optimizer"
# Push your code
git remote add origin https://github.com/USERNAME/job-search-optimizer.git
git push -u origin main
```

### Step 2: Connect to Vercel

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Select "Import Git Repository"
4. Paste your GitHub repository URL
5. Click "Import"

### Step 3: Configure Project

In the import dialog:

**Framework Preset**: Next.js  
**Root Directory**: `job_search/web`  
**Build & Output Settings** (Usually auto-detected):
- Build Command: `npm run build`
- Output Directory: `.next`
- Install Command: `npm install`

### Step 4: Add Environment Variables

1. In the import dialog, scroll to "Environment Variables"
2. Add your API key:

```
Name: ANTHROPIC_API_KEY
Value: sk-ant-xxxxxxxxxxxxx
```

**Select** which environments (Production, Preview, Development)

3. Click "Deploy"

### Wait for Deployment

Your app will build and deploy automatically. You'll see:
- Building... (1-3 minutes)
- Deployment successful ✅
- Visit your URL: `https://your-app.vercel.app`

---

## Method 2: Deploy with Vercel CLI

### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

### Step 2: Navigate to Project

```bash
cd job_search/web
```

### Step 3: Deploy

```bash
vercel
```

Follow the interactive prompts:

```
? Set up and deploy "~/job_search/web"? [Y/n] y
? Which scope do you want to deploy to? [your-account]
? Link to existing project? [y/N] N
? What's your project's name? job-search-optimizer
? In which directory is your code? [.] .
? Want to modify these settings? [y/N] N
```

### Step 4: Add Environment Variables

After deployment, add environment variables:

```bash
vercel env add ANTHROPIC_API_KEY
# Paste your API key when prompted
```

### Step 5: Redeploy with Env Vars

```bash
vercel --prod
```

---

## Method 3: One-Click Deploy

Coming soon - Deploy button to add to README

---

## Post-Deployment Checks

### ✅ Verify Your Deployment

1. Visit your URL (e.g., `https://job-search-optimizer-xyz.vercel.app`)
2. Test file upload
3. Try text input
4. Test all three LLM providers
5. Verify download/copy buttons work

### ✅ Custom Domain (Optional)

1. Go to Project Settings → Domains
2. Add your domain
3. Follow DNS setup instructions
4. Wait 5-10 minutes for DNS propagation

### ✅ Monitor Deployment

1. Go to Deployments tab
2. View build logs if needed
3. Check Function logs for API errors

---

## Troubleshooting

### Build Failed

**Error**: "Cannot find module"

**Solution**:
```bash
# Make sure package.json exists in web/ directory
# Check all dependencies are listed
npm install --save-dev next react react-dom
```

### Environment Variables Not Working

**Error**: "ANTHROPIC_API_KEY not found"

**Solution**:
1. Go to Project Settings → Environment Variables
2. Verify your key is added
3. Redeploy: Click "Redeploy" on last deployment
4. Wait 1-2 minutes for new build

### Python Module Not Found

**Error**: "Failed to locate Python agent"

**Solution**:
1. Ensure Python agent files exist in parent directory
2. Update paths in `route.ts` if needed
3. Verify Python is available (included by default)

### Too Large File Upload

**Error**: "File size exceeds limit"

**Solution**:
- Limit is 50MB per file
- Compress PDFs
- Use text input instead

---

## Monitoring & Maintenance

### View Logs

```bash
# Install CLI logs if not already
vercel logs --help

# Stream logs
vercel logs --follow

# View specific deployment
vercel logs <deployment-url>
```

### Analytics

1. Go to Project Dashboard
2. Click Analytics tab
3. View:
   - Request latency
   - Bandwidth usage
   - Error rate
   - Top endpoints

### Performance Metrics

- First Contentful Paint (FCP): Target < 2s
- Largest Contentful Paint (LCP): Target < 2.5s
- API response time: 1-3 minutes (expected)

---

## Advanced Configuration

### Custom Build Settings

Edit `vercel.json`:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "env": {
    "ANTHROPIC_API_KEY": "@anthropic_api_key"
  }
}
```

### Auto-deployments

- **Main branch**: Automatically deploys to production
- **Other branches**: Creates preview URLs
- **Pull requests**: Automatic preview deployments

### Rollback a Deployment

1. Go to Deployments
2. Find a previous deployment
3. Click three-dots menu
4. Select "Promote to Production"

---

## Scaling & Optimization

### For Higher Traffic

1. Upgrade to Vercel Pro
   - Unlimited deployments
   - Priority support
   - Analytics

2. Consider regional deployment
   - Vercel auto-detects and optimizes

3. Scale Python backend separately
   - Move agent to dedicated API
   - Use serverless containers

### Cost Optimization

- **Free tier**: Up to 100GB bandwidth/month
- **Pro**: $12-20/month
- **Enterprise**: Custom pricing

---

## Security Best Practices

### ✅ Do

- ✅ Store API keys as environment variables only
- ✅ Never commit `.env` files
- ✅ Use HTTPS (automatic on Vercel)
- ✅ Enable two-factor authentication
- ✅ Review deployment logs regularly
- ✅ Keep dependencies updated

### ❌ Don't

- ❌ Hardcode API keys in source
- ❌ Commit `.env` to Git
- ❌ Share environment variable values
- ❌ Use production API keys for testing

---

## Useful Vercel Commands

```bash
# List all projects
vercel projects ls

# Switch project
vercel switch

# View project settings
vercel project

# Inspect function
vercel inspect

# Open project dashboard
vercel open

# Remove project
vercel remove <project-name>
```

---

## Support & Resources

- **Vercel Docs**: https://vercel.com/docs
- **Vercel Community**: https://github.com/vercel
- **Status Page**: https://vercel-status.com

---

## Quick Checklist

- [ ] GitHub repository created
- [ ] Vercel account setup
- [ ] API key obtained
- [ ] Project imported to Vercel
- [ ] Environment variables added
- [ ] Deployment successful
- [ ] Test deployment works
- [ ] Custom domain added (optional)
- [ ] Monitoring configured (optional)
- [ ] Backup/rollback plan (optional)

---

## You're Done! 🎉

Your AI Job Search Optimizer is now live on the internet!

**Share the link**: `https://your-app.vercel.app`

**Next steps**:
1. Test with sample CV and job description
2. Share with friends and colleagues
3. Monitor analytics and logs
4. Collect feedback and iterate

---

**Deployment Guide Version**: 1.0  
**Last Updated**: March 2026  
**Status**: Production Ready ✅
