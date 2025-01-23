import { MONGO_URI, TELEGRAM_BOT_TOKEN, TELEGRAM_URL, NEXT_PUBLIC_BASE_URL } from "@/lib/constants/config";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    MONGO_URI: MONGO_URI,
    TELEGRAM_URL: TELEGRAM_URL,
    TELEGRAM_BOT_TOKEN: TELEGRAM_BOT_TOKEN,
    NEXT_PUBLIC_BASE_URL: NEXT_PUBLIC_BASE_URL
  },
};

export default nextConfig;
