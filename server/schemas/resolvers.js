const videoProcessor = require('../videoProcessor');
const speechTranslation = require('../SpeechTranslation');
const textToSpeech = require('../Text2Speech');

const resolvers = {
  processVideo: ({ url }) => {
    return new Promise((resolve, reject) => {
      videoProcessor.downloadVideo(url, function(videoFile) {
        videoProcessor.extractAudio(videoFile, function(audioFile) {
          speechTranslation(audioFile, function(translatedText) {
            textToSpeech(translatedText, function(translatedAudio) {
              videoProcessor.addAudioToVideo(videoFile, translatedAudio, function(finalVideo) {
                // Generate a URL for the output file
                const videoUrl = `output.mp4`;

                // Resolve with the URL
                resolve({ url: videoUrl });
              });
            });
          });
        });
      });
    });
  },  
  videos: () => {
    const collection = client.db(dbName).collection('videos');
    return collection.find().toArray();
  }
};

module.exports = resolvers;
