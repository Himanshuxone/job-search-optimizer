# ❓ FAQ & Troubleshooting

## Installation & Setup

### Q: How do I install the dependencies?
A: Run this command in the `job_search` directory:
```bash
pip install -r requirements.txt
```

### Q: I get "ModuleNotFoundError: No module named 'anthropic'"
A: Install dependencies:
```bash
pip install -r requirements.txt
```

If that doesn't work, install individually:
```bash
pip install anthropic google-generativeai openai python-dotenv pypdf2 colorama
```

### Q: Where do I put my API key?
A: 
1. Copy `.env.example` to `.env` in the same directory
2. Open `.env` and add your API key:
   ```
   ANTHROPIC_API_KEY=sk-ant-xxxxx
   ```
3. Save the file

### Q: Do I need all three API keys?
A: No! You only need ONE. Choose:
- **Claude**: Best quality, Anthropic
- **Gemini**: Fastest, free tier available
- **OpenAI**: GPT-4, most expensive

The tool will ask which one you want to use.

---

## API Key Issues

### Q: "ANTHROPIC_API_KEY not set in environment"
A:
1. Check you created a `.env` file (in `job_search/` folder)
2. Check the file has `ANTHROPIC_API_KEY=your_actual_key`
3. Close and reopen your terminal
4. Try again

### Q: My API key doesn't work
A:
1. Double-check you copied the ENTIRE key
2. Verify no extra spaces: `ANTHROPIC_API_KEY=sk-ant-xxx` (not `ANTHROPIC_API_KEY = sk-ant-xxx`)
3. Test the key on the provider's website
4. Generate a new key if needed

### Q: I get rate limit errors
A:
- You've hit the provider's request limit
- **Solution 1**: Wait 1-2 hours
- **Solution 2**: Use a different AI provider
- **Solution 3**: Use batch mode with smaller inputs

### Q: "GEMINI_API_KEY not set" but I want to use Claude
A:
- The app checks for all keys, but only uses the one you select
- Add Claude key to .env:
  ```
  ANTHROPIC_API_KEY=sk-ant-xxxxx
  GEMINI_API_KEY=not_needed
  OPENAI_API_KEY=not_needed
  ```

---

## Running the Agent

### Q: How do I run the agent?
A:
```bash
# Interactive mode (recommended)
python main.py

# Batch mode with files
python main.py resume.pdf job.txt company.txt
```

### Q: The program exits after I paste content
A:
- Make sure to type `END` on a new line when done
- Don't forget the blank line before `END`
- Example:
  ```
  Your CV content here...
  More content...
  [press Enter]
  END
  [press Enter]
  ```

### Q: It's taking a long time
A:
- Generating materials takes 1-2 minutes (normal)
- If stuck for >5 minutes, press Ctrl+C and try again
- Use batch mode with shorter inputs for speed

### Q: How do I run it again with different documents?
A:
```bash
# Interactive mode asks for fresh input each time
python main.py

# Or batch mode with new files
python main.py new_resume.pdf new_job.txt new_company.txt
```

---

## Input Files

### Q: What file formats are supported?
A:
- ✅ `.pdf` (PDF files)
- ✅ `.txt` (Text files)
- ✅ `.md` (Markdown files)
- ❌ `.docx` (not supported)

**Solution**: Convert Word docs to PDF or plain text first

### Q: Error: "File not found"
A:
- Check the file path is correct
- Use full path if in different directory: `C:\Users\Name\Documents\resume.pdf`
- Try without spaces in filename

### Q: My PDF won't load
A:
- Some PDFs are image-only (scanned documents)
- **Solution**: Use OCR to convert, or paste the text directly
- Try a different PDF viewer to extract text

### Q: I get an encoding error with my text file
A:
- Save the file as UTF-8 encoding
- In VS Code: Click encoding indicator at bottom → UTF-8
- Or paste content directly in interactive mode

---

## Output & Results

### Q: Where are the generated files saved?
A:
All files go in the `outputs/` folder:
- `tailored_cv.md`
- `cover_letter.md`
- `interview_questions.md`
- `interview_prep_guide.md`
- `skill_gaps_analysis.md`

### Q: How do I open the generated files?
A:
- They're `.md` (Markdown) files
- Open with any text editor (VS Code, Notepad, etc.)
- Or view in browser
- Copy text and use as needed

### Q: Can I edit the generated files?
A:
**Yes!** Edit everything:
- Fix any inaccuracies
- Add personal touches to cover letter
- Adjust interview answers
- Remove irrelevant questions

---

## Content Quality

