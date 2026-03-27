import type { Metadata } from 'next'
import './globals.css'
import ParallaxBackground from '@/components/ParallaxBackground'

export const metadata: Metadata = {
  title: 'Career Catalyst - AI Job Optimizer',
  description: 'Transform your job applications with AI-powered CV tailoring, personalized cover letters, and expert interview preparation',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Bootstrap Icons CDN */}
        <link 
          rel="stylesheet" 
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
        />
        
        {/* Google Fonts */}
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Poppins:wght@600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 min-h-screen text-gray-100 font-sans overflow-x-hidden">
        {/* Advanced Parallax Background with Dynamic Effects */}
        <ParallaxBackground />

        {/* Content */}
        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  )
}
