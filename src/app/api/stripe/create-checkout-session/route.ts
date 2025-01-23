import { stripe, TELEGRAM_URL } from "@/lib/constants/config";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";


export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    // Parse the request body
    const body = await req.json();
    const { chatId, couponCode } = body; // Include couponCode in the request body

    if (!chatId) {
      return NextResponse.json(
        { error: "Missing required parameter: chatId" },
        { status: 400 }
      );
    }

    // Fetch the coupon or promotion code details (if provided)
    let discounts: Stripe.Checkout.SessionCreateParams.Discount[] = [];
    if (couponCode) {
      const promotionCodes = await stripe.promotionCodes.list({
        code: couponCode, // Look up the code
        active: true,     // Ensure it's active
      });

      if (promotionCodes.data.length > 0) {
        discounts = [
          { promotion_code: promotionCodes.data[0].id }, // Apply the promotion code
        ];
      } else {
        return NextResponse.json(
          { error: "Invalid or inactive coupon code" },
          { status: 400 }
        );
      }
    }

    // Create a Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "subscription", // Enable subscription mode
      line_items: [
        {
          price: "price_1QdMXnEnurBpSIGA6vb43YKM", // Replace with your Stripe Price ID
          quantity: 1,
        },
      ],
      discounts, // Apply the discounts if any
      success_url: `${TELEGRAM_URL}?start=success`,
      cancel_url: `${TELEGRAM_URL}?start=cancel`,
      metadata: { chatId },
    });

    // Return the session URL in the response
    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe Checkout Error", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}