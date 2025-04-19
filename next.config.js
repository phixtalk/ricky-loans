const isGithubPages = process.env.NODE_ENV === "production";

// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  distDir: "out",
  trailingSlash: true,
  reactStrictMode: true,
};

module.exports = nextConfig;
