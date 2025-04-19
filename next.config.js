/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  reactStrictMode: true,

  images: { unoptimized: true },

  // Add basePath
  // basePath: "/github-pages",
};

module.exports = nextConfig;
