'use client'

import React from 'react'
import { Zap, Sparkles, Crown, Check } from 'lucide-react'

interface ProviderSelectorProps {
  value: string
  onChange: (provider: string) => void
}

export default function ProviderSelector({
  value,
  onChange,
}: ProviderSelectorProps) {
  return (
    <div className="card-gradient animate-slideUp">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
          <Sparkles className="w-7 h-7 text-blue-600" />
          Select AI Provider
        </h2>
        <p className="text-gray-600 mt-2">Choose the AI model that will power your application optimization</p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-5">
        {[
          {
            id: 'claude',
            name: 'Claude',
            provider: 'Anthropic',
            description: 'Most advanced reasoning',
            badge: '⭐ Recommended',
            icon: Crown,
            color: 'from-purple-600 to-purple-700',
            bgColor: 'bg-purple-50',
            borderColor: 'border-purple-200',
            badgeColor: 'bg-purple-100 text-purple-800',
          },
          {
            id: 'gemini',
            name: 'Gemini',
            provider: 'Google',
            description: 'Fastest processing',
            badge: '⚡ Free tier',
            icon: Zap,
            color: 'from-blue-600 to-blue-700',
            bgColor: 'bg-blue-50',
            borderColor: 'border-blue-200',
            badgeColor: 'bg-blue-100 text-blue-800',
          },
          {
            id: 'openai',
            name: 'GPT-4',
            provider: 'OpenAI',
            description: 'Premium performance',
            badge: '💎 Premium',
            icon: Sparkles,
            color: 'from-green-600 to-green-700',
            bgColor: 'bg-green-50',
            borderColor: 'border-green-200',
            badgeColor: 'bg-green-100 text-green-800',
          },
        ].map((provider) => {
          const Icon = provider.icon
          const isSelected = value === provider.id

          return (
            <button
              key={provider.id}
              type="button"
              onClick={() => onChange(provider.id)}
              className={`relative overflow-hidden rounded-xl border-2 transition-all duration-300 p-6 group ${
                isSelected
                  ? `border-blue-500 ${provider.bgColor} shadow-xl scale-105`
                  : `border-gray-200 hover:border-gray-300 hover:shadow-lg`
              }`}
            >
              {/* Background gradient on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${provider.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
              
              {/* Content */}
              <div className="relative z-10">
                {/* Icon */}
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${provider.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>

                {/* Title & Provider */}
                <h3 className="font-bold text-lg text-gray-900 text-left">{provider.name}</h3>
                <p className="text-sm text-gray-600 text-left font-medium">{provider.provider}</p>
                
                {/* Description */}
                <p className="text-sm text-gray-600 text-left mt-2">{provider.description}</p>

                {/* Badge */}
                <div className={`inline-block mt-4 px-3 py-1.5 rounded-full text-xs font-bold ${provider.badgeColor} ${isSelected ? 'ring-2 ring-offset-2 ring-blue-400' : ''}`}>
                  {provider.badge}
                </div>

                {/* Check icon for selected */}
                {isSelected && (
                  <div className="absolute top-4 right-4 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
            </button>
          )
        })}
      </div>

      {/* Info section */}
      <div className="mt-6 bg-yellow-50 border-l-4 border-yellow-400 rounded-r-lg p-4">
        <p className="text-sm text-yellow-800 font-medium">
          💡 <strong>Pro Tip:</strong> Using Gemini? It's faster and free! Try it for the best experience.
        </p>
      </div>
    </div>
  )
}
