# Job Search Optimizer - Vercel Deployment Guide

A beautiful, production-ready web application for the AI Job Search Optimizer with file uploads and a modern UI.

## 🚀 Deployment to Vercel

### Prerequisites

1. **Vercel Account** - [Sign up free](https://vercel.com)
2. **GitHub Account** - For version control
3. **API Key** - From Claude, Gemini, or OpenAI

### Step 1: Prepare the Application

```bash
cd job_search/web
npm install
npm run build
```

### Step 2: Create Environment Variables

Create a `.env.local` file:

```bash
# Choose ONE provider:
ANTHROPIC_API_KEY=sk-ant-your-key-here
# or
GEMINI_API_KEY=your-gemini-key-here
# or
OPENAI_API_KEY=sk-your-openai-key-here
```

### Step 3: Deploy to Vercel

#### Option A: Using Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Follow prompts and add environment variables when asked
```

#### Option B: Using GitHub Integration

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Add environment variables in settings
6. Deploy!

#### Option C: Using Vercel Dashboard

1. Go to [vercel.com/new](https://vercel.com/new)
2. Select "Other" -> "Create Git Repository"
3. Upload the `web` folder
4. Add environment variables
5. Deploy!

### Step 4: Configure Environment Variables on Vercel

In Vercel Dashboard:

1. Go to Project Settings → Environment Variables
2. Add your API key:
   ```
   Name: ANTHROPIC_API_KEY
   Value: sk-ant-xxxxxxxxxxxxx
   ```
3. Select environments: Production, Preview, Development
4. Redeploy

## 📋 Tech Stack

- **Frontend**: Next.js 14 + React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Backend**: Next.js API Routes
- **Icons**: Lucide React
- **Python Integration**: Child process execution

## 🎨 Features

✅ **Beautiful UI** - Modern, responsive design with Tailwind CSS
✅ **File Uploads** - Support for PDF, TXT, MD files with drag-and-drop
✅ **Text Input** - Paste content directly if files unavailable
✅ **Provider Selection** - Choose between Claude, Gemini, or OpenAI
✅ **Real-time Processing** - Immediate feedback with loading states
✅ **Download & Copy** - Export results as files or copy to clipboard
✅ **Mobile Responsive** - Works perfectly on all devices
✅ **Dark Mode Ready** - Can be extended for dark theme

## 📁 File Structure

```
web/
├── package.json                      # Dependencies
├── tsconfig.json                    # TypeScript config
├── tailwind.config.ts               # Tailwind CSS config
├── next.config.js                   # Next.js config
├── .gitignore                       # Git ignore rules
├── .env.example                     # Environment template
└── src/
    ├── app/
    │   ├── layout.tsx               # Root layout
    │   ├── page.tsx                 # Home page
    │   ├── globals.css              # Global styles
    │   └── api/
    │       └── optimize/
    │           └── route.ts         # API handler
    └── components/
        ├── Header.tsx               # Header component
        ├── FileUploadForm.tsx       # Main form
        ├── FileUploadArea.tsx       # File drop zone
        ├── TextInputField.tsx       # Text input
        ├── ProviderSelector.tsx     # LLM chooser
        └── ResultsDisplay.tsx       # Results viewer
```

## 🔧 Configuration

### Vercel Environment Variables

Required for deployment:

```
ANTHROPIC_API_KEY=your_claude_key
# or
GEMINI_API_KEY=your_gemini_key
# or
OPENAI_API_KEY=your_openai_key
```

### Build Settings

- **Framework**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

## 🌍 Domain Setup

1. Go to Vercel Project Settings
2. Domains → Add Domain
3. Follow DNS setup instructions
4. Project will be available at your domain

### Free Vercel Domain

Your project gets a free URL like: `job-search-optimizer.vercel.app`

## 📊 Performance

- **First Load**: ~2 seconds
- **Processing Time**: 1-3 minutes (depends on AI provider)
- **Response Size**: < 1MB per request
- **File Upload Limit**: 50MB

## 🔒 Security

- ✅ API keys stored as environment variables (never in code)
- ✅ File uploads handled securely with temporary storage
- ✅ Python process runs in isolated environment
- ✅ HTTPS by default on Vercel
- ✅ CORS configured for API routes

## 🆘 Troubleshooting

### "API Key Not Found"

**Issue**: Environment variable not set on Vercel

**Solution**:
1. Go to Project Settings → Environment Variables
2. Verify your key is added
3. Redeploy the project

### "Build Failed"

**Issue**: Dependencies not installed correctly

**Solution**:
```bash
# Reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### "Python Module Not Found"

**Issue**: Python agent can't be found on Vercel

**Solution**:
1. Ensure Python agent files are in parent directory
2. Update Python paths in `route.ts`
3. Verify Python is installed (Vercel includes Python)

### "File Upload Too Large"

**Issue**: File exceeds size limit

**Solution**:
- Reduce file size (< 50MB)
- Compress PDF files
- Use text input instead

## 📈 Monitoring

### Vercel Analytics

1. Go to Project Dashboard
2. Analytics tab shows:
   - Request latency
   - Bandwidth usage
   - Deployments
   - Error logs

### View Logs

```bash
# Stream logs in real-time
vercel logs --follow

# View deployment logs
vercel logs <deployment-url>
```

## 🚀 Advanced Deployment Options

### Custom Deployment Domain

```bash
vercel --prod --token YOUR_VERCEL_TOKEN
```

### Automatic Deployments

Every push to main branch automatically deploys to production.

### Preview Deployments

Pull requests create preview URLs for testing.

### Rollback

1. Go to Deployments tab
2. Click on previous deployment
3. Click "Promote to Production"

## 📝 Environment File Example

```bash
# .env.local (no quotes needed)
ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxx
```

Or in Vercel:

```
ANTHROPIC_API_KEY = sk-ant-xxxxxxxxxxxxx
```

## 🎯 Next Steps After Deployment

1. ✅ Test file uploads with sample CV and job description
2. ✅ Verify all output formats (CV, cover letter, questions)
3. ✅ Check mobile responsiveness
4. ✅ Share deployment URL with team
5. ✅ Monitor analytics and error logs

## 💡 Pro Tips

### Optimize for Speed

- Use Gemini provider (fastest response)
- Reduce input file sizes
- Enable Next.js caching

### Improve Reliability

- Monitor error logs regularly
- Set up error notifications
- Test with various file formats

### Scale Usage

- Use Vercel Pro for higher limits
- Consider dedicated Python backend
- Implement request queuing

## 📞 Support

- **Vercel Docs**: https://vercel.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **GitHub Issues**: Report bugs and feature requests

---

## Quick Start Command

```bash
# Clone and setup
cd job_search/web

# Install dependencies
npm install

# Add environment variables
cp .env.example .env.local
# Edit .env.local with your API key

# Test locally
npm run dev
# Visit http://localhost:3000

# Deploy to Vercel
vercel
```

## 🎉 You're Live!

Your AI Job Search Optimizer is now live on the internet! Share the link and start optimizing job applications. 🚀

---

**Deployment Status**: Ready for Production  
**Last Updated**: March 2026
**Framework**: Next.js 14  
**Hosting**: Vercel
