"""
LLM Interface for multiple providers (Claude, Gemini, OpenAI)
"""
from typing import Optional, Callable
from abc import ABC, abstractmethod
import anthropic
import google.generativeai as genai
import openai
from config import (
    CLAUDE_API_KEY, GEMINI_API_KEY, OPENAI_API_KEY,
    CLAUDE_MODEL, GEMINI_MODEL, OPENAI_MODEL,
    DEFAULT_LLM, LLMProvider
)

class LLMInterface(ABC):
    """Abstract base class for LLM providers"""
    
    @abstractmethod
    def generate(self, prompt: str, system_prompt: str = None) -> str:
        """Generate response from LLM"""
        pass

class ClaudeProvider(LLMInterface):
    """Claude API provider"""
    
    def __init__(self, api_key: str = CLAUDE_API_KEY):
        if not api_key:
            raise ValueError("ANTHROPIC_API_KEY not set in environment")
        self.client = anthropic.Anthropic(api_key=api_key)
        self.model = CLAUDE_MODEL
    
    def generate(self, prompt: str, system_prompt: str = None) -> str:
        """Generate response using Claude"""
        message = self.client.messages.create(
            model=self.model,
            max_tokens=4096,
            system=system_prompt or "",
            messages=[{"role": "user", "content": prompt}]
        )
        return message.content[0].text

class GeminiProvider(LLMInterface):
    """Google Gemini API provider"""
    
    def __init__(self, api_key: str = GEMINI_API_KEY):
        if not api_key:
            raise ValueError("GEMINI_API_KEY not set in environment")
        genai.configure(api_key=api_key)
        self.model = genai.GenerativeModel(GEMINI_MODEL)
    
    def generate(self, prompt: str, system_prompt: str = None) -> str:
        """Generate response using Gemini"""
        if system_prompt:
            prompt = f"{system_prompt}\n\n{prompt}"
        response = self.model.generate_content(prompt)
        return response.text

class OpenAIProvider(LLMInterface):
    """OpenAI API provider"""
    
    def __init__(self, api_key: str = OPENAI_API_KEY):
        if not api_key:
            raise ValueError("OPENAI_API_KEY not set in environment")
        self.client = openai.OpenAI(api_key=api_key)
        self.model = OPENAI_MODEL
    
    def generate(self, prompt: str, system_prompt: str = None) -> str:
        """Generate response using OpenAI"""
        response = self.client.chat.completions.create(
            model=self.model,
            max_tokens=4096,
            system=system_prompt or "You are a helpful assistant.",
            messages=[{"role": "user", "content": prompt}]
        )
        return response.choices[0].message.content

def get_llm_provider(provider: Optional[LLMProvider] = None) -> LLMInterface:
    """
    Get LLM provider instance.
    
    Args:
        provider: LLMProvider enum value. Defaults to DEFAULT_LLM
        
    Returns:
        LLM provider instance
    """
    provider = provider or DEFAULT_LLM
    
    if provider == LLMProvider.CLAUDE:
        return ClaudeProvider()
    elif provider == LLMProvider.GEMINI:
        return GeminiProvider()
    elif provider == LLMProvider.OPENAI:
        return OpenAIProvider()
    else:
        raise ValueError(f"Unknown LLM provider: {provider}")
