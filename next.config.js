/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['gateway.ipfscdn.io','gateway.ipfs.io','ipfs.io'],
  },
};

module.exports = nextConfig;
