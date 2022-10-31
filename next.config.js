/** @type {import('next').NextConfig} */
const withSvgr = require("next-svgr");
const nextConfig = withSvgr({
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["upload.wikimedia.org", "firebasestorage.googleapis.com"],
  },
  env: {
    PRODUCTION_DATABASE: process.env.PRODUCTION_DATABASE,
  },
});

module.exports = nextConfig;
