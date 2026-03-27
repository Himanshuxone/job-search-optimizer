# 🔗 Integration Guide - Web & Python Agent

Learn how the web application connects to the Python backend. Perfect for developers and DevOps.

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────┐
│           Browser (User Interface)              │
│  ┌───────────────────────────────────────────┐  │
│  │  React Components (TypeScript)            │  │
│  │  - FileUploadForm                         │  │
│  │  - ResultsDisplay                         │  │
│  │  - ProviderSelector                       │  │
│  └───────────────────────────────────────────┘  │
└─────────────────────────────────────────────────┘
                    ↓ HTTPS ↓
┌─────────────────────────────────────────────────┐
│       Vercel (Deployment Platform)              │
│  ┌───────────────────────────────────────────┐  │
│  │  Next.js Server (Node.js)                 │  │
│  │  ┌─────────────────────────────────────┐  │  │
│  │  │  API Route: /api/optimize/route.ts  │  │  │
│  │  │  - Accepts FormData multipart       │  │  │
│  │  │  - Extracts files to temp dir       │  │  │
│  │  │  - Calls Python agent via execSync  │  │  │
│  │  │  - Returns JSON results             │  │  │
│  │  └─────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────┘  │
└─────────────────────────────────────────────────┘
                    ↓ Child Process ↓
┌─────────────────────────────────────────────────┐
│        Python Runtime (On Vercel)               │
│  ┌───────────────────────────────────────────┐  │
│  │  Python Agent (Serverless Function)      │  │
│  │  ┌─────────────────────────────────────┐  │  │
│  │  │  main.py                            │  │  │
│  │  │  - Loads CV/Job/Company from files  │  │  │
│  │  │  - Calls LLM provider               │  │  │
│  │  │  - Returns JSON results             │  │  │
│  │  │                                     │  │  │
│  │  │  Modules:                           │  │  │
│  │  │  - agent.py (JobSearchAgent class)  │  │  │
│  │  │  - llm_provider.py (Multi-LLM)      │  │  │
│  │  │  - config.py (Settings)             │  │  │
│  │  │  - utils.py (Helpers)               │  │  │
│  │  └─────────────────────────────────────┘  │  │
│  └───────────────────────────────────────────┘  │
└─────────────────────────────────────────────────┘
                    ↓ API Call ↓
┌─────────────────────────────────────────────────┐
│      External LLM APIs (Claude/Gemini/OpenAI)   │
│      - Process text prompts                     │
│      - Return generated content                 │
└─────────────────────────────────────────────────┘
```

## 📡 Request/Response Flow

### 1. User Submits Form

**Browser sends (FormData via HTTPS POST)**:
```typescript
POST /api/optimize HTTP/1.1
Host: job-optimizer.vercel.app
Content-Type: multipart/form-data

