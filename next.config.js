const isProd = process.env.NODE_ENV === "production";

// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  distDir: "out",
  trailingSlash: true,
  images: { unoptimized: true },
  reactStrictMode: true,
  basePath: isProd ? "/ricky-loans" : "",
  assetPrefix: isProd ? "/ricky-loans/" : "",
};

module.exports = nextConfig;
