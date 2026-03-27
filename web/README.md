# 🌐 Web Application - Complete Guide

Beautiful, production-ready web interface for the AI Job Search Optimizer deployed on Vercel.

## ✨ Features

✅ **Drag & Drop File Upload** - Upload CV, job description, and company info
✅ **Text Input Option** - Paste content directly if files unavailable
✅ **LLM Provider Selection** - Choose Claude, Gemini, or OpenAI
✅ **Real-time Processing** - Live feedback with loading states
✅ **Results Display** - Preview all materials in-app
✅ **Download & Copy** - Export results as files or copy to clipboard
✅ **Mobile Responsive** - Optimized for all screen sizes
✅ **Modern UI** - Clean, professional design with Tailwind CSS
✅ **Dark Mode Ready** - Built with accessibility in mind
✅ **Fast Performance** - Optimized with Next.js

## 🚀 Quick Start

### Local Development

```bash
# Navigate to web directory
cd job_search/web

# Install dependencies
npm install

# Set up environment
cp .env.example .env.local
# Edit .env.local with your API key

# Start development server
npm run dev

# Open browser to http://localhost:3000
```

### Build for Production

```bash
npm run build
npm run start
```

## 📁 Project Structure

```
web/
├── src/
│   ├── app/
│   │   ├── layout.tsx           # Root layout wrapper
│   │   ├── page.tsx             # Home page / main interface
│   │   ├── globals.css          # Global styles
│   │   └── api/
│   │       └── optimize/
│   │           └── route.ts     # API handler for processing
│   │
│   └── components/
│       ├── Header.tsx           # Header with branding
│       ├── FileUploadForm.tsx   # Three-column upload form
│       ├── FileUploadArea.tsx   # Drag-drop file input
│       ├── TextInputField.tsx   # Text area input
│       ├── ProviderSelector.tsx # LLM provider chooser
│       └── ResultsDisplay.tsx   # Results viewer & exporter
│
├── public/                      # Static assets (images, icons)
├── package.json                 # Dependencies
├── tsconfig.json                # TypeScript config
├── tailwind.config.ts           # Tailwind CSS config
├── next.config.ts               # Next.js config
├── vercel.json                  # Vercel deployment config
├── .env.example                 # Environment template
├── .gitignore                   # Git ignores
│
└── DEPLOYMENT.md                # Deployment guide
```

## 🎨 UI Components

### Header Component
- Displays app branding
- Shows "Powered by AI" badge
- Responsive across all devices

### File Upload Form
**Layout**: Three-column grid (CV | Job | Company)

**Each Column Contains**:
1. File upload with drag-and-drop
2. Divider line
3. Text input alternative
4. Toggle between file/text modes

**Features**:
- Mutual exclusivity (file OR text per section)
- File size display
- Remove file button
- Clear visual states

### Provider Selector
**Options Available**:
1. **Claude** - Anthropic (Recommended)
2. **Gemini** - Google (Fastest)
3. **OpenAI** - GPT-4 (Premium)

**Display**:
- Card-based selection
- Badges showing key info
- Selected state highlighting

### Results Display
**Sections** (All Expandable):
1. 📄 Tailored CV
2. 💌 Cover Letter
3. ❓ Interview Questions
4. 📚 Interview Prep Guide
5. 📊 Skill Gaps Analysis

**Actions Per Section**:
- Copy content to clipboard
- Download as file (.md or .json)
- Full-screen preview
- Scroll-enabled preview window

## 🔧 API Route Details

### POST `/api/optimize`

**Input** (FormData):
```
cv_file: File (optional)
cv_text: string (optional)
job_file: File (optional)
job_text: string (optional)
company_file: File (optional)
company_text: string (optional)
provider: string ("claude", "gemini", or "openai")
```

**Process**:
1. Accepts FormData with files or text
2. Extracts text from uploaded files (if provided)
3. Validates all inputs are provided
4. Calls Python agent with extracted content
5. Returns JSON with all generated materials

**Output** (JSON):
```json
{
  "tailored_cv": "...",
  "cover_letter": "...",
  "interview_questions": "...",
  "interview_prep_guide": "...",
  "skill_gaps": "..."
}
```

**Error Handling**:
- 400: Missing or invalid input
- 500: Processing error with description

## 🎯 User Workflow

