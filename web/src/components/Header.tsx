'use client'

import React from 'react'
import { Briefcase, Zap } from 'lucide-react'

export default function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Job Optimizer</h1>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Zap className="w-4 h-4 text-yellow-500" />
            <span>Powered by AI</span>
          </div>
        </div>
      </div>
    </header>
  )
}
