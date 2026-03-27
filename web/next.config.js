import type { Config } from 'next'

const config: Config = {
  reactStrictMode: true,
  swaggerUI: {
    enabled: process.env.NODE_ENV === 'development',
  },
}

export default config
