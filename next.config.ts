import {
  MONGO_URI,
  TELEGRAM_BOT_TOKEN,
  TELEGRAM_URL,
  NEXT_PUBLIC_BASE_URL,
  STRIPE_PRICE_ID,
  STRIPE_PUBLIC_KEY,
  STRIPE_SECRET_KEY,
  STRIPE_WEBHOOK_SECRET,
} from "@/lib/constants/config";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    MONGO_URI: MONGO_URI,
    TELEGRAM_URL: TELEGRAM_URL,
    TELEGRAM_BOT_TOKEN: TELEGRAM_BOT_TOKEN,
    NEXT_PUBLIC_BASE_URL: NEXT_PUBLIC_BASE_URL,
    STRIPE_PRICE_ID: STRIPE_PRICE_ID,
    STRIPE_PUBLIC_KEY: STRIPE_PUBLIC_KEY,
    STRIPE_SECRET_KEY: STRIPE_SECRET_KEY,
    STRIPE_WEBHOOK_SECRET: STRIPE_WEBHOOK_SECRET,
  },
  images: {
    domains: [
      'upload.wikimedia.org', // Allow images from Wikimedia
      'svgrepo.com',           // Allow images from SVG Repo
    ],
  },
};

export default nextConfig;
