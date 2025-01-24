import { stripe, STRIPE_PRICE_ID, TELEGRAM_URL } from "@/lib/constants/config";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function GET() {
  return NextResponse.json({
    status: "Checkout Session is working!",
    message: "This is the stripe checkout endpoint.",
  });
}


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
      try {
        // Fetch all coupons from Stripe
        const couponList = await stripe.coupons.list();
    
        // Find the coupon by its name
        const matchingCoupon = couponList.data.find(
          (coupon) => coupon.name === couponCode && coupon.valid
        );
    
        if (matchingCoupon) {
          // Apply the coupon by its ID
          discounts = [{ coupon: matchingCoupon.id }];
        } else {
          // If no valid coupon matches the provided code
          return NextResponse.json(
            { error: "Invalid or inactive coupon code." },
            { status: 400 }
          );
        }
      } catch (error) {
        console.error("Error fetching or applying coupon code:", error);
        return NextResponse.json(
          { error: "Failed to process coupon code." },
          { status: 500 }
        );
      }
    }

    // Create a Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "subscription", // Enable subscription mode
      line_items: [
        {
          price: STRIPE_PRICE_ID, // Replace with your Stripe Price ID
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