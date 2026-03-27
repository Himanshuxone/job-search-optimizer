'use client'

import React, { useEffect, useState } from 'react'
import { useParallax } from '@/hooks/useParallax'

export default function ParallaxBackground() {
  const { ref: bgRef, offset: bgOffset } = useParallax(0.3)
  const { ref: blob1Ref, offset: blob1Offset } = useParallax(0.5)
  const { ref: blob2Ref, offset: blob2Offset } = useParallax(0.4)
  const { ref: blob3Ref, offset: blob3Offset } = useParallax(0.6)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      })
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div
      ref={bgRef}
      className="fixed inset-0 -z-10 overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900"
    >
      {/* Base gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-950/40 via-transparent to-slate-950/40" />

      {/* Animated blob 1 - Top Left */}
      <div
        ref={blob1Ref}
        className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"
        style={{
          transform: `translate(${mousePos.x}px, ${bgOffset + mousePos.y}px)`,
          transition: 'transform 0.4s ease-out',
        }}
      />

      {/* Animated blob 2 - Top Right */}
      <div
        ref={blob2Ref}
        className="absolute -top-20 -right-40 w-96 h-96 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-blob animation-delay-2000"
        style={{
          transform: `translate(${-mousePos.x}px, ${blob1Offset + mousePos.y * 0.5}px)`,
          transition: 'transform 0.4s ease-out',
        }}
      />

      {/* Animated blob 3 - Bottom Center */}
      <div
        ref={blob3Ref}
        className="absolute -bottom-40 left-1/2 w-96 h-96 bg-gradient-to-br from-cyan-600 to-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-blob animation-delay-4000"
        style={{
          transform: `translate(calc(-50% + ${mousePos.x * 0.5}px), ${blob2Offset + mousePos.y}px)`,
          transition: 'transform 0.4s ease-out',
        }}
      />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />

      {/* Radial gradient overlay for depth */}
      <div className="absolute inset-0 bg-radial-gradient" />

      {/* Top shine effect */}
      <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />

      {/* Floating particles (decorative) */}
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-blue-300 rounded-full opacity-20 animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${i * 0.3}s`,
            animationDuration: `${3 + Math.random() * 4}s`,
          }}
        />
      ))}
    </div>
  )
}

// CSS Grid pattern (add to globals.css if not present)
export const gridPatternStyle = `
  .bg-grid-pattern {
    background-image: 
      linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px);
    background-size: 50px 50px;
  }
`
