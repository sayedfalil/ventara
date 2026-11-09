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

  // Send the bare domain to www with a permanent (308) redirect so Google
  // only indexes one hostname. The canonical host is www.ventaraglobal.com.
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'ventaraglobal.com' }],
        destination: 'https://www.ventaraglobal.com/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
