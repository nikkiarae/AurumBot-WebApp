import { MONGO_URI } from "@/lib/constants/config";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    MONGO_URI: MONGO_URI
  },
};

export default nextConfig;
