"""
Job Search AI Agent - Main entry point with interactive CLI
"""
import os
import sys
from pathlib import Path
from colorama import init, Fore, Style
from agent import JobSearchAgent
from utils import extract_text_from_file, save_output
from config import LLMProvider

init(autoreset=True)

def print_header():
    """Print application header"""
    print(f"\n{Fore.CYAN}{'='*60}")
    print(f"{Fore.CYAN}  🚀 AI-Powered Job Search Optimizer")
    print(f"{Fore.CYAN}  CV Tailoring • Cover Letter • Interview Prep")
    print(f"{Fore.CYAN}{'='*60}\n")

def get_input_file(prompt: str) -> str:
    """
    Get input file path and extract content
    
    Args:
        prompt: Prompt to display to user
        
    Returns:
        Extracted text content
    """
    print(f"{Fore.YELLOW}{prompt}")
    print(f"{Fore.CYAN}Options:")
    print(f"  1. Enter file path (PDF, TXT, MD)")
    print(f"  2. Paste text directly")
    
    choice = input(f"\n{Fore.GREEN}Your choice (1/2): ").strip()
    
    if choice == "1":
        file_path = input(f"{Fore.GREEN}Enter file path: ").strip()
        if not os.path.exists(file_path):
            print(f"{Fore.RED}✗ File not found: {file_path}")
            return get_input_file(prompt)
        try:
            content = extract_text_from_file(file_path)
            print(f"{Fore.GREEN}✓ File loaded successfully")
            return content
        except Exception as e:
            print(f"{Fore.RED}✗ Error loading file: {str(e)}")
            return get_input_file(prompt)
    else:
        print(f"{Fore.YELLOW}Paste your content (enter 'END' on a new line when done):")
        lines = []
        while True:
            line = input()
            if line.strip().upper() == "END":
                break
            lines.append(line)
        content = "\n".join(lines)
        if content.strip():
            print(f"{Fore.GREEN}✓ Content received ({len(content)} characters)")
            return content
        else:
            print(f"{Fore.RED}✗ No content provided")
            return get_input_file(prompt)

def select_llm_provider() -> LLMProvider:
    """Let user select LLM provider"""
    print(f"\n{Fore.YELLOW}Select AI Provider:")
    print(f"  1. Claude (Anthropic) - Recommended")
    print(f"  2. Gemini (Google)")
    print(f"  3. OpenAI (GPT-4)")
    
    choice = input(f"\n{Fore.GREEN}Your choice (1-3): ").strip()
    
    provider_map = {
        "1": LLMProvider.CLAUDE,
        "2": LLMProvider.GEMINI,
        "3": LLMProvider.OPENAI
    }
    
    return provider_map.get(choice, LLMProvider.CLAUDE)

