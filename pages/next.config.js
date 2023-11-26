/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "smpn5singaraja.sch.id",
        port: "",
        pathname: "/images/berita/**",
      },
    ],
  },
};

module.exports = nextConfig;
