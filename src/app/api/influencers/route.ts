import dbConnect from "@/lib/mongoose";
import Influencer from "@/models/Influencer";
import { NextResponse } from "next/server";

export async function GET() {
    await dbConnect();
  
    const influencers = await Influencer.find({});
    return NextResponse.json(influencers);
  }
  