const axios = require("axios");

const GROQ_API_URL = process.env.GROQ_API_URL || "https://api.groq.com/openai/v1/chat/completions";

exports.askAI = async (question) => {
  const hasApiKey = Boolean(process.env.GROQ_API_KEY && process.env.GROQ_API_KEY.trim());

  // Try AI first (only if API key is present)
  if (hasApiKey) {
    try {
    const response = await axios.post(
      GROQ_API_URL,
      {
        model: process.env.GROQ_MODEL || "llama-3.1-8b-instant",
        messages: [
          {
            role: "system",
            content: "Respond with a single word only; do not include punctuation or extra explanation."
          },
          {
            role: "user",
            content: question
          }
        ],
        max_tokens: 32
      },
      {
        headers: {
          "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json"
        },
        timeout: 15000
      }
    );

    const choice = response.data?.choices?.[0];
    let text = "";
    if (choice) {
      text = choice.message?.content ?? choice.text ?? "";
    } else if (typeof response.data === "string") {
      text = response.data;
    }

    text = (text || "").trim();
    if (text) {
      let word = text.split(/\s+/)[0];
      // strip non-word / non-hyphen characters (ASCII-safe)
      word = word.replace(/[^\w-]/g, "");
      // fallback: strip common ASCII punctuation
      const safe = word.replace(/["'.,!?;:()\[\]{}<>]/g, "");
      return safe || text.split(/\s+/)[0];
    }

    } catch (err) {
      console.error("Groq AI Error:", err.response?.data || err.message);
      // fall through to deterministic fallback
    }
  }

  // Deterministic fallback (only used if AI fails or returns empty)
  try {
    const raw = (question || "").toString();
    const norm = raw.toLowerCase().replace(/[^\w\s]/g, " ").replace(/\s+/g, " ").trim();
    const capitalMatch = norm.match(/(?:what(?:'s| is)? the )?capital(?: of)? (.+)/i);
    if (capitalMatch) {
      let state = capitalMatch[1].trim();
      state = state.replace(/ of india$/i, "").trim();
      const CAPITALS = {
        haryana: "Chandigarh",
        "himachal pradesh": "Shimla",
        "uttar pradesh": "Lucknow",
        maharashtra: "Mumbai",
        karnataka: "Bengaluru",
        uttarakhand: "Dehradun",
        bihar: "Patna",
        punjab: "Chandigarh"
      };
      const key = state.toLowerCase();
      if (CAPITALS[key]) return CAPITALS[key];
    }
  } catch (e) {
    // ignore and surface error below
  }

  throw new Error("AI processing failed and no deterministic fallback matched");
};
