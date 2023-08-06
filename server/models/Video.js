const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  url: String,
  name: String,  // New field for video name
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },  // Reference to the User model

});

const Video = mongoose.model('Video', videoSchema);

module.exports = Video;