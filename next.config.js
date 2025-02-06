// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ['en', 'es'],
    defaultLocale: 'en',
    localeDetection: false,
  },
  images: {
    domains: ['images.prismic.io', 'dediabetes.cdn.prismic.io'],
  },
  webpack: (config, { dev, isServer }) => {
    // Add rule for handling SVG files
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack']
    });

    // Optimize Fast Refresh
    if (dev && !isServer) {
      config.optimization.moduleIds = 'named';
      config.optimization.chunkIds = 'named';
    }

    return config;
  },
  async redirects() {
    return [
      {
        source: '/preview',
        destination: '/api/preview',
        permanent: false,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/api/preview',
        destination: '/api/prismic/preview',
      },
      {
        source: '/api/exit-preview',
        destination: '/api/prismic/exit-preview',
      },
    ];
  },
}

module.exports = nextConfig;