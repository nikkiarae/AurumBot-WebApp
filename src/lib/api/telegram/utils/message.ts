import { Markup } from "telegraf";
import { CompleteToken, ContractType, Social, Website } from "@/types/token";
import { NEXT_PUBLIC_BASE_URL } from "@/lib/constants/config";

// Notify users about an existing token
export const formatMessage = (token: CompleteToken, sender: string) => {

    const message = 
      `👑 *${sender}*\n\n` +
      `*${token.baseToken.symbol} / ${token.baseToken.name}*\n\n` + 
      `*${token.baseToken.address}*\n\n`+
      `💵 *Market Cap*: $${Math.floor(token.marketCap).toLocaleString()}\n` +
      `📈 *Volume (1h)*: $${Math.floor(token.volume.h1).toLocaleString()}\n` +
      `💰 *Liquidity*: $${Math.floor(token.liquidity.usd).toLocaleString()}\n` +
      `⏳ *Age*: ${token.age.days} days, ${token.age.hours} hours, ${token.age.minutes} mins\n` +
      `🧠 *Success Rating:* ${token.successRating}% \n` + ` \n`;

    const websiteButton = token.info.websites.map((w: Website) => 
        Markup.button.url(`${w.label.charAt(0).toUpperCase() + w.label.slice(1)}`, `${w.url}`)
    );

    const socialsButtons = token.info.socials.map((s: Social) =>
        Markup.button.url(`${s.type.charAt(0).toUpperCase() + s.type.slice(1)}`, `${s.url}`)
    );

    const infoButtons = websiteButton.concat(socialsButtons)

    const inlineKeyboard = [];

    // Conditionally add the Socials section if infoButtons has more than 1 button
    if (infoButtons.length > 1) {
      inlineKeyboard.push(
        [{ text: "🌐 Socials", callback_data: "socials_section" }], // Socials header
        infoButtons,
      );
    }

    // Add the Trade section
    inlineKeyboard.push(
      [{ text: "💱 Instantly Trade", callback_data: "trade_section" }], // Trade header
      [       
        Markup.button.url("Shuriken", `https://t.me/ShurikenTradeBot?start=qt-aurum_bot-${token.baseToken.address}`),
        Markup.button.url("BonkBot", `https://t.me/bonkbot_bot?start=ref_co2us_ca_${token.baseToken.address}`),
      ],
    );

    // Add the Charts section
    inlineKeyboard.push(
      [{ text: "📊 View Charts", callback_data: "charts_section" }], // Charts header
      [
        Markup.button.url("DexScreener", `${token.url}`),
        Markup.button.url("DexTools", `https://www.dextools.io/app/en/solana/pair-explorer/${token.baseToken.address}`),
        Markup.button.url("Gecko", `https://www.geckoterminal.com/solana/pools/${token.baseToken.address}`),
      ]
    );

    // Conditionally add the Socials section if infoButtons has more than 1 button
    if (infoButtons.length > 1) {
      inlineKeyboard.push(
        [{ text: "🌐 Socials", callback_data: "socials_section" }], // Socials header
        infoButtons,
      );
    }

    const replyMarkup = {
      parse_mode: "Markdown",
      inline_keyboard: inlineKeyboard,
    };

    const header = token.info.header || `${NEXT_PUBLIC_BASE_URL}/assets/new_coin.png`
    
    return { 
        message, 
        replyMarkup, 
        photo: header
    }
} 

// Notify users about an existing token
export const errorMessage = () => {
  const message = `Error: Could not find token. Make sure to use *Contract Address*, not the *Pair Address*`;

  return message
} 

export const decodeMessage = (message: string) => {
    try {
      // Regular expressions for blockchain addresses
      const ethRegex = /^0x[a-fA-F0-9]{40}$/; // Ethereum or Base address format
      const solRegex = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/; // Solana address format
  
      // Check if the message matches any of the formats
      if (ethRegex.test(message)) {
        return ContractType.Eth;
      } else if (solRegex.test(message)) {
        return ContractType.Sol;
      } else {
        return null
      }
  
    } catch (error) {
      console.error("Error decoding message:", error);
      return null
    }
};