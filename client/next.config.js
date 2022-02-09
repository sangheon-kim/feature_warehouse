/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    removeConsole: true,
  },
};

module.exports = nextConfig;
