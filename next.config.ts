import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },

  images: {
    domains: ['example.com', "i.ibb.co", 'lh3.googleusercontent.com'],
  },
};

export default nextConfig;
