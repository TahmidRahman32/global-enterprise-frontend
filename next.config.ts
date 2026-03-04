import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   /* config options here */
   experimental: {
      serverActions: {
         bodySizeLimit: "5mb", // Match your 5MB file limit
      },
   },
   images: {
      remotePatterns: [
         {
            protocol: "https",
            hostname: "images.unsplash.com",
            port: "",
            pathname: "/**",
         },
         {
            protocol: "https",
            hostname: "i.pravatar.cc",
            port: "",
            pathname: "/**",
         },
         {
            protocol: "https",
            hostname: "https://images.unsplash.com",
            port: "",
            pathname: "/**",
         },
         {
            protocol: "https",
            hostname: "i.pravatar.cc/300",
            port: "",
            pathname: "/**",
         },
      ],
   },
   reactCompiler: true,
};

export default nextConfig;
