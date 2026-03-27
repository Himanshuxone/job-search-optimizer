'use client'

import React from 'react'

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-950 via-indigo-950 to-purple-950 shadow-2xl sticky top-0 z-50 backdrop-blur-md border-b border-blue-700/30">
      <div className="container mx-auto px-4 py-5">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center gap-4 group">
            <div className="icon-box-gradient w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg shadow-blue-500/50 group-hover:shadow-purple-500/50 transition-all duration-300 group-hover:scale-105">
              <i className="bi bi-briefcase-fill text-2xl text-white"></i>
            </div>
            <div className="flex flex-col">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 bg-clip-text text-transparent font-display animate-fade-in-left">
                Career Catalyst
              </h1>
              <p className="text-blue-200 text-xs font-medium tracking-wide">✨ AI-Powered Job Optimization</p>
            </div>
          </div>

          {/* Powered by AI Badge */}
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-5 py-3 rounded-full border border-white/20 hover:border-blue-400/50 transition-all duration-300 group">
            <div className="flex items-center gap-2">
              <i className="bi bi-lightning-charge-fill text-lg text-yellow-300 animate-pulse"></i>
              <span className="text-white font-semibold text-sm">Powered by AI</span>
            </div>
            <div className="w-1.5 h-1.5 bg-blue-400/50 rounded-full group-hover:bg-blue-300 transition-colors"></div>
            <span className="text-blue-200 text-xs flex items-center gap-1">
              <i className="bi bi-gear-fill text-xs"></i>
              Next.js + Gemini/Claude
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}