### Q: The tailored CV removed something important
A:
1. The agent prioritizes job-relevant content
2. Add more emphasis to important skills in original CV
3. Edit the output to add back what's needed
4. Run again with clearer language

### Q: The cover letter is too generic
A:
**This means**: Company info was too vague

**Solution**: Add more specific details:
- Recent news about the company
- Specific product features
- Company values you align with
- Team or department you'll work on

### Q: Interview questions don't match my experience
A:
1. Ensure your CV clearly lists relevant experience
2. Make sure job description matches your target role
3. Use specific technical terms in job description
4. Run again with more detailed inputs

### Q: Skill gaps analysis doesn't match job requirements
A:
- Update job description with ALL requirements
- Remove irrelevant jobs from description
- Add context about skill importance
- Specify "must-have" vs "nice-to-have"

---

## Common Errors & Fixes

### Error: `AttributeError: 'NoneType' has no attribute...`
**Cause**: Missing API key or wrong credentials
**Fix**:
```bash
# Verify .env file exists with correct key
# Restart terminal
# Try again
```

### Error: `ConnectionError` or `TimeoutError`
**Cause**: Network or API server unavailable
**Fix**:
- Check internet connection
- Try different API provider
- Wait and retry

### Error: `JSONDecodeError`
**Cause**: AI response couldn't be parsed
**Fix**:
- This is rare, try again
- Use a different AI provider
- Try with shortened inputs

### Error: "UnicodeDecodeError"
**Cause**: File encoding issue
**Fix**:
- Save file as UTF-8
- Or paste content directly in interactive mode

---

## Performance & Optimization

### Q: How can I make it faster?
A:
1. Use `.txt` files instead of `.pdf`
2. Make inputs shorter and more focused
3. Use Gemini (fastest AI provider)
4. Use batch mode instead of interactive

### Q: How much data can I input?
A:
- CV: 2,000-5,000 words (optimal)
- Job description: 500-1,500 words
- Company info: 500-1,000 words
- Total: Under 20,000 tokens recommended

### Q: Can I process multiple jobs at once?
A:
- Run one job at a time
- But you can optimize: tailor CV multiple times for different jobs
- Save each output separately

---

## Platform-Specific Issues

### Windows Users

**Q: Command not recognized: 'python'**
A:
- Use `python -V` to verify installation
- If not found, add Python to PATH or reinstall
- Try `py` instead of `python`

**Activating virtual environment:**
```bash
# Windows Command Prompt
venv\Scripts\activate

# Windows PowerShell
venv\Scripts\Activate.ps1
```

### macOS/Linux Users

**Q: Permission denied**
A:
```bash
# Make main.py executable
chmod +x main.py
# Or
python main.py  # instead of ./main.py
```

---

## Advanced

### Q: Can I use the agent in my own code?
A:
Yes! See code examples in `example_usage.py`

```python
from agent import JobSearchAgent

agent = JobSearchAgent()
agent.load_cv(cv_text)
agent.load_job_description(job_text)
agent.load_company_info(company_text)

results = agent.run_full_pipeline()
```

### Q: Can I customize the LLM prompts?
A:
Edit `config.py` to change system prompts:
```python
SYSTEM_PROMPT = "Your custom instructions here..."
```

### Q: How do I switch AI providers programmatically?
A:
```python
from agent import JobSearchAgent
from config import LLMProvider
from llm_provider import get_llm_provider

provider = get_llm_provider(LLMProvider.GEMINI)
agent = JobSearchAgent(llm_provider=provider)
```

---

## When to Contact Support

Still stuck? Try:
1. ✅ Check this FAQ
2. ✅ Review README.md
3. ✅ Check QUICK_START.md
4. ✅ Try USAGE_GUIDE.md for your use case
5. ✅ Retry with different inputs
6. ✅ Try different AI provider

---

## Quick Fixes Checklist

- [ ] .env file exists and has API key
- [ ] Python 3.8+ installed
- [ ] Dependencies installed: `pip install -r requirements.txt`
- [ ] Using correct file paths
- [ ] Supported file formats (.pdf, .txt, .md)
- [ ] API key is valid and not expired
- [ ] Internet connection working
- [ ] Terminal restarted after adding API key

---

## Common Success Tips

✅ **Detailed CV**: Include metrics and achievements
✅ **Complete job description**: Copy entire job posting
✅ **Company research**: Add recent news and culture info
✅ **Specific skills**: List all technical requirements
✅ **Start early**: Process materials 1-2 days before applying
✅ **Personalize**: Edit generated content to add your voice
✅ **Practice**: Read interview questions aloud multiple times

---

**Still have questions?** Review the main [README.md](README.md) or [QUICK_START.md](QUICK_START.md) for more help!
