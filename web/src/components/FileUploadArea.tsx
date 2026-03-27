'use client'

import React from 'react'
import { Upload, X } from 'lucide-react'

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
    const files = e.dataTransfer.files
    if (files.length > 0) {
      onChange(files[0])
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
        <div className="bg-green-50 border-2 border-green-300 rounded-lg p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">📄</span>
            <div>
              <p className="font-semibold text-green-800">{file.name}</p>
              <p className="text-sm text-green-600">
                {(file.size / 1024).toFixed(2)} KB
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onChange(null)}
            className="text-red-600 hover:text-red-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      ) : (
        <label
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition ${
            disabled
              ? 'bg-gray-100 border-gray-300 opacity-50 cursor-not-allowed'
              : 'border-blue-300 hover:border-blue-500 hover:bg-blue-50'
          }`}
        >
          <input
            type="file"
            onChange={handleFileChange}
            accept=".pdf,.txt,.md"
            className="hidden"
            disabled={disabled}
          />
          <Upload className="w-8 h-8 text-blue-500 mx-auto mb-2" />
          <p className="font-semibold text-gray-700">{label}</p>
          <p className="text-sm text-gray-500 mt-1">
            Drag and drop or click to select
          </p>
        </label>
      )}
    </div>
  )
}
