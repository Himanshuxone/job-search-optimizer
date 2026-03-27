'use client'

import React, { useState } from 'react'
import FileUploadArea from './FileUploadArea'
import TextInputField from './TextInputField'
import ProviderSelector from './ProviderSelector'
import { Upload } from 'lucide-react'

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
  const [provider, setProvider] = useState('claude')
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
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Provider Selector */}
      <ProviderSelector value={provider} onChange={setProvider} />

      {/* Three Column Layout for Uploads */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* CV Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <span className="bg-blue-100 text-blue-700 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">1</span>
            Your CV
          </h3>
          <FileUploadArea
            label="CV (PDF, TXT, MD)"
            file={cvFile}
            onChange={setCvFile}
            disabled={!!cvText}
          />
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">or paste text</span>
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
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <span className="bg-green-100 text-green-700 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">2</span>
            Job Description
          </h3>
          <FileUploadArea
            label="Job Posting (PDF, TXT, MD)"
            file={jobFile}
            onChange={setJobFile}
            disabled={!!jobText}
          />
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">or paste text</span>
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
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <span className="bg-purple-100 text-purple-700 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">3</span>
            Company Info
          </h3>
          <FileUploadArea
            label="Company Info (PDF, TXT, MD)"
            file={companyFile}
            onChange={setCompanyFile}
            disabled={!!companyText}
          />
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">or paste text</span>
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
      <div className="flex justify-center pt-6">
        <button
          type="submit"
          disabled={loading}
          className="btn-primary flex items-center gap-2 text-lg px-8 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Upload className="w-5 h-5" />
          {loading ? 'Processing...' : 'Optimize My Application'}
        </button>
      </div>
    </form>
  )
}
