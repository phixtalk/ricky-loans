// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  distDir: "out",
  trailingSlash: true,
  reactStrictMode: true,
  basePath: "/ricky-loans",
  assetPrefix: "/ricky-loans/",
};

module.exports = nextConfig;
