import { Context } from "telegraf";

// Shared function to send the disclaimer message
export const sendDisclaimer = (ctx: Context) => {
    const message =
      "📢 *Important Notice:* \n\n" +
      "The information provided by this bot is for *informational purposes* only and should not be considered financial advice.\n\n" +
      " • We are *not responsible* for any investment decisions or financial losses incurred while using this bot.\n\n" +
      " • The tokens and metrics presented are merely *indicators of potential* and do not guarantee success or profitability.\n\n" +
      " • Always conduct your own research and consult with a financial advisor before making any investment decisions.\n\n" +
      "By using this bot, you acknowledge and accept this disclaimer.\n\n";
  
    ctx.reply(message, { parse_mode: "Markdown" });
};