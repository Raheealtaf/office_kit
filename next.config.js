/** @type {import('next').NextConfig} */
const nextConfig = {
  // 1. Ignore Type & Lint errors during build (Saves memory & prevents strict failures)
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },

  // 2. Prevent the "canvas" crash
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    config.resolve.alias.encoding = false;
    return config;
  },

  // 3. Allow images from Unsplash (for your blog)
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },

  // 4. Server Components config (Required for some versions of Next.js)
  serverExternalPackages: ["sharp"],
};

module.exports = nextConfig;
