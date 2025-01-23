import { Context } from "telegraf";
import { decodeMessage } from "./message";
import { ContractType } from "@/types/token";
import { insiderSolToken } from "../solana/solanaCoins";
import { notifySubscribers } from "./notification";
import { TgMessage } from "@/types/general";

// Shared function to send the disclaimer message
export const handleText = async (ctx: Context) => {
    const message = ctx.message;

  // Ensure the message and its text exist
  if (!message || !("text" in message)) {
    ctx.reply("This type of message is not supported. Please send text.");
    return;
  }

  const { text } = message;

  const contractType = decodeMessage(text);
  let response: TgMessage | null = null

  switch(contractType) {
    case ContractType.Sol: 
      response = await insiderSolToken(text)
      break;
    case ContractType.Eth:
      response = null
      break;
    case null:
      response = null
      break;
  }

  if(!response) {
    ctx.reply("Invalid address format. Make sure to use the *Coin Address*, and not the *Pair Address*");
  } else {
    await notifySubscribers(ctx, response)
    response = null
  }
};