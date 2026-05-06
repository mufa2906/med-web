import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Reduce memory usage during production build
  productionBrowserSourceMaps: false,
  experimental: {
    serverSourceMaps: false,
    webpackMemoryOptimizations: true,
  },
};

export default nextConfig;
