const videoProcessor = require('../utils/videoProcessor');
const speechTranslation = require('../utils/SpeechTranslation');
const textToSpeech = require('../utils/Text2Speech');
const { v4: uuidv4 } = require('uuid');
const Video = require('../models/Video'); // Import the Video model
const cleanupFiles = require('../utils/cleanupFiles');

const resolvers = {
    Query: {
        videos: async () => {
            return await Video.find();
        }
    },
    Mutation: {
        processVideo: async (_, { url }) => {
            try {
                const videoFile = await videoProcessor.downloadVideo(url);
                const audioFile = await videoProcessor.extractAudio(videoFile);
                const translatedText = await speechTranslation(audioFile);
                const translatedAudio = await textToSpeech(translatedText);

                const uniqueFilename = uuidv4() + '.mp4'; // Use UUID to generate a unique filename
                const finalVideo = await videoProcessor.addAudioToVideo(videoFile, translatedAudio, uniqueFilename); // pass uniqueFilename to addAudioToVideo function

                const videoUrl = `${uniqueFilename}`;

                // Create a new Video document and save it to MongoDB
                const video = new Video({ url: videoUrl });
                await video.save();

                // Cleanup intermediate files
                await cleanupFiles([videoFile.path, audioFile, translatedAudio]);


                return { url: videoUrl };
            } catch (err) {
                console.error(err);
                throw err;
            }
        }
    }
};

module.exports = resolvers;
