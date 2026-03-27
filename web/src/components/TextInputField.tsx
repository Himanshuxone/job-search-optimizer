'use client'

import React from 'react'

interface TextInputFieldProps {
  placeholder: string
  value: string
  onChange: (value: string) => void
  disabled?: boolean
}

export default function TextInputField({
  placeholder,
  value,
  onChange,
  disabled = false,
}: TextInputFieldProps) {
  return (
    <textarea
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      className="w-full h-48 p-4 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none resize-none disabled:bg-gray-100 disabled:opacity-50"
    />
  )
}
