# 📋 Practical Usage Guide

Real-world scenarios and best practices for using the Job Search AI Agent.

## Scenario 1: Software Engineer Position

### Your Input Files

**resume.txt** (Your CV)
```
Jane Smith
jane.smith@email.com

PROFESSIONAL EXPERIENCE
Senior Software Developer | Company A | 2020 - Present
- Developed Python microservices for payment processing
- Improved system performance by 35%
- Led team of 4 developers

Full Stack Developer | Company B | 2018 - 2020
- Built React frontends and Node.js backends
- Implemented automated testing (Jest, Pytest)
```

**job_posting.txt** (Job Description)
```
Senior Backend Engineer - Company XYZ
Requirements:
- 5+ years backend development
- Python and/or Java expertise
- AWS and Docker experience
- Kubernetes or container orchestration
```

**company_info.txt** (Company Research)
```
Company XYZ
Founded 2015, focused on cloud infrastructure
Recently raised $50M Series C
Known for innovation and engineering excellence
```

### Run the Agent

```bash
python main.py resume.txt job_posting.txt company_info.txt
```

### What You Get

✅ **tailored_cv.md**
- Emphasizes Python backend skills
- Highlights performance optimization (35% improvement)
- Reframes team leadership experience

✅ **cover_letter.md**
- References company's Series C funding
- Connects your payment system experience to their infrastructure focus
- Shows genuine understanding of their mission

✅ **interview_questions.md**
```
1. Tell me about the microservices architecture you built...
2. How would you approach optimizing a distributed system...
3. Describe your experience with container orchestration...
20. What questions do you have about our engineering culture...
```

---

## Scenario 2: Career Transition

### Challenge
You're transitioning from frontend to backend development.

### Strategy

**Resume focuses on:**
- Any backend-adjacent skills (APIs, databases)
- Learning projects in target languages
- Cross-functional work experience

**Job description should include:**
- Entry-level to mid-level backend role
- Emphasis on learning opportunity
- Mentorship mentioned

**Company info should mention:**
- Mentorship programs
- Learning culture
- Recent tech improvements

### Expected Output

The agent will:
- Highlight transferable skills (debugging, testing, architecture thinking)
- Suggest how to address the career gap in interviews
- Generate questions about learning and growth
- Identify specific skills to learn before/after job start

---

## Scenario 3: International Relocation

### Considerations

**Add to Company Info:**
```
Located in: New York, USA
Visa sponsorship: Available
Relocation package: Yes

Immigration timeline:
- Visa process takes 4-6 months
- Need to start applications early
```

**In your CV, include:**
- Any international experience
- Language skills
- Previous relocations
- Time zone overlap with team locations

### Expected Benefits

- Cover letter addresses relocation positively
- Interview questions prepared for work authorization discussion
- Skill gaps identified for cultural/business differences

---

## Scenario 4: Industry Change

### From
Financial Services Analyst

### To
Software Engineer (Tech Company)

### Approach

**Highlight in CV:**
- Financial domain expertise as strength
- Any technical projects or self-taught skills
- Analytical and problem-solving abilities
- Technical tools used (Excel, SQL, VBA, Python)

**In Job Description:**
- Include fintech companies or companies serving financial industry
- Or traditional tech that values domain expertise

**Company Info:**
```
Focus areas: B2B, Enterprise, Financial solutions
Values: Domain expertise + technical excellence
```

### Result

- Agent shows how financial background is asset
- Cover letter positions domain expertise as differentiator
- Interview prep addresses potential concerns about tech background
- Suggests learning areas to solidify technical foundation

---

## Best Practices by Field

### For Data Science Roles

**What to include in CV:**
- ML projects with metrics
- Statistical experience
- Public datasets or competitions
- Programming languages (Python, R, SQL)

**Job Description should mention:**
- ML frameworks needed
- Data volume/complexity
- Business metrics they care about

---

### For DevOps/Cloud Roles

**What to include in CV:**
- Infrastructure code (Terraform, CloudFormation)
- CI/CD pipeline experience
- Monitoring and logging tools
- On-call experience if relevant

**Emphasize:**
- Automation achievements
- Cost optimizations
- System reliability metrics

---

### For Product Manager Roles

**What to include in CV:**
- Specific metrics improved
- A/B test results
- User feedback integration
- Cross-functional collaboration
- Launch ownership

**Job Description should include:**
- Product stage (early, growth, mature)
- Team size and structure
- Key metrics they track

---

## Tips for Each Generated Material

### Tailored CV Tips

✅ Use specific numbers and metrics
```
❌ "Improved system performance"
✅ "Improved system performance by 35%, reducing API response time from 2s to 1.3s"
```

✅ Match language from job description
```
❌ "Worked with cloud infrastructure"
✅ "Deployed microservices on AWS using ECS and RDS"
```

### Cover Letter Tips

✅ Show specific knowledge about the company
```
❌ "I'm excited about Company XYZ"
✅ "Your recent Series C announcement highlighting AI infrastructure aligns with my microservices optimization experience"
```

✅ Bridge your experience to their needs
```
❌ "I have experience with payment systems"
✅ "My 3 years building fault-tolerant payment systems directly applies to your reliability requirements"
```

### Interview Question Tips

✅ Read all 20 questions before interviews
✅ Group similar questions for prep
✅ Practice STAR format for behavioral questions
✅ Research answers that show cultural fit

### Skill Gap Tips

✅ Prioritize "High" importance gaps
✅ For "Low" gaps, mention in "Nice to have" section
✅ Create 30-60-90 day learning plan
✅ Find free resources for basic concepts

---

## Advanced: Customizing for Your Needs

### Example: Emphasizing Soft Skills

Create a special section in company info:

```
Values we care about:
- Strong communication and presentation
- Mentorship and knowledge sharing
- Creativity and innovation
- Team collaboration
```

The agent will generate interview questions focused on these areas.

### Example: For Startup vs Enterprise

**Startup job description note:**
```
Growth stage startup (Series B)
Fast-paced environment
Wear multiple hats
End-to-end ownership
```

**Enterprise note:**
```
Fortune 500 company
Established processes and systems
Specialization in specific areas
Collaboration across teams
```

The agent tailors advice accordingly.

---

## Workflow for Maximum Success

### Day 1 (30 min)
1. Prepare your CV with detailed achievements
2. Find full job posting
3. Research company (website, news, LinkedIn)
4. Run the agent and generate all materials

### Day 2-3 (1 hour)
1. Review tailored CV for accuracy
2. Polish cover letter with personal touches
3. Review interview questions

### Day 3-5 (30 min daily)
1. Study interview questions and prep guide
2. Practice speaking answers aloud
3. Research personal questions to ask

### Day 6+
1. Submit application with confidence
2. Follow up after 5 business days
3. Prepare for interview calls

---

## Troubleshooting Common Issues

### Issue: "Agent didn't catch important skills"
**Solution:**
- Make sure skills are clearly visible in your CV
- Add them to company info as "required skills"
- Run again with more details

### Issue: "Cover letter sounds too generic"
**Solution:**
- Add more specific company information
- Include recent news or achievements
- Mention specific team or product you're interested in

### Issue: "Interview questions aren't technical enough"
**Solution:**
- Add technical requirements to job description
- Include specific technologies in company info
- Specify seniority level clearly

---

## Performance Tips

For faster processing:
- Provide concise but complete information
- Use .txt files instead of PDFs (faster)
- Remove unnecessary information

For better results:
- More details = more tailored content
- Specific achievements > generic descriptions
- Recent experience > old experience

---

**Ready to tailor your next job application? Run `python main.py` now!** 🚀
