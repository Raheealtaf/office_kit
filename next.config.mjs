/** @type {import('next').NextConfig} */
const nextConfig = {
  // Prevent Next.js from bundling these native modules
  serverExternalPackages: ["sharp", "onnxruntime-node"],

  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      sharp$: false,
      "onnxruntime-node$": false,
    };
    return config;
  },
};

module.exports = nextConfig;
