import { PaymentLinkResponse } from "@/types/general";
import { NEXT_PUBLIC_BASE_URL } from "../constants/config";

export const generatePaymentLink = async (
  chatId: number,
  couponCode?: string | null
): Promise<PaymentLinkResponse> => {
  try {
    const response = await fetch(`${NEXT_PUBLIC_BASE_URL}/api/stripe/create-checkout-session`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chatId, couponCode }),
    });

    const responseData = await response.json();

    if (response.ok) {
      // Return success with the payment link
      return { success: true, data: responseData.url };
    } else {
      // Return failure with the error message from the server
      return { success: false, error: responseData.error || "An unknown error occurred." };
    }
  } catch (error) {
    console.error("Error generating payment link:", error);

    // Return failure with a generic error message
    return { success: false, error: "Failed to generate payment link. Please try again later." };
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