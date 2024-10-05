/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "telegra.ph",
      },
      {
        protocol: "https",
        hostname: "sayed.page",
      },
    ],
  },
};

export default nextConfig;
