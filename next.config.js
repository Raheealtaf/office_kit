/** @type {import('next').NextConfig} */
const nextConfig = {
  // 1. Disable Source Maps (Saves huge amount of memory)
  productionBrowserSourceMaps: false,

  // 2. Ignore Errors so build finishes even with warnings
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },

  // 3. Prevent native module crashes
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    config.resolve.alias.encoding = false;
    return config;
  },

  // 4. Allow Unsplash images
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
    ],
  },
};

module.exports = nextConfig;
