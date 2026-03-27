"""
Configuration for Job Search AI Agent
"""
import os
from dotenv import load_dotenv
from enum import Enum

load_dotenv()

class LLMProvider(Enum):
    CLAUDE = "claude"
    GEMINI = "gemini"
    OPENAI = "openai"

# API Keys
CLAUDE_API_KEY = os.getenv("ANTHROPIC_API_KEY")
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

# Default LLM Provider
DEFAULT_LLM = LLMProvider.CLAUDE

# Model configurations
CLAUDE_MODEL = "claude-3-5-sonnet-20241022"
GEMINI_MODEL = "gemini-2.0-flash"
OPENAI_MODEL = "gpt-4-turbo"

# System prompts
SYSTEM_PROMPT = """You are an expert career coach and job application specialist. 
Your role is to help candidates optimize their job applications by:
1. Tailoring CVs to job descriptions
2. Creating compelling cover letters
3. Identifying skill gaps
4. Preparing interview questions

Be professional, strategic, and action-oriented in your recommendations."""

# Interview questions settings
NUMBER_OF_INTERVIEW_QUESTIONS = 20
PROMPT_RETRIES = 3
TIMEOUT = 30
