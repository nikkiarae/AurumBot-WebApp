import { CustomContext } from "@/types/general";
import Stripe from "stripe";
import { Telegraf } from "telegraf";

const IS_PRODUCTION = process.env.NODE_ENV! == 'production'
const TELEGRAM_URL = process.env.TELEGRAM_URL!
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!
const POLLING_INTERVAL = 5000; // 5 seconds
const BACKEND_URL = process.env.BACKEND_URL!
const MONGO_URI = process.env.MONGO_URI!
const STRIPE_PUBLIC_KEY = process.env.STRIPE_PUBLIC_KEY!
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY!
const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET!

const stripe: Stripe = new Stripe(STRIPE_SECRET_KEY!);
const bot = new Telegraf<CustomContext>(TELEGRAM_BOT_TOKEN!);


export {
    TELEGRAM_BOT_TOKEN,
    POLLING_INTERVAL,
    TELEGRAM_URL,
    BACKEND_URL,
    STRIPE_PUBLIC_KEY,
    STRIPE_SECRET_KEY,
    STRIPE_WEBHOOK_SECRET,
    stripe,
    bot,
    MONGO_URI,
    IS_PRODUCTION,
}