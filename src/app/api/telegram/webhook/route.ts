import { NextRequest, NextResponse } from "next/server";
// import { bot } from "@/lib/api/bot";

export async function GET() {
    return NextResponse.json({
      status: "Webhook is working!",
      message: "This is the Telegram webhook endpoint.",
    });
  }

// export async function POST(req: NextRequest) {
//   try {
//     // Parse the incoming request body (Telegram sends JSON payloads)
//     const body = await req.json();

//     // Verify that the payload contains the necessary fields
//     if (!body || !body.message) {
//       return NextResponse.json(
//         { error: "Invalid request payload" },
//         { status: 400 }
//       );
//     }

//     console.log("Received Telegram update:", body);

//     // Use Telegraf to handle the update
//     await bot.handleUpdate(body);

//     // Respond to Telegram that the webhook was received successfully
//     return NextResponse.json({ received: true });
//   } catch (error) {
//     console.error("Error processing Telegram webhook:", error);
//     return NextResponse.json(
//       { error: "Webhook processing error" },
//       { status: 500 }
//     );
//   }
// }

export async function POST(req: NextRequest) {
    try {
      // Parse the incoming request body
      const body = await req.json();
  
      console.log("Webhook update received:", body);
  
      // Respond with a 200 status to acknowledge receipt
      return NextResponse.json({ status: "success", message: "Webhook received successfully" });
    } catch (error) {
      console.error("Error processing webhook:", error);
      return NextResponse.json(
        { status: "error", message: "Failed to process webhook" },
        { status: 500 }
      );
    }
}