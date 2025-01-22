import WebSocket from 'ws';

// Global array to store tokens
let newTokens: unknown[] = [];

// WebSocket connection
const ws = new WebSocket('wss://pumpportal.fun/api/data');

// WebSocket open event - subscribe only to new tokens
ws.on('open', function open() {
  
    // Subscribing to token creation events
    const payload = {
      method: "subscribeNewToken", 
    };
  
    ws.send(JSON.stringify(payload));
});

// Function to handle WebSocket messages and add to the global array
ws.on('message', function message(data) {
    try {
      const parsedData = JSON.parse(data.toString());
  
      // Assuming the data contains tokens in a property named "tokens"
      if (parsedData) {
        newTokens.push(parsedData);
      }
    } catch (error) {
      console.error('Error parsing WebSocket message:', error);
    }
});
  

// Function to retrieve and reset the tokens array
export function retrievePumpfunTokens() {
    const tokens = [...newTokens]; // Copy current tokens
    newTokens = []; // Reset the global array
    return tokens;
}