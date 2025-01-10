/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['cdn.sanity.io'], // Add cdn.sanity.io to the allowed domains
  },
};

module.exports = {
  reactStrictMode: true,
  experimental: {
    appDir: true, // Enable app directory if using app directory routing
  },
};

