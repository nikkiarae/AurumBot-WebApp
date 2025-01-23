import bot from "@/lib/config/bot";
import Subscriber from "@/models/Subscriber";

export const sendNotification = async (chatId: number, message: any ) => {
    try {
      await bot.telegram.sendPhoto(
        chatId, 
        { source: message.photo }, 
        {
          caption: message.message,
          parse_mode: "Markdown",
          reply_markup: message.replyMarkup,
        }
      );
      console.log(`✅ Notification sent to chat ID: ${chatId}`);
    } catch (error) {
      console.error(`❌ Failed to send notification to chat ID: ${chatId}`, error);
    }
};

export const notifySubscribers= async (message: any) => {
  try {
    const currentDate = new Date();

    // Find all subscribers with active subscriptions and valid end dates
    const subscribers = await Subscriber.find({
      subscriptionEnd: { $gte: currentDate },
    });

    // Send notifications
    for (const subscriber of subscribers) {
      try {
        await sendNotification(Number(subscriber.chatId), message );
        console.log(`✅ Notification sent to: ${subscriber.chatId}`);
      } catch (error) {
        console.error(`❌ Failed to send notification to ${subscriber.chatId}`, error);
      }
    }
  } catch (error) {
    console.error("❌ Error fetching subscribed subscribers:", error);
  }
};