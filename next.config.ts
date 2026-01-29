import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: "/authors",
        destination: "/author",
        permanent: true, // 301 redirect
      },
    ];
  },
};

export default nextConfig;
