import Stripe from "stripe";

const IS_PRODUCTION = process.env.NODE_ENV! == 'production'
const TELEGRAM_URL = process.env.TELEGRAM_URL!
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!
const POLLING_INTERVAL = 5000; // 5 seconds
const MONGO_URI = process.env.MONGO_URI!
const STRIPE_PUBLIC_KEY = process.env.STRIPE_PUBLIC_KEY!
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY!
const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET!
const NEXT_PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!
const STRIPE_PRICE_ID = process.env.STRIPE_PRICE_ID!

const stripe: Stripe = new Stripe(STRIPE_SECRET_KEY!);

export {
    NEXT_PUBLIC_BASE_URL,
    TELEGRAM_BOT_TOKEN,
    POLLING_INTERVAL,
    TELEGRAM_URL,
    STRIPE_PUBLIC_KEY,
    STRIPE_SECRET_KEY,
    STRIPE_WEBHOOK_SECRET,
    stripe,
    MONGO_URI,
    IS_PRODUCTION,
    STRIPE_PRICE_ID
}