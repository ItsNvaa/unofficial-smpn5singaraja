/** @type {import('next').NextConfig} */
require("dotenv").config();
const webpack = require("webpack");
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
  webpack: (config) => {
    config.plugins.push(new webpack.EnvironmentPlugin(process.env));
    return config;
  },
};

module.exports = nextConfig;
