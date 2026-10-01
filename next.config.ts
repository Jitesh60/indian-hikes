import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // The old "Green Trails" page was replaced by HeyHikers' custom treks.
      { source: "/green-trails", destination: "/custom-treks", permanent: true },
    ];
  },
};

export default nextConfig;
