import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  experimental: {
    middleware: true, 
  },

  redirects: async () => {
    return [
      {
        source: '/old-route',
        destination: '/new-route',
        permanent: true,
      },
    ];
  },

  webpack(config) {
    
    return config;
  },
};

export default nextConfig;
