import { Telegraf, Markup, Context } from "telegraf";
import { TELEGRAM_BOT_TOKEN } from "@/lib/constants/config";
import Subscriber from "@/models/Subscriber";
import dbConnect from "../mongoose";

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

// Define your commands
bot.command("start", async (ctx: Context) => {
  const chatId = ctx.chat?.id;

  if (!chatId) {
    return ctx.reply("❌ Unable to identify your chat. Please try again.");
  }

  try {
    // Ensure the database connection is established
    await dbConnect();

    // Check if the user is subscribed
    const user = await Subscriber.findOne({ chatId });
    const subscribedCmds = [
      [Markup.button.callback("📋 Subscription Status", "status")],
      [Markup.button.callback("❌ Unsubscribe", "unsubscribe")],
    ];
    const unsubscribedCmds = [
      [Markup.button.callback("🔔 Subscribe", "subscribe")],
    ];
    const generalCmds = [
      [Markup.button.callback("🔔 Social Media", "socialmedia")],
    ];

    const activeCmds = user
      ? subscribedCmds.concat(generalCmds)
      : unsubscribedCmds.concat(generalCmds);

    await ctx.reply(
      "Welcome to Aurum Bot 👋🏽",
      Markup.inlineKeyboard(activeCmds)
    );
    console.log(`Sent command list to user with chatId: ${chatId}`);
  } catch (error) {
    console.error("Error fetching subscription status:", error);
    ctx.reply("❌ Failed to fetch command list. Please try again.");
  }
});

bot.command("learn", (ctx: Context) => {
  const message =
    "📜 *Here's what our terms mean:* \n\n" +
    "🌟 *Golden*:\n" +
    'A "Golden" token is one that meets specific criteria for both performance and potential. It\'s marked as a premium pick with high success indicators.\n\n' +
    "💎 *Emerging*:\n" +
    'An "Emerging" token is new but already showing strong success indicators. It represents an early opportunity to capitalize on growing momentum.\n\n' +
    "🚀 *New*:\n" +
    '"New" tokens are recently created tokens, usually less than 6 hours old. They’re evaluated based on short-term performance metrics like buy-to-sell ratios, volume, and price changes.\n\n' +
    "🔥 *Boosted*:\n" +
    '"Boosted" tokens are gaining rapid attention and trading volume within a short timeframe. These tokens are experiencing significant activity and could indicate growing interest.\n\n' +
    "👀 *Insider*:\n" +
    '"Insider" tokens are based on curated selections or insights provided by trusted sources or analysis. These are handpicked for their potential value. \n\n' +
    "Use this knowledge to evaluate your investments wisely!";

  ctx.reply(message, { parse_mode: "Markdown" });
});

bot.command("disclaimer", (ctx: Context) => {
  const message =
    "📢 *Important Notice:* \n\n" +
    "The information provided by this bot is for *informational purposes* only and should not be considered financial advice\n\n" +
    " •	We are *not responsible* for any investment decisions or financial losses incurred while using this bot.\n\n" +
    "	•	The tokens and metrics presented are merely *indicators of potential* and do not guarantee success or profitability.\n\n" +
    "	•	Always conduct your own research and consult with a financial advisor before making any investment decisions.\n\n" +
    "By using this bot, you acknowledge and accept this disclaimer\n\n";

  ctx.reply(message, { parse_mode: "Markdown" });
});

bot.command("subscription", async (ctx: Context) => {
  const chatId = ctx.chat?.id;

  if (!chatId) {
    return ctx.reply("❌ Unable to identify your chat. Please try again.");
  }

  try {
    // Ensure the database connection is established
    await dbConnect();

    // Fetch subscriber subscription status
    const subscriber = await Subscriber.findOne({ chatId });

    if (!subscriber) {
      // Subscriber is not subscribed - show Subscribe button
      return ctx.reply(
        "🚀 You are not subscribed to Aurum Bot. Click below to subscribe!",
        Markup.inlineKeyboard([
          Markup.button.callback("🔔 Subscribe", "subscribe"),
        ])
      );
    }

    // Subscriber is subscribed - show Status and Unsubscribe buttons
    const activeSubscriptionOptions = [
      [Markup.button.callback("📋 Status", "status")],
      [Markup.button.callback("❌ Unsubscribe", "unsubscribe")],
    ];
    const inactiveSubscriptionOptions = [
      [Markup.button.callback("📋 Status", "status")],
      [Markup.button.callback("🔔 Subscribe", "subscribe")],
    ];
    const generalOptions = [
      [Markup.button.callback("📋 Social Media", "socialmedia")],
    ];

    return ctx.reply(
      "🎉 Your Subscription",
      Markup.inlineKeyboard(
        subscriber.isActive
          ? activeSubscriptionOptions.concat(generalOptions)
          : inactiveSubscriptionOptions.concat(generalOptions)
      )
    );
  } catch (error) {
    console.error("Error fetching subscription status:", error);
    ctx.reply("❌ Failed to fetch subscription status. Please try again.");
  }
});

bot.action("socialmedia", (ctx: Context) => {
  // Social media options
  const socialmediaOptions = [
    [Markup.button.url("X (Twitter)", "https://x.com/AurumBot")], // Replace with your X link
    [Markup.button.url("Threads", "https://www.threads.net/@Aurum_Bot_")], // Replace with your Threads link
  ];

  return ctx.reply(
    "🌐 Follow us on Social Media!",
    Markup.inlineKeyboard(socialmediaOptions)
  );
});

// Middleware to filter messages from the Admin
bot.use(async (ctx, next) => {
  const chatId = ctx.message?.from?.id;
  const role = "admin";
  if (!chatId) {
    ctx.reply("Could not verify your identity.");
    return;
  }

  try {
    // Ensure the database connection is established
    await dbConnect();

    // Check if the user exists in the Subscriber database
    const user = await Subscriber.findOne({ chatId });

    if (!user) {
      // If no user is found, respond with a message
      ctx.reply("You are not a subscriber. Please subscribe to use this bot.");
      return;
    }

    // Check if the user has the required role
    if (user.role === role) {
      return next(); // Proceed to the next middleware
    } else {
      ctx.reply("You are not authorized to send messages.");
    }
  } catch {
    ctx.reply("An error occurred while verifying your role. Please try again.");
  }
});

bot.on("text", (ctx) => {
  ctx.reply(`You said: "${ctx.message.text}"`);
});
