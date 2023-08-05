const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  url: String,
  name: String,  // New field for video name
});

const Video = mongoose.model('Video', videoSchema);

module.exports = Video;