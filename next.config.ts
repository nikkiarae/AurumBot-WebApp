import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  output: 'export',
  distDir: 'docs'
};

export default nextConfig;
