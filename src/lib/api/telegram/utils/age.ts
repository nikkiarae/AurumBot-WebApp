import { CompleteToken } from "@/types/token";

export const getAge = (token: CompleteToken) => {
    const now = Date.now();

    // Convert age to days and hours
      const ageInMilliseconds = now - new Date(token.pairCreatedAt).getTime();
      const ageInHours = Math.floor(ageInMilliseconds / 3600000);
      const ageInMinutes = Math.floor(ageInMilliseconds / 60000); // Convert milliseconds to minutes
      const days = Math.floor(ageInHours / 24);
      const hours = ageInHours % 24;
      const minutes = ageInMinutes % 60;

      return {
        ageInMilliseconds,
        ageInMinutes,
        ageInHours,
        days,
        hours,
        minutes,
      }
}    
