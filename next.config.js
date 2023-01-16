/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  basePath: process.env.NODE_ENV === 'production' ? '/pronto-npc' : '',
  publicRuntimeConfig: {
    contextPath: process.env.NODE_ENV === 'production' ? '/pronto-npc' : '',
  }
}

module.exports = nextConfig
