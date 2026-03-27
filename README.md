# 🚀 AI-Powered Job Search Optimizer

A sophisticated, production-ready AI agent that transforms your job search experience using advanced language models. Automatically tailor your CV, generate personalized cover letters, and prepare comprehensively for interviews with AI-powered insights.

## 🎯 Features

✅ **CV Tailoring** - Automatically restructure and reframe your CV to match specific job requirements
✅ **Cover Letter Generation** - Create compelling, personalized cover letters incorporating company insights
✅ **Interview Preparation** - Generate 20 targeted interview questions based on identified skill gaps
✅ **Skill Gap Analysis** - Identify missing skills with detailed learning paths and resource recommendations
✅ **Interview Prep Guide** - Comprehensive preparation strategies including STAR format examples and talking points
✅ **Multi-LLM Support** - Seamlessly works with Claude (Anthropic), Gemini (Google), or OpenAI
✅ **Flexible Modes** - Interactive CLI for guided experience or batch mode for automation
✅ **Multiple File Formats** - Support for PDF, TXT, and Markdown documents  

## 📋 Table of Contents

1. [Requirements](#requirements)
2. [Installation](#installation)
3. [How to Use](#how-to-use)
4. [File Purpose Reference](#file-purpose-reference)
5. [Generated Output](#generated-output)
6. [Example Workflows](#example-workflows)
7. [Troubleshooting](#troubleshooting)
8. [Advanced Configuration](#advanced-configuration)
9. [Tips for Best Results](#tips-for-best-results)

---

## Requirements

- **Python**: 3.8 or higher
- **API Key**: At least one of the following:
  - **Claude API** (Anthropic): [Get Key](https://console.anthropic.com/)
  - **Gemini API** (Google): [Get Key](https://makersuite.google.com/app/apikey)
  - **OpenAI API**: [Get Key](https://platform.openai.com/api-keys)
- **Internet Connection**: Required for API calls
- **Disk Space**: ~100MB for dependencies

---

## Installation

### Step 1: Install Python Dependencies

```bash
cd job_search
pip install -r requirements.txt
```

**What gets installed:**
- `anthropic` - Claude API client
- `google-generativeai` - Gemini API client
- `openai` - OpenAI API client
- `python-dotenv` - Environment variable management
- `pypdf2` - PDF text extraction
- `pydantic` - Data validation
- `requests` - HTTP client
- `colorama` - Terminal color output

### Step 2: Configure API Keys

```bash
# Copy the environment template
cp .env.example .env
```

Edit `.env` and add your API key:

```bash
# Choose ONE of these options:

# Option 1: Anthropic Claude (Recommended)
ANTHROPIC_API_KEY=sk-ant-your-key-here

# Option 2: Google Gemini (Free tier available)
GEMINI_API_KEY=your-gemini-key-here

# Option 3: OpenAI GPT-4
OPENAI_API_KEY=sk-your-openai-key-here
```

### Step 3: Verify Installation

```bash
python validate_setup.py
```

You should see all checks pass with ✅ marks.

---

## How to Use

### Interactive Mode (Recommended)

Perfect for first-time users or single job applications.

```bash
python main.py
```

**What happens:**
1. **Select LLM Provider** - Choose Claude, Gemini, or OpenAI
2. **Step 1: Load Your CV**
   - Option A: Paste file path (supports .pdf, .txt, .md)
   - Option B: Paste content directly
3. **Step 2: Load Job Description**
   - Paste full job posting or job description text
   - Include all requirements and responsibilities
4. **Step 3: Load Company Information**
   - Add company website, mission, culture, recent news
   - Include team structure if available
5. **Review Materials** - View any generated content in terminal
6. **Download** - All materials auto-saved to `outputs/` folder

**Expected time**: 2-4 minutes

### Batch Mode (Automation)

Perfect for processing multiple jobs or automation workflows.

```bash
# Syntax:
python main.py <cv_file> <job_file> [company_file]

# Example:
python main.py resume.pdf job_posting.txt company_research.txt
```

**Supported file formats:**
- `.pdf` - PDF documents
- `.txt` - Text files
- `.md` - Markdown files

**Features:**
- No prompts or user interaction
- Automatically saves all outputs
- Suitable for scripts and automation
- Process multiple jobs sequentially

---

## File Purpose Reference

### Core Application Files

#### **main.py** - Command-Line Interface
**Purpose**: Entry point and user interaction layer  
**Responsibility**: Manages both interactive and batch modes  
**Key Functions**:
- `print_header()` - Display welcome banner
- `get_input_file()` - Handle file or text input
- `select_llm_provider()` - Let user choose AI provider
- `interactive_mode()` - Full guided workflow
- `batch_mode()` - Automated processing from files
- `main()` - Entry point dispatcher

**When to look here**: If you want to modify the CLI interface or add new user interaction features

**Typical usage flow**:
```
User runs: python main.py
    ↓
main() determines mode (interactive vs batch)
    ↓
interactive_mode() or batch_mode() runs
    ↓
Calls JobSearchAgent methods
    ↓
Displays/saves results
```

---

#### **agent.py** - Core AI Agent Logic
**Purpose**: Main orchestrator containing all job search intelligence  
**Responsibility**: Implements all AI-powered features  
**Key Classes**:
- `JobSearchAgent` - Main class with 8 core methods

**Key Methods**:

| Method | Input | Output | Purpose |
|--------|-------|--------|---------|
| `load_cv()` | CV text | None | Store CV for analysis |
| `load_job_description()` | Job description text | None | Store job requirements |
| `load_company_info()` | Company information | None | Store company context |
| `tailor_cv()` | (uses loaded data) | Tailored CV text | Reformat CV for job |
| `generate_cover_letter()` | (uses loaded data) | Cover letter text | Create personalized letter |
| `analyze_skill_gaps()` | (uses loaded data) | JSON/Dict | Identify missing skills |
| `generate_interview_questions()` | (uses loaded data) | List of strings | Create 20 interview questions |
| `generate_interview_prep_guide()` | (uses loaded data) | Formatted text | Create preparation strategy |
| `run_full_pipeline()` | (uses loaded data) | Dict of all outputs | Generate all materials at once |
| `save_all_outputs()` | Results dict | Dict of file paths | Write all results to files |

**Example usage**:
```python
from agent import JobSearchAgent

agent = JobSearchAgent()
agent.load_cv(cv_text)
agent.load_job_description(job_text)
agent.load_company_info(company_text)

# Generate specific material
cv = agent.tailor_cv()

# Or generate all materials
results = agent.run_full_pipeline()
files = agent.save_all_outputs(results)
```

**When to look here**: If you want to understand the core logic or add new AI-powered features

---

#### **llm_provider.py** - Multi-Provider LLM Interface
**Purpose**: Abstract interface for different AI language models  
**Responsibility**: Handle API calls to various LLM services  
**Key Classes**:

| Class | Provider | API | Model |
|-------|----------|-----|-------|
| `LLMInterface` | N/A | Abstract | Base class |
| `ClaudeProvider` | Anthropic | anthropic | claude-3-5-sonnet |
| `GeminiProvider` | Google | google.generativeai | gemini-2.0-flash |
| `OpenAIProvider` | OpenAI | openai | gpt-4-turbo |

**Key Functions**:
- `get_llm_provider()` - Factory function to get the right provider

**How it works**:
```python
# Each provider inherits from LLMInterface
provider = get_llm_provider()  # Returns correct provider
response = provider.generate(prompt, system_prompt)
```

**When to look here**: 
- If you want to add a new LLM provider
- If you need to switch AI providers
- If you're debugging API issues

**To add a new provider**:
1. Create new class inheriting from `LLMInterface`
2. Implement `generate()` method
3. Add to `get_llm_provider()` function
4. Update `config.py` with new provider

---

#### **config.py** - Configuration & Settings
**Purpose**: Centralized configuration management  
**Responsibility**: Define all settings and prompts  
**Key Components**:

```python
# LLM Provider Selection
class LLMProvider(Enum):
    CLAUDE = "claude"
    GEMINI = "gemini"
    OPENAI = "openai"

# API Keys (loaded from environment)
CLAUDE_API_KEY = os.getenv("ANTHROPIC_API_KEY")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

# Default provider
DEFAULT_LLM = LLMProvider.CLAUDE

# Model identifiers
CLAUDE_MODEL = "claude-3-5-sonnet-20241022"
GEMINI_MODEL = "gemini-2.0-flash"
OPENAI_MODEL = "gpt-4-turbo"

# System prompt (guides AI behavior)
SYSTEM_PROMPT = """You are an expert career coach..."""

# Settings
NUMBER_OF_INTERVIEW_QUESTIONS = 20
PROMPT_RETRIES = 3
TIMEOUT = 30
```

**When to look here**: 
- To change default LLM provider
- To modify system prompts
- To adjust interview question count
- To add new configuration options

---

#### **utils.py** - Utility Functions
**Purpose**: Helper functions for file handling and data processing  
**Responsibility**: Reusable utilities  
**Key Functions**:

| Function | Purpose | Input | Output |
|----------|---------|-------|--------|
| `extract_text_from_pdf()` | Read PDF files | File path | Text string |
| `extract_text_from_file()` | Read any supported file | File path | Text string |
| `save_output()` | Write content to file | Content, type, directory | File path |
| `format_markdown()` | Create formatted markdown | Title, content, sections | Markdown string |
| `parse_json_response()` | Extract JSON from response | Response text | Parsed dict |

**Example usage**:
```python
from utils import extract_text_from_file, save_output

# Load file
text = extract_text_from_file("resume.pdf")

# Save content
path = save_output(content, "tailored_cv", "outputs/")
```

**When to look here**: 
- If you need to add file format support
- If you want to add new utility functions
- If you're handling file I/O operations

---

### Configuration Files

#### **.env.example** - Environment Variables Template
**Purpose**: Template for API key configuration  
**What it contains**: Examples of all API key formats  
**How to use**:
```bash
cp .env.example .env
# Edit .env and add your actual API key
```

**Important**: 
- ⚠️ Never commit actual `.env` file to git
- ✅ Only commit `.env.example`
- Use `.env` for actual secrets

---

#### **requirements.txt** - Python Dependencies
**Purpose**: Lists all required Python packages and versions  
**How to use**:
```bash
pip install -r requirements.txt
```

**Current dependencies**:
```
anthropic==0.25.8                    # Claude API
google-generativeai==0.7.2           # Gemini API
openai==1.30.0                       # OpenAI API
python-dotenv==1.0.0                 # Environment variables
pypdf2==4.2.0                        # PDF extraction
pydantic==2.6.4                      # Data validation
requests==2.31.0                     # HTTP requests
colorama==0.4.6                      # Terminal colors
```

---

### Helper & Example Files

#### **example_usage.py** - Working Code Examples
**Purpose**: Demonstrates programmatic API usage  
**What it shows**: 
- How to initialize the agent
- How to load content
- How to call individual methods
- How to display results

**How to use**:
```bash
python example_usage.py
```

**When to use**: 
- Learn how to use the agent in your own code
- Test if installation works
- See sample output format

---

#### **validate_setup.py** - Setup Verification Script
**Purpose**: Diagnose installation issues  
**What it checks**:
- Python version (3.8+)
- All dependencies installed
- `.env` file exists and configured
- All project files present
- Modules can be imported

**How to use**:
```bash
python validate_setup.py
```

**When to use**: 
- After installation to verify setup
- When troubleshooting issues
- Before reporting bugs

---

### Documentation Files

#### **README.md** (This file)
**Purpose**: Main documentation and user guide  
**Contains**: Installation, usage, file reference

#### **QUICK_START.md**
**Purpose**: Get up and running in 5 minutes  
**When to read**: First time users in a hurry

#### **USAGE_GUIDE.md**
**Purpose**: Real-world scenarios and best practices  
**When to read**: Need practical examples for your situation

#### **FAQ.md**
**Purpose**: Common issues and solutions  
**When to read**: Troubleshooting or common questions

#### **SETUP_SUMMARY.md**
**Purpose**: Architecture and design overview  
**When to read**: Want to understand system design

#### **DEVELOPER_GUIDE.md**
**Purpose**: Technical deep-dive for developers  
**When to read**: Want to extend or modify the code

#### **INDEX.md**
**Purpose**: Navigation hub for all documentation  
**When to read**: Looking for specific information

---

## Generated Output

All materials are automatically saved to the `outputs/` directory:

### 1. **tailored_cv.md**
**Contains**: Your CV reformatted and rewritten for the specific job  
**What's improved**:
- Emphasizes relevant skills
- Reorganizes achievements by relevance
- Uses industry-specific language
- Highlights matching keywords
- Maintains authenticity

**How to use**: Copy content to your resume builder or application

### 2. **cover_letter.md**
**Contains**: Personalized cover letter for this specific role  
**What's included**:
- Company-specific opening hook
- Relevant achievement callouts (2-3 specific examples from CV)
- Demonstration of company knowledge
- Professional closing with call to action
- 3-4 paragraphs optimized for impact

**How to use**: Copy, personalize slightly, submit with application

### 3. **interview_questions.md**
**Contains**: 20 targeted interview questions  
**Question types**:
- Questions about skill gaps (50%)
- Behavioral questions in STAR format (30%)
- Technical questions (15%)
- Cultural fit questions (5%)

**How to use**: Study and practice answering each question out loud

### 4. **interview_prep_guide.md**
**Contains**: Comprehensive interview preparation strategy  
**What's included**:
- Key talking points from your CV
- How to address skill gaps positively
- Company-specific research points
- STAR format examples for top questions
- Clarifying questions to ask interviewer
- Common pitfalls to avoid
- Follow-up strategy

**How to use**: Your personal interview playbook

### 5. **skill_gaps_analysis.md**
**Contains**: Detailed gap analysis in JSON format  
**What's included**:
```json
{
  "technical_gaps": ["skill1", "skill2"],
  "soft_skill_gaps": ["skill1", "skill2"],
  "experience_gaps": ["area1", "area2"],
  "learning_recommendations": [
    {
      "topic": "Skill name",
      "importance": "high/medium/low",
      "resources": "Course types or platforms",
      "estimated_learning_time": "weeks/months"
    }
  ]
}
```

**How to use**: 
- Identify prioritized learning areas
- Plan skill development
- Address gaps in interview

---

## Example Workflows

### Workflow 1: Single Job Application (15 minutes)

```bash
# Step 1: Run the agent
python main.py

# Step 2: Select provider (choose Claude)

# Step 3: Load your CV
# Option: Paste file path to resume.pdf

# Step 4: Load job description
# Option: Paste or upload job_posting.txt

# Step 5: Load company information
# Option: Paste or upload company_research.txt

# Step 6: Review materials
# Select materials to preview in terminal

# Step 7: Download
# Check outputs/ folder for all materials

# Step 8: Apply with confidence!
```

**Output in `outputs/`:**
- tailored_cv.md
- cover_letter.md
- interview_questions.md
- interview_prep_guide.md
- skill_gaps_analysis.md

### Workflow 2: Multiple Job Applications (30+ minutes)

```bash
# For each job:
python main.py

# Or batch process:
python main.py cv.pdf job1.txt company1.txt
python main.py cv.pdf job2.txt company2.txt
python main.py cv.pdf job3.txt company3.txt

# Results saved with timestamps in outputs/
```

### Workflow 3: Career Transition Preparation

```bash
# Target entry-level role in new field
python main.py

# Review skill gap recommendations
# Create 30-60-90 day learning plan
# Use interview prep guide to address concerns
```

---

## Troubleshooting

### Installation Issues

**Q: "ModuleNotFoundError: No module named 'anthropic'"**

A: Install dependencies
```bash
pip install -r requirements.txt
```

**Q: "Python 3.8+ required"**

A: Check your Python version:
```bash
python --version
```

Install Python 3.8+: https://www.python.org/downloads/

### Configuration Issues

**Q: "ANTHROPIC_API_KEY not set in environment"**

A: Ensure `.env` file is configured:
```bash
# Create .env file if missing
cp .env.example .env

# Add your actual API key
ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxx
```

**Q: "Invalid API key"**

A: 
1. Verify key is copied completely (no extra spaces)
2. Test key on provider's website
3. Generate a new key if needed
4. Restart terminal after updating .env

### File Issues

**Q: "File not found: resume.pdf"**

A: Use full file path:
```bash
python main.py "C:\Users\Name\Documents\resume.pdf" "job.txt" "company.txt"
```

**Q: PDF won't load / "Error extracting PDF"**

A:
- Some PDFs are image-only (scanned)
- Convert to text first, or paste content directly
- Try saving PDF as text file

### Content Quality Issues

**Q: "CV tailoring doesn't match job well"**

A: 
- Ensure CV contains specific achievements with metrics
- Make sure job description includes all requirements
- Try with more detailed company information
- Review the output and edit as needed

**Q: "Interview questions too generic"**

A:
- Add more technical details to job description
- Include specific technologies and tools needed
- Specify seniority level clearly
- Add must-have vs nice-to-have skills explicitly

---

## Advanced Configuration

### Change Default LLM Provider

Edit `config.py`:

```python
# Line 17 - Change from CLAUDE to GEMINI or OPENAI
DEFAULT_LLM = LLMProvider.GEMINI
```

### Modify System Prompt

Edit `config.py`:

```python
# Line 27
SYSTEM_PROMPT = """Your custom instructions here"""
```

### Adjust Interview Question Count

Edit `config.py`:

```python
# Line 30
NUMBER_OF_INTERVIEW_QUESTIONS = 30  # Instead of 20
```

### Use in Your Own Code

```python
from agent import JobSearchAgent
from config import LLMProvider
from llm_provider import get_llm_provider

# Create agent with specific provider
provider = get_llm_provider(LLMProvider.GEMINI)
agent = JobSearchAgent(llm_provider=provider)

# Load content
agent.load_cv(cv_text)
agent.load_job_description(job_text)
agent.load_company_info(company_text)

# Generate specific materials
cv = agent.tailor_cv()
letter = agent.generate_cover_letter()
questions = agent.generate_interview_questions()

# Or generate all at once
results = agent.run_full_pipeline()
```

---

## Tips for Best Results

### CV Optimization

✅ **Do**:
- Include quantifiable achievements (numbers, percentages, improvements)
- Use specific technical terms and tools
- Highlight both technical and soft skills
- List business impact of your work
- Include relevant certifications and education

❌ **Don't**:
- Use generic descriptions
- List tasks without outcomes
- Forget metrics and results
- Hide relevant experience

### Job Description Tips

✅ **Do**:
- Paste the entire job posting
- Include all requirements and responsibilities
- Note "must-have" vs "nice-to-have" skills
- Add compensation and benefits info
- Include team structure if available

❌ **Don't**:
- Use shortened/summarized versions
- Miss important sections
- Remove technical requirements

### Company Information Tips

✅ **Do**:
- Include company mission and values
- Add recent news or achievements
- Mention company culture and perks
- Note product/service focus
- Describe market position

❌ **Don't**:
- Leave it generic
- Miss recent developments
- Forget to mention what they do

### Interview Preparation

✅ **After generating questions**:
1. Read all 20 questions carefully
2. Group similar questions together
3. Practice speaking answers aloud
4. Use STAR format for behavioral questions
5. Research company before interview
6. Prepare questions to ask them
7. Do a mock interview with a friend

❌ **Don't**:
- Just read the questions silently
- Skip practicing out loud
- Ignore skill gap recommendations
- Go in unprepared

---

## Performance Metrics

| Metric | Value |
|--------|-------|
| Average processing time | 2-4 minutes |
| CV output length | 1,000-2,000 words |
| Cover letter length | 300-500 words |
| Interview questions | 20 questions |
| Skill gap analysis | 8-15 items |
| Total output | ~10,000-15,000 words |

---

## Support & Help

### Quick Links

- **Getting Started** → [QUICK_START.md](QUICK_START.md)
- **Practical Examples** → [USAGE_GUIDE.md](USAGE_GUIDE.md)
- **Troubleshooting** → [FAQ.md](FAQ.md)
- **Navigation Hub** → [INDEX.md](INDEX.md)
- **Architecture** → [SETUP_SUMMARY.md](SETUP_SUMMARY.md)
- **For Developers** → [DEVELOPER_GUIDE.md](DEVELOPER_GUIDE.md)

### Common Issues

1. **Setup problems** → Run `python validate_setup.py`
2. **Usage questions** → Check [FAQ.md](FAQ.md)
3. **API issues** → Verify .env and credentials
4. **Content quality** → Review [USAGE_GUIDE.md](USAGE_GUIDE.md)
5. **Code questions** → See [DEVELOPER_GUIDE.md](DEVELOPER_GUIDE.md)

---

## Version Information

- **Version**: 1.0
- **Release Date**: March 2026
- **Python**: 3.8+
- **Supported LLMs**: Claude 3.5 Sonnet, Gemini 2.0 Flash, GPT-4 Turbo
- **Status**: Production Ready

---

## Next Steps

1. ✅ Install dependencies: `pip install -r requirements.txt`
2. ✅ Add API key: Copy and edit `.env` file
3. ✅ Verify setup: Run `python validate_setup.py`
4. ✅ See examples: Run `python example_usage.py`
5. ✅ Get started: Run `python main.py`

---

## License & Attribution

This AI Job Search Optimizer is provided as-is for personal and commercial use.

---

**Ready to optimize your job search?** 🚀

```bash
python main.py
```

**Good luck with your applications!** 🍀
