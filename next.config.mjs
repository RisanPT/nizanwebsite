/** @type {import('next').NextConfig} */
const nextConfig = {
  // Treat /frames as static assets (served via symlink in /public/frames → /frames)
  images: {
    // Keep optimization for non-frame images
    formats: ['image/webp'],
    minimumCacheTTL: 60,
    // Don't optimize the frames – they're served raw
    unoptimized: false,
    localPatterns: [
      { pathname: '/frames/**' },
    ],
  },

  // Allow webpack to follow symlinks (needed for public/frames → ../frames)
  webpack: (config) => {
    config.resolve.symlinks = true;
    return config;
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
