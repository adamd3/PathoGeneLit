/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/python',
        destination: 'http://127.0.0.1:5328/api/python',
      },
      {
        source: '/api/graphql',
        destination: 'http://localhost:5328/graphql',
      },
    ];
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.alias[
        'next/dist/next-server/lib/router/rewrite-url-for-export'
      ] = 'debug';
    }
    return config;
  },
};

export default nextConfig;
