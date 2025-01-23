import { MAX_AGE, tokenCriteria } from "@/lib/constants/criteria";
import { CompleteToken } from "@/types/token";

export const calculateSuccessRating = (token: CompleteToken): number => {
    const isMinAge = token.age.hours <= MAX_AGE;
  
    const {
      marketCap,
      volume,
      boosts,
      liquidity,
      priceChange,
      buyToSellRatio,
    } = token;
  
    // Normalize Market Cap
    const normMarketCap =
    tokenCriteria.minMarketCap <= marketCap && 
    tokenCriteria.maxMarketCap >= marketCap
      ? 1 - (marketCap - tokenCriteria.minMarketCap) / 
            (tokenCriteria.maxMarketCap - tokenCriteria.minMarketCap)
      : 0;
  
    // Normalize Volume (use appropriate timeframe)
    const volumeValue = isMinAge ? volume.h1 : volume.h6;
    const normVolume =
      volumeValue >= tokenCriteria.minVolume
        ? Math.min(Math.max(volumeValue / (marketCap || 1), 0), 1) // Compare against Market Cap
        : 0;
  
    // Normalize Liquidity
    const normLiquidity = liquidity?.usd
      ? Math.min(Math.max(liquidity.usd / tokenCriteria.minLiquidity, 0), 1)
      : 0;
  
    // Liquidity-to-Market Cap Ratio
    // Calculate Liquidity-to-Market Cap Ratio
    const liquidityToMarketCapRatio = liquidity?.usd
      ? liquidity.usd / (marketCap || 1)
      : 0;
  
    // Normalize Liquidity-to-Market Cap Ratio
    const normLiquidityToMarketCapRatio =
      liquidityToMarketCapRatio <= 0.75 // Check if liquidity is 75% or less of market cap
        ? Math.min(1 - liquidityToMarketCapRatio / 0.75, 1) // Normalize closer to 1 as ratio decreases
        : 0; // Penalize if liquidity exceeds 75% of market cap
  
    // Normalize Buy-to-Sell Ratio (use appropriate timeframe)
    const buyToSellRatioValue = isMinAge
      ? buyToSellRatio.h1
      : buyToSellRatio.h6;
    const normBuyToSellRatio = Math.min(
      Math.max((buyToSellRatioValue || 0) / tokenCriteria.minBuyToSellRatio, 0),
      1
    );
  
    // Normalize Price Change (use appropriate timeframe)
    const priceChangeValue = isMinAge
      ? priceChange.h1
      : priceChange.h6;
    const normPriceChange =
      priceChangeValue >= tokenCriteria.minPriceChange && priceChangeValue <= tokenCriteria.maxPriceChange
        ? 1
        : 0;
  
    // Normalize Volume-to-Market Cap Ratio
    const volumeToMarketCapRatio = volumeValue / (marketCap || 1);
    const normVolumeToMarketCapRatio =
      volumeToMarketCapRatio >= tokenCriteria.volumeToMarketCapRatio
        ? Math.min(volumeToMarketCapRatio / 1, 1) // Cap at 1
        : 0;
  
    // Normalize Boosts
    const normBoosts = boosts ? 1 : 0;
  
    // Updated weights for all metrics
    const weights = {
      marketCap: 0.20,                // Increased weight for stability
      volume: 0.25,                   // High trading volume remains important
      liquidity: 0.10,                // Increased weight for liquidity
      liquidityToMarketCap: 0.10,     // Liquidity-to-Market Cap remains at 10%
      volumeToMarketCap: 0.10,        // Volume-to-Market Cap remains at 10%
      buyToSellRatio: 0.10,           // Sentiment remains important
      priceChange: 0.05,              // Reduced weight for price change
      boost: 0.10,                    // Reduced weight for boosts
    };
  
    // Calculate success rate
    const successRate =
      weights.marketCap * normMarketCap +
      weights.volume * normVolume +
      weights.liquidity * normLiquidity +
      weights.liquidityToMarketCap * normLiquidityToMarketCapRatio +
      weights.volumeToMarketCap * normVolumeToMarketCapRatio +
      weights.buyToSellRatio * normBuyToSellRatio +
      weights.priceChange * normPriceChange +
      weights.boost * normBoosts;
  
    return Math.round(successRate * 100); // Return as percentage
  };