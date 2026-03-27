'use client'

import React from 'react'
import { Briefcase, Sparkles, ArrowRight } from 'lucide-react'

export default function Header() {
  return (
    <header className="header-gradient shadow-xl sticky top-0 z-50">
      <div className="container mx-auto px-4 py-5">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center gap-4">
            <div className="icon-box-blue bg-white bg-opacity-20 border-2 border-white/30 backdrop-blur-sm">
              <Briefcase className="w-7 h-7 text-white" />
            </div>
            <div className="flex flex-col">
              <h1 className="text-3xl font-bold text-white font-sans">Career Catalyst</h1>
              <p className="text-blue-100 text-xs font-medium">AI-Powered Job Optimization</p>
            </div>
          </div>

          {/* Powered by AI Badge */}
          <div className="flex items-center gap-3 bg-white bg-opacity-20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30">
            <div className="flex items-center gap-1">
              <Sparkles className="w-4 h-4 text-yellow-300 animate-pulse-soft" />
              <span className="text-white font-semibold text-sm">Powered by AI</span>
            </div>
            <div className="w-1 h-1 bg-white/50 rounded-full"></div>
            <span className="text-blue-100 text-xs">Next.js + Gemini</span>
          </div>
        </div>
      </div>
    </header>
  )
}
