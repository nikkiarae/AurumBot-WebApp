import dbConnect from "@/lib/mongoose";
import Subscriber from "@/models/Subscriber";
import { TgMessage } from "@/types/general";
import { Context } from "telegraf";

export const notifySubscribers = async (ctx: Context, message: TgMessage) => {
  try {
    await dbConnect();
    const currentDate = new Date();

    // Find all subscribers with active subscriptions and valid end dates
    const subscribers = await Subscriber.find({
      subscriptionEnd: { $gte: currentDate },
    });

    console.log(`Found ${subscribers.length} active subscribers.`);
    
    // Send notifications
    for (const subscriber of subscribers) {
      try {
        // Send photo or message to each subscriber's chatId
        await ctx.telegram.sendPhoto(
          subscriber.chatId,  // Use subscriber's chatId
          message.photo,      // Send the photo
          {
            caption: message.message,       // Caption for the photo
            parse_mode: "Markdown",        // Markdown parsing for message formatting
            reply_markup: message.replyMarkup,  // Optional reply markup (buttons, inline keyboard, etc.)
          }
        );
        console.log(`✅ Notification sent to: ${subscriber.chatId}`);
      } catch (error) {
        console.error(`❌ Failed to send notification to ${subscriber.chatId}`, error);
      }
    }
  } catch (error) {
    console.error("❌ Error fetching subscribers:", error);
  }
};