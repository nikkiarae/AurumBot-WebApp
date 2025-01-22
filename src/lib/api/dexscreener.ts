const DEX_API_BASE = "https://api.dexscreener.com";

async function fetchDexData(endpoint: string) {
  try {
    const response = await fetch(`${DEX_API_BASE}${endpoint}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching data from ${endpoint}:`, error);
    return [];
  }
}

async function fetchMultipleTokensData(query: string[]) {
  const endpoint = "/latest/dex/tokens";
  const queryString = query.join(",");

  try {
    const response = await fetch(`${DEX_API_BASE}${endpoint}/${queryString}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.pairs;
  } catch (error) {
    console.error(`Error fetching data from ${endpoint}:`, error);
    return [];
  }
}

const dexscreenerAPI = {
  fetchBoostedTokens: () => fetchDexData("/token-boosts/latest/v1"),
  fetchNewTokens: () => fetchDexData("/token-profiles/latest/v1"),
  fetchTopBoostedTokens: () => fetchDexData("/token-boosts/top/v1"),
  fetchMultipleTokensData,
};

export default dexscreenerAPI