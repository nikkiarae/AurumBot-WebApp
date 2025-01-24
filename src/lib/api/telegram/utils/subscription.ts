import dbConnect from "@/lib/mongoose";
import Subscriber from "@/models/Subscriber";
import { Markup } from "telegraf";
import { cancelSubscription } from "../../stripe";
import { CustomContext } from "@/types/general";

// Shared function to send the disclaimer message
export const sendSubscription = async (ctx: CustomContext) => {
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

// Controller: Subscribe Subscriber
export const subscribe = async (ctx: CustomContext) => {
  const chatId = ctx.chat?.id;

  try {
    await ctx.answerCbQuery();

    ctx.reply(
      "💳 Do you have a coupon code?\n\n" +
        "If yes, please type your coupon code now.\n" +
        "If no, simply type 'SKIP'.",
      { parse_mode: "Markdown" }
    );

    // Store the user's session state
    ctx.session.state = "waiting_for_coupon";
    ctx.session.chatId = chatId;

  } catch (error) {
    console.error("Error Getting Coupon Code: ", error);
  }
};

// Controller: Unsubscribe Subscriber
export const unsubscribe = async (ctx: CustomContext) => {
  const chatId = ctx.chat?.id;

  if (!chatId) {
    ctx.reply("❌ Unable to process your request. Please try again.");
    return;
  }

  try {
    // Ensure the database connection is established
    await dbConnect();

    const subscriber = await Subscriber.findOne({ chatId });

    if (!subscriber || !subscriber.isActive) {
      ctx.reply("❌ You do not have an active subscription to unsubscribe.");
      return;
    }

    // Cancel Stripe subscription if applicable
    if (subscriber.stripeSubscriptionId) {
      await cancelSubscription(subscriber.stripeSubscriptionId);
    }

    // Mark the subscription as inactive
    subscriber.isActive = false;
    subscriber.autoRenew = false;
    await subscriber.save();

    ctx.reply(
      "❌ You have successfully unsubscribed.\n" +
        "You will continue to have access until your subscription expires on " +
        `${subscriber.subscriptionEnd?.toDateString()}.`
    );
  } catch (error) {
    console.error("Error unsubscribing subscriber:", error);
    ctx.reply("❌ Failed to process your unsubscribe request. Please try again later.");
  }
};

// Controller: Subscription Status
export const checkStatus = async (ctx: CustomContext) => {
    const chatId = ctx.chat?.id;
  
    try {
      // Ensure the database connection is established
      await dbConnect();

      await ctx.answerCbQuery();

      const subscriber = await Subscriber.findOne({ chatId });
  
      if (subscriber && subscriber.subscriptionEnd) {
        const subscriptionStatus = subscriber.isActive
          ? "✅ Active"
          : "❌ Inactive";
  
        ctx.reply(
          `*Subscription Status*\n` +
          `Status: ${subscriptionStatus}\n` +
          `Expires: ${subscriber.subscriptionEnd.toDateString()}`,
          { parse_mode: "Markdown" }
        );
      } else {
        ctx.reply("⚠️ You do not have an active subscription. Use /subscribe to start.");
      }
    } catch (error) {
      console.error("❌ Error fetching subscription status:", error);
      ctx.reply("❌ Failed to retrieve your subscription status.");
    }
};