export async function sendTelegramMessage(clientId: string, message: string) {
    try {
      const response = await fetch("/api/telegram/sendMessage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clientId, message }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to send message to Telegram");
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error sending message:", error);
      throw error;
    }
  }