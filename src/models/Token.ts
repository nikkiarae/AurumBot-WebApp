import mongoose from "mongoose";
import { Age, Boost, CompleteToken, Social, TimeFrame, TokenDetails, TokenInfo, TokenLiquidity, TokenTransactions, TransactionStats, Website } from "@/types/token";

const TokenDetailsSchema = new mongoose.Schema<TokenDetails>({
  address: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  symbol: { type: String , required: true},
})

const TransactionStatsSchema = new mongoose.Schema<TransactionStats>({
  buys: { type: Number, required: true },
  sells: { type: Number, required: true }
})

const TimeFrameSchema = new mongoose.Schema<TimeFrame>({
  m5: { type: Number, required: true },
  h1: { type: Number, required: true },
  h6: { type: Number, required: true },
  h24: { type: Number, required: true }
})

const TxnsSchema = new mongoose.Schema<TokenTransactions>({
  m5: { type: TransactionStatsSchema },
  h1: { type: TransactionStatsSchema },
  h6: { type: TransactionStatsSchema },
  h24: { type: TransactionStatsSchema }
})

const LiquiditySchema = new mongoose.Schema<TokenLiquidity>({
  usd: { type: Number, required: true },
  base: { type: Number, required: true },
  quote: { type: Number, required: true }
})

const WebsiteSchema = new mongoose.Schema<Website>({
  label: { type: String },
  url: { type: String }
})

const SocialSchema = new mongoose.Schema<Social>({
  type: { type: String },
  url: { type: String }
})

const TokenInfoSchema = new mongoose.Schema<TokenInfo>({
  imageUrl: { type: String },
  header: { type: String },
  openGraph: { type: String },
  websites: [{
    type: WebsiteSchema
  }],
  socials: [{
    type: SocialSchema
  }]
})

const BoostsSchema = new mongoose.Schema<Boost>({
  active: { 
    type: Number,
    default: 0
  },
})

const AgeSchema = new mongoose.Schema<Age>({
  ageInMilliseconds: { type: Number },
  ageInHours: { type: Number },
  ageInMinutes: { type: Number },
  days: { type: Number },
  hours: { type: Number },
  minutes: { type: Number }
})


const TokenSchema = new mongoose.Schema<CompleteToken>({
  chainId: { type: String, required: true },
  pairAddress: { 
    type: String, 
    required: true, 
    unique: true 
  },
  dexId: { type: String, required: true },
  url: { type: String, required: true },

  baseToken: { 
    type: TokenDetailsSchema, 
    required: true 
  },
  quoteToken: { 
    type: TokenDetailsSchema, 
    required: true 
  },
  priceNative: { type: String, required: true },
  priceUsd: { type: String, required: true },
  txns: {
    type: TxnsSchema, 
    required: true 
  },
  volume: {
    type: TimeFrameSchema,
    required: true
  },
  priceChange: {
    type: TimeFrameSchema,
    required: true
  },
  liquidity: {
    type: LiquiditySchema,
    required: true
  },
  fdv: { type: Number, required: true },
  marketCap: { type: Number, required: true },
  pairCreatedAt: { type: Number, required: true },
  info: { type: TokenInfoSchema },
  tags: [{ 
    type: String, 
    default: []
  }],
  boosts: {
    type: BoostsSchema,
  },
  age: {
    type: AgeSchema,
    required: true
  },
  buyToSellRatio: {
    type: TimeFrameSchema
  },
  successRating: { type: Number, required: true },
  holders: { type: Number, default: 0 },
}, {
  timestamps: true
});

// Add a TTL index to automatically delete documents after 6 hours
TokenSchema.index({ createdAt: 1 }, { expireAfterSeconds: 21600 }); // 6 hours

export default mongoose.model("Token", TokenSchema);