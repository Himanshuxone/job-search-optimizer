'use client'

import React, { useState } from 'react'
import FileUploadArea from './FileUploadArea'
import TextInputField from './TextInputField'
import ProviderSelector from './ProviderSelector'
import DocumentFormatSelector from './DocumentFormatSelector'

interface FileUploadFormProps {
  onSubmit: (formData: FormData) => Promise<void>
}

export default function FileUploadForm({ onSubmit }: FileUploadFormProps) {
  const [cvFile, setCvFile] = useState<File | null>(null)
  const [jobFile, setJobFile] = useState<File | null>(null)
  const [companyFile, setCompanyFile] = useState<File | null>(null)
  const [cvText, setCvText] = useState('')
  const [jobText, setJobText] = useState('')
  const [companyText, setCompanyText] = useState('')
  const [provider, setProvider] = useState('gemini')
  const [documentFormat, setDocumentFormat] = useState('markdown')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    if (!cvFile && !cvText.trim()) {
      alert('Please provide your CV')
      return
    }
    if (!jobFile && !jobText.trim()) {
      alert('Please provide the job description')
      return
    }
    if (!companyFile && !companyText.trim()) {
      alert('Please provide company information')
      return
    }

    const formData = new FormData()
    
    // Add files or text
    if (cvFile) {
      formData.append('cv_file', cvFile)
    } else {
      formData.append('cv_text', cvText)
    }

    if (jobFile) {
      formData.append('job_file', jobFile)
    } else {
      formData.append('job_text', jobText)
    }

    if (companyFile) {
      formData.append('company_file', companyFile)
    } else {
      formData.append('company_text', companyText)
    }

    formData.append('provider', provider)
    formData.append('document_format', documentFormat)

    setLoading(true)
    try {
      await onSubmit(formData)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 animate-fade-in-up">
      {/* Provider Selector */}
      <ProviderSelector value={provider} onChange={setProvider} />

      {/* Document Format Selector */}
      <DocumentFormatSelector value={documentFormat} onChange={setDocumentFormat} />
      <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-2xl p-8 border border-blue-700/50 backdrop-blur-sm hover:border-purple-500/50 transition-all duration-300">
        <div className="flex items-center gap-3 mb-3">
          <i className="bi bi-lightning-charge-fill text-3xl text-yellow-400 animate-pulse"></i>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent font-display">
            Upload Your Application Materials
          </h2>
        </div>
        <p className="text-gray-300 text-lg ml-12">Provide your CV, the target job description, and company information</p>
      </div>

      {/* Three Column Layout for Uploads */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* CV Section */}
        <div className="card animate-fade-in-left">
          <div className="flex items-center gap-3 mb-4">
            <div className="icon-box-blue bg-blue-500/30 border border-blue-400/50">
              <i className="bi bi-file-earmark-pdf text-xl"></i>
            </div>
            <div>
              <h3 className="text-lg font-bold text-blue-300 font-display">Your CV</h3>
              <p className="text-xs text-gray-500">Step 1 of 3</p>
            </div>
          </div>
          <div className="divider my-4"></div>
          <FileUploadArea
            label="CV (PDF, TXT, MD)"
            file={cvFile}
            onChange={setCvFile}
            disabled={!!cvText}
          />
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-700/50"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-slate-800 text-gray-400 font-medium">or paste text</span>
            </div>
          </div>
          <TextInputField
            placeholder="Paste your CV here..."
            value={cvText}
            onChange={setCvText}
            disabled={!!cvFile}
          />
        </div>

        {/* Job Description Section */}
        <div className="card animate-slide-in">
          <div className="flex items-center gap-3 mb-4">
            <div className="icon-box-green bg-green-500/30 border border-green-400/50">
              <i className="bi bi-briefcase text-xl"></i>
            </div>
            <div>
              <h3 className="text-lg font-bold text-green-300 font-display">Job Description</h3>
              <p className="text-xs text-gray-500">Step 2 of 3</p>
            </div>
          </div>
          <div className="divider my-4"></div>
          <FileUploadArea
            label="Job Posting (PDF, TXT, MD)"
            file={jobFile}
            onChange={setJobFile}
            disabled={!!jobText}
          />
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-700/50"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-slate-800 text-gray-400 font-medium">or paste text</span>
            </div>
          </div>
          <TextInputField
            placeholder="Paste job description here..."
            value={jobText}
            onChange={setJobText}
            disabled={!!jobFile}
          />
        </div>

        {/* Company Info Section */}
        <div className="card animate-fade-in-right">
          <div className="flex items-center gap-3 mb-4">
            <div className="icon-box-purple bg-purple-500/30 border border-purple-400/50">
              <i className="bi bi-building text-xl"></i>
            </div>
            <div>
              <h3 className="text-lg font-bold text-purple-300 font-display">Company Info</h3>
              <p className="text-xs text-gray-500">Step 3 of 3</p>
            </div>
          </div>
          <div className="divider my-4"></div>
          <FileUploadArea
            label="Company Info (PDF, TXT, MD)"
            file={companyFile}
            onChange={setCompanyFile}
            disabled={!!companyText}
          />
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-700/50"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-slate-800 text-gray-400 font-medium">or paste text</span>
            </div>
          </div>
          <TextInputField
            placeholder="Paste company info here..."
            value={companyText}
            onChange={setCompanyText}
            disabled={!!companyFile}
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-center pt-8">
        <button
          type="submit"
          disabled={loading}
          className={`btn-primary flex items-center gap-3 text-lg px-12 py-4 ${
            loading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/50 active:scale-95'
          } transition-all duration-300`}
        >
          <i className={`bi bi-cloud-arrow-up text-2xl ${loading ? 'animate-bounce' : ''}`}></i>
          <span>{loading ? 'Processing... This may take 1-3 minutes' : '✨ Optimize My Application'}</span>
        </button>
      </div>

      {/* Tips Section */}
      <div className="bg-gradient-to-br from-blue-950/50 to-purple-950/50 rounded-2xl p-6 border border-blue-700/50 border-dashed backdrop-blur-sm">
        <h4 className="font-semibold text-blue-300 mb-3 flex items-center gap-2 font-display text-lg">
          <i className="bi bi-lightbulb text-xl text-yellow-400"></i> Pro Tips
        </h4>
        <ul className="space-y-2 text-sm text-gray-300">
          <li className="flex items-start gap-2">
            <i className="bi bi-check-circle-fill text-green-400 mt-0.5"></i>
            <span>Use <strong>Gemini</strong> for fastest processing (recommended)</span>
          </li>
          <li className="flex items-start gap-2">
            <i className="bi bi-check-circle-fill text-green-400 mt-0.5"></i>
            <span>Text inputs are more reliable than file uploads</span>
          </li>
          <li className="flex items-start gap-2">
            <i className="bi bi-check-circle-fill text-green-400 mt-0.5"></i>
            <span>Keep inputs focused and concise for better results</span>
          </li>
          <li className="flex items-start gap-2">
            <i className="bi bi-check-circle-fill text-green-400 mt-0.5"></i>
            <span>Processing typically takes 1-3 minutes per application</span>
          </li>
        </ul>
      </div>
    </form>
  )
}
