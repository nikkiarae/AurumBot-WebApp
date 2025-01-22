// Define token criteria
export interface Criteria {
    minMarketCap: number;
    maxMarketCap: number;
    minVolume: number;
    maxVolume?: number;
    volumeToMarketCapRatio: number;
    minLiquidity: number;
    minLiquidityToMarketCapRatio: number
    maxLiquidity?: number;
    minPriceChange: number;
    maxPriceChange: number;
    minBuyToSellRatio: number;
    minAgeMinutes: number;
    maxAgeHours?: number
}

export enum TokenType {
    Golden, // The ultimate token trifecta: new, boosted, and successful. This one’s set to soar!
    Emerging, // A new token already showing strong success indicators—early mover advantage!
    Boosted, // This token is gaining momentum with an active boost score.
    New, // This token is fresh off the block and ready for exploration!
    Insider, // Sent by an Admin with insider knowledge
    Unknown, // No specific type could be determined for this token.
}

export enum ContractType {
    Eth,
    Base,
    Sol
}

export interface BasicToken {
    address: string
    tags: string[]
}

export interface Website {
    label: string
    url: string
}

export interface Social {
    type: string
    url: string
}
export interface TokenInfo {
    imageUrl: string;
    header: string;
    openGraph: string;
    websites: Website[];
    socials: Social[];
  }
  
export interface TransactionStats {
    buys: number;
    sells: number;
  }
  
export interface TokenTransactions {
    m5: TransactionStats;
    h1: TransactionStats;
    h6: TransactionStats;
    h24: TransactionStats;
  }
  
export interface TimeFrame {
    h24: number;
    h6: number;
    h1: number;
    m5: number;
}

  export interface TokenLiquidity {
    usd: number;
    base: number;
    quote: number;
  }
  
  export interface TokenDetails {
    address: string;
    name: string;
    symbol: string;
  }

  export interface Age {
    ageInMilliseconds: number
    ageInHours: number
    ageInMinutes:number
    days: number
    hours: number
    minutes: number
  }

export interface Boost {
    active: number
}
  export interface CompleteToken {
    chainId: string;
    dexId: string;
    url: string;
    pairAddress: string;
    baseToken: TokenDetails;
    quoteToken: TokenDetails;
    priceNative: string;
    priceUsd: string;
    txns: TokenTransactions;
    volume: TimeFrame;
    priceChange: TimeFrame;
    liquidity: TokenLiquidity;
    fdv: number; // Fully Diluted Valuation
    marketCap: number;
    pairCreatedAt: number; // Timestamp
    info: TokenInfo;
    tags: string[]
    boosts: Boost
    age: Age
    buyToSellRatio: TimeFrame
    successRating: number,
    holders: number,
    createdAt?: Date
    updatedAt?: Date
  }