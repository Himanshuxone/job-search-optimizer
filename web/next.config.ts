import { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  
  // Support for static generation
  staticPageGenerationTimeout: 300,
  
  // API routes configuration
  api: {
    bodyParser: {
      sizeLimit: '50mb',
    },
    responseLimit: '100mb',
  },

  // Headers for security
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Content-Type', value: 'application/json' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
        ],
      },
    ]
  },

  // Rewrites for API routes
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/api/:path*',
          destination: '/api/:path*',
        },
      ],
    }
  },
}

export default nextConfig
