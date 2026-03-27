'use client'

import React from 'react'

interface DocumentFormatSelectorProps {
  value: string
  onChange: (format: string) => void
}

interface FormatOption {
  id: string
  name: string
  description: string
  icon: string
  color: string
  badge?: string
}

export default function DocumentFormatSelector({
  value,
  onChange,
}: DocumentFormatSelectorProps) {
  const formats: FormatOption[] = [
    {
      id: 'markdown',
      name: 'Markdown',
      description: 'Clean, readable, best for editing',
      icon: 'bi-file-earmark-text',
      color: 'from-blue-600 to-blue-700',
      badge: '✨ Default',
    },
    {
      id: 'txt',
      name: 'Plain Text',
      description: 'Universal format, works everywhere',
      icon: 'bi-file-text',
      color: 'from-gray-600 to-gray-700',
    },
    {
      id: 'pdf',
      name: 'PDF Document',
      description: 'Professional, ready to send',
      icon: 'bi-file-pdf',
      color: 'from-red-600 to-red-700',
      badge: '📄 Premium',
    },
    {
      id: 'docx',
      name: 'Word Document',
      description: 'Editable in Microsoft Word',
      icon: 'bi-file-word',
      color: 'from-blue-600 to-indigo-700',
      badge: '📝 Editable',
    },
    {
      id: 'html',
      name: 'Web Page',
      description: 'View in any browser, styled',
      icon: 'bi-browser-safari',
      color: 'from-purple-600 to-purple-700',
    },
    {
      id: 'json',
      name: 'JSON Format',
      description: 'Structured data for integration',
      icon: 'bi-braces',
      color: 'from-yellow-600 to-yellow-700',
      badge: '⚙️ Dev',
    },
  ]

  return (
    <div className="card animate-fade-in-up">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <i className="bi bi-file-earmark-arrow-down text-3xl text-cyan-400"></i>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent font-display">
            Export Format
          </h2>
        </div>
        <p className="text-gray-300 mt-3 ml-12 text-lg">
          Choose how you want to receive your documents
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {formats.map((format) => {
          const isSelected = value === format.id

          return (
            <button
              key={format.id}
              type="button"
              onClick={() => onChange(format.id)}
              className={`relative overflow-hidden rounded-2xl border-2 transition-all duration-300 p-6 group ${
                isSelected
                  ? `border-cyan-400/80 bg-gradient-to-br from-cyan-900/40 to-blue-900/40 shadow-2xl shadow-cyan-500/40 scale-105`
                  : `border-slate-700/50 hover:border-slate-600 hover:shadow-xl hover:shadow-slate-700/30`
              }`}
            >
              {/* Background gradient on hover */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${format.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
              />

              {/* Content */}
              <div className="relative z-10">
                {/* Icon */}
                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${format.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                >
                  <i className={`${format.icon} text-2xl text-white`}></i>
                </div>

                {/* Title & Description */}
                <h3 className="font-bold text-xl text-gray-100 text-left font-display mb-1">
                  {format.name}
                </h3>
                <p className="text-sm text-gray-400 text-left">{format.description}</p>

                {/* Badge */}
                {format.badge && (
                  <div className="inline-block mt-4 px-3 py-1.5 rounded-full text-xs font-bold bg-blue-500/30 text-blue-300 border border-blue-500/50">
                    {format.badge}
                  </div>
                )}

                {/* Check icon for selected */}
                {isSelected && (
                  <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-full flex items-center justify-center shadow-lg shadow-cyan-500/50 animate-pulse-glow">
                    <i className="bi bi-check-lg text-white text-lg font-bold"></i>
                  </div>
                )}
              </div>
            </button>
          )
        })}
      </div>

      {/* Info section */}
      <div className="mt-8 bg-gradient-to-r from-cyan-900/50 to-blue-900/50 border-l-4 border-cyan-500/50 rounded-r-xl p-6 backdrop-blur-sm hover:border-cyan-400/50 transition-all duration-300">
        <p className="text-sm text-cyan-200 font-medium flex items-start gap-2">
          <i className="bi bi-info-circle-fill text-lg text-cyan-400 mt-0.5 flex-shrink-0"></i>
          <span>
            <strong>Format Guide:</strong> Select your preferred output format. All documents will be generated in this format
            for download.{' '}
            {value === 'pdf' && 'PDF is perfect for professional submissions.'}
            {value === 'docx' && 'DOCX files can be edited in Microsoft Word.'}
            {value === 'json' && 'JSON format is great for developers and integrations.'}
            {value === 'markdown' && 'Markdown is ideal for editing and version control.'}
            {value === 'html' && 'HTML provides styled, browser-ready documents.'}
            {value === 'txt' && 'Plain text works with any application.'}
          </span>
        </p>
      </div>
    </div>
  )
}
