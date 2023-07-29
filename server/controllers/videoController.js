const videoProcessor = require('../videoProcessor');
const speechTranslation = require('../SpeechTranslation');
const textToSpeech = require('../Text2Speech');

exports.processVideo = async (req, res) => {
    try {
        const url = req.body.url;
        videoProcessor.downloadVideo(url, function(videoFile) {
            videoProcessor.extractAudio(videoFile, function(audioFile) {
                speechTranslation(audioFile, function(translatedText) {
                    textToSpeech(translatedText, function(translatedAudio) {
                        videoProcessor.addAudioToVideo(videoFile, translatedAudio, function(finalVideo) {
                            // Here, you would probably want to send the final video file back to the client
                            // The specifics of this will depend on how you're handling file storage and delivery
                            res.status(200).json({ message: 'Video processed successfully', video: finalVideo });
                        });
                    });
                });
            });
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};