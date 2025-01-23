import dbConnect from "@/lib/mongoose";
import Subscriber from "@/models/Subscriber";
import { Context, Markup } from "telegraf";

// Shared function to send the disclaimer message
export const sendSubscription = async (ctx: Context) => {
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
};
