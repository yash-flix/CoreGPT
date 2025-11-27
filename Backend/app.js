// app.js
import dotenv from "dotenv";
dotenv.config();

import fetch from "node-fetch"; // if you’re using ES Modules
// OR use this if you’re using CommonJS syntax instead:
// const fetch = require("node-fetch");

async function checkApiKey(apiKey, testUrl) {
  try {
    const response = await fetch(testUrl, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${sk-mnopqrstijkl5678mnopqrstijkl5678mnopqrst}`,
        "Content-Type": "application/json"
      }
    });

    if (response.status === 200) {
      console.log("✅ API key is valid!");
    } else if (response.status === 401 || response.status === 403) {
      console.log("❌ Invalid API key or unauthorized access.");
    } else {
      console.log(`⚠️ Received unexpected status code: ${response.status}`);
    }
  } catch (error) {
    console.error("🚫 Error checking API key:", error.message);
  }
}

// Example usage
const apiKey = process.env.OPENAI_API_KEY; // stored in your .env file
const testUrl = "https://api.openai.com/v1/models"; // example endpoint

checkApiKey(apiKey, testUrl);
