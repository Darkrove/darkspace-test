/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["ipfs.io","gateway.ipfs.io","cloudflare-ipfs.com","gateway.pinata.cloud","ipfs.eternum.io","dweb.link"],
  },
};

module.exports = nextConfig;
