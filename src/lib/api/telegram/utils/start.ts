import dbConnect from "@/lib/mongoose";
import Subscriber from "@/models/Subscriber";
import { Context, Markup } from "telegraf";

// Shared function to send the disclaimer message
export const sendStart = async (ctx: Context) => {
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
};
