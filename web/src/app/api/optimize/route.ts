import { NextRequest, NextResponse } from 'next/server'
import { writeFile, readFile, unlink } from 'fs/promises'
import { join } from 'path'
import { execSync } from 'child_process'
import os from 'os'

// Allow large payloads
export const maxDuration = 300

async function extractTextFromFile(filePath: string): Promise<string> {
  try {
    // Use Python to extract text from files using proper escaping
    const pythonCode = `
import sys
sys.path.insert(0, '${join(process.cwd(), '..').replace(/\\/g, '\\\\')}')
from utils import extract_text_from_file
try:
    text = extract_text_from_file('${filePath.replace(/\\/g, '\\\\')}')
    print(text)
except Exception as e:
    import traceback
    traceback.print_exc()
    sys.exit(1)
`
    // Escape the Python code for shell execution
    const escapedCode = pythonCode.replace(/"/g, '\\"').replace(/\$/g, '\\$').replace(/`/g, '\\`')
    
    const result = execSync(`python -c "${escapedCode}"`, {
      encoding: 'utf-8',
      cwd: join(process.cwd(), '..'),
      stdio: ['pipe', 'pipe', 'pipe'],
    }).trim()
    return result
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to extract text from file: ${error.message}`)
    }
    throw error
  }
}

