# 👨‍💻 Developer Guide

Advanced documentation for developers who want to understand, extend, or contribute to the Job Search AI Agent.

---

## 📚 Architecture Overview

### System Components

```
┌─────────────────────────────────────────────────────────────┐
│                    User Interface (CLI)                      │
│              main.py - Interactive & Batch Modes             │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                  Job Search Agent                            │
│        agent.py - Core Business Logic & Workflows            │
│   ├─ load_cv()                                              │
│   ├─ load_job_description()                                 │
│   ├─ load_company_info()                                    │
│   ├─ tailor_cv()                                            │
│   ├─ generate_cover_letter()                                │
│   ├─ analyze_skill_gaps()                                   │
│   ├─ generate_interview_questions()                         │
│   ├─ generate_interview_prep_guide()                        │
│   ├─ run_full_pipeline()                                    │
│   └─ save_all_outputs()                                     │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                  LLM Provider Layer                          │
│    llm_provider.py - Multi-Provider Support                 │
│   ├─ LLMInterface (Abstract Base)                          │
│   ├─ ClaudeProvider                                        │
│   ├─ GeminiProvider                                        │
│   └─ OpenAIProvider                                        │
└──────────┬──────────────────────────────────────────┬──────┘
           │                                          │
           ▼                                          ▼
┌──────────────────────────┐        ┌────────────────────────┐
│    Anthropic Claude API   │        │  Google Gemini API     │
│  claude-3-5-sonnet       │        │  gemini-2.0-flash      │
└──────────────────────────┘        └────────────────────────┘
                                              │
                                              ▼
                                    ┌────────────────────────┐
                                    │  OpenAI GPT-4 API      │
                                    │  gpt-4-turbo           │
                                    └────────────────────────┘
```

### Module Dependencies

```
main.py
├── agent.py
│   ├── llm_provider.py
│   │   ├── anthropic
│   │   ├── google.generativeai
│   │   └── openai
│   └── config.py
└── utils.py
    ├── PyPDF2
    ├── pathlib
    └── json

config.py
└── dotenv
    └── os

llm_provider.py
├── anthropic
├── google.generativeai
└── openai
```

---

## 🔧 Code Walkthrough

### 1. Configuration (config.py)

```python
class LLMProvider(Enum):
    CLAUDE = "claude"
    GEMINI = "gemini"
    OPENAI = "openai"

# LLM Models used
CLAUDE_MODEL = "claude-3-5-sonnet-20241022"
GEMINI_MODEL = "gemini-2.0-flash"
OPENAI_MODEL = "gpt-4-turbo"

# System prompts guide AI behavior
SYSTEM_PROMPT = """You are an expert career coach..."""
```

**Usage**: Import configuration values throughout the application

### 2. LLM Provider Interface (llm_provider.py)

Abstract base class ensures all providers have the same interface:

```python
class LLMInterface(ABC):
    @abstractmethod
    def generate(self, prompt: str, system_prompt: str = None) -> str:
        """Generate response from LLM"""
        pass
```

**Concrete implementations**:
- `ClaudeProvider`: Uses Anthropic API
- `GeminiProvider`: Uses Google Generative AI
- `OpenAIProvider`: Uses OpenAI API

**Key design**: Provider pattern allows easy addition of new LLM sources

### 3. Core Agent (agent.py)

```python
class JobSearchAgent:
    def __init__(self, llm_provider: LLMInterface = None):
        self.llm = llm_provider or get_llm_provider()
        self.cv_content = ""
        self.job_description = ""
        self.company_info = ""
```

**Methods organized by functionality:**

| Method | Input | Output | LLM Calls |
|--------|-------|--------|-----------|
| `tailor_cv()` | CV + Job | Tailored CV | 1 |
| `generate_cover_letter()` | CV + Job + Company | Cover letter | 1 |
| `analyze_skill_gaps()` | CV + Job | JSON analysis | 1 |
| `generate_interview_questions()` | CV + Job + Gaps | Question list | 2* |
| `generate_interview_prep_guide()` | All inputs | Prep guide | 3* |
| `run_full_pipeline()` | All inputs | All outputs | 7+ |

