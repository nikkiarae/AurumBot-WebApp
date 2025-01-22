import { Criteria } from "@/types/token";

export const MAX_AGE = 6

// General oken criteria: Focus on max market cap and minimum for other parameters
export const tokenCriteria: Criteria = {
    // Market Cap
    minMarketCap: 5000,            // Minimum market cap
    maxMarketCap: 250000,         // Maximum market cap

    // Liquidity
    minLiquidity: 10000,           // Minimum liquidity
    minLiquidityToMarketCapRatio: 0.1, // Minimum 10% liquidity-to-market-cap ratio

    // Trading Activity
    minBuyToSellRatio: 1.4,        // Minimum healthy buy-to-sell ratio
    minVolume: 50000,              // Minimum 1-hour volume
    volumeToMarketCapRatio: 50,  // At least 50% of the market cap traded in the last hour

    // Price Change
    minPriceChange: 5,             // Minimum price change (5%)
    maxPriceChange: 100,           // Maximum price change (500%)

    // Token Age
    minAgeMinutes: 10,
};
  
// Existing token criteria: Focus on minimum values for all parameters
export const existingTokenCriteria = {      
    minMarketCap: 100000,           // Minimum market cap
    maxMarketCap: 3000000,          // Maximum market cap
    minVolume: 100000,              // Minimum 6-hour volume
    minLiquidity: 10000,            // Minimum liquidity
    minPriceChange: 10,             // Price change minimim of 10%
    maxPriceChange: 40,             // Price change not exceeding 50%
    minBuyToSellRatio: 1.2          // Minimum healthy buy-to-sell ratio
};