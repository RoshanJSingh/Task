/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true, // 👈 disables type checking during build
  },
  eslint: {
    ignoreDuringBuilds: true, // 👈 disables linting during build
  },
};

module.exports = nextConfig;
