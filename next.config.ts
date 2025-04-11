/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // ✅ This disables linting during builds
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
