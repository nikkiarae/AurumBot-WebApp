import { Context } from "telegraf";

// Shared function to send the learn message
export const sendLearn = (ctx: Context) => {
  const message =
    "🤖 *Welcome to the Crypto Insights Bot!* \n\n" +
    "Here's how to make the most of it and start leveraging top traders' insights to your advantage:\n\n" +
    "🌟 *Top Traders' Picks*:\n" +
    "Gain access to tokens shared by successful crypto traders. These tokens are carefully selected for their potential to generate profits.\n\n" +
    "📊 *Graph Tools*:\n" +
    "Tap on the **Graph Tools** buttons to visualise the token's performance. You'll see historical price trends, volume changes, and other key metrics to make informed decisions.\n\n" +
    "💱 *Instant Trade*:\n" +
    "Save time and act fast! Use the **Instant Trade** buttons to directly buy or trade tokens on trusted platforms with just a tap.\n\n" +
    "💬 *Stay Updated*:\n" +
    "Enable notifications to get real-time updates whenever a new token is shared. Don't miss out on the next big opportunity!\n\n" +
    "⚡ *Powered by Experts*:\n" +
    "This bot provides insights from experienced traders with a proven track record, giving you a unique edge in the market.\n\n" +
    "Take control of your crypto journey and start exploring the opportunities shared by top traders! 🚀💰";

  ctx.reply(message, { parse_mode: "Markdown" });
};