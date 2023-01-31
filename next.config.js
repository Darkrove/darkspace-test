/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    forceSwcTransforms: true,
  },
  images: {
    domains: ["kitwind.io","cdn.discordapp.com","avatars.githubusercontent.com","lh3.googleusercontent.com","ipfs.io","gateway.ipfs.io","cloudflare-ipfs.com","gateway.pinata.cloud","ipfs.eternum.io","dweb.link"],
  },
};

module.exports = nextConfig;
