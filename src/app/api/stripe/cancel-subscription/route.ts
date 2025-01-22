import { stripe } from "@/lib/constants/config";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // Parse the request body to get the subscriptionId
    const { subscriptionId } = await req.json();

    // Validate subscriptionId
    if (!subscriptionId) {
      return NextResponse.json(
        { error: "Subscription ID is required" },
        { status: 400 }
      );
    }

    // Cancel the subscription at the end of the billing period
    const canceledSubscription = await stripe.subscriptions.update(
      subscriptionId,
      {
        cancel_at_period_end: true,
      }
    );

    console.log(
      `Subscription ${subscriptionId} set to cancel at period end.`
    );

    return NextResponse.json(
      { success: true, subscription: canceledSubscription },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Error canceling subscription:", error);
    return NextResponse.json(
      { error: "Failed to cancel the subscription" },
      { status: 500 }
    );
  }
}