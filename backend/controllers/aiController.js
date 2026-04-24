const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Gemini with your API Key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.summarizeNews = async (req, res) => {
  try {
    const { articleText } = req.body;

    if (!articleText) {
      return res.status(400).json({ message: "Article text is required for summarization!" });
    }

    // Flash model is the fastest for text tasks
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // The Prompt for our Developer-focused News App
    const prompt = `
      You are an expert technical editor. Summarize the following news article into exactly 3 concise, crisp bullet points. 
      Make it easy for a software developer to quickly understand the core impact.
      
      Article text: "${articleText}"
    `;

    const result = await model.generateContent(prompt);
    const summaryText = result.response.text();

    res.status(200).json({ summary: summaryText });

  } catch (error) {
    console.error("AI Summarization Error:", error);
    res.status(500).json({ message: "Failed to generate AI summary." });
  }
};