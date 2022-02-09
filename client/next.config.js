const { i18n } = require("./next-i18next.config");

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    removeConsole: true,
  },
  i18n,
};

module.exports = nextConfig;
