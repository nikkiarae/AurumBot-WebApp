import { NEXT_PUBLIC_BASE_URL } from "../constants/config";

export const generatePaymentLink = async (chatId: number): Promise<string | undefined> => {
    try {
      const response = await fetch(`${NEXT_PUBLIC_BASE_URL}/api/stripe/create-checkout-session`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chatId }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to generate payment link");
      }
  
      const data = await response.json();
      return data.url;
    } catch (error) {
      console.error("Error generating payment link:", error);
    }
};

export const cancelSubscription = async (subscriptionId: string) => {
    try {
      const response = await fetch(`${NEXT_PUBLIC_BASE_URL}/api/stripe/cancel-subscription`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ subscriptionId }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        console.log("Subscription canceled:", data.subscription);
      } else {
        console.error("Error:", data.error);
      }
    } catch (error) {
      console.error("Error canceling subscription:", error);
    }
};