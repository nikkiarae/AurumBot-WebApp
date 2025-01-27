import { Influencer } from "@/types/influencer";
import { NEXT_PUBLIC_BASE_URL } from "../constants/config";

export const fetchInfluencers = async (): Promise<Influencer[]> => {
    const response = await fetch(`${NEXT_PUBLIC_BASE_URL}/api/influencers`, {
      cache: "no-store",
    });
  
    if (!response.ok) {
      throw new Error("Failed to fetch influencers");
    }
  
    return response.json();
  };

  export const fetchInfluencer = async (chatId: string): Promise<string | null | undefined> => {
    
    return chatId
  };