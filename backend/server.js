const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db'); // Bringing in the config file

// Load env variables
dotenv.config();

// Connect to Database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); 

// Import Routes
const authRoutes = require('./routes/authRoutes');
const newsRoutes = require('./routes/newsRoutes');
const aiRoutes = require('./routes/aiRoutes');
const bookmarkRoutes = require('./routes/bookmarkroutes');

// Use Routes
app.use('/api/auth', authRoutes);

app.use('/api/news', newsRoutes);

app.use('/api/ai', aiRoutes);
app.use('/api/bookmarks', bookmarkRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
