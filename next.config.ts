import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    // The Research page became Publications; keep old links working.
    return [{ source: "/research", destination: "/publications", permanent: true }];
  },
};

export default nextConfig;
