import { Telegraf, Markup, Context } from "telegraf";
import { TELEGRAM_BOT_TOKEN } from "@/lib/constants/config";
import Subscriber from "@/models/Subscriber";
import dbConnect from "../../mongoose";
import { sendDisclaimer } from "./utils/disclaimer";
import { sendLearn } from "./utils/learn";
import { sendSocialMedia } from "./utils/socialMedia";
import { checkStatus, sendSubscription, subscribe, unsubscribe } from "./utils/subscription";
import { authMiddleware } from "./utils/middleware";
import { sendStart } from "./utils/start";
import { handleText } from "./utils/handleText";

if (!TELEGRAM_BOT_TOKEN) {
  throw new Error(
    "Telegram bot token is not defined in environment variables."
  );
}

// Create a Telegraf bot instance
export const bot = new Telegraf(TELEGRAM_BOT_TOKEN);

bot.start(async (ctx: Context) => {
  const context = ctx as Context & { startPayload?: string };
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
          "👉 Click /subscription to get started and become a *Aurum Bot* member today!",
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
    }
  } catch (error) {
    console.error("Error fetching user subscription status:", error);
    ctx.reply(
      "❌ Something went wrong while checking your subscription status. Please try again later."
    );
  }
});

// START
bot.command("start", (ctx: Context) => sendStart(ctx));

// LEARN
bot.command("learn", (ctx: Context) => sendLearn(ctx));

// DISCLAIMER
bot.command("disclaimer", (ctx: Context) => sendDisclaimer(ctx));
bot.action("disclaimer", (ctx: Context) => sendDisclaimer(ctx));

// SUBSCRIPTION
bot.command("subscription", async (ctx: Context) => sendSubscription(ctx));
bot.action("subscribe", (ctx: Context) => subscribe(ctx));
bot.action("unsubscribe", (ctx: Context) => unsubscribe(ctx));
bot.action("status", (ctx: Context) => checkStatus(ctx));

// SOCIAL MEDIA
bot.action("socialmedia", (ctx: Context) => sendSocialMedia(ctx));

// Middleware to filter messages from the Admin
bot.use((ctx: Context, next) => authMiddleware(ctx, 'admin', next));

bot.on("text", (ctx: Context) => handleText(ctx));
