// const { GoogleGenerativeAI } = require('@google/generative-ai');

// // Initialize Gemini with your API Key
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// exports.summarizeNews = async (req, res) => {
//   try {
//     const { articleText } = req.body;

//     if (!articleText) {
//       return res.status(400).json({ message: "Article text is required for summarization!" });
//     }

//     // Flash model is the fastest for text tasks
//     const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

//     // The Prompt for our Developer-focused News App
//     const prompt = `
//       You are an expert technical editor. Summarize the following news article into exactly 3 concise, crisp bullet points. 
//       Make it easy for a software developer to quickly understand the core impact.
      
//       Article text: "${articleText}"
//     `;

//     const result = await model.generateContent(prompt);
//     const summaryText = result.response.text();

//     res.status(200).json({ summary: summaryText });

//   } catch (error) {
//     console.error("AI Summarization Error:", error);
//     res.status(500).json({ message: "Failed to generate AI summary." });
//   }
// };





const { GoogleGenerativeAI } = require("@google/generative-ai");

exports.summarizeNews = async (req, res) => {
  try {
    const { articleText } = req.body;

    // Validation: Check if text exists and is long enough
    if (!articleText || articleText.length < 20) {
      return res.status(400).json({ 
        summary: "Article text bahut chota hai summarize karne ke liye." 
      });
    }

    // Initialize Gemini AI with API Key from .env
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    
    // Model name updated to a more stable version
    const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

    const prompt = `Summarize this tech news in 3-4 clear bullet points: ${articleText}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    res.json({ summary: text });
  } catch (error) {
    // Detailed error logging for terminal debugging
    console.error("🔴 Gemini API Error:", error.message);
    res.status(500).json({ 
      summary: "AI Summary failed. Please check if GEMINI_API_KEY is correct in .env",
      error: error.message 
    });
  }
};