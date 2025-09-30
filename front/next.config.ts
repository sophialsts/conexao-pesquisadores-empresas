import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'simcc.uesc.br',
      },
    ],
  },
};

export default nextConfig;
