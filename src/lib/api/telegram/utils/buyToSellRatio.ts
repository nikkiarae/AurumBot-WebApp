import { CompleteToken } from "@/types/token";

export const calculateBuyToSellRatio = (token: CompleteToken) => {
    const { txns } = token;
  
    if (!txns) {
      return {
        m5: 0,
        h1: 0,
        h6: 0,
        h24: 0,
      };
    }
  
    const calculateRatio = (buys: number, sells: number) => {
      return sells === 0 ? buys : buys / sells;
    };
  
    return {
      m5: calculateRatio(txns.m5.buys || 0, txns.m5.sells || 0),
      h1: calculateRatio(txns.h1.buys || 0, txns.h1.sells || 0),
      h6: calculateRatio(txns.h6.buys || 0, txns.h6.sells || 0),
      h24: calculateRatio(txns.h24.buys || 0, txns.h24.sells || 0),
    };
  };