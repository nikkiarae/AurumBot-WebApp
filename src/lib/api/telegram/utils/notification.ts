import Subscriber from "@/models/Subscriber";
import { TgMessage } from "@/types/general";
import { Context } from "telegraf";

export const notifySubscribers = async (ctx: Context, sender: string, message: TgMessage) => {
  const escapeMarkdown = (text: string): string =>
    text
      .replace(/_/g, "\\_")
      .replace(/\*/g, "\\*")
      .replace(/\[/g, "\\[")
      .replace(/\]/g, "\\]")
      .replace(/\(/g, "\\(")
      .replace(/\)/g, "\\)")
      .replace(/~/g, "\\~")
      .replace(/`/g, "\\`")
      .replace(/>/g, "\\>")
      .replace(/#/g, "\\#")
      .replace(/\+/g, "\\+")
      .replace(/-/g, "\\-")
      .replace(/=/g, "\\=")
      .replace(/\|/g, "\\|")
      .replace(/\./g, "\\.")
      .replace(/!/g, "\\!");
  try {
    const currentDate = new Date();

    // Find all subscribers with active subscriptions and valid end dates
    const subscribers = await Subscriber.find({
      subscriptionEnd: { $gte: currentDate },
    });

    // Send notifications
    for (const subscriber of subscribers) {
      try {
        await ctx.telegram.sendMessage(
          subscriber.chatId,
          `👑 @${escapeMarkdown(sender)}\n\n${escapeMarkdown(message.message)}`,
          {
            parse_mode: "Markdown",
            reply_markup: message.replyMarkup,
          }
        );
        console.log(`✅ Notification sent to: ${subscriber.chatId}`);
      } catch (error) {
        console.error(`❌ Failed to send notification to ${subscriber.chatId}`, error);
      }
    }
  } catch (error) {
    console.error("❌ Error fetching subscribed subscribers:", error);
  }
};