*Depends on other methods being called first

### 4. Utility Functions (utils.py)

```python
def extract_text_from_file(file_path: str) -> str
    # Handles .pdf, .txt, .md files

def save_output(content: str, output_type: str) -> str
    # Saves to outputs/ directory

def parse_json_response(response_text: str) -> dict
    # Handles JSON in markdown code blocks
```

### 5. User Interface (main.py)

**Two modes:**

```python
def interactive_mode():
    # Guide user through process step-by-step
    # Get inputs, show progress, preview results

def batch_mode(cv_path, job_path, company_path):
    # Process files directly
    # No user interaction needed
    # Suitable for automation
```

---

## 🎯 Data Flow Example

User runs: `python main.py`

```
1. User selects LLM provider
   ↓
2. JobSearchAgent initialized with selected provider
   ↓
3. User provides CV
   → load_cv(cv_content)
   ↓
4. User provides job description
   → load_job_description(job_content)
   ↓
5. User provides company info
   → load_company_info(company_content)
   ↓
6. User requests all materials
   → run_full_pipeline()
   ↓
7. Pipeline calls each generation method:
   ├─ tailor_cv()
   │  └─ llm.generate(cv_prompt + system_prompt)
   │     → API call to Claude/Gemini/OpenAI
   │     ← Response: Tailored CV text
   │
   ├─ generate_cover_letter()
   │  └─ llm.generate(cover_letter_prompt)
   │     ← Response: Cover letter text
   │
   ├─ analyze_skill_gaps()
   │  └─ llm.generate(json_prompt)
   │     ← Response: JSON with gaps analysis
   │
   ├─ generate_interview_questions()
   │  ├─ analyze_skill_gaps() [if needed]
   │  └─ llm.generate(questions_prompt)
   │     ← Response: JSON array of questions
   │
   └─ generate_interview_prep_guide()
      └─ llm.generate(prep_guide_prompt)
         ← Response: Markdown prep guide
   ↓
8. Results returned as dictionary
   ↓
9. save_all_outputs() writes to files
   ↓
10. User views in terminal or opens files
```

---

## 🧪 Testing & Validation

### Run Validation Script

```bash
python validate_setup.py
```

Checks:
- Python version (3.8+)
- Dependencies installed
- .env file configured
- All modules importable

### Test Single Component

```python
from agent import JobSearchAgent
from llm_provider import get_llm_provider

# Test LLM connection
provider = get_llm_provider()
response = provider.generate("Hello, test this!")
print(response)

# Test agent
agent = JobSearchAgent()
agent.load_cv("Sample CV text")
print("✅ Agent initialized successfully")
```

---

## 🔌 Adding a New LLM Provider

### Step 1: Create Provider Class (llm_provider.py)

```python
class YourLLMProvider(LLMInterface):
    """Your LLM provider implementation"""
    
    def __init__(self, api_key: str):
        if not api_key:
            raise ValueError("API key required")
        self.client = YourLLMClient(api_key=api_key)
        self.model = "your-model-name"
    
    def generate(self, prompt: str, system_prompt: str = None) -> str:
        """Generate response using your LLM"""
        # Implement your API call logic here
        response = self.client.chat.create(
            model=self.model,
            messages=[
                {"role": "system", "content": system_prompt or ""},
                {"role": "user", "content": prompt}
            ]
        )
        return response.choices[0].message.content
```

### Step 2: Add to Provider Enum (config.py)

```python
class LLMProvider(Enum):
    CLAUDE = "claude"
    GEMINI = "gemini"
    OPENAI = "openai"
    YOUR_PROVIDER = "your_provider"  # Add this

YOUR_PROVIDER_KEY = os.getenv("YOUR_PROVIDER_API_KEY")
YOUR_PROVIDER_MODEL = "your-model-name"
```

