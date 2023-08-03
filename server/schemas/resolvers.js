const videoProcessor = require('../videoProcessor');
const speechTranslation = require('../SpeechTranslation');
const textToSpeech = require('../Text2Speech');
const { v4: uuidv4 } = require('uuid');

const processVideo = async ({ url }) => {
  try {
    const videoFile = await videoProcessor.downloadVideo(url);
    const audioFile = await videoProcessor.extractAudio(videoFile);
    const translatedText = await speechTranslation(audioFile);
    const translatedAudio = await textToSpeech(translatedText);
    
    const uniqueFilename = uuidv4() + '.mp4'; // Use UUID to generate a unique filename
    const finalVideo = await videoProcessor.addAudioToVideo(videoFile, translatedAudio, uniqueFilename); // pass uniqueFilename to addAudioToVideo function
    
    const videoUrl = `${uniqueFilename}`;
    
    // TODO: Save the final video file with the unique filename

    return { url: videoUrl };
  } catch (err) {
    console.error(err);
    throw err;
  }
};


const resolvers = {
  processVideo,
  videos: () => {
    const collection = client.db(dbName).collection('videos');
    return collection.find().toArray();
  }
};

module.exports = resolvers;