def interactive_mode():
    """Run interactive CLI mode"""
    print_header()
    
    try:
        # Select LLM provider
        provider = select_llm_provider()
        print(f"{Fore.GREEN}✓ Using {provider.value.upper()} provider\n")
        
        # Initialize agent
        agent = JobSearchAgent()
        
        # Load CV
        print(f"{Fore.CYAN}Step 1/3: Load your CV")
        print("-" * 60)
        cv_content = get_input_file("📄 Please provide your CV:")
        agent.load_cv(cv_content)
        
        # Load Job Description
        print(f"\n{Fore.CYAN}Step 2/3: Load the Job Description")
        print("-" * 60)
        job_content = get_input_file("📋 Please provide the job description:")
        agent.load_job_description(job_content)
        
        # Load Company Info
        print(f"\n{Fore.CYAN}Step 3/3: Load Company Information")
        print("-" * 60)
        company_content = get_input_file("🏢 Please provide company information (website, mission, culture, etc.):")
        agent.load_company_info(company_content)
        
        # Generate materials
        print(f"\n{Fore.CYAN}{'='*60}")
        print(f"{Fore.YELLOW}🔄 Generating your personalized job application materials...")
        print(f"{Fore.CYAN}{'='*60}\n")
        
        results = agent.run_full_pipeline()
        
        # Save outputs
        print(f"\n{Fore.CYAN}{'='*60}")
        print(f"{Fore.YELLOW}💾 Saving generated materials...")
        print(f"{Fore.CYAN}{'='*60}\n")
        
        saved_files = agent.save_all_outputs(results)
        
        # Display results
        print(f"\n{Fore.GREEN}✓ All materials generated successfully!\n")
        print(f"{Fore.CYAN}Generated Files:")
        for key, filepath in saved_files.items():
            display_name = key.replace("_", " ").title()
            print(f"  📄 {display_name}: {filepath}")
        
        # Show preview options
        print(f"\n{Fore.YELLOW}Preview generated content?")
        print(f"  1. View Tailored CV")
        print(f"  2. View Cover Letter")
        print(f"  3. View Interview Questions")
        print(f"  4. View Interview Prep Guide")
        print(f"  5. View Skill Gaps Analysis")
        print(f"  6. Exit")
        
        while True:
            choice = input(f"\n{Fore.GREEN}Your choice (1-6): ").strip()
            
            if choice == "6":
                break
            
            preview_map = {
                "1": ("tailored_cv", "Tailored CV"),
                "2": ("cover_letter", "Cover Letter"),
                "3": ("interview_questions", "Interview Questions"),
                "4": ("interview_prep_guide", "Interview Prep Guide"),
                "5": ("skill_gaps", "Skill Gaps Analysis")
            }
            
            if choice in preview_map:
                key, title = preview_map[choice]
                print(f"\n{Fore.CYAN}{'='*60}")
                print(f"{Fore.YELLOW}{title}")
                print(f"{Fore.CYAN}{'='*60}\n")
                print(results[key])
                print(f"\n{Fore.CYAN}{'='*60}\n")
        
        print(f"\n{Fore.GREEN}Thank you for using AI Job Search Optimizer!")
        print(f"{Fore.YELLOW}Good luck with your application! 🍀\n")
        
    except KeyboardInterrupt:
        print(f"\n\n{Fore.YELLOW}Application interrupted by user.")
    except Exception as e:
        print(f"\n{Fore.RED}✗ Error: {str(e)}")
        import traceback
        traceback.print_exc()
        sys.exit(1)

def batch_mode(cv_path: str, job_path: str, company_path: str = None):
    """
    Run in batch mode with provided files
    
    Args:
        cv_path: Path to CV file
        job_path: Path to job description file
        company_path: Path to company info file (optional)
    """
    try:
        agent = JobSearchAgent()
        
        # Load files
        cv_content = extract_text_from_file(cv_path)
        job_content = extract_text_from_file(job_path)
        
        agent.load_cv(cv_content)
        agent.load_job_description(job_content)
        
        if company_path:
            company_content = extract_text_from_file(company_path)
            agent.load_company_info(company_content)
        else:
            # Use job description as fallback for company context
            agent.load_company_info(job_content)
        
        # Generate and save
        results = agent.run_full_pipeline()
        saved_files = agent.save_all_outputs(results)
        
        print(f"{Fore.GREEN}✓ Batch processing complete!")
        for key, filepath in saved_files.items():
            print(f"  📄 {key}: {filepath}")
        
    except Exception as e:
        print(f"{Fore.RED}✗ Batch mode error: {str(e)}")
        import traceback
        traceback.print_exc()
        sys.exit(1)

def main():
    """Main entry point"""
    if len(sys.argv) > 1:
        # Batch mode
        if len(sys.argv) < 3:
            print(f"{Fore.RED}Usage: python main.py <cv_path> <job_path> [company_path]")
            sys.exit(1)
        batch_mode(sys.argv[1], sys.argv[2], sys.argv[3] if len(sys.argv) > 3 else None)
    else:
        # Interactive mode
        interactive_mode()

if __name__ == "__main__":
    main()

