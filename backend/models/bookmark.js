const mongoose = require('mongoose');

const bookmarkSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  article_id: { type: String, required: true },
  title: { type: String, required: true },
  link: { type: String, required: true },
  image_url: { type: String },
  source_name: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Bookmark', bookmarkSchema);