'use client'

import React from 'react'

interface FileUploadAreaProps {
  label: string
  file: File | null
  onChange: (file: File | null) => void
  disabled?: boolean
}

export default function FileUploadArea({
  label,
  file,
  onChange,
  disabled = false,
}: FileUploadAreaProps) {
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (!disabled) {
      const files = e.dataTransfer.files
      if (files.length > 0) {
        onChange(files[0])
      }
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onChange(e.target.files[0])
    }
  }

  return (
    <div className="w-full">
      {file ? (
        <div className="bg-gradient-to-br from-green-900/60 via-emerald-900/40 to-slate-900/60 border-2 border-green-400/40 rounded-2xl p-5 flex items-center justify-between shadow-xl shadow-green-900/20 backdrop-blur-xl hover:scale-[1.02] transition-all duration-300">
          <div className="flex items-center gap-4">
            <div className="icon-box-green bg-green-500/30 border border-green-400/50 scale-125 shadow-md">
              <i className="bi bi-check-circle-fill text-xl text-green-200"></i>
            </div>
            <div>
              <p className="font-bold text-green-200 font-display tracking-wide">{file.name}</p>
              <p className="text-sm text-green-100 font-medium">
                ✓ {(file.size / 1024).toFixed(2)} KB • Ready to upload
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onChange(null)}
            className="text-red-400 hover:text-red-300 p-2 hover:bg-red-500/20 rounded-full transition-all duration-200"
            title="Remove file"
          >
            <i className="bi bi-x-circle-fill text-2xl"></i>
          </button>
        </div>
      ) : (
        <label
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className={`border-3 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 shadow-lg shadow-blue-900/10 backdrop-blur-xl ${
            disabled
              ? 'bg-slate-800/30 border-slate-700 opacity-50 cursor-not-allowed'
              : 'border-blue-500/50 hover:border-blue-400 hover:bg-blue-500/10 hover:shadow-xl hover:scale-[1.02]'
          }`}
        >
          <input
            type="file"
            onChange={handleFileChange}
            accept=".pdf,.txt,.md,.docx"
            className="hidden"
            disabled={disabled}
          />
          <div className="flex flex-col items-center gap-3">
            <div className={`p-4 rounded-full transition-all duration-300 shadow-md ${disabled ? 'bg-slate-800/50' : 'bg-blue-500/20 group-hover:bg-blue-500/30'}`}>
              <i className={`bi bi-cloud-arrow-up text-4xl ${disabled ? 'text-slate-500' : 'text-blue-300'}`}></i>
            </div>
            <div>
              <p className="font-bold text-blue-100 text-lg font-display tracking-wide">{label}</p>
              <p className="text-sm text-blue-200 mt-1 font-medium flex items-center justify-center gap-1">
                <i className="bi bi-arrow-left-right"></i>
                Drag and drop or click to browse
              </p>
              <p className="text-xs text-blue-300 mt-2">
                Supports: PDF, DOCX, TXT, Markdown (Max 50MB)
              </p>
            </div>
          </div>
        </label>
      )}
    </div>
  )
}
