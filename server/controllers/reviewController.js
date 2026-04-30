const axios = require("axios");
const Review = require("../models/Review");

exports.reviewCode = async (req, res) => {
  const { code, language } = req.body;

  if (!code || !language) {
    return res.status(400).json({ error: "Code and language are required" });
  }

  const prompt = `
    You are an expert ${language} code reviewer.
    Review the following ${language} code and return a JSON response with:
    {
      "summary": "brief overview of the code",
      "bugs": ["list of bugs found"],
      "improvements": ["list of improvement suggestions"],
      "bestPractices": ["best practices violations"],
      "optimizedCode": "the improved version of the code",
      "score": <number from 1-10>
    }
    Only return the JSON. No extra text.
    
    Code:
    ${code}
  `;

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: prompt }] }]
      }
    );
    console.log("Gemini Response:", JSON.stringify(response.data));
    const cleaned = rawText
       .replace(/```json\n?/g, "")
       .replace(/```\n?/g, "")
       .replace(/\n/g, " ")
       .trim();

    console.log("Cleaned text:", cleaned);

  let reviewData;
  try {
    reviewData = JSON.parse(cleaned);
  }   catch(parseError) {
    console.error("Parse error:", parseError.message);
    console.error("Raw cleaned text:", cleaned);
    return res.status(500).json({ error: "Failed to parse AI response" });
  }
    // Save to DB
    await Review.create({ language, code, review: JSON.stringify(reviewData) });

    res.json(reviewData);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Failed to review code" });
  }
};