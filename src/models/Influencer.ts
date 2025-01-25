import { Influencer } from "@/types/influencer";
import { Schema, model, models } from "mongoose";

const InfluencerSchema: Schema = new Schema<Influencer>(
  {
    chatId: { type: String, required: true, unique: true },
    links: {
      telegram: { type: String },
      discord: { type: String },
      x: { type: String },
      threads: { type: String }
    },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  }
);

const Subscriber =
  models.Influencer || model<Influencer>("Influencer", InfluencerSchema);
  
export default Subscriber;
