# 🚀 Quick Start Guide

Get your AI Job Search Agent running in 5 minutes!

## Step 1: Set Up Your Environment (2 min)

### On Windows:
```bash
# Create virtual environment
python -m venv venv
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

### On macOS/Linux:
```bash
# Create virtual environment
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

## Step 2: Configure Your API Key (1 min)

1. **Copy the example environment file:**
   ```bash
   cp .env.example .env
   ```

2. **Get an API key** (choose one):
   - **Claude (Recommended)**: https://console.anthropic.com/
   - **Gemini (Free tier available)**: https://makersuite.google.com/app/apikey
   - **OpenAI**: https://platform.openai.com/api-keys

3. **Add your key to `.env`:**
   ```
   ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxx
   ```

## Step 3: Run the Agent (2 min)

### Interactive Mode (Recommended for first-time use):
```bash
python main.py
```

Then:
1. Select your AI provider (Claude recommended)
2. Paste or upload your CV
3. Paste or upload the job description
4. Paste or upload company information
5. Review generated materials
6. Check the `outputs/` folder for saved files

### Batch Mode (for automation):
```bash
python main.py your_cv.pdf job_posting.txt company_info.txt
```

## What You'll Get

After running the agent, you'll have in the `outputs/` folder:

✅ **tailored_cv.md** - Your CV reformatted for this specific job  
✅ **cover_letter.md** - Personalized cover letter  
✅ **interview_questions.md** - 20 targeted interview questions  
✅ **interview_prep_guide.md** - Complete interview preparation  
✅ **skill_gaps_analysis.md** - Missing skills and learning paths  

## Example Workflow

```bash
# 1. Activate environment (on Windows)
venv\Scripts\activate

# 2. Run the agent
python main.py

# 3. Follow the prompts to provide:
#    - Your CV
#    - Job description
#    - Company information

# 4. Check outputs folder for results
```

## Troubleshooting

### "API key not found"
- Make sure you created `.env` file in the `job_search/` directory
- Check the API key is correct in `.env`
- Restart your terminal after adding the API key

### "Module not found"
```bash
# Reinstall dependencies
pip install -r requirements.txt
```

### "File not found"
- Use absolute paths or relative paths from the `job_search/` directory
- Supported formats: `.pdf`, `.txt`, `.md`

## Pro Tips

1. **Better CV Results**: Include quantifiable achievements (numbers, percentages)
2. **Better Cover Letter**: Provide detailed company research information
3. **Better Interview Prep**: Use complete job description including bonus skills
4. **Save Everything**: Generated files are automatically saved in `outputs/`

## Next Steps

After generating materials:

1. 📝 Review the tailored CV and adjust if needed
2. ✍️ Personalize the cover letter with your own touches
3. 📚 Study the interview questions and prep guide
4. 🎤 Practice speaking answers out loud
5. 🔍 Research the company thoroughly
6. ❓ Prepare questions to ask the interviewer
7. 🚀 Submit your application with confidence!

## Support

- 📖 Full documentation: See `README.md`
- 💡 Example code: See `example_usage.py`
- ❓ Environment setup: Check `.env.example`

## Using Different LLM Providers

| Provider | Speed | Cost | Setup |
|----------|-------|------|-------|
| **Claude** | ⚡ Fast | 💰 Reasonable | Easy - 1 API key |
| **Gemini** | ⚡⚡ Fastest | 💰 Free tier | Easy - 1 API key |
| **OpenAI** | ⚡ Moderate | 💰 Higher | Easy - 1 API key |

The tool will ask you to select your preferred provider when you run it.

---

**Ready?** Run `python main.py` and get started! 🎯
