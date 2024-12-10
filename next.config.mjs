/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.licdn.com",
      },
      {
        protocol: "https",
        hostname: "scontent.fnag4-2.fna.fbcdn.net",
      },
      {
        protocol: "https",
        hostname: "*", // This will allow any other domains as well, if required
      },
    ],
  },
};

export default nextConfig;
