import { Context } from "telegraf";

// Shared function to send the disclaimer message
export const sendLearn = (ctx: Context) => {
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
};