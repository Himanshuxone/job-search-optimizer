"""
Quick Start Example
Demonstrates how to use the Job Search AI Agent programmatically
"""

from agent import JobSearchAgent
from utils import extract_text_from_file, save_output

def example_usage():
    """
    Simple example showing how to use the agent
    """
    
    # Example 1: Direct usage with text
    print("="*60)
    print("JOB SEARCH AI AGENT - Example Usage")
    print("="*60)
    
    # Initialize the agent
    agent = JobSearchAgent()
    
    # Example CV
    sample_cv = """
    John Doe
    john@example.com | LinkedIn: linkedin.com/in/johndoe
    
    EXPERIENCE
    Senior Software Engineer | Tech Corp | 2020-Present
    - Led development of microservices architecture
    - Reduced API response time by 40%
    - Mentored 5 junior developers
    
    Software Engineer | StartupXYZ | 2018-2020
    - Built full-stack web applications using React and Node.js
    - Implemented CI/CD pipelines using Docker and Jenkins
    - Improved code coverage from 60% to 85%
    
    SKILLS
    - Programming: Python, JavaScript, Java
    - Frontend: React, Vue.js
    - Backend: Node.js, Django, Spring Boot
    - Databases: PostgreSQL, MongoDB
    - DevOps: Docker, Kubernetes, AWS
    
    EDUCATION
    Bachelor of Science in Computer Science | State University | 2018
    """
    
    # Example Job Description
    sample_job = """
    Senior Backend Engineer
    Tech Company - San Francisco, CA
    
    About the Role:
    We're looking for a Senior Backend Engineer to lead our platform development.
    You'll work with a team of talented engineers to build scalable systems.
    
    Requirements:
    - 5+ years of backend development experience
    - Expert in Python or Java
    - Experience with distributed systems and microservices
    - Strong understanding of databases (SQL and NoSQL)
    - AWS or GCP expertise required
    - Experience with Kubernetes
    
    Responsibilities:
    - Design and implement backend services
    - Optimize database queries and system performance
    - Lead code reviews and improve code quality
    - Mentor junior developers
    - Participate in system design discussions
    
    Nice to have:
    - Experience with event-driven architecture
    - GraphQL expertise
    - Machine learning background
    """
    
    # Example Company Info
    sample_company = """
    Tech Company - About Us
    Founded in 2015, we're a leading software company focused on cloud solutions.
    
    Mission: Empower businesses with cutting-edge technology solutions.
    
    Our Culture:
    - Innovation-first mindset
    - Collaborative environment
    - Continuous learning
    - Remote-friendly
    
    Recent Achievements:
    - Series C funding raised $50M
    - Expanded to 3 new markets
    - 500+ enterprise clients
    - Industry leader in cloud infrastructure
    """
    
    # Load content into agent
    print("\n1. Loading CV and Job Information...")
    agent.load_cv(sample_cv)
    agent.load_job_description(sample_job)
    agent.load_company_info(sample_company)
    
    # Generate individual materials
    print("\n2. Generating Tailored CV...")
    tailored_cv = agent.tailor_cv()
    
    print("\n3. Generating Cover Letter...")
    cover_letter = agent.generate_cover_letter()
    
    print("\n4. Analyzing Skill Gaps...")
    skill_gaps = agent.analyze_skill_gaps()
    
    print("\n5. Generating Interview Questions...")
    interview_questions = agent.generate_interview_questions()
    
    # Display sample outputs
    print("\n" + "="*60)
    print("SAMPLE OUTPUT - First 500 characters of Tailored CV")
    print("="*60)
    print(tailored_cv[:500] + "...")
    
    print("\n" + "="*60)
    print("SAMPLE OUTPUT - Skill Gaps Analysis")
    print("="*60)
    import json
    if isinstance(skill_gaps, dict):
        print(json.dumps(skill_gaps, indent=2)[:500] + "...")
    else:
        print(str(skill_gaps)[:500] + "...")
    
    print("\n" + "="*60)
    print("SAMPLE OUTPUT - First 3 Interview Questions")
    print("="*60)
    for i, question in enumerate(interview_questions[:3], 1):
        print(f"{i}. {question}")
    
    print("\n✓ Example completed successfully!")
    print("\nFor full usage, run: python main.py")

if __name__ == "__main__":
    example_usage()
