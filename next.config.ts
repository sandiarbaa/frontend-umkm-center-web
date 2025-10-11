import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    experimental: {
    reactCompiler: false, // disable React Compiler
  },
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "8000",
        pathname: "/storage/**", // semua file dari folder storage
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/storage/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "storyset.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "undraw.co",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "illustrations.popsy.co", 
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "um.cen.medialoger.com",
        pathname: "/storage/**",
      },
    ],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

export default nextConfig;
