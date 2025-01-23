import Token from "@/models/Token";
import { formatMessage } from "@/lib/api/telegram/utils/message";
import { notifySubscribers } from "@/lib/api/telegram/utils/notification";
import ds from "@/lib/api/dexscreener";
import { BasicToken, CompleteToken, TokenType } from "@/types/token";
// import { retrievePumpfunTokens } from "../../pumpfun";
import { calculateBuyToSellRatio } from "../utils/buyToSellRatio";
import { calculateSuccessRating } from "../utils/successRating";
import { getAge } from "../utils/age";
// import { queryTokensByCriteria } from "../utils/criteria";


// Gets all tokens and returns them as a list of addresses
// export const getAllSolTokens = async () => {
//   // DexScreener
//   const fetchBoostedTokens = await ds.fetchBoostedTokens();
//   const fetchTopBoostedTokens = await ds.fetchTopBoostedTokens();
//   const fetchNewTokens = await ds.fetchNewTokens();

//   const dexscreenerAddresses: BasicToken[] = [...fetchBoostedTokens, ...fetchTopBoostedTokens, ...fetchNewTokens]
//     .filter(token => token.chainId === 'solana')
//     .map(token => ({ address: token.tokenAddress, tags: ["DexScreener"] }))

//   // Pumpfun
//   const fetchPumpFunTokens = retrievePumpfunTokens()
//   const pumpfunAddresses: BasicToken[] = fetchPumpFunTokens.map(token => ({ address: token.mint, tags: ["PumpFun"] }))
  
//   return [...dexscreenerAddresses, ...pumpfunAddresses]
// }

export const getFullTokenData = async (tokens: BasicToken[], size = 30): Promise<CompleteToken[]> => {
  // Helper function to chunk an array
  const chunkArray = <T>(array: T[], size: number): T[][] =>
    array.reduce<T[][]>(
      (acc, _, i) => (i % size ? acc : [...acc, array.slice(i, i + size)]),
      []
    );

  // Create batches of token addresses
  const addressBatches = chunkArray(tokens, size);

  // Fetch token data in batches
  const batchRequests = addressBatches.map((batch) => {
    const justAddresses = batch.map((token) => token.address);
    return ds.fetchMultipleTokensData(justAddresses);
  });

  // Await all batch requests
  const results = await Promise.all(batchRequests);

  // Flatten results
  const fullTokenData = results.flat();

  // Filter out invalid tokens (e.g., null or missing baseToken)
  const validFullTokenData = fullTokenData.filter(
    (token): token is CompleteToken =>
      token && token.baseToken && token.baseToken.address
  );

  // Create a map for quick lookup of tags by token address
  const tagsMap = new Map<string, string[]>(
    tokens.map((token) => [token.address, token.tags]) // Map address to tags
  );

  // Merge tags with full token data
  const mergedData = validFullTokenData.map((token) => ({
    ...token,
    tags: tagsMap.get(token.baseToken.address) || [], // Merge tags, fallback to empty array
  }));

  return mergedData;
};

// export const updateTokenData = (tokens: CompleteToken[]) => {
//   return tokens.map((token: any) => {
//     const age = getAge(token);
//     const buyToSellRatio = {}
//     const successRating = 0;

//     return {
//       ...token,
//       age,
//       buyToSellRatio,
//       successRating,
//     };
//   });
// };

export const addExtraTokenData = (tokens: CompleteToken[]) => {
  return tokens.map((token) => {
    const tokenWithExtras = {
      ...token,
      age: getAge(token),
    };

    tokenWithExtras.buyToSellRatio = calculateBuyToSellRatio(tokenWithExtras);
    tokenWithExtras.successRating = calculateSuccessRating(tokenWithExtras);

    return tokenWithExtras;
  });
};

export const updateTokenTags = (tokens: CompleteToken[]) => {
  return tokens.map((token) => {
    // Ensure the tags property exists
    const updatedToken = { ...token, tags: token.tags || [] };

    // Add 'new' tag if the token's age is less than 1 hour
    if (token.age.ageInHours < 1) {
      if (!updatedToken.tags.includes("New")) {
        updatedToken.tags.push("New");
      }
    }

    // Add 'boosted' tag if the token has active boosts
    if (token.boosts && token.boosts.active > 0) {
      if (!updatedToken.tags.includes("Boosted")) {
        updatedToken.tags.push("Boosted");
      }
    }

    if (token.successRating > 75) {
      if (!updatedToken.tags.includes("Success")) {
        updatedToken.tags.push("Success");
      }
    }

    // Return the token with updated tags
    return updatedToken;
  });
};

