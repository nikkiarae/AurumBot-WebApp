import { Document } from "mongoose";

export interface Influencer extends Document {
  chatId: string
  links: {
    telegram?: string;
    discord?: string;
    x?: string;
    threads?: string;
  };
  isActive: boolean;
}
