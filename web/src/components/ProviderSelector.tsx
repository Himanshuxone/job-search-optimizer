'use client'

import React from 'react'

interface ProviderSelectorProps {
  value: string
  onChange: (provider: string) => void
}

interface Provider {
  id: string
  name: string
  provider: string
  description: string
  badge: string
  icon: string
  color: string
  glowColor: string
  badgeBg: string
}

export default function ProviderSelector({
  value,
  onChange,
}: ProviderSelectorProps) {
  const providers: Provider[] = [
    {
      id: 'claude',
      name: 'Claude',
      provider: 'Anthropic',
      description: 'Most advanced reasoning',
      badge: '⭐ Recommended',
      icon: 'bi-crown-fill',
      color: 'from-purple-600 to-purple-700',
      glowColor: 'shadow-purple-500/50',
      badgeBg: 'bg-purple-500/30 text-purple-300 border border-purple-500/50',
    },
    {
      id: 'gemini',
      name: 'Gemini',
      provider: 'Google',
      description: 'Fastest processing',
      badge: '⚡ Free tier',
      icon: 'bi-lightning-fill',
      color: 'from-blue-600 to-blue-700',
      glowColor: 'shadow-blue-500/50',
      badgeBg: 'bg-blue-500/30 text-blue-300 border border-blue-500/50',
    },
    {
      id: 'openai',
      name: 'GPT-4',
      provider: 'OpenAI',
      description: 'Premium performance',
      badge: '💎 Premium',
      icon: 'bi-gem-fill',
      color: 'from-green-600 to-green-700',
      glowColor: 'shadow-green-500/50',
      badgeBg: 'bg-green-500/30 text-green-300 border border-green-500/50',
    },
  ]

  return (
    <div className="card animate-fade-in-up">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <i className="bi bi-stars text-3xl text-yellow-400"></i>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent font-display">
            Select AI Provider
          </h2>
        </div>
        <p className="text-gray-300 mt-3 ml-12 text-lg">Choose the AI model that will power your application optimization</p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6">
        {providers.map((provider) => {
          const isSelected = value === provider.id

          return (
            <button
              key={provider.id}
              type="button"
              onClick={() => onChange(provider.id)}
              className={`relative overflow-hidden rounded-2xl border-2 transition-all duration-300 p-7 group ${
                isSelected
                  ? `border-blue-400/80 bg-gradient-to-br from-blue-900/40 to-purple-900/40 shadow-2xl shadow-blue-500/40 scale-105`
                  : `border-slate-700/50 hover:border-slate-600 hover:shadow-xl hover:shadow-slate-700/30`
              }`}
            >
              {/* Background gradient on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${provider.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
              
              {/* Content */}
              <div className="relative z-10">
                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${provider.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-lg ${provider.glowColor}`}>
                  <i className={`${provider.icon} text-3xl text-white`}></i>
                </div>

                {/* Title & Provider */}
                <h3 className="font-bold text-2xl text-gray-100 text-left font-display">{provider.name}</h3>
                <p className="text-sm text-gray-400 text-left font-medium">{provider.provider}</p>
                
                {/* Description */}
                <p className="text-sm text-gray-300 text-left mt-3">{provider.description}</p>

                {/* Badge */}
                <div className={`inline-block mt-4 px-4 py-2 rounded-full text-xs font-bold ${provider.badgeBg} ${isSelected ? 'ring-2 ring-offset-2 ring-offset-slate-900 ring-blue-400' : ''}`}>
                  {provider.badge}
                </div>

                {/* Check icon for selected */}
                {isSelected && (
                  <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/50 animate-pulse-glow">
                    <i className="bi bi-check-lg text-white text-lg font-bold"></i>
                  </div>
                )}
              </div>
            </button>
          )
        })}
      </div>

      {/* Info section */}
      <div className="mt-8 bg-gradient-to-r from-yellow-900/50 to-amber-900/50 border-l-4 border-yellow-500/50 rounded-r-xl p-6 backdrop-blur-sm hover:border-yellow-400/50 transition-all duration-300">
        <p className="text-sm text-yellow-200 font-medium flex items-start gap-2">
          <i className="bi bi-lightbulb-fill text-xl text-yellow-400 mt-0.5 flex-shrink-0"></i>
          <span><strong>Pro Tip:</strong> Using Gemini? It's faster and free! Try it for the best experience.</span>
        </p>
      </div>
    </div>
  )
}
