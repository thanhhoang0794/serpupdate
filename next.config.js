/** @type {import('next').NextConfig} */
const { version } = require('./package.json');

const nextConfig = {
  reactStrictMode: true,
  swcMinify: false,
  output: 'standalone',
  publicRuntimeConfig: {
   version,
 },
 rewrites: () => [
   {
     source: "/serp-admin/:path*",
     destination: "/api/serp-admin/:path*",
   },
 ],
};

module.exports = nextConfig;
