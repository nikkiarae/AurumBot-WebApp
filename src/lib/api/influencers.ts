import { Influencer } from "@/types/influencer";
import { bot, NEXT_PUBLIC_BASE_URL, TELEGRAM_BOT_TOKEN } from "../constants/config";

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
    try {
      // Fetch the user's profile photos using Telegraf's telegram object
      const photos = await bot.telegram.getUserProfilePhotos(Number(chatId));
  
      if (photos.total_count > 0) {
        // Get the highest resolution photo (first item in the array)
        const fileId = photos.photos[0][0].file_id;
  
        // Get the file URL
        const file = await bot.telegram.getFile(fileId);
        const fileUrl = `https://api.telegram.org/file/bot${TELEGRAM_BOT_TOKEN}/${file.file_path}`;
        
        return fileUrl;
      } else {
        console.log('No profile picture found.');
        return null;
      }
    } catch (error) {
      console.error('Error getting profile picture:', error);
    }
  };