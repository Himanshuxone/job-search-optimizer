'use client'

import React, { useState } from 'react'
import FileUploadForm from '@/components/FileUploadForm'
import ResultsDisplay from '@/components/ResultsDisplay'
import Header from '@/components/Header'

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
        // Don't set Content-Type header - let the browser handle it automatically
        // The browser will set it to 'multipart/form-data; boundary=...'
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || `Failed to process files (${response.status})`)
      }

      const data = await response.json()
      setResults(data)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred'
      console.error('Submission error:', errorMessage)
      setError(errorMessage)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen">
      <Header />
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          {!results ? (
            <div className="space-y-12 animate-fade-in-up">
              {/* Hero Section */}
              <div className="text-center mb-16">
                <div className="flex justify-center mb-6">
                  <i className="bi bi-rocket-takeoff text-6xl text-blue-400 animate-float"></i>
                </div>
                <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 bg-clip-text text-transparent mb-6 font-display">
                  AI Job Search Optimizer
                </h1>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                  Transform your job applications with AI-powered CV tailoring, 
                  personalized cover letters, and expert interview preparation
                </p>
                
                {/* Feature badges */}
                <div className="flex flex-wrap justify-center gap-4 mt-8">
                  <div className="badge-gradient inline-flex items-center gap-2">
                    <i className="bi bi-stars text-lg"></i>
                    <span>Intelligent Tailoring</span>
                  </div>
                  <div className="badge-gradient inline-flex items-center gap-2">
                    <i className="bi bi-lightning-charge-fill text-lg"></i>
                    <span>Fast Processing</span>
                  </div>
                  <div className="badge-gradient inline-flex items-center gap-2">
                    <i className="bi bi-check-circle-fill text-lg"></i>
                    <span>AI Powered</span>
                  </div>
                </div>
              </div>

              {/* Upload Form */}
              {loading ? (
                <div className="flex flex-col items-center justify-center py-24 card animate-pulse-glow">
                  <div className="relative w-16 h-16 mb-6">
                    <i className="bi bi-hourglass-split absolute inset-0 text-4xl text-blue-400 animate-spin"></i>
                  </div>
                  <p className="text-2xl text-gray-200 font-display font-bold">Optimizing your application...</p>
                  <p className="text-gray-400 mt-3">This may take 1-3 minutes</p>
                  <div className="mt-6 flex gap-1">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              ) : (
                <>
                  <FileUploadForm onSubmit={handleSubmit} />
                  
                  {error && (
                    <div className="message-error animate-fade-in-up">
                      <i className="bi bi-exclamation-circle-fill text-2xl flex-shrink-0"></i>
                      <div>
                        <p className="font-semibold">Error Processing Application</p>
                        <p className="text-sm mt-1">{error}</p>
                      </div>
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