// export const saveOrUpdateTokens = async (tokens: CompleteToken[]) => {
//   try {
//     // Step 1: Fetch existing tokens from the database
//     const pairAddresses = tokens.map((token) => token.pairAddress);
//     const existingTokens = await Token.find(
//       { pairAddress: { $in: pairAddresses } }
//     ).lean();

//     const existingPairAddresses = new Set(existingTokens.map((token) => token.pairAddress));

//     // Step 2: Initialize bulk operations array and processed addresses
//     const bulkOps: any[] = [];
//     const processedAddresses: string[] = [];

//     tokens.forEach((token) => {
//       if (!existingPairAddresses.has(token.pairAddress)) {
//         // Step 3a: Add insert operation for new tokens
//         bulkOps.push({
//           insertOne: {
//             document: token,
//           },
//         });
//         processedAddresses.push(token.pairAddress);
//       } else {
//         // Step 3b: Check if boosts.active is greater and add update operation
//         const existingToken = existingTokens.find(
//           (dbToken) => dbToken.pairAddress === token.pairAddress
//         );

//         if (!arraysMatch(token.tags, existingToken?.tags || [])) {
//           console.log(token.tags, existingToken?.tags)
//           bulkOps.push({
//             updateOne: {
//               filter: { pairAddress: token.pairAddress },
//               update: { $set: token },
//             },
//           });
//           processedAddresses.push(token.pairAddress); // Track updated tokens
//         }
//       }
//     });

//     // Step 4: Execute the bulk write
//     if (bulkOps.length > 0) {
//       await Token.bulkWrite(bulkOps, { ordered: false });
//     }

//     // Step 5: Fetch and return only tokens in the bulkOps
//     const processedTokens = await Token.find({ pairAddress: { $in: processedAddresses } });

//     return processedTokens; // Return only inserted or updated tokens
//   } catch (error: any) {
//     console.error(`❌ Error in bulk operation:`, error);
//     throw error;
//   }
// };

export const saveOrUpdateToken = async (token: CompleteToken) => {
  try {
    // Update or insert the token (upsert: true)
    const result = await Token.findOneAndUpdate(
      { pairAddress: token.pairAddress },
      { $set: token },
      { new: true, upsert: true }
    );

    return result;
  } catch (error) {
    console.error(`❌ Error saving or updating token:`, error);
    throw error; // Rethrow the error for upstream handling
  }
};

export const getTokenType = (tags: string[]): TokenType => {
  if (tags.includes("New") && tags.includes("Boosted") && tags.includes("Success")) {
    return TokenType.Golden; // The ultimate token trifecta: new, boosted, and successful. This one’s set to soar!
  }

  if (tags.includes("Boosted") && tags.includes("Success")) {
    return TokenType.Emerging; // A highly boosted token with strong success potential—an investor's dream.
  }

  if (tags.includes("Boosted")) {
    return TokenType.Boosted; // A brand-new token with immediate interest and active boosts—don’t miss out!
  }

  if (tags.includes("New")) {
    return TokenType.New; // A new token already showing strong success indicators—early mover advantage!
  }

  return TokenType.Unknown; // No specific type could be determined for this token.
};

export const processToken = async (token: CompleteToken, type: TokenType) => {
  // Create Message
  const message = formatMessage(token, type);

  // Notify subscribers
  await notifySubscribers(message);

};

// export const findPotentialSolTokens = async () => {
//   // Gets tokens
//   const addresses: BasicToken[] = await getAllSolTokens()

//   // Gets all token data
//   let fullTokenData: CompleteToken[] = await getFullTokenData(addresses);

//   // Add Additional Data
//   fullTokenData = addExtraTokenData(fullTokenData)
//   fullTokenData = updateTokenTags(fullTokenData)

//   // Find tokens that match our criteria
//   const matchTokensWithCriteria = queryTokensByCriteria(fullTokenData)

//   if (matchTokensWithCriteria.length > 0) {
//     // Save Tokens or update if it meets criteria
//     const savedTokens: any[] = await saveOrUpdateTokens(matchTokensWithCriteria);

//     for (const token of savedTokens) {
//       const type: TokenType = getTokenType(token.tags)
//       await processToken(token, type);
//     }
//   }
// }

export const insiderSolToken = async (ca: string) => {
  let fullTokenData: CompleteToken[] = await getFullTokenData([{ address: ca, tags: ["Insider"]}]);

  if (fullTokenData.length <  1) return false
  
  // Add additional data to help with filtering
  fullTokenData = addExtraTokenData(fullTokenData)
  fullTokenData = updateTokenTags(fullTokenData)
  const token = await saveOrUpdateToken(fullTokenData[0])
  await processToken(token, TokenType.Insider);
  return true
};


// export const fetchTokens = async () => {
//   try {
//     await findPotentialSolTokens()
//   } catch (error) {
//     console.error("Error fetching tokens", error);
//   }
// };
