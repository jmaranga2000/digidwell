import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    allowedDevOrigins: [],

    turbopackFileSystemCacheForDev: true,
  },
  reactCompiler: true,
};

export default nextConfig;
