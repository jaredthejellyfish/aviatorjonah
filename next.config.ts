import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    ppr: 'incremental',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fzcjkdmvxbkoyipztets.supabase.co',

      },
    ],
  },
};

export default nextConfig;
