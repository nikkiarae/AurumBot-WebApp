import dbConnect from "@/lib/mongoose";
import Subscriber from "@/models/Subscriber";
import { Context } from "telegraf";

// Shared function to send the disclaimer message
export const authMiddleware = async (ctx: Context, role: string[], next: () => Promise<void>) => {
    const chatId = ctx.message?.from?.id;
    if (!chatId) {
      ctx.reply("Could not verify your identity.");
      return;
    }
  
    try {
      // Ensure the database connection is established
      await dbConnect();
  
      // Check if the user exists in the Subscriber database
      const user = await Subscriber.findOne({ chatId });
  
      if (!user) {
        // If no user is found, respond with a message
        ctx.reply("You are not a subscriber. Please subscribe to use this bot.");
        return;
      }
  
      // Check if the user has the required role
      if (role.includes(user.role)) {
        return next(); // Proceed to the next middleware
      } else {
        ctx.reply("You are not authorized to send messages.");
      }
    } catch {
      ctx.reply("An error occurred while verifying your role. Please try again.");
    }
};