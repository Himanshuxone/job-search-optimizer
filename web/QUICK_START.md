# 🎯 Quick Start - 5 Minute Setup

Get the Job Search Optimizer running locally or in the cloud - choose your path!

## 🌐 Option 1: Deploy to Vercel (Easiest - 5 minutes)

### What You'll Get
- Live web app accessible from anywhere
- No setup needed locally
- Automatically updated when you push code
- Free tier available

### Steps

1. **Get your code on GitHub**
```bash
git add .
git commit -m "Job Search Optimizer"
git push
```

2. **Deploy to Vercel**
   - Visit https://vercel.com
   - Click "New Project"
   - Connect GitHub repo
   - Select `job_search/web` folder
   - Add API key in environment variables

3. **Test Your Live App**
   - Visit the URL Vercel provides
   - Upload a CV and job description
   - Get results!

👉 **Full guide**: See [VERCEL_SETUP.md](./VERCEL_SETUP.md)

---

## 💻 Option 2: Run Locally (Development - 3 minutes)

### What You'll Get
- Full control and customization
- Can modify code and test instantly
- Better for development and debugging

### Steps

1. **Install Node.js dependencies**
```bash
npm install
```

2. **Set up environment**
```bash
cp .env.example .env.local
# Edit .env.local with your API key
```

3. **Start dev server**
```bash
npm run dev
```

4. **Open browser**
   - Navigate to http://localhost:3000
   - Start optimizing applications!

---

## 🔑 Get Your API Key

### Option A: Claude (Recommended)
- Go to https://console.anthropic.com/
- Create account or sign in
- Create new API key
- Paste in `.env.local`:
```
ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxx
```

### Option B: Gemini (Fastest)
- Go to https://makersuite.google.com/app/apikey
- Create API key
- Paste in `.env.local`:
```
GEMINI_API_KEY=your-key-here
```

### Option C: OpenAI (Premium)
- Go to https://platform.openai.com/api-keys
- Create API key
- Paste in `.env.local`:
```
OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxx
```

---

## 📁 File Uploads Supported

Upload any of these file types for CV, Job Description, or Company Info:
- 📄 **PDF** (.pdf)
- 📝 **Text** (.txt)
- 📋 **Markdown** (.md)
- **Or paste text directly** (no file needed)

---

## 🎯 What Happens After You Submit

```
1. Upload files (CV, job description, company info)
2. System extracts text from files
3. AI processes your information
4. Returns 5 materials:
   ✅ Tailored CV (optimized for job)
   ✅ Cover Letter (personalized)
   ✅ 20 Interview Questions (based on gaps)
   ✅ Interview Prep Guide (study materials)
   ✅ Skill Gaps (what to learn)
```

Processing time: 1-3 minutes depending on provider

---

## 🧪 Test with Sample Data

Don't have files? Use this to test:

### Sample CV (Paste as text)
```
John Doe
Email: john@example.com | Phone: (555) 123-4567

EXPERIENCE
Software Engineer at TechCorp (2021-Present)
- Built REST APIs in Python and Node.js
- Managed teams of 3-5 engineers
- Improved performance by 40%

Junior Developer at StartupXYZ (2019-2021)
- Full-stack development with React and Django
- Database optimization
- Customer support

EDUCATION
B.S. Computer Science - State University (2019)

SKILLS
- Python, JavaScript, TypeScript
- React, Vue.js, Django
- PostgreSQL, MongoDB
- AWS, Docker
```

### Sample Job Description (Paste as text)
```
Senior Full Stack Developer
TechCorp Inc. - Remote

We're looking for an experienced Full Stack Developer to lead our platform team.

Requirements:
- 5+ years full stack development
- Expert in React and Node.js
- Strong Python knowledge
- DevOps experience (AWS, Docker, Kubernetes)
- Team leadership experience
- Excellent communication

Responsibilities:
- Design and implement scalable systems
- Lead technical projects
- Mentor junior developers
- Collaborate with product team
```

### Sample Company Info (Paste as text)
```
TechCorp Inc.
Based in San Francisco
Founded 2015
Mission: Make enterprise software accessible
Tech Stack: React, Node.js, Python, Kubernetes
Culture: Fast-paced, innovative, collaborative
```

---

## ✅ Verify It's Working

1. **Page loads** - See blue header and three input sections
2. **File upload works** - Can drag files or select
3. **Provider selector** - Can switch between Claude, Gemini, OpenAI
4. **Submit button** - Changes to loading state when clicked
5. **Results appear** - See 5 material cards after processing

---

## 🐛 Troubleshooting

### "Page loads but nothing happens"
- Check browser console for errors (F12)
- Verify API key in .env.local
- Restart dev server: `npm run dev`

### "File upload doesn't work"
- Check file size < 50MB
- Try text input instead
- Check file format (.pdf, .txt, .md)

### "Results won't load"
- Wait 3+ minutes (processing time)
- Check API key is valid
- Look for error message in results section

### "Module not found error"
```bash
npm install
npm run dev
```

---

## 📊 Next Steps After Setup

### 1. Customize (Optional)
- Edit colors in `tailwind.config.ts`
- Modify prompts in Python agent
- Add your branding in `Header.tsx`

### 2. Deploy (When Ready)
- Push to GitHub
- Deploy to Vercel (1 click)
- Share link with others

### 3. Use It!
- Upload real CV and job posting
- Download all materials
- Use for applications
- Share feedback

---

## 📚 Documentation

- **Web App**: See [README.md](./README.md)
- **Deployment**: See [VERCEL_SETUP.md](./VERCEL_SETUP.md)
- **Components**: Check `/src/components/` folder
- **API**: Check `/src/app/api/` folder
- **Python**: See `../agent.py` for core logic

---

## 💡 Pro Tips

💡 **Use Claude** - Best quality results (recommended)
💡 **Use Gemini** - Fastest processing (2 min)
💡 **Paste text** - More reliable than files
💡 **Small inputs** - Faster processing
💡 **Download** - Save all results for later

---

## 🆘 Need Help?

1. Check **Troubleshooting** section above
2. Review full [README.md](./README.md) and [VERCEL_SETUP.md](./VERCEL_SETUP.md)
3. Check Next.js docs: https://nextjs.org/docs
4. Check Vercel docs: https://vercel.com/docs

---

## 🎉 You're Ready!

**Pick your path:**
- 🌐 Deploy to Vercel → [VERCEL_SETUP.md](./VERCEL_SETUP.md)
- 💻 Run locally → Start dev server above

Your AI Job Search Optimizer awaits! 🚀

---

**Version**: 1.0  
**Last Updated**: March 2026  
**Status**: Production Ready ✅
