"""
Utility functions for CV and document processing
"""
import PyPDF2
import json
from pathlib import Path
from typing import Optional

def extract_text_from_pdf(pdf_path: str) -> str:
    """
    Extract text from a PDF file.
    
    Args:
        pdf_path: Path to the PDF file
        
    Returns:
        Extracted text from PDF
    """
    try:
        with open(pdf_path, 'rb') as pdf_file:
            pdf_reader = PyPDF2.PdfReader(pdf_file)
            text = ""
            for page in pdf_reader.pages:
                text += page.extract_text() + "\n"
        return text
    except Exception as e:
        raise Exception(f"Error extracting PDF: {str(e)}")

def extract_text_from_file(file_path: str) -> str:
    """
    Extract text from a file (TXT, PDF, or plain text).
    
    Args:
        file_path: Path to the file
        
    Returns:
        Extracted text
    """
    file_ext = Path(file_path).suffix.lower()
    
    if file_ext == '.pdf':
        return extract_text_from_pdf(file_path)
    elif file_ext in ['.txt', '.md']:
        with open(file_path, 'r', encoding='utf-8') as f:
            return f.read()
    else:
        raise ValueError(f"Unsupported file format: {file_ext}")

def save_output(content: str, output_type: str, output_dir: str = "outputs") -> str:
    """
    Save generated content to a file.
    
    Args:
        content: Content to save
        output_type: Type of output (cv, cover_letter, interview_questions, etc.)
        output_dir: Directory to save to
        
    Returns:
        Path to saved file
    """
    Path(output_dir).mkdir(exist_ok=True)
    
    filename = f"{output_type}_{Path.cwd().name}.md"
    filepath = Path(output_dir) / filename
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    
    return str(filepath)

def format_markdown(title: str, content: str, sections: dict = None) -> str:
    """
    Format content as markdown.
    
    Args:
        title: Title of the document
        content: Main content
        sections: Optional dictionary of additional sections
        
    Returns:
        Formatted markdown string
    """
    md = f"# {title}\n\n"
    md += f"{content}\n\n"
    
    if sections:
        for section_title, section_content in sections.items():
            md += f"## {section_title}\n\n{section_content}\n\n"
    
    return md

def parse_json_response(response_text: str) -> dict:
    """
    Parse JSON from LLM response (handles markdown code blocks).
    
    Args:
        response_text: Raw response text from LLM
        
    Returns:
        Parsed JSON dictionary
    """
    try:
        # Try direct parsing first
        return json.loads(response_text)
    except json.JSONDecodeError:
        # Try extracting from markdown code block
        if "```json" in response_text:
            json_str = response_text.split("```json")[1].split("```")[0].strip()
            return json.loads(json_str)
        elif "```" in response_text:
            json_str = response_text.split("```")[1].split("```")[0].strip()
            return json.loads(json_str)
        else:
            raise ValueError("Unable to parse JSON from response")
