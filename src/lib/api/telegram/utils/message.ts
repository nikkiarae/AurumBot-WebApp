import path from "path";
import { Markup } from "telegraf";
import { CompleteToken, ContractType, Social, TokenType, Website } from "@/types/token";

export const getHeader = (type: TokenType) => {
  let header, photo
  switch (type) {
    case TokenType.New:
      header = `🚀 *New Token Found!*\n\n`;
      photo = '../../assets/new.png';
      break;
  
    case TokenType.Boosted:
      header = `🚀 *Token Just Boosted!*\n\n`;
      photo = '../../assets/boosted.png';
      break;
  
    case TokenType.Golden:
      header = `🌟 *Golden Token Found!*\n\n`;
      photo = '../../assets/golden.png';
      break;
  
    case TokenType.Emerging: 
      header = `🏆 *Emerging Token Discovered!*\n\n`;
      photo = '../../assets/emerging.png';
      break;

    case TokenType.Insider:
      header = `👑 *Insider Token Sent!*\n\n`;
      photo = '../../assets/insider.png';
      break;
  
    case TokenType.Unknown:
    default:
      header = ``;
      photo = '';
      break;
  }

  return { header, photo }
}

// Notify users about an existing token
export const formatMessage = (token: CompleteToken, type: TokenType) => {
    
    const header = getHeader(type)
    
    const message = header.header +
      `💡 *Pair*: ${token.baseToken.symbol} / ${token.baseToken.name}\n` +
      `🧠 *Success Rating:* ${token.successRating}% \n` +
      `💵 *Market Cap*: $${Math.floor(token.marketCap).toLocaleString()}\n` +
      `📈 *Volume (1h)*: $${Math.floor(token.volume.h1).toLocaleString()}\n` +
      `💰 *Liquidity*: $${Math.floor(token.liquidity.usd).toLocaleString()}\n` +
      `⏳ *Age*: ${token.age.days} days, ${token.age.hours} hours, ${token.age.minutes} mins\n` +
      `📋 *CA*: ${token.baseToken.address}\n`;

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
    
    const replyMarkup = {
      parse_mode: "Markdown",
      inline_keyboard: inlineKeyboard,
    };

    return { 
        message, 
        replyMarkup, 
        photo: path.resolve(__dirname, header.photo) 
    }
} 

// Notify users about an existing token
export const errorMessage = () => {
  const message = `Error: Could not find token. Make sure to use *Contract Address*, not the *Pair Address*`;

  return message
} 

export const decodeMessage = (message: string) => {
    try {
      // Validate input is a string
      if (typeof message !== "string") {
        return "Message not accepted: Invalid input type.";
      }
  
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
      return "Message not accepted: An error occurred.";
    }
};