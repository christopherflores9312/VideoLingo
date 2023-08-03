const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  url: String,
  // Add additional fields as needed
});

const Video = mongoose.model('Video', videoSchema);

module.exports = Video;