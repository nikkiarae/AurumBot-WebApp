import { Telegraf } from "telegraf";
import { TELEGRAM_BOT_TOKEN } from "@/lib/constants/config";

if (!TELEGRAM_BOT_TOKEN) {
  throw new Error("Telegram bot token is not defined in environment variables.");
}

// Create a Telegraf bot instance
export const bot = new Telegraf(TELEGRAM_BOT_TOKEN);

// Define your commands
bot.start((ctx) => {
  ctx.reply("Welcome to the bot! Type /help to see available commands.");
});

bot.command("help", (ctx) => {
  ctx.reply("Here are the available commands:\n/start - Start the bot\n/help - Show help");
});

bot.on("text", (ctx) => {
  ctx.reply(`You said: "${ctx.message.text}"`);
});