```
1. Visit Website
   ↓
2. Select AI Provider (Claude, Gemini, or OpenAI)
   ↓
3. Provide Three Inputs (Choose file or text):
   ├─ Your CV
   ├─ Job Description
   └─ Company Information
   ↓
4. Click "Optimize My Application"
   ↓
5. Wait for Processing (1-3 minutes)
   ↓
6. View Results in Expandable Sections
   ├─ Preview in browser
   ├─ Copy to clipboard
   └─ Download as files
   ↓
7. Use Materials for Application!
```

## 🎨 Design System

### Colors
- **Primary**: #3B82F6 (Blue)
- **Secondary**: #1E40AF (Dark Blue)
- **Success**: #10B981 (Green)
- **Warning**: #F59E0B (Yellow)
- **Danger**: #EF4444 (Red)

### Typography
- **Headers**: Bold, 14-48px
- **Body**: Regular, 14-16px
- **Code**: Monospace family

### Spacing
- **Page**: 12px padding
- **Sections**: 24px gap
- **Components**: 8-16px padding

### Shadows
- **Card**: Subtle shadow (default)
- **Hover**: Increased shadow
- **Active**: Elevation shadow

## 🛠️ Development

### Install Dependencies
```bash
npm install
```

### Development Server
```bash
npm run dev
```
Opens on `http://localhost:3000`

### Build
```bash
npm run build
```

### Production Start
```bash
npm run start
```

### Linting
```bash
npm run lint
```

## 📱 Responsive Design

**Breakpoints** (via Tailwind):
- `sm`: 640px
- `md`: 768px  
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

**Mobile First**:
- Single column on mobile
- Two columns on tablet
- Three columns on desktop

## ♿ Accessibility

✅ **Semantic HTML** - Proper heading hierarchy
✅ **ARIA Labels** - Screen reader support
✅ **Keyboard Navigation** - Full keyboard support
✅ **Color Contrast** - WCAG AA compliant
✅ **Focus States** - Visible focus indicators

## 🔒 Security

🔐 **API Keys**:
- Never hardcoded in source
- Stored as environment variables
- Passed via Vercel dashboard only

🔐 **File Uploads**:
- Temporary file storage
- Automatic cleanup after processing
- Size limits enforced (50MB max)

🔐 **API Requests**:
- HTTPS only on Vercel
- CORS configured
- Request validation

## 📊 Performance

- **First Load**: ~2 seconds
- **Time to Interactive**: ~3 seconds
- **Bundle Size**: ~150KB (Next.js + React)
- **API Response**: 1-3 minutes (depends on AI provider)

### Optimization
- Next.js automatic code splitting
- Image optimization
- CSS minification
- Server-side rendering where applicable

## 🌐 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# With environment variables
vercel env add ANTHROPIC_API_KEY
```

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed Vercel setup.

### Other Platforms

**Docker**:
```bash
docker build -t job-optimizer .
docker run -p 3000:3000 job-optimizer
```

**Traditional Server**:
```bash
npm run build
npm run start
```

## 🧪 Testing

### Manual Testing Checklist

- [ ] File upload (all formats)
- [ ] Drag-and-drop upload
- [ ] Text input
- [ ] Provider selection
- [ ] Form submission
- [ ] Loading states
- [ ] Error handling
- [ ] Results display
- [ ] Download functionality
- [ ] Copy to clipboard
- [ ] Mobile responsiveness
- [ ] Keyboard navigation

### Browser Compatibility

✅ Chrome/Edge 90+
✅ Firefox 88+
✅ Safari 14+
✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 📝 Environment Variables

Create `.env.local`:

```bash
# Choose ONE provider:
ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxx

# Or:
GEMINI_API_KEY=your-key
# Or:
OPENAI_API_KEY=sk-xxx
```

## 🐛 Troubleshooting

### "Cannot find module"
```bash
npm install
npm run dev
```

### "API key not found"
- Verify `.env.local` exists
- Check key is correct
- Restart dev server

### "File upload fails"
- Check file size < 50MB
- Verify file format (.pdf, .txt, .md)
- Try text input instead

### "Processing takes too long"
- Use Gemini provider (fastest)
- Reduce input size
- Check internet connection

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript](https://www.typescriptlang.org)

## 🎯 Future Enhancements

🔄 **Planned Features**:
- Dark mode support
- User accounts & history
- Batch processing
- Email results
- Template library
- Interview video practice
- Resume syntax checking

## 📞 Support

- Check [DEPLOYMENT.md](./DEPLOYMENT.md) for deployment issues
- Review component code for implementation questions
- Check Next.js docs for framework questions

---

**Status**: Production Ready ✅  
**Last Updated**: March 2026  
**Framework**: Next.js 14 + React 18  
**Platform**: Vercel
