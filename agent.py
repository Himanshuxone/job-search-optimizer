"""
Core Job Search AI Agent
"""
from typing import Dict, List, Tuple
import json
from llm_provider import get_llm_provider, LLMInterface
from utils import parse_json_response, format_markdown, save_output
from config import SYSTEM_PROMPT, NUMBER_OF_INTERVIEW_QUESTIONS

class JobSearchAgent:
    """Main AI Agent for job search optimization"""
    
    def __init__(self, llm_provider: LLMInterface = None):
        self.llm = llm_provider or get_llm_provider()
        self.cv_content = ""
        self.job_description = ""
        self.company_info = ""
    
    def load_cv(self, cv_text: str) -> None:
        """Load CV content"""
        self.cv_content = cv_text
        print(f"✓ CV loaded ({len(cv_text)} characters)")
    
    def load_job_description(self, job_text: str) -> None:
        """Load job description"""
        self.job_description = job_text
        print(f"✓ Job description loaded ({len(job_text)} characters)")
    
    def load_company_info(self, company_text: str) -> None:
        """Load company information"""
        self.company_info = company_text
        print(f"✓ Company information loaded ({len(company_text)} characters)")
    
    def tailor_cv(self) -> str:
        """
        Tailor CV to job description
        
        Returns:
            Tailored CV content
        """
        if not self.cv_content or not self.job_description:
            raise ValueError("CV and job description must be loaded first")
        
        prompt = f"""Based on the job description and current CV provided below, create a tailored version of the CV that:

1. Emphasizes relevant skills and experiences that match the job requirements
2. Reorganizes bullet points to highlight most relevant achievements first
3. Adjusts language and terminology to align with the job description
4. Suggests additional keywords or skills that should be highlighted
5. Maintains authenticity - don't add false information, only reframe what exists

JOB DESCRIPTION:
{self.job_description}

CURRENT CV:
{self.cv_content}

Please provide a professionally formatted, tailored CV that would be more compelling for this specific job."""
        
        response = self.llm.generate(prompt, SYSTEM_PROMPT)
        return response
    
    def generate_cover_letter(self) -> str:
        """
        Generate a cover letter based on CV, job description, and company info
        
        Returns:
            Generated cover letter
        """
        if not self.cv_content or not self.job_description or not self.company_info:
            raise ValueError("CV, job description, and company info must be loaded first")
        
        prompt = f"""Write a compelling, personalized cover letter based on the following information:

COMPANY INFORMATION:
{self.company_info}

JOB DESCRIPTION:
{self.job_description}

CANDIDATE CV:
{self.cv_content}

Requirements for the cover letter:
1. Professional tone and format (suitable for formal submission)
2. Start with a strong opening hook that demonstrates knowledge of the company
3. Highlight 2-3 specific achievements from the CV that directly address job requirements
4. Show genuine interest in the company and role
5. Include a call to action in the closing
6. Keep it to 3-4 paragraphs max
7. Use specific examples from the CV, not generic language

Generate a cover letter that would make hiring managers want to interview the candidate."""
        
        response = self.llm.generate(prompt, SYSTEM_PROMPT)
        return response
    
    def analyze_skill_gaps(self) -> Dict[str, List[str]]:
        """
        Identify missing skills and learning areas
        
        Returns:
            Dictionary with missing skills and learning recommendations
        """
        if not self.cv_content or not self.job_description:
            raise ValueError("CV and job description must be loaded first")
        
        prompt = f"""Analyze the job description and candidate CV to identify skill gaps.

JOB DESCRIPTION:
{self.job_description}

CANDIDATE CV:
{self.cv_content}

Provide a JSON response with the following structure:
{{
    "technical_gaps": ["skill1", "skill2", ...],
    "soft_skill_gaps": ["skill1", "skill2", ...],
    "experience_gaps": ["area1", "area2", ...],
    "learning_recommendations": [
        {{
            "topic": "skill or area",
            "importance": "high/medium/low",
            "resources": "suggested learning resources or course types",
            "estimated_learning_time": "weeks/months"
        }}
    ]
}}

Focus on skills that are explicitly mentioned in the job description but not adequately covered in the CV."""
        
        response = self.llm.generate(prompt, SYSTEM_PROMPT)
        try:
            return parse_json_response(response)
        except:
            # If JSON parsing fails, return the raw response
            return {"raw_analysis": response}
    
    def generate_interview_questions(self) -> List[str]:
        """
        Generate top 20 interview questions based on skill gaps
        
        Returns:
            List of interview questions
        """
        if not self.cv_content or not self.job_description:
            raise ValueError("CV and job description must be loaded first")
        
        # First get skill gaps
        skill_gaps = self.analyze_skill_gaps()
        
        prompt = f"""Based on the job description, CV, and identified skill gaps, generate {NUMBER_OF_INTERVIEW_QUESTIONS} targeted interview questions.

JOB DESCRIPTION:
{self.job_description}

CANDIDATE CV:
{self.cv_content}

SKILL GAPS IDENTIFIED:
{json.dumps(skill_gaps, indent=2)}

Generate interview questions that:
1. Test for the missing skills identified above
2. Dive deep into relevant experience from the CV
3. Explore how the candidate's experience applies to this specific role
4. Include behavioral questions (STAR format) about relevant projects
5. Include technical questions if applicable
6. Include questions about learning ability and growth mindset
7. Mix difficulty levels (some easy warm-up questions, some challenging ones)

Format the response as a JSON array of strings:
["question1", "question2", ...]

Make questions specific to the job and company context, not generic."""
        
        response = self.llm.generate(prompt, SYSTEM_PROMPT)
        try:
            questions = parse_json_response(response)
            if isinstance(questions, dict):
                # If wrapped in object, extract the array
                if "questions" in questions:
                    return questions["questions"]
                elif "interview_questions" in questions:
                    return questions["interview_questions"]
                else:
                    # Take first list-like value
                    for v in questions.values():
                        if isinstance(v, list):
                            return v[:NUMBER_OF_INTERVIEW_QUESTIONS]
            return questions[:NUMBER_OF_INTERVIEW_QUESTIONS]
        except:
            # Fallback: parse as text list
            return self._parse_questions_from_text(response)
    
    def _parse_questions_from_text(self, text: str) -> List[str]:
        """Parse questions from plain text format"""
        questions = []
        for line in text.split('\n'):
            line = line.strip()
            if line and (line[0].isdigit() or line.startswith('-') or line.startswith('*')):
                # Remove numbering
                if line[0].isdigit():
                    line = line.split('.', 1)[1].strip() if '.' in line else line
                else:
                    line = line[2:].strip()
                questions.append(line)
        return questions[:NUMBER_OF_INTERVIEW_QUESTIONS]
    
    def generate_interview_prep_guide(self) -> str:
        """
        Generate comprehensive interview preparation guide
        
        Returns:
            Formatted interview prep guide
        """
        if not self.cv_content or not self.job_description:
            raise ValueError("CV and job description must be loaded first")
        
        skill_gaps = self.analyze_skill_gaps()
        questions = self.generate_interview_questions()
        
        prompt = f"""Create a comprehensive interview preparation guide for this candidate for the specified job.

JOB DESCRIPTION:
{self.job_description}

CANDIDATE CV:
{self.cv_content}

SKILL GAPS:
{json.dumps(skill_gaps, indent=2)}

Interview Questions:
{json.dumps(questions, indent=2)}

The guide should include:
1. Key talking points to emphasize (based on CV and job match)
2. How to address skill gaps during the interview
3. Company-specific research points to mention
4. STAR format examples for top 5 behavioral questions
5. Technical preparation areas if applicable
6. Clarifying questions the candidate should ask
7. Common pitfalls to avoid
8. Follow-up strategy

Format as professional markdown."""
        
        response = self.llm.generate(prompt, SYSTEM_PROMPT)
        return response
    
    def run_full_pipeline(self) -> Dict[str, str]:
        """
        Run the complete job search optimization pipeline
        
        Returns:
            Dictionary containing all generated materials
        """
        results = {
            "tailored_cv": self.tailor_cv(),
            "cover_letter": self.generate_cover_letter(),
            "interview_questions": "\n".join([f"{i+1}. {q}" for i, q in enumerate(self.generate_interview_questions())]),
            "interview_prep_guide": self.generate_interview_prep_guide(),
            "skill_gaps": json.dumps(self.analyze_skill_gaps(), indent=2)
        }
        
        return results
    
    def save_all_outputs(self, results: Dict[str, str], output_dir: str = "outputs") -> Dict[str, str]:
        """
        Save all generated materials to files
        
        Args:
            results: Dictionary of generated content
            output_dir: Output directory
            
        Returns:
            Dictionary of saved file paths
        """
        saved_files = {}
        
        output_mapping = {
            "tailored_cv": "tailored_cv",
            "cover_letter": "cover_letter",
            "interview_questions": "interview_questions",
            "interview_prep_guide": "interview_prep_guide",
            "skill_gaps": "skill_gaps_analysis"
        }
        
        for key, output_type in output_mapping.items():
            if key in results:
                saved_files[key] = save_output(results[key], output_type, output_dir)
        
        return saved_files