cv_file: <binary PDF data>
job_text: "We're looking for a senior developer..."
company_file: <binary PDF data>
provider: "claude"
```

### 2. Next.js API Route Processes

**File: `src/app/api/optimize/route.ts`**

```typescript
export async function POST(request: Request) {
  try {
    // 1. Parse FormData
    const formData = await request.formData();
    
    // 2. Extract files/text
    const cvContent = await extractCVContent(formData);
    const jobContent = await extractJobContent(formData);
    const companyContent = await extractCompanyContent(formData);
    
    // 3. Create temp directory for files
    const tempDir = `/tmp/optimize-${Date.now()}`;
    fs.mkdirSync(tempDir, { recursive: true });
    
    // 4. Write files to temp directory
    fs.writeFileSync(`${tempDir}/cv.txt`, cvContent);
    fs.writeFileSync(`${tempDir}/job.txt`, jobContent);
    fs.writeFileSync(`${tempDir}/company.txt`, companyContent);
    
    // 5. Call Python agent
    const pythonOutput = execSync(
      `python ../main.py --cv ${tempDir}/cv.txt \\
       --job ${tempDir}/job.txt \\
       --company ${tempDir}/company.txt \\
       --provider ${provider} \\
       --output-format json`,
      { maxBuffer: 10 * 1024 * 1024 }  // 10MB max output
    );
    
    // 6. Parse JSON response
    const results = JSON.parse(pythonOutput);
    
    // 7. Cleanup temp files
    fs.rmSync(tempDir, { recursive: true });
    
    // 8. Return results
    return Response.json(results);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
```

### 3. Python Agent Executes

**File: `main.py`**

```python
if __name__ == "__main__":
    # 1. Parse command-line arguments
    parser = argparse.ArgumentParser()
    parser.add_argument("--cv", required=True)
    parser.add_argument("--job", required=True)
    parser.add_argument("--company", required=True)
    parser.add_argument("--provider", default="claude")
    parser.add_argument("--output-format", default="json")
    
    args = parser.parse_args()
    
    # 2. Create agent
    agent = JobSearchAgent(provider=args.provider)
    
    # 3. Load inputs
    agent.load_cv(args.cv)
    agent.load_job_description(args.job)
    agent.load_company_info(args.company)
    
    # 4. Run full pipeline
    results = agent.run_full_pipeline()
    
    # 5. Output as JSON
    if args.output_format == "json":
        print(json.dumps(results, indent=2))
    else:
        print(str(results))
```

### 4. Results Returned to Browser

**Response JSON**:
```json
{
  "tailored_cv": "John Doe\nEmail: john@example.com\n...",
  "cover_letter": "Dear Hiring Manager,\n\nI am thrilled...",
  "interview_questions": "1. Tell us about your experience with...\n2. How have you...",
  "interview_prep_guide": "## Interview Preparation Guide\n\n### Focus Areas\n1. System Design...",
  "skill_gaps": {
    "missing_skills": ["Kubernetes", "gRPC"],
    "recommended_learning": ["Docker advanced patterns", "Load balancing"],
    "time_estimate": "3-4 weeks"
  }
}
```

### 5. React Displays Results

**File: `src/app/page.tsx`**

```typescript
const [results, setResults] = useState<Results | null>(null);

setResults(data);  // Update state with JSON response

return <ResultsDisplay results={results} />;
```

---

## 🔧 File Communication Details

### Input File Handling

**Supported Formats**:
- PDF (.pdf) - Extracted using PyPDF2
- Text (.txt) - Read as plain text
- Markdown (.md) - Treated as text

**How Files Are Processed**:

```typescript
// In route.ts
async function extractFileContent(file: File): Promise<string> {
  const buffer = await file.arrayBuffer();
  
  if (file.name.endsWith('.pdf')) {
    // 1. PDFs extracted by Python utility
    // 2. Written to temp file
    // 3. Python reads and extracts text
    fs.writeFileSync(tempPath, buffer);
    return executePythonExtract(tempPath);
  } else {
    // Text files read directly
    return Buffer.from(buffer).toString('utf8');
  }
}
```

**Python Extraction**:

```python
# In utils.py
def extract_text_from_pdf(pdf_path):
    with open(pdf_path, 'rb') as file:
        pdf_reader = PyPDF2.PdfReader(file)
        text = ""
        for page in pdf_reader.pages:
            text += page.extract_text()
    return text
```

### Temp File Lifecycle

```
1. User uploads 3 files
2. API route creates:
   /tmp/optimize-1234567890/
   ├── cv.txt (extracted/converted)
   ├── job.txt (extracted/converted)
   └── company.txt (extracted/converted)

3. Python agent reads these files

4. After processing, cleanup:
   rm -rf /tmp/optimize-1234567890/
```

**Important for Vercel**: Temp files deleted immediately after use (Vercel has ephemeral file system)

---

## 🚀 Performance Optimization

### Pipeline Timing

```
┌─ File Upload (100-500ms)
├─ Form Validation (50ms)
├─ File Extraction (500ms-2s for large PDFs)
├─ Python Startup (1-2s first call, cached)
├─ LLM API Call (30s-3min depending on provider)
│  ├─ Claude: 45s average
│  ├─ Gemini: 20s average (fastest)
│  └─ OpenAI: 60s average
├─ Result Processing (500ms)
└─ Display Results (100ms)

TOTAL: 1-3 minutes average
```

### Optimization Strategies

**1. Parallel LLM Calls** (Future Enhancement):
```python
# Currently sequential, could be:
tasks = [
    agent.tailor_cv(),
    agent.generate_cover_letter(),
    agent.generate_interview_questions(),
    agent.analyze_skill_gaps(),
    agent.generate_interview_prep_guide()
]
results = await asyncio.gather(*tasks)
```

**2. Caching Results** (Future Enhancement):
```typescript
// In route.ts
const cacheKey = hash(cvContent + jobContent + provider);
const cached = await redis.get(cacheKey);
if (cached) return cached;

const results = await callPythonAgent(...);
await redis.set(cacheKey, results, { ex: 86400 });  // 24h
return results;
```

**3. Streaming Results** (Future Enhancement):
```typescript
// Send results as they're generated instead of waiting for all
response.writeHead(200, { 'Content-Type': 'text/event-stream' });
response.write(`data: ${JSON.stringify({ kind: 'progress', percent: 25 })}\n\n`);
// ... more progress updates ...
```

---

## 🔐 Security Considerations

### Input Validation

```typescript
// In route.ts - Validate all inputs
if (!cvContent?.trim()) throw new Error("CV required");
if (!jobContent?.trim()) throw new Error("Job description required");
if (!companyContent?.trim()) throw new Error("Company info required");

const validProviders = ['claude', 'gemini', 'openai'];
if (!validProviders.includes(provider)) throw new Error("Invalid provider");
```

### File Size Limits

```typescript
// Max 50MB per file
const MAX_FILE_SIZE = 50 * 1024 * 1024;
if (file.size > MAX_FILE_SIZE) {
  throw new Error(`File too large: ${file.size} > ${MAX_FILE_SIZE}`);
}
```

### API Key Management

```bash
# Keys stored as environment variables (Vercel dashboard only)
# Never in source code
process.env.ANTHROPIC_API_KEY  // Claude
process.env.GEMINI_API_KEY      // Gemini
process.env.OPENAI_API_KEY      // OpenAI

# Runtime: Only passed to Python via subprocess environment
```

### Temporary File Cleanup

```typescript
// Guarantee cleanup even on error
try {
  // ... process files ...
} finally {
  fs.rmSync(tempDir, { recursive: true, force: true });
}
```

---

## 🧪 Testing the Integration

### Test Locally

```bash
# Terminal 1: Start web dev server
cd job_search/web
npm run dev

# Terminal 2: Test with curl
curl -X POST http://localhost:3000/api/optimize \
  -F "cv_file=@cv.pdf" \
  -F "job_text=Senior Developer needed" \
  -F "company_text=TechCorp" \
  -F "provider=claude"
```

### Test on Vercel

```bash
# Deploy to Vercel
vercel

# Test production endpoint
curl -X POST https://your-app.vercel.app/api/optimize \
  -F "cv_file=@cv.pdf" \
  -F "job_text=Senior Developer needed" \
  -F "company_text=TechCorp" \
  -F "provider=claude"
```

### Debug Logs

```bash
# View Vercel logs
vercel logs --tail

# Watch function logs
vercel logs /api/optimize --follow

# Check specific error
vercel logs [specific-deployment]
```

---

## 📊 Monitoring Integration Health

### Key Metrics to Monitor

1. **API Response Time**
   - Target: < 3 minutes total
   - Check: Vercel Analytics dashboard

2. **Error Rate**
   - Monitor: Failed submissions
   - Alert if: > 5% error rate

3. **LLM Provider Health**
   - Check: Provider status pages
   - Alert if: Provider down or throttled

4. **Temp File Cleanup**
   - Monitor: `/tmp` disk usage
   - Alert if: > 100MB accumulation

### Vercel Monitoring

```bash
# Check deployment status
vercel status

# View detailed logs
vercel logs /api/optimize

# Check environment variables
vercel env list
```

---

## 🔄 Debugging Common Issues

### Issue 1: Python Module Not Found

**Error**: `ModuleNotFoundError: No module named 'anthropic'`

**Solution**:
```bash
# Ensure requirements.txt includes:
# - anthropic
# - google-generativeai
# - openai
# - pypdf2

# Install on Vercel:
vercel env add PYTHON_PACKAGES "anthropic google-generativeai openai pypdf2"
```

### Issue 2: API Key Not Passed

**Error**: `AuthenticationError: API key not provided`

**Symptom**: Works locally, fails on Vercel

**Solution**:
```typescript
// In route.ts, pass env to Python subprocess
const env = {
  ...process.env,
  ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY,
  GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  OPENAI_API_KEY: process.env.OPENAI_API_KEY
};

execSync(pythonCmd, { env, maxBuffer: 10 * 1024 * 1024 });
```

### Issue 3: Buffer Overflow

**Error**: `Error: stdout maxBuffer exceeded`

**Symptom**: Large outputs don't display, truncated JSON

**Solution**:
```typescript
// Increase buffer in route.ts
execSync(cmd, { 
  maxBuffer: 50 * 1024 * 1024  // 50MB instead of default 1MB
});
```

### Issue 4: Temp File Permission Issues

**Error**: `EACCES: permission denied, open '/tmp/...'`

**Solution**:
```typescript
// Create temp directory with proper permissions
const tempDir = `/tmp/optimize-${Date.now()}`;
fs.mkdirSync(tempDir, { recursive: true, mode: 0o755 });

// Cleanup with force flag
fs.rmSync(tempDir, { recursive: true, force: true });
```

---

## 🚀 Scaling Considerations

### Current Limits
- Single Vercel instance
- Sequential processing
- 50MB max file size
- 3-minute timeout

### When to Scale

**If experiencing issues**:
1. Errors on > 10 concurrent requests
2. Timeouts for large files
3. Rate limiting from LLM providers

**Solutions**:
1. **Upgrade Vercel Plan**
   - More concurrent functions
   - Priority support

2. **Separate Python Backend**
   - Deploy Python to Cloud Run/Lambda
   - Use REST API instead of subprocess
   - Independent scaling

3. **Implement Queuing**
   - Redis Bull or similar
   - Process in background
   - Notify user when ready

---

## 📚 Related Documentation

- **Web App**: See [README.md](./README.md)
- **Deployment**: See [VERCEL_SETUP.md](./VERCEL_SETUP.md)
- **Quick Start**: See [QUICK_START.md](./QUICK_START.md)
- **Python Agent**: See `../agent.py`
- **API Route**: See `src/app/api/optimize/route.ts`

---

**Version**: 1.0  
**Last Updated**: March 2026  
**Audience**: Developers & DevOps Engineers  
**Status**: Production Ready ✅
