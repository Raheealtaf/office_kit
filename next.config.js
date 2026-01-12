/** @type {import('next').NextConfig} */
const nextConfig = {
  // 1. This is critical for PDF.js to work in Next.js
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    config.resolve.alias.encoding = false;
    return config;
  },
};

module.exports = nextConfig;