### Step 3: Update Provider Factory (llm_provider.py)

```python
def get_llm_provider(provider: Optional[LLMProvider] = None) -> LLMInterface:
    provider = provider or DEFAULT_LLM
    
    if provider == LLMProvider.CLAUDE:
        return ClaudeProvider()
    elif provider == LLMProvider.GEMINI:
        return GeminiProvider()
    elif provider == LLMProvider.OPENAI:
        return OpenAIProvider()
    elif provider == LLMProvider.YOUR_PROVIDER:
        return YourLLMProvider()
    else:
        raise ValueError(f"Unknown LLM provider: {provider}")
```

### Step 4: Update .env.example

```
YOUR_PROVIDER_API_KEY=your_key_here
```

---

## 🎨 Adding a New Feature

### Example: Resume Scoring

### Step 1: Add Method to JobSearchAgent (agent.py)

```python
def score_resume(self, scoring_criteria: str = None) -> dict:
    """
    Score the resume against job requirements
    
    Args:
        scoring_criteria: Custom scoring criteria (optional)
    
    Returns:
        Dictionary with scores and recommendations
    """
    if not self.cv_content or not self.job_description:
        raise ValueError("CV and job description required")
    
    prompt = f"""Score this resume against the job requirements on a 0-100 scale.

JOB DESCRIPTION:
{self.job_description}

CV:
{self.cv_content}

Provide JSON response:
{{
    "overall_score": <0-100>,
    "skills_match": <0-100>,
    "experience_match": <0-100>,
    "education_match": <0-100>,
    "strengths": ["..."],
    "weaknesses": ["..."],
    "improvement_recommendations": ["..."]
}}"""
    
    response = self.llm.generate(prompt, SYSTEM_PROMPT)
    return parse_json_response(response)
```

### Step 2: Integrate into Pipeline (agent.py)

```python
def run_full_pipeline(self) -> Dict[str, str]:
    results = {
        # ... existing results ...
        "resume_score": json.dumps(self.score_resume(), indent=2),
    }
    return results
```

### Step 3: Update CLI (main.py)

```python
preview_map = {
    # ... existing entries ...
    "7": ("resume_score", "Resume Score Analysis"),
}
```

### Step 4: Test

```python
from agent import JobSearchAgent
agent = JobSearchAgent()
# Load data...
score = agent.score_resume()
print(score)
```

---

## 🚀 Performance Optimization

### Reduce Latency

```python
# Parallel processing (if using async)
import asyncio

async def generate_all_concurrent():
    tasks = [
        asyncio.to_thread(agent.tailor_cv),
        asyncio.to_thread(agent.generate_cover_letter),
        # ...
    ]
    results = await asyncio.gather(*tasks)
    return results

# Token optimization
# Reduce input sizes where possible
cv_summary = summarize_cv(full_cv)  # Keep essentials only
```

### Cache Results

```python
from functools import lru_cache

@lru_cache(maxsize=128)
def get_llm_provider(provider: LLMProvider):
    # Provider instances cached
    return _create_provider(provider)
```

### Handle Rate Limits

```python
import time

def generate_with_retry(prompt, max_retries=3):
    for attempt in range(max_retries):
        try:
            return self.llm.generate(prompt, SYSTEM_PROMPT)
        except RateLimitError:
            wait_time = 2 ** attempt  # Exponential backoff
            print(f"Rate limited. Waiting {wait_time}s...")
            time.sleep(wait_time)
    raise Exception("Max retries exceeded")
```

---

## 📊 Debugging

### Enable Logging

```python
import logging

logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

# In agent.py
logger.debug(f"CV loaded: {len(self.cv_content)} chars")
logger.debug(f"Calling LLM with prompt length: {len(prompt)}")
```

