import { decodeMessage } from "./message";
import { ContractType } from "@/types/token";
import { insiderSolToken } from "../solana/solanaCoins";
import { notifySubscribers } from "./notification";
import { CustomContext, PaymentLinkResponse, TgMessage } from "@/types/general";
import dbConnect from "@/lib/mongoose";
import Subscriber from "@/models/Subscriber";
import { generatePaymentLink } from "../../stripe";

export const handleText = async (ctx: CustomContext) => {
  const message = ctx.message;
  const chatId = ctx.chat?.id;

  // Ensure the message and its text exist
  if (!message || !("text" in message) || !("from" in message) || !chatId) {
    ctx.reply("❌ This type of message is not supported. Please send text.");
    return;
  }

  const { text, from } = message;

  // Connect to the database and fetch the user
  await dbConnect();
  const user = await Subscriber.findOne({ chatId });

  if (!user) {
  
    // Check if session is in the expected state
    if (ctx.session.state === "waiting_for_coupon" && ctx.session.chatId === chatId) {
      const couponCode = text.trim();
      let result: PaymentLinkResponse;
  
      // Handle SKIP option
      if (couponCode.toUpperCase() === "SKIP") {
        ctx.reply("🔗 Generating your payment link...");
        result = await generatePaymentLink(chatId, null);
      } else {
        ctx.reply(
          `🔗 Generating your payment link with coupon code: *${couponCode}*...`,
          { parse_mode: "Markdown" }
        );
        result = await generatePaymentLink(chatId, couponCode);
      }
  
      // Handle response from payment link generation
      if (result.success) {
        ctx.reply(
          `✅ Your payment link is ready: [Pay Now](${result.data})`,
          { parse_mode: "Markdown" }
        );
        // Clear session data after successful generation
        ctx.session.state = null;
        ctx.session.chatId = null;
      } else {
        ctx.reply(
          `❌ ${result.error || "Invalid coupon code."} Please try again or type *SKIP* to continue without a coupon.`,
          { parse_mode: "Markdown" }
        );
      }
    } else {
      // Inform user if they are not a subscriber
      ctx.reply("❌ You are not a subscriber. Please subscribe to use this bot.");
    }
  
    return;
  }

  // Handle token submission for admins and influencers

  if (user && ["admin", "influencer"].includes(user.role)) {
    let response: TgMessage | null = null;
    const contractType = decodeMessage(text);
    switch (contractType) {
      case ContractType.Sol:
        response = await insiderSolToken(text, from.username!);
        break;
      case ContractType.Eth:
        response = null;
        break;
      case null:
        response = null;
        break;
    }

    if (!response) {
      ctx.reply(
        "❌ Invalid address format. Make sure to use the *Coin Address*, and not the *Pair Address*."
      );
    } else {
      await notifySubscribers(ctx, response);
      ctx.reply("✅ Token successfully shared with subscribers.");
    }
  } else {
    ctx.reply("❌ You are not authorized to send token addresses.");
    return 
  } 
  
  // Handle unexpected inputs
  ctx.reply(
    "❌ Input not accepted. Please follow the subscription process or use a valid command."
  );

  return;
};
