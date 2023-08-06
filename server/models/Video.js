const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  url: String, // This will now store the original URL
  name: String,
  processedUrl: String, // New field to store the processed video's filename
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

const Video = mongoose.model('Video', videoSchema);

module.exports = Video;