/** @type {import('next').NextConfig} */
const nextConfig = {
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

  // Headers for security (excluding API upload endpoints)
  async headers() {
    return [
      {
        source: '/api/optimize',
        headers: [
          // Allow multipart/form-data for file uploads
          { key: 'X-Content-Type-Options', value: 'nosniff' },
        ],
      },
      {
        source: '/api/:path((?!optimize).*)',
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

module.exports = nextConfig
