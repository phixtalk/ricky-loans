const isGithubPages = process.env.NODE_ENV === "production";

// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  distDir: "out",
  trailingSlash: true,
  reactStrictMode: true,
  basePath: isGithubPages ? "/ricky-loans" : "",
  assetPrefix: isGithubPages ? "/ricky-loans/" : "",
};

module.exports = nextConfig;
