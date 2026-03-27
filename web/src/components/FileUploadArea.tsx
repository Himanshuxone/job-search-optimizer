'use client'

import React from 'react'
import { Upload, X, CheckCircle, File } from 'lucide-react'

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
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 rounded-xl p-5 flex items-center justify-between shadow-md hover:shadow-lg transition-all duration-300">
          <div className="flex items-center gap-4">
            <div className="icon-box-green">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div>
              <p className="font-bold text-green-900">{file.name}</p>
              <p className="text-sm text-green-700 font-medium">
                ✓ {(file.size / 1024).toFixed(2)} KB • Ready to upload
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onChange(null)}
            className="text-red-600 hover:text-red-800 p-2 hover:bg-red-50 rounded-full transition-all duration-200"
            title="Remove file"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      ) : (
        <label
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className={`border-3 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300 ${
            disabled
              ? 'bg-gray-100 border-gray-300 opacity-50 cursor-not-allowed'
              : 'border-blue-400 hover:border-blue-600 hover:bg-blue-50 hover:shadow-lg'
          }`}
        >
          <input
            type="file"
            onChange={handleFileChange}
            accept=".pdf,.txt,.md"
            className="hidden"
            disabled={disabled}
          />
          <div className="flex flex-col items-center gap-3">
            <div className={`p-3 rounded-full ${disabled ? 'bg-gray-200' : 'bg-blue-100'}`}>
              <Upload className={`w-8 h-8 ${disabled ? 'text-gray-400' : 'text-blue-600'}`} />
            </div>
            <div>
              <p className="font-bold text-gray-800 text-lg">{label}</p>
              <p className="text-sm text-gray-600 mt-1 font-medium">
                📌 Drag and drop or click to browse
              </p>
              <p className="text-xs text-gray-500 mt-2">
                Supports: PDF, TXT, Markdown (Max 50MB)
              </p>
            </div>
          </div>
        </label>
      )}
    </div>
  )
}
