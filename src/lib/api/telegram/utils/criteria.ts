import { tokenCriteria } from "@/lib/constants/criteria";
import { CompleteToken } from "@/types/token";
  
export const queryTokensByCriteria = (tokens: CompleteToken[]) => {
  return tokens.filter((token: CompleteToken) => {
    // Ensure market cap is within range
    const isAgeValid = 
      tokenCriteria.minAgeMinutes <= token.age.ageInMinutes &&
      (tokenCriteria.maxAgeHours || Infinity) >= token.age.ageInHours
    
    // Ensure market cap is within range
    const isMarketCapValid = 
      tokenCriteria.minMarketCap <= token.marketCap && 
      tokenCriteria.maxMarketCap >= token.marketCap;

    // Ensure trading volume meets the minimum criteria
    const isVolumeValid = tokenCriteria.minVolume <= token.volume.h1

    // Liquidity shows that here is a pool of money to take from
    const isLiquidityValid = token.liquidity?.usd ? token.liquidity.usd >= tokenCriteria.minLiquidity : false;

    // Check if liquidity-to-market cap ratio is valid
    const liquidityToMarketCapRatio =
      token.liquidity?.usd && token.marketCap
        ? token.liquidity.usd / token.marketCap
        : 0;

    // Check if the ratio is within the desired range (>= min and <= 75%)
    const isLiquidityToMarketCapRatioValid =
      liquidityToMarketCapRatio >= tokenCriteria.minLiquidityToMarketCapRatio &&
      liquidityToMarketCapRatio <= 0.75;

    // Ensure buy-to-sell ratio meets the minimum requirement
    const buyToSellRatio = token.buyToSellRatio.h1
    const isBuyToSellRatioValid = buyToSellRatio >= tokenCriteria.minBuyToSellRatio;

    // Ensure price change is within the acceptable range
    const isPriceChangeValid = 
      token.priceChange.h1 >= tokenCriteria.minPriceChange && 
      token.priceChange.h1 <= tokenCriteria.maxPriceChange;

    // Ensure volume-to-market cap ratio meets the minimum requirement
    const volumeToMarketCapRatio =
    token.volume.h1 && token.marketCap
      ? (token.volume.h1 / token.marketCap) * 100
      : 0;
    const isVolumeToMarketCapRatioValid =
      volumeToMarketCapRatio >= tokenCriteria.volumeToMarketCapRatio;

    // Ensure token age is within the acceptable range
    // const isAgeValid = token.age.ageInHours <= tokenCriteria.maxAgeHours;

    // console.log(isMarketCapValid, isVolumeValid, isLiquidityValid, isLiquidityToMarketCapRatioValid, isBuyToSellRatioValid, isPriceChangeValid, isBuyToSellRatioValid,);

    // Combine all conditions
    return (
      isAgeValid && 
      isMarketCapValid &&
      isVolumeValid &&
      isLiquidityValid &&
      isLiquidityToMarketCapRatioValid &&
      isBuyToSellRatioValid &&
      isPriceChangeValid &&
      isVolumeToMarketCapRatioValid
    )
  });
};