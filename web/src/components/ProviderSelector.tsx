'use client'

import React from 'react'

interface ProviderSelectorProps {
  value: string
  onChange: (provider: string) => void
}

export default function ProviderSelector({
  value,
  onChange,
}: ProviderSelectorProps) {
  return (
    <div className="bg-white rounded-lg p-6 card">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Choose AI Provider
      </h2>
      <div className="grid md:grid-cols-3 gap-4">
        {[
          {
            id: 'claude',
            name: 'Claude',
            description: 'Anthropic - Best quality',
            badge: 'Recommended',
          },
          {
            id: 'gemini',
            name: 'Gemini',
            description: 'Google - Fastest',
            badge: 'Free tier',
          },
          {
            id: 'openai',
            name: 'OpenAI',
            description: 'GPT-4 Turbo',
            badge: 'Premium',
          },
        ].map((provider) => (
          <button
            key={provider.id}
            type="button"
            onClick={() => onChange(provider.id)}
            className={`p-4 rounded-lg border-2 transition ${
              value === provider.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-blue-300'
            }`}
          >
            <h3 className="font-semibold text-gray-800">{provider.name}</h3>
            <p className="text-sm text-gray-600">{provider.description}</p>
            <span
              className={`inline-block mt-2 px-2 py-1 rounded text-xs font-semibold ${
                value === provider.id
                  ? 'bg-blue-200 text-blue-800'
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              {provider.badge}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
