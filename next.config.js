/** @type {import('next').NextConfig} */
const withSvgr = require("next-svgr");
const nextConfig = withSvgr({
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["upload.wikimedia.org", "firebasestorage.googleapis.com"],
  },
});

module.exports = nextConfig;
