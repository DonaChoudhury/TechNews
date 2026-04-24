const Bookmark = require('../models/bookmark');

// 1. Save a new bookmark
exports.saveBookmark = async (req, res) => {
  try {
    // 👇 SPY FIX: Ye line terminal mein print karegi ki token ke andar aakhir hai kya!
    console.log("👀 Decoded Token Data:", req.user);

    const { article_id, title, link, image_url, source_name } = req.body;
    
    // Yahan maine ek aur option (userId) daal diya hai just in case
    const userId = req.user.id || req.user._id || req.user.userId; 

    // Agar teeno mein se kuch bhi nahi mila, toh ye error dega
    if (!userId) {
      return res.status(400).json({ message: "Bhai, Token mein user ID nahi mil rahi. Apne VS Code ka Terminal dekho!" });
    }

    // Check if already bookmarked by this user
    const existingBookmark = await Bookmark.findOne({ user: userId, article_id });
    if (existingBookmark) {
      return res.status(400).json({ message: "Article already bookmarked!" });
    }

    const newBookmark = new Bookmark({
      user: userId,
      article_id, title, link, image_url, source_name
    });

    await newBookmark.save();
    res.status(201).json({ message: "Bookmark saved successfully!" });
  } catch (error) {
    console.error("Bookmark Error Details (Terminal ke liye):", error);
    res.status(500).json({ message: "Failed to save bookmark.", error: error.message });
  }
};

// 2. Get all bookmarks for the logged-in user
exports.getBookmarks = async (req, res) => {
  try {
    const userId = req.user.id || req.user._id || req.user.userId; 
    
    const bookmarks = await Bookmark.find({ user: userId }).sort({ createdAt: -1 });
    res.status(200).json(bookmarks);
  } catch (error) {
    console.error("Fetch Bookmarks Error:", error);
    res.status(500).json({ message: "Failed to fetch bookmarks.", error: error.message });
  }
};

// 3. Delete a bookmark
exports.removeBookmark = async (req, res) => {
  try {
    const { id } = req.params; 
    await Bookmark.findByIdAndDelete(id);
    res.status(200).json({ message: "Bookmark removed!" });
  } catch (error) {
    console.error("Delete Bookmark Error:", error);
    res.status(500).json({ message: "Failed to remove bookmark.", error: error.message });
  }
};
