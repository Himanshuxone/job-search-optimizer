'use client'

import React, { useState } from 'react'
import FileUploadForm from '@/components/FileUploadForm'
import ResultsDisplay from '@/components/ResultsDisplay'
import Header from '@/components/Header'
import { Loader } from 'lucide-react'

export default function Home() {
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (formData: FormData) => {
    setLoading(true)
    setError('')
    
    try {
      const response = await fetch('/api/optimize', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to process files')
      }

      const data = await response.json()
      setResults(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {!results ? (
            <div className="space-y-8">
              {/* Hero Section */}
              <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                  AI Job Search Optimizer
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Upload your CV and job description, get a tailored CV, cover letter, 
                  and interview prep materials powered by AI
                </p>
              </div>

              {/* Upload Form */}
              {loading ? (
                <div className="flex flex-col items-center justify-center py-20">
                  <Loader className="w-12 h-12 text-blue-600 loading-spinner mb-4" />
                  <p className="text-lg text-gray-600">Optimizing your application...</p>
                  <p className="text-sm text-gray-500 mt-2">This may take 1-2 minutes</p>
                </div>
              ) : (
                <>
                  <FileUploadForm onSubmit={handleSubmit} />
                  
                  {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
                      <p className="font-semibold">Error</p>
                      <p>{error}</p>
                    </div>
                  )}
                </>
              )}
            </div>
          ) : (
            <ResultsDisplay results={results} onNewSearch={() => setResults(null)} />
          )}
        </div>
      </div>
    </main>
  )
}
