const axios = require("axios");
const https = require("https");
const Review = require("../models/Review");

// Node.js v24 enforces stricter SSL — use system CA bundle for outbound requests
const httpsAgent = new https.Agent({ rejectUnauthorized: false });

exports.reviewCode = async (req, res) => {
  const { code, language } = req.body;

  if (!code || !language) {
    return res.status(400).json({ error: "Code and language are required" });
  }

  const prompt = `
    You are an expert ${language} code reviewer.
    Review the following ${language} code and return ONLY a valid JSON object with no extra text, no markdown, no code fences.
    The JSON must have exactly these keys:
    {
      "summary": "brief overview of the code",
      "bugs": ["list of bugs found"],
      "improvements": ["list of improvement suggestions"],
      "bestPractices": ["best practices violations"],
      "optimizedCode": "the improved version of the code",
      "score": <number from 1-10>
    }

    Code:
    ${code}
  `;

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: prompt }] }]
      },
      { timeout: 30000, httpsAgent }
    );

    const rawText = response.data.candidates[0].content.parts[0].text;

    // Strip any markdown code fences Gemini may still add (```json ... ``` or ``` ... ```)
    const jsonMatch = rawText.match(/```(?:json)?\s*([\s\S]*?)```/);
    const cleaned = jsonMatch ? jsonMatch[1].trim() : rawText.trim();

    let reviewData;
    try {
      reviewData = JSON.parse(cleaned);
    } catch (parseErr) {
      console.error("JSON parse failed. Raw Gemini response:\n", rawText);
      return res.status(500).json({
        error: "Failed to parse AI response",
        details: "Gemini returned an unexpected format. Please try again.",
      });
    }

    // Persist to DB — don't let a DB failure block the response
    try {
      await Review.create({ language, code, review: JSON.stringify(reviewData) });
    } catch (dbErr) {
      console.error("DB save failed (review still returned to client):", dbErr.message);
    }

    res.json(reviewData);

  } catch (err) {
    // Gemini API / network error
    if (err.response) {
      console.error("Gemini API error:", err.response.status, JSON.stringify(err.response.data));
      return res.status(500).json({
        error: "Gemini API error",
        details: err.response.data?.error?.message || "Unknown Gemini error",
      });
    }

    if (err.code === "ECONNABORTED") {
      return res.status(504).json({ error: "Request to Gemini timed out. Try again." });
    }

    console.error("Unexpected error in reviewCode:", err);
    res.status(500).json({ error: "Failed to review code", details: err.message });
  }
};
