import { TELEGRAM_BOT_TOKEN } from "@/lib/constants/config";
import { CustomContext } from "@/types/general";
import { NextRequest, NextResponse } from "next/server";
import { Telegraf, Markup, session } from "telegraf";
import Subscriber from "@/models/Subscriber";
import dbConnect from "@/lib/mongoose";
import { sendDisclaimer } from "@/lib/api/telegram/utils/disclaimer";
import { sendLearn } from "@/lib/api/telegram/utils/learn";
import { sendSocialMedia } from "@/lib/api/telegram/utils/socialMedia";
import { checkStatus, sendSubscription, subscribe, unsubscribe } from "@/lib/api/telegram/utils/subscription";
import { sendStart } from "@/lib/api/telegram/utils/start";
import { handleText } from "@/lib/api/telegram/utils/handleText";

if (!TELEGRAM_BOT_TOKEN) {
  throw new Error(
    "Telegram bot token is not defined in environment variables."
  );
}

// Create a Telegraf bot instance
const bot = new Telegraf<CustomContext>(TELEGRAM_BOT_TOKEN);

export async function GET() {
  return NextResponse.json({
    status: "Webhook is working!",
    message: "This is the Telegram webhook endpoint.",
  });
}


export async function POST(req: NextRequest) {
  try {
    // Parse the incoming request body
    const body = await req.json();

    // Use Telegraf to handle the update
    await bot.handleUpdate(body);

    // Respond with a 200 status to acknowledge receipt
    return NextResponse.json({
      status: "success",
      message: "Webhook received successfully",
    });
  } catch (error) {
    console.error("Error processing webhook:", error);
    return NextResponse.json(
      { status: "error", message: "Failed to process webhook" },
      { status: 500 }
    );
  }
}

// Use session middleware
bot.use(session({
  defaultSession: () => ({
    state: null,
    chatId: null,
  }),
}));

bot.start(async (ctx: CustomContext) => {
  const context = ctx;
  const payload = context.startPayload;

  if (payload === "success") {
    // Payment success logic
    ctx.reply(
      "🎉 *Payment Successful!* 🎉\n\nYour subscription is now active. Thank you for joining *Aurum Bot*!",
      { parse_mode: "Markdown" }
    );
    return;
  }

  if (payload === "cancel") {
    // Payment canceled logic
    ctx.reply(
      "❌ *Payment Canceled* ❌\n\nIt seems you didn't complete the subscription. You can restart the process with /subscription.",
      { parse_mode: "Markdown" }
    );
    return;
  }

  const chatId = ctx.chat?.id;

  try {
    // Ensure the database connection is established
    await dbConnect();

    // Check if the user exists in the database and their subscription status
    const user = await Subscriber.findOne({ chatId });
    const currentDate = new Date();

    if (user && user.subscriptionEnd && user.subscriptionEnd >= currentDate) {
      // User is an active member
      return ctx.reply(
        "🚀 *Welcome Back to Aurum Bot!* 🚀\n\n" +
          "🌟 You are an *active premium member*.\n" +
          "*Your subscription is valid until:* " +
          `_${user.subscriptionEnd.toDateString()}_\n\n` +
          "*Continue enjoying:*\n" +
          "✅ Real-time token alerts\n" +
          "✅ Trending opportunities in crypto\n" +
          "✅ Premium insights to maximize your profits!\n\n" +
          "Thank you for being a valued member of *Aurum Bot*! 💎\n\n",
        {
          parse_mode: "Markdown",
          reply_markup: {
            inline_keyboard: [
              [
                Markup.button.callback("Social Media", "socialmedia"),
                Markup.button.callback("Disclaimer", "disclaimer"),
              ],
            ],
          },
        }
      );
    } else {
      // User is not subscribed or their subscription has expired
      return ctx.reply(
        "🚀 *Welcome to Aurum Bot!* 🚀\n\n" +
          "✅ The hottest new tokens 💰\n" +
          "✅ Trending opportunities in crypto 🚀\n" +
          "✅ Premium alerts that help you maximize profits 📊\n\n" +
          "🎯 *Don't Miss Out!* Subscribe now to unlock premium features and gain the edge you need in crypto trading! 🔔\n\n" +
          "👉 Click *Subscribe Now* to get started and become a *Aurum Bot* member today!",
        {
          parse_mode: "Markdown",
          reply_markup: {
            inline_keyboard: [
              [
                Markup.button.callback("Subscribe Now", "subscribe"),
              ],
              [
                Markup.button.callback("Social Media", "socialmedia"),
                Markup.button.callback("Disclaimer", "disclaimer"),
              ],
            ],
          },
        }
      );
    }
  } catch (error) {
    console.error("Error fetching user subscription status:", error);
    ctx.reply(
      "❌ Something went wrong while checking your subscription status. Please try again later."
    );
  }
});

// START
bot.command("start", (ctx: CustomContext) => sendStart(ctx));

// LEARN
bot.command("learn", (ctx: CustomContext) => sendLearn(ctx));

// DISCLAIMER
bot.command("disclaimer", (ctx: CustomContext) => sendDisclaimer(ctx));
bot.action("disclaimer", (ctx: CustomContext) => sendDisclaimer(ctx));

// SUBSCRIPTION
bot.command("subscription", async (ctx: CustomContext) => sendSubscription(ctx));
bot.action("subscribe", (ctx: CustomContext) => subscribe(ctx));
bot.action("unsubscribe", (ctx: CustomContext) => unsubscribe(ctx));
bot.action("status", (ctx: CustomContext) => checkStatus(ctx));

// SOCIAL MEDIA
bot.action("socialmedia", (ctx: CustomContext) => sendSocialMedia(ctx));

// Middleware to filter messages from the Admin
// bot.use((ctx: CustomContext, next) => authMiddleware(ctx, ['admin', 'influencer'], next));

bot.on("text", (ctx: CustomContext) => handleText(ctx));
