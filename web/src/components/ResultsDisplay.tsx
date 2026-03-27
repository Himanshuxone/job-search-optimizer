'use client'

import React, { useState } from 'react'

interface ResultsDisplayProps {
  results: {
    tailored_cv?: string
    cover_letter?: string
    interview_questions?: string
    interview_prep_guide?: string
    skill_gaps?: string
    format?: string
  }
  onNewSearch: () => void
}

export default function ResultsDisplay({
  results,
  onNewSearch,
}: ResultsDisplayProps) {
  const [expandedSections, setExpandedSections] = useState<{
    [key: string]: boolean
  }>({
    tailored_cv: true,
    cover_letter: true,
  })

  const toggleSection = (key: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    alert('✓ Copied to clipboard!')
  }

  const getFileExtension = () => {
    const formatMap: { [key: string]: string } = {
      markdown: 'md',
      txt: 'txt',
      pdf: 'pdf',
      docx: 'docx',
      html: 'html',
      json: 'json',
    }
    return formatMap[results.format || 'markdown'] || 'md'
  }

  const getMimeType = (extension: string) => {
    const mimeTypes: { [key: string]: string } = {
      md: 'text/markdown',
      txt: 'text/plain',
      pdf: 'application/pdf',
      docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      html: 'text/html',
      json: 'application/json',
    }
    return mimeTypes[extension] || 'text/plain'
  }

  const downloadAsFile = (content: string, baseFilename: string) => {
    const extension = getFileExtension()
    const filename = baseFilename.replace(/\.[^/.]+$/, '') + '.' + extension
    const mimeType = getMimeType(extension)

    const element = document.createElement('a')
    element.setAttribute('href', `data:${mimeType};charset=utf-8,` + encodeURIComponent(content))
    element.setAttribute('download', filename)
    element.style.display = 'none'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const sections = [
    {
      key: 'tailored_cv',
      title: 'Tailored CV',
      icon: 'bi-file-earmark-pdf',
      badge: '✨',
      filename: 'tailored_cv',
      color: 'from-blue-600 to-blue-700',
    },
    {
      key: 'cover_letter',
      title: 'Cover Letter',
      icon: 'bi-envelope',
      badge: '💌',
      filename: 'cover_letter',
      color: 'from-purple-600 to-purple-700',
    },
    {
      key: 'interview_questions',
      title: 'Interview Questions',
      icon: 'bi-chat-dots',
      badge: '❓',
      filename: 'interview_questions',
      color: 'from-green-600 to-green-700',
    },
    {
      key: 'interview_prep_guide',
      title: 'Interview Prep Guide',
      icon: 'bi-book',
      badge: '📚',
      filename: 'interview_prep_guide',
      color: 'from-orange-600 to-orange-700',
    },
    {
      key: 'skill_gaps',
      title: 'Skill Gaps Analysis',
      icon: 'bi-graph-up',
      badge: '📊',
      filename: 'skill_gaps_analysis',
      color: 'from-pink-600 to-pink-700',
    },
  ]

  return (
    <div className="space-y-8 animate-fade-in-up">
      {/* Success Header */}
      <div className="text-center mb-12">
        <div className="flex justify-center mb-6">
          <i className="bi bi-check-circle-fill text-6xl text-green-400"></i>
        </div>
        <h1 className="text-5xl font-bold bg-gradient-to-r from-green-300 to-emerald-300 bg-clip-text text-transparent mb-3 font-display">
          Ready to Apply!
        </h1>
        <p className="text-gray-300 text-lg">
          Your personalized job application materials are ready below
        </p>
        {results.format && (
          <p className="mt-4 flex justify-center items-center gap-2 text-blue-300 text-sm">
            <i className="bi bi-file-earmark-arrow-down"></i>
            Exporting as <span className="font-semibold uppercase">{results.format}</span>
          </p>
        )}
      </div>

      {/* Results Sections */}
      <div className="space-y-5">
        {sections.map((section) => (
          results[section.key as keyof typeof results] && (
            <div
              key={section.key}
              className="card overflow-hidden hover:shadow-2xl transition-all duration-300"
            >
              {/* Section Header */}
              <button
                onClick={() => toggleSection(section.key)}
                className={`w-full px-8 py-5 flex items-center justify-between bg-gradient-to-r ${section.color} hover:opacity-90 transition-all duration-300 group`}
              >
                <span className="text-lg font-bold text-white flex items-center gap-3 font-display">
                  <i className={`bi ${section.icon} text-2xl`}></i>
                  {section.title}
                </span>
                <i className={`bi transition-transform duration-300 text-2xl text-white ${expandedSections[section.key] ? 'bi-chevron-up' : 'bi-chevron-down'}`}></i>
              </button>

              {/* Section Content */}
              {expandedSections[section.key] && (
                <div className="border-t border-slate-700/50">
                  <div className="px-8 py-6 bg-slate-800/50 max-h-96 overflow-y-auto">
                    <pre className="whitespace-pre-wrap text-sm text-gray-200 font-mono leading-relaxed">
                      {results[section.key as keyof typeof results]}
                    </pre>
                  </div>

                  {/* Action Buttons */}
                  <div className="px-8 py-4 bg-slate-700/30 flex gap-3 justify-end border-t border-slate-700/50">
                    <button
                      onClick={() =>
                        copyToClipboard(
                          results[section.key as keyof typeof results] || ''
                        )
                      }
                      className="btn-secondary flex items-center gap-2"
                    >
                      <i className="bi bi-clipboard-check text-lg"></i>
                      Copy
                    </button>
                    <button
                      onClick={() =>
                        downloadAsFile(
                          results[section.key as keyof typeof results] || '',
                          section.filename
                        )
                      }
                      className="btn-primary flex items-center gap-2"
                    >
                      <i className="bi bi-download text-lg"></i>
                      Download
                    </button>
                  </div>
                </div>
              )}
            </div>
          )
        ))}
      </div>

      {/* Final CTA Section */}
      <div className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-2xl p-10 text-center border border-blue-700/50 backdrop-blur-sm">
        <div className="flex justify-center mb-6">
          <i className="bi bi-rocket-takeoff text-5xl text-blue-400 animate-float"></i>
        </div>
        <h2 className="text-3xl font-bold text-gray-100 mb-3 font-display">You're All Set!</h2>
        <p className="text-gray-300 mb-8 text-lg">
          Download individual materials above or optimize another application
        </p>
        <button
          onClick={onNewSearch}
          className="btn-primary inline-flex items-center gap-2 px-8 py-4 text-lg hover:scale-105 active:scale-95"
        >
          <i className="bi bi-arrow-repeat text-xl"></i>
          Start New Optimization
        </button>
      </div>
    </div>
  )
}
