'use client'

import React, { useState } from 'react'
import FileUploadArea from './FileUploadArea'
import TextInputField from './TextInputField'
import ProviderSelector from './ProviderSelector'
import { Upload, FileText, Briefcase, Building2, Zap } from 'lucide-react'

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

    setLoading(true)
    try {
      await onSubmit(formData)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8 animate-fadeIn">
      {/* Provider Selector */}
      <ProviderSelector value={provider} onChange={setProvider} />

      {/* Section Title */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3 mb-2">
          <Zap className="w-6 h-6 text-blue-600" />
          Upload Your Application Materials
        </h2>
        <p className="text-gray-600">Provide your CV, the target job description, and company information</p>
      </div>

      {/* Three Column Layout for Uploads */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* CV Section */}
        <div className="column-card animate-slideInLeft">
          <div className="flex items-center gap-3 mb-4">
            <div className="icon-box-blue">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-800">Your CV</h3>
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
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gradient-to-br from-gray-50 to-white text-gray-500 font-medium">or paste text</span>
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
        <div className="column-card animate-slideUp">
          <div className="flex items-center gap-3 mb-4">
            <div className="icon-box-green">
              <Briefcase className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-800">Job Description</h3>
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
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gradient-to-br from-gray-50 to-white text-gray-500 font-medium">or paste text</span>
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
        <div className="column-card animate-slideInRight">
          <div className="flex items-center gap-3 mb-4">
            <div className="icon-box-purple">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-800">Company Info</h3>
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
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gradient-to-br from-gray-50 to-white text-gray-500 font-medium">or paste text</span>
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
            loading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 hover:shadow-2xl'
          } transition-all duration-300`}
        >
          <Upload className={`w-6 h-6 ${loading ? 'animate-spin' : ''}`} />
          <span>{loading ? 'Processing... This may take 1-3 minutes' : '✨ Optimize My Application'}</span>
        </button>
      </div>

      {/* Tips Section */}
      <div className="bg-blue-50 rounded-xl p-6 border border-blue-200 border-dashed">
        <h4 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
          <span className="text-lg">💡</span> Pro Tips
        </h4>
        <ul className="space-y-2 text-sm text-blue-800">
          <li>• Use <strong>Gemini</strong> for fastest processing (recommended)</li>
          <li>• Text inputs are more reliable than file uploads</li>
          <li>• Keep inputs focused and concise for better results</li>
          <li>• Processing typically takes 1-3 minutes per application</li>
        </ul>
      </div>
    </form>
  )
}
