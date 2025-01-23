import { Context, Markup } from "telegraf";

// Shared function to send the disclaimer message
export const sendSocialMedia = (ctx: Context) => {
  // Social media options
  const socialmediaOptions = [
    [Markup.button.url("X (Twitter)", "https://x.com/AurumBot")], // Replace with your X link
    [Markup.button.url("Threads", "https://www.threads.net/@Aurum_Bot_")], // Replace with your Threads link
  ];

  return ctx.reply(
    "🌐 Follow us on Social Media!",
    Markup.inlineKeyboard(socialmediaOptions)
  );
};