### Inspect LLM Responses

```python
# Add to agent.py
def tailor_cv(self, debug=False) -> str:
    prompt = "..."
    if debug:
        print(f"DEBUG: Prompt length: {len(prompt)}")
        print(f"DEBUG: Prompt:\n{prompt[:500]}...")
    
    response = self.llm.generate(prompt, SYSTEM_PROMPT)
    
    if debug:
        print(f"DEBUG: Response length: {len(response)}")
    
    return response
```

### Test Individual Methods

```python
# test_agent.py
from agent import JobSearchAgent

def test_cv_tailoring():
    agent = JobSearchAgent()
    agent.load_cv("Test CV content")
    agent.load_job_description("Test job description")
    
    result = agent.tailor_cv()
    assert len(result) > 0
    assert "CV" in result or "resume" in result.lower()
    print("✅ CV tailoring test passed")

if __name__ == "__main__":
    test_cv_tailoring()
```

---

## 📦 Package Structure

```
job_search/
├── main.py              # Entry point
├── agent.py             # Core logic (300+ lines)
├── llm_provider.py      # Multi-provider support (150+ lines)
├── config.py            # Configuration (50+ lines)
├── utils.py             # Helpers (100+ lines)
├── validate_setup.py    # Validation script
├── example_usage.py     # Example code
├── requirements.txt     # Dependencies
├── .env.example         # Configuration template
├── outputs/             # Generated files (auto-created)
├── README.md            # User documentation
├── QUICK_START.md       # Getting started
├── USAGE_GUIDE.md       # Practical examples
├── FAQ.md               # Troubleshooting
├── SETUP_SUMMARY.md     # Architecture overview
└── DEVELOPER_GUIDE.md   # This file
```

**Total lines of code**: ~700 (excluding documentation)
**Test coverage**: Can be extended with pytest

---

## 🔐 Security Considerations

### API Key Management

```python
# ✅ Good - Uses environment variables
API_KEY = os.getenv("ANTHROPIC_API_KEY")

# ❌ Bad - Hardcoded keys
API_KEY = "sk-ant-xxxxx"
```

### Input Validation

```python
def load_cv(self, cv_text: str) -> None:
    if not cv_text or not isinstance(cv_text, str):
        raise ValueError("CV must be non-empty string")
    if len(cv_text) > 100000:  # Max size check
        raise ValueError("CV too large")
    self.cv_content = cv_text.strip()
```

### Prompt Injection Prevention

```python
# Sanitize user inputs in prompts
def tailor_cv(self) -> str:
    # Escape special characters
    cv = self.cv_content.replace('"""', '')
    job = self.job_description.replace('"""', '')
    
    prompt = f'"""CV:\n{cv}\n"""\n"""JOB:\n{job}\n"""'
    return self.llm.generate(prompt)
```

---

## 📈 Future Enhancements

### Potential Features
1. Interactive CV builder
2. Real-time job matching
3. Salary negotiation prep
4. Portfolio presentation guide
5. Video interview coaching
6. LinkedIn profile optimization
7. Batch job application processing
8. Resume ATS scoring

### Integration Opportunities
1. Connect with job boards (LinkedIn, Indeed, etc.)
2. Deploy as web service (Flask/FastAPI)
3. Add to VS Code as extension
4. Create mobile app
5. Integrate with email clients
6. Real-time collaboration features

---

## 🤝 Contributing

### Code Style
- Follow PEP 8
- Use type hints
- Document all functions
- Keep functions small and focused

### Testing
- Write tests for new features
- Use pytest framework
- Aim for >80% coverage

### Documentation
- Update README.md
- Add docstrings
- Include examples
- Update DEVELOPER_GUIDE.md

---

## 📝 License & Attribution

Use, modify, and distribute freely. Built for career optimization.

---

**For questions or contributions, review the code structure above and extend accordingly!** 🚀
