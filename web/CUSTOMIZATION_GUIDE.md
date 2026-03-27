# 🎨 Customization Guide

Learn how to modify the AI Job Search Optimizer to match your needs. No advanced coding required!

## 🎯 Popular Customizations

Pick what you want to change:

- [Change Colors](#-change-colors)
- [Change Prompts & AI Behavior](#-change-prompts--ai-behavior)
- [Add Your Logo & Branding](#-add-your-logo--branding)
- [Change Text & Labels](#-change-text--labels)
- [Add New Features](#-add-new-features)
- [Modify File Upload Limits](#-modify-file-upload-limits)
- [Add Authentication](#-add-authentication)

---

## 🎨 Change Colors

### Primary Colors

Edit `tailwind.config.ts`:

```typescript
// BEFORE
const config: Config = {
  theme: {
    extend: {
      colors: {
        primary: "#3B82F6",      // Blue
        secondary: "#1E40AF",    // Dark Blue
        accent: "#10B981",       // Green
      }
    }
  }
}

// AFTER (Your custom colors)
const config: Config = {
  theme: {
    extend: {
      colors: {
        primary: "#FF6B6B",      // Your brand red
        secondary: "#4ECDC4",    // Your brand teal
        accent: "#FFE66D",       // Your brand yellow
      }
    }
  }
}
```

### Verify Changes

```bash
npm run dev
# Colors update immediately in browser
```

### Color Palette Generator

Need help choosing? Use these tools:
- https://tailwindcss.com/docs/customizing-colors
- https://coolors.co - Generate palettes
- https://color.adobe.com - Color wheel

---

## 📝 Change Prompts & AI Behavior

### Interview Question Count

Edit `../config.py`:

```python
# BEFORE
SYSTEM_PROMPTS = {
    "interview_questions": "Generate exactly 20 interview questions..."
}

# AFTER (Change 20 to 15)
SYSTEM_PROMPTS = {
    "interview_questions": "Generate exactly 15 interview questions, focusing on..."
}
```

### Tailor CV Prompt

Edit `../config.py`:

```python
# BEFORE
"tailor_cv": "Optimize the CV for the job description..."

# AFTER (More aggressive tailoring)
"tailor_cv": "Aggressively optimize the CV to highlight only relevant experience. 
    Reorder sections to emphasize job match. Use specific keywords from job posting."
```

### Add Custom Instructions

Edit `../agent.py` in the `run_full_pipeline()` method:

```python
def run_full_pipeline(self):
    # ... existing code ...
    
    # Add custom processing
    results = {
        "tailored_cv": self.tailor_cv(),
        "cover_letter": self.generate_cover_letter(),
        "interview_questions": self.generate_interview_questions(),
        # ... more outputs ...
    }
    
    # Add new output
    results["custom_section"] = self.new_custom_method()
    
    return results

def new_custom_method(self):
    """Generate custom analysis"""
    prompt = f"Based on CV and job: Provide a custom analysis..."
    return self.llm.generate(prompt)
```

### Change Response Format

Edit `../agent.py` - `generate_interview_questions()`:

```python
# BEFORE (Returns numbered list)
# 1. Tell us about...
# 2. How have you...

# AFTER (Return as JSON)
def generate_interview_questions(self):
    # ... get questions from LLM ...
    
    # Parse into JSON
    questions = [
        {"id": 1, "question": "Tell us about...", "difficulty": "easy"},
        {"id": 2, "question": "How have you...", "difficulty": "hard"},
    ]
    
    return json.dumps(questions, indent=2)
```

---

## 🎨 Add Your Logo & Branding

### Add Logo to Header

1. **Add image file**:
   ```bash
   # Place your logo in:
   public/logo.png  (or .jpg, .svg)
   ```

2. **Edit `src/components/Header.tsx`**:

   ```typescript
   // BEFORE
   import { Briefcase } from 'lucide-react';
   
   export default function Header() {
     return (
       <div className="bg-gradient-to-r from-primary to-secondary">
         <Briefcase className="text-white" size={32} />
         <h1 className="text-white">Job Optimizer</h1>
       </div>
     )
   }

   // AFTER (With logo)
   import Image from 'next/image';
   
   export default function Header() {
     return (
       <div className="bg-gradient-to-r from-primary to-secondary">
         <Image
           src="/logo.png"
           alt="Company Logo"
           width={32}
           height={32}
         />
         <h1 className="text-white">Your Branding</h1>
       </div>
     )
   }
   ```

### Change Company Name & Title

Edit `src/components/Header.tsx`:

```typescript
// BEFORE
<h1 className="text-white">Job Optimizer</h1>
<p className="text-blue-100">Powered by AI</p>

// AFTER
<h1 className="text-white">Career Booster Pro</h1>
<p className="text-blue-100">Your AI Career Assistant</p>
```

### Add Footer

Create `src/components/Footer.tsx`:

```typescript
export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 text-center">
      <p>&copy; 2026 Your Company. All rights reserved.</p>
      <div className="flex gap-4 justify-center mt-4">
        <a href="/privacy" className="hover:text-primary">Privacy</a>
        <a href="/terms" className="hover:text-primary">Terms</a>
        <a href="/contact" className="hover:text-primary">Contact</a>
      </div>
    </footer>
  );
}
```

Then import in `src/app/page.tsx`:

```typescript
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      {/* ... existing content ... */}
      <Footer />
    </>
  );
}
```

---

## 📝 Change Text & Labels

### Form Labels

Edit `src/components/FileUploadForm.tsx`:

```typescript
// BEFORE
<label>Your CV</label>
<label>Job Description</label>

// AFTER
<label>Your Resume</label>
<label>Target Job Posting</label>
```

### Button Text

Edit `src/components/FileUploadForm.tsx`:

```typescript
// BEFORE
<button>Optimize My Application</button>

// AFTER
<button>Generate Career Materials</button>
```

### Results Section Titles

Edit `src/components/ResultsDisplay.tsx`:

```typescript
// BEFORE
const sections = [
  { title: "Tailored CV", content: results.tailored_cv },
  { title: "Cover Letter", content: results.cover_letter },
]

// AFTER
const sections = [
  { title: "📄 Your Enhanced Resume", content: results.tailored_cv },
  { title: "💌 Personalized Cover Letter", content: results.cover_letter },
  { title: "📊 Custom Analysis", content: results.custom_analysis },
]
```

### Provider Names & Descriptions

Edit `src/components/ProviderSelector.tsx`:

```typescript
// BEFORE
const providers = [
  { id: "claude", name: "Claude", description: "Anthropic" },
  { id: "gemini", name: "Gemini", description: "Google" },
]

// AFTER
const providers = [
  { id: "claude", name: "Claude (Best)", description: "Highest quality results" },
  { id: "gemini", name: "Gemini (Fast)", description: "Quickest processing" },
]
```

---

## ✨ Add New Features

### Add Email Result Feature

1. **Install nodemailer** (npm backend email):
```bash
npm install nodemailer
```

2. **Add email function** in `src/app/api/optimize/route.ts`:

```typescript
import nodemailer from 'nodemailer';

async function emailResults(email: string, results: Results) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your Job Optimization Results',
    html: `
      <h1>Your Results</h1>
      <h2>Tailored CV</h2>
      <pre>${results.tailored_cv}</pre>
      <h2>Cover Letter</h2>
      <pre>${results.cover_letter}</pre>
    `
  });
}
```

3. **Add email input** to form:

```typescript
const [email, setEmail] = useState('');

// In form submit
if (email) {
  await fetch('/api/email-results', {
    method: 'POST',
    body: JSON.stringify({ email, results })
  });
}
```

### Add History/Saved Results

1. **Store in localStorage** (browser):

```typescript
// Save results
localStorage.setItem(`results-${Date.now()}`, JSON.stringify(results));

// Load saved
const saved = localStorage.getItem('results-123456');
```

2. **Create history page**:

```typescript
// src/app/history/page.tsx
export default function History() {
  const [history, setHistory] = useState([]);
  
  useEffect(() => {
    const items = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith('results-')) {
        items.push(JSON.parse(localStorage.getItem(key)));
      }
    }
    setHistory(items);
  }, []);
  
  return (
    <div>
      {history.map(item => (
        <div key={item.timestamp}>
          <h3>{item.job}</h3>
          <button onClick={() => loadResults(item)}>View</button>
        </div>
      ))}
    </div>
  );
}
```

### Add Dark Mode

1. **Add theme toggle** in `Header.tsx`:

```typescript
const [isDark, setIsDark] = useState(false);

return (
  <header className={isDark ? 'dark' : ''}>
    <button onClick={() => setIsDark(!isDark)}>
      {isDark ? '☀️' : '🌙'}
    </button>
  </header>
);
```

2. **Apply styles** in `globals.css`:

```css
body.dark {
  @apply bg-gray-900 text-white;
}

body.dark .card {
  @apply bg-gray-800 border-gray-700;
}
```

---

## 📏 Modify File Upload Limits

### Increase File Size Limit

Edit `next.config.js`:

```javascript
// BEFORE
api: { bodySize: '50mb', responseLimit: '100mb' }

// AFTER (200MB)
api: { bodySize: '200mb', responseLimit: '500mb' }
```

Edit `src/app/api/optimize/route.ts`:

```typescript
// BEFORE
const MAX_FILE_SIZE = 50 * 1024 * 1024;

// AFTER (200MB)
const MAX_FILE_SIZE = 200 * 1024 * 1024;
```

### Change Allowed File Types

Edit `src/components/FileUploadArea.tsx`:

```typescript
// BEFORE
const validTypes = ['.pdf', '.txt', '.md'];

// AFTER (Add docx)
const validTypes = ['.pdf', '.txt', '.md', '.docx'];
```

---

## 🔐 Add Authentication

### Simple Password Protection

1. **Create auth page**:

```typescript
// src/app/login/page.tsx
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [password, setPassword] = useState('');
  const router = useRouter();
  
  const handleLogin = () => {
    if (password === process.env.NEXT_PUBLIC_APP_PASSWORD) {
      localStorage.setItem('authenticated', 'true');
      router.push('/');
    }
  };
  
  return (
    <div className="flex items-center justify-center min-h-screen">
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter password"
        className="p-2 border rounded"
      />
      <button onClick={handleLogin} className="btn-primary">
        Login
      </button>
    </div>
  );
}
```

2. **Protect main page**:

```typescript
// src/app/page.tsx
'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isAuth = localStorage.getItem('authenticated');
      if (!isAuth) {
        router.push('/login');
      }
    }
  }, []);
  
  return (
    // ... your page content ...
  );
}
```

3. **Set password in environment**:

```bash
NEXT_PUBLIC_APP_PASSWORD=your-secret-password
```

---

## 🎯 Advanced Customizations

### Add Analytics

```typescript
// In src/app/layout.tsx
import { Analytics } from "@vercel/analytics/react";

export default function RootLayout() {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

### Add Database

```typescript
// Install Prisma
npm install @prisma/client
npx prisma init

// Create API endpoint to save results
POST /api/save-results
{
  userId: "...",
  jobTitle: "...",
  results: {...}
}
```

### Add Webhooks

```typescript
// Send results to external system
async function sendWebhook(results) {
  await fetch('https://your-system.com/webhook', {
    method: 'POST',
    body: JSON.stringify(results),
    headers: { 'Content-Type': 'application/json' }
  });
}
```

---

## 🧪 Testing Your Changes

### After Each Change

```bash
# 1. Restart dev server
npm run dev

# 2. Check browser at http://localhost:3000

# 3. Look for console errors (F12)

# 4. Test form submission

# 5. Verify results display
```

### Build Test

```bash
# Before deploying
npm run build

# Watch for errors like:
# - Type errors (TypeScript)
# - Import errors
# - Missing dependencies
```

---

## 📋 Customization Checklist

- [ ] Decided what to customize
- [ ] Made code changes
- [ ] Tested locally (`npm run dev`)
- [ ] No console errors (F12)
- [ ] Tested form submission
- [ ] Verified results display
- [ ] Ran build check (`npm run build`)
- [ ] Committed to Git
- [ ] Deployed to Vercel

---

## 🆘 Troubleshooting Customizations

### "Changes not showing up"
- Hard refresh browser (Ctrl+Shift+R)
- Restart dev server
- Clear `.next` folder: `rm -rf .next`

### "TypeScript errors"
- Check for typos in file paths
- Verify imports are correct
- Run `npm run build` to see all errors

### "Tailwind classes not working"
- Check class name spelling
- Verify in tailwind.config.ts
- Restart dev server

### "Styling looks broken"
- Check globals.css imports
- Verify Tailwind is configured correctly
- Clear browser cache

---

## 📚 References

- **React Docs**: https://react.dev
- **TypeScript**: https://www.typescriptlang.org/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Next.js**: https://nextjs.org/docs
- **Vercel Env Vars**: https://vercel.com/docs/projects/environment-variables

---

## 🎉 Share Your Customizations

After customizing, you can:

1. **Deploy to Vercel**: `vercel --prod`
2. **Share URL**: Send link to friends
3. **Get feedback**: See what users think
4. **Iterate**: Make more changes based on feedback

---

**Version**: 1.0  
**Last Updated**: March 2026  
**Level**: Beginner to Intermediate  
**Status**: Complete ✅

Happy customizing! 🚀
