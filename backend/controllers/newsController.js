const axios = require('axios');

exports.getNewsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const apiKey = process.env.NEWS_API_KEY;
    
    let apiUrl = "";

    // The Ultimate Categorization Logic (Premium Keywords)
    switch(category.toLowerCase()) {
      case 'all':
      case 'home':
        // General Top Tech News
        apiUrl = `https://newsdata.io/api/1/news?apikey=${apiKey}&category=technology&language=en`;
        break;

      case 'ai':
        // Top Tier AI & Generative Models
        apiUrl = `https://newsdata.io/api/1/news?apikey=${apiKey}&q=${encodeURIComponent('chatgpt OR openai OR anthropic OR "generative ai"')}&language=en`;
        break;

      case 'cybersecurity':
        // High-fidelity Cyber Threats
        apiUrl = `https://newsdata.io/api/1/news?apikey=${apiKey}&q=${encodeURIComponent('cybersecurity OR ransomware OR malware OR "data breach"')}&language=en`;
        break;

      case 'cloud':
        // Enterprise Cloud & Infrastructure
        apiUrl = `https://newsdata.io/api/1/news?apikey=${apiKey}&q=${encodeURIComponent('aws OR azure OR "google cloud" OR kubernetes')}&language=en`;
        break;

      case 'software':
        // Software Development, Repositories & Coding
        apiUrl = `https://newsdata.io/api/1/news?apikey=${apiKey}&q=${encodeURIComponent('github OR "open source" OR javascript OR python')}&language=en`;
        break;

      case 'web3':
        // Blockchain & Decentralization
        apiUrl = `https://newsdata.io/api/1/news?apikey=${apiKey}&q=${encodeURIComponent('web3 OR blockchain OR ethereum OR crypto')}&language=en`;
        break;

      default:
        // Dynamic fallback
        apiUrl = `https://newsdata.io/api/1/news?apikey=${apiKey}&q=${encodeURIComponent(category)}&language=en`;
    }

    // Hit the API
    const response = await axios.get(apiUrl);
    
    // Send only the Top 5 most relevant articles to keep the UI clean
    const top5Articles = response.data.results.slice(0, 5);
    res.status(200).json(top5Articles);
    
  } catch (error) {
    console.error("News Fetch Error Details: ", error.response ? error.response.data : error.message);
    res.status(500).json({ message: "There was a problem fetching domain-specific news!" });
  }
};