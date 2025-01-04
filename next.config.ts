import type { NextConfig } from "next";

const isGithubPages = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
  assetPrefix: isGithubPages ? '/frontend/' : '',
  basePath: isGithubPages ? '/frontend' : '',
  reactStrictMode: true,
};

export default nextConfig;
