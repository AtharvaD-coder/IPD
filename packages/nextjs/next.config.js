// @ts-check

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: process.env.NEXT_PUBLIC_IGNORE_BUILD_ERROR === "true",
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['media.istockphoto.com','bayut-production.s3.eu-central-1.amazonaws.com'],
  },
};

module.exports = nextConfig;
