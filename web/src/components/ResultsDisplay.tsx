'use client'

import React, { useState } from 'react'
import { Download, Copy, ChevronDown, ChevronUp } from 'lucide-react'

interface ResultsDisplayProps {
  results: {
    tailored_cv?: string
    cover_letter?: string
    interview_questions?: string
    interview_prep_guide?: string
    skill_gaps?: string
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
    alert('Copied to clipboard!')
  }

  const downloadAsFile = (content: string, filename: string) => {
    const element = document.createElement('a')
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content))
    element.setAttribute('download', filename)
    element.style.display = 'none'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const sections = [
    {
      key: 'tailored_cv',
      title: '📄 Tailored CV',
      icon: '✨',
      filename: 'tailored_cv.md',
    },
    {
      key: 'cover_letter',
      title: '💌 Cover Letter',
      icon: '✍️',
      filename: 'cover_letter.md',
    },
    {
      key: 'interview_questions',
      title: '❓ Interview Questions',
      icon: '🎤',
      filename: 'interview_questions.md',
    },
    {
      key: 'interview_prep_guide',
      title: '📚 Interview Prep Guide',
      icon: '🎯',
      filename: 'interview_prep_guide.md',
    },
    {
      key: 'skill_gaps',
      title: '📊 Skill Gaps Analysis',
      icon: '📈',
      filename: 'skill_gaps_analysis.json',
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-green-700 mb-2">✅ Ready to Apply!</h1>
        <p className="text-gray-600">
          Your personalized job application materials are ready below
        </p>
      </div>

      {/* Results Sections */}
      <div className="space-y-4">
        {sections.map((section) => (
          results[section.key as keyof typeof results] && (
            <div
              key={section.key}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              {/* Section Header */}
              <button
                onClick={() => toggleSection(section.key)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-blue-50 transition"
              >
                <span className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  {section.icon} {section.title}
                </span>
                {expandedSections[section.key] ? (
                  <ChevronUp className="w-5 h-5" />
                ) : (
                  <ChevronDown className="w-5 h-5" />
                )}
              </button>

              {/* Section Content */}
              {expandedSections[section.key] && (
                <div className="border-t border-gray-200">
                  <div className="px-6 py-4 bg-gray-50 max-h-96 overflow-y-auto">
                    <pre className="whitespace-pre-wrap text-sm text-gray-700 font-mono">
                      {results[section.key as keyof typeof results]}
                    </pre>
                  </div>

                  {/* Action Buttons */}
                  <div className="px-6 py-4 bg-gray-100 flex gap-3 justify-end">
                    <button
                      onClick={() =>
                        copyToClipboard(
                          results[section.key as keyof typeof results] || ''
                        )
                      }
                      className="btn-secondary flex items-center gap-2"
                    >
                      <Copy className="w-4 h-4" />
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
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                  </div>
                </div>
              )}
            </div>
          )
        ))}
      </div>

      {/* Download All Button */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-white text-center">
        <h2 className="text-2xl font-bold mb-2">All Set!</h2>
        <p className="mb-4">Download individual materials above or start a new optimization</p>
        <button
          onClick={onNewSearch}
          className="bg-white text-blue-600 font-semibold py-2 px-6 rounded-lg hover:bg-blue-50 transition"
        >
          Optimize Another Application
        </button>
      </div>
    </div>
  )
}
