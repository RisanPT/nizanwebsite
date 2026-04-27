/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/webp'],
    minimumCacheTTL: 60,
    unoptimized: false,
    localPatterns: [
      { pathname: '/**' },
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'coentauechpcknmsflsv.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      }
    ],
  },

  // Immutable cache headers for frames
  async headers() {
    return [
      {
        source: '/frames/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;

