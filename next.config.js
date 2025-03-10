// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['next-auth'],
  i18n: {
    locales: ['en', 'es'],
    defaultLocale: 'en',
    localeDetection: false,
    domains: [
      {
        domain: 'dediabetes.com',
        defaultLocale: 'en',
      },
      {
        domain: 'es.dediabetes.com',
        defaultLocale: 'es',
      },
    ],
  },
  images: {
    domains: ['images.prismic.io', 'dediabetes.cdn.prismic.io'],
  },
  webpack: (config, { dev, isServer }) => {
    // Add SVG handling
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack']
    });

    // Optimize Fast Refresh
    if (dev && !isServer) {
      config.optimization.moduleIds = 'named';
      config.optimization.chunkIds = 'named';
    }

    // Handle Node.js modules in browser
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        net: false,
        tls: false,
        dns: false,
        'fs/promises': false,
        fs: false,
        'timers/promises': false,
        child_process: false,
        'util/types': false,
        util: false,
      };
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
      {
        source: '/research/:uid',
        destination: '/:uid',
        permanent: true,
      },
      {
        source: '/es/research/:uid',
        destination: '/es/:uid',
        permanent: true,
      },
      {
        source: '/recetas/:uid',
        destination: '/',
        permanent: true,
      },
      {
        source: '/consejos/:uid',
        destination: '/',
        permanent: true,
      }
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
      }
    ];
  },
};

export default nextConfig;
