import { Context } from "telegraf";
import { decodeMessage } from "./message";
import { ContractType } from "@/types/token";
import { insiderSolToken } from "../solana/solanaCoins";

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
  let response = false

  switch(contractType) {
    case ContractType.Sol: 
      response = await insiderSolToken(text)
      break;
    case ContractType.Eth:
      response = true
      break;
    case null:
      response = false
      break;
  }

  if(!response) {
    ctx.reply("Invalid address format. Make sure to use the *Coin Address*, and not the *Pair Address*");
  } else {
    ctx.reply("Token sent successfully");
  }
};