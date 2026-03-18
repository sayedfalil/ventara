import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Treat @libsql/client as a server-side external package so Next.js
  // doesn't try to bundle its native bindings through webpack
  serverExternalPackages: ['@libsql/client'],

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};

export default nextConfig;