export async function POST(request: NextRequest) {
  try {
    // Parse the request data
    let formData: FormData
    try {
      formData = await request.formData()
    } catch (parseError) {
      // If formData parsing fails, provide detailed error
      console.error('FormData parsing error:', parseError)
      return NextResponse.json(
        { 
          error: 'Invalid request format. Please ensure you are uploading files correctly. Content-Type should be multipart/form-data.',
          details: parseError instanceof Error ? parseError.message : 'Unknown parsing error'
        },
        { status: 400 }
      )
    }

    const provider = formData.get('provider') as string
    const documentFormat = (formData.get('document_format') as string) || 'markdown'
    const tempDir = join(os.tmpdir(), `job-optimizer-${Date.now()}`)

    // Create temp directory
    const fs = await import('fs').then((m) => m.promises)
    await fs.mkdir(tempDir, { recursive: true })

    try {
      // Extract or prepare CV
      let cvText = ''
      const cvFile = formData.get('cv_file') as File | null
      const cvTextInput = formData.get('cv_text') as string | null

      if (cvFile) {
        const cvPath = join(tempDir, 'cv.' + cvFile.name.split('.').pop())
        const bytes = await cvFile.arrayBuffer()
        await writeFile(cvPath, Buffer.from(bytes))
        cvText = await extractTextFromFile(cvPath)
      } else {
        cvText = cvTextInput || ''
      }

      // Extract or prepare Job Description
      let jobText = ''
      const jobFile = formData.get('job_file') as File | null
      const jobTextInput = formData.get('job_text') as string | null

      if (jobFile) {
        const jobPath = join(tempDir, 'job.' + jobFile.name.split('.').pop())
        const bytes = await jobFile.arrayBuffer()
        await writeFile(jobPath, Buffer.from(bytes))
        jobText = await extractTextFromFile(jobPath)
      } else {
        jobText = jobTextInput || ''
      }

      // Extract or prepare Company Info
      let companyText = ''
      const companyFile = formData.get('company_file') as File | null
      const companyTextInput = formData.get('company_text') as string | null

      if (companyFile) {
        const companyPath = join(tempDir, 'company.' + companyFile.name.split('.').pop())
        const bytes = await companyFile.arrayBuffer()
        await writeFile(companyPath, Buffer.from(bytes))
        companyText = await extractTextFromFile(companyPath)
      } else {
        companyText = companyTextInput || ''
      }

      // Validation
      if (!cvText.trim()) {
        return NextResponse.json(
          { error: 'CV content is empty' },
          { status: 400 }
        )
      }
      if (!jobText.trim()) {
        return NextResponse.json(
          { error: 'Job description is empty' },
          { status: 400 }
        )
      }
      if (!companyText.trim()) {
        return NextResponse.json(
          { error: 'Company information is empty' },
          { status: 400 }
        )
      }

      // Call Python agent
      const pythonCode = `
import sys
import json
sys.path.insert(0, '${join(process.cwd(), '..').replace(/\\/g, '\\\\')}')
sys.path.insert(0, '${join(process.cwd(), '../..').replace(/\\/g, '\\\\')}')

from agent import JobSearchAgent
from config import LLMProvider
from llm_provider import get_llm_provider

try:
    # Set environment for provider
    import os
    os.environ['LLM_PROVIDER'] = '${provider}'
    
    # Initialize agent
    agent = JobSearchAgent()
    
    # Load content
    agent.load_cv('''${cvText.replace(/'/g, "\\'")}''')
    agent.load_job_description('''${jobText.replace(/'/g, "\\'")}''')
    agent.load_company_info('''${companyText.replace(/'/g, "\\'")}''')
    
    # Generate all materials
    results = agent.run_full_pipeline()
    
    # Output as JSON
    output = {
        'tailored_cv': results.get('tailored_cv', ''),
        'cover_letter': results.get('cover_letter', ''),
        'interview_questions': results.get('interview_questions', ''),
        'interview_prep_guide': results.get('interview_prep_guide', ''),
        'skill_gaps': results.get('skill_gaps', '')
    }
    print(json.dumps(output))
    
except Exception as e:
    print(json.dumps({'error': str(e)}))
    import traceback
    traceback.print_exc()
    sys.exit(1)
`
      
      // Properly escape the Python code for shell execution
      const escapedPythonCode = pythonCode.replace(/"/g, '\\"').replace(/\$/g, '\\$').replace(/`/g, '\\`')

      const result = JSON.parse(
        execSync(`python -c "${escapedPythonCode}"`, {
          encoding: 'utf-8',
          cwd: join(process.cwd(), '..'),
          maxBuffer: 10 * 1024 * 1024, // 10MB buffer
        }).trim()
      )

      if (result.error) {
        return NextResponse.json({ error: result.error }, { status: 500 })
      }

      // Format documents if a format other than markdown is requested
      let formattedResult = result
      if (documentFormat && documentFormat !== 'markdown') {
        try {
          const pythonFormatScript = `
import sys
import json
sys.path.insert(0, '${join(process.cwd(), '..').replace(/\\/g, '\\\\')}')
sys.path.insert(0, '${join(process.cwd(), '../..').replace(/\\/g, '\\\\')}')

from utils.document_formatter import format_all_results

try:
    results = {
        'tailored_cv': '''${result.tailored_cv.replace(/'/g, "\\'")}''',
        'cover_letter': '''${result.cover_letter.replace(/'/g, "\\'")}''',
        'interview_questions': '''${result.interview_questions.replace(/'/g, "\\'")}''',
        'interview_prep_guide': '''${result.interview_prep_guide.replace(/'/g, "\\'")}''',
        'skill_gaps': '''${result.skill_gaps.replace(/'/g, "\\'")}'''
    }
    
    formatted_results = format_all_results(results, '${documentFormat}')
    
    output = {
        'tailored_cv': formatted_results.get('tailored_cv', ''),
        'cover_letter': formatted_results.get('cover_letter', ''),
        'interview_questions': formatted_results.get('interview_questions', ''),
        'interview_prep_guide': formatted_results.get('interview_prep_guide', ''),
        'skill_gaps': formatted_results.get('skill_gaps', ''),
        'format': '${documentFormat}'
    }
    print(json.dumps(output))
except Exception as e:
    print(json.dumps({'error': str(e)}), file=sys.stderr)
    sys.exit(1)
`
          const formattedOutput = JSON.parse(
            execSync(`python -c "${pythonFormatScript}"`, {
              encoding: 'utf-8',
              cwd: join(process.cwd(), '..'),
              maxBuffer: 10 * 1024 * 1024,
            }).trim()
          )
          
          if (!formattedOutput.error) {
            formattedResult = formattedOutput
          }
        } catch (formatError) {
          console.warn('Document formatting failed, returning original results:', formatError)
          // Return original results if formatting fails
        }
      }

      return NextResponse.json(formattedResult)
    } finally {
      // Cleanup temp directory
      try {
        const fs = await import('fs').then((m) => m.promises)
        await fs.rm(tempDir, { recursive: true, force: true })
      } catch (err) {
        console.error('Failed to cleanup temp directory:', err)
      }
    }
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'An error occurred' },
      { status: 500 }
    )
  }
}
