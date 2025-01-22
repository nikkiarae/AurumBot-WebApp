import { NextRequest, NextResponse } from "next/server";
import Subscriber from "@/models/Subscriber";
import dbConnect from "@/lib/mongoose";
import { stripe, STRIPE_WEBHOOK_SECRET } from "@/lib/constants/config";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  const sig = req.headers.get("stripe-signature");
  let event: Stripe.Event;

  // Connect to the database
  await dbConnect();

  try {
    // Parse the raw body of the request
    const rawBody = await req.text();

    // Verify the event signature
    if (!sig || !STRIPE_WEBHOOK_SECRET) {
      throw new Error("Missing Stripe signature or webhook secret");
    }
    event = stripe.webhooks.constructEvent(rawBody, sig, STRIPE_WEBHOOK_SECRET);

    // Handle the event
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const chatId = session.metadata?.chatId;

      const subscriptionEnd = new Date();
      subscriptionEnd.setMonth(subscriptionEnd.getMonth() + 1); // Add 1 month

      await Subscriber.findOneAndUpdate(
        { chatId },
        {
          isActive: true,
          subscriptionEnd,
          autoRenew: true,
          stripeSubscriptionId: session.subscription, // Save Stripe subscription ID
        },
        { upsert: true }
      );
    }

    if (event.type === "invoice.payment_succeeded") {
      const invoice = event.data.object as Stripe.Invoice;
      const subscriptionId = invoice.subscription as string;

      const subscriptionEnd = new Date();
      subscriptionEnd.setMonth(subscriptionEnd.getMonth() + 1);

      await Subscriber.findOneAndUpdate(
        { stripeSubscriptionId: subscriptionId },
        { subscriptionEnd },
        { new: true }
      );
    }

    if (event.type === "customer.subscription.deleted") {
      const subscription = event.data.object as Stripe.Subscription;

      await Subscriber.findOneAndUpdate(
        { stripeSubscriptionId: subscription.id },
        { isActive: false, autoRenew: false }
      );
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("❌ Webhook Error:", err.message);
      return NextResponse.json(
        { error: `Webhook Error: ${err.message}` },
        { status: 400 }
      );
    } else {
      console.error("❌ Webhook Error: An unknown error occurred");
      return NextResponse.json(
        { error: "Webhook Error: An unknown error occurred" },
        { status: 400 }
      );
    }
  }
}
