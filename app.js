var speechTranslation = require("./SpeechTranslation");
var textToSpeech = require("./Text2Speech");
var videoProcessor = require("./videoProcessor");

videoProcessor.downloadVideo('https://www.youtube.com/shorts/RfAKbiWFLIg', function(videoFile) {
    videoProcessor.extractAudio(videoFile, function(audioFile) {
        speechTranslation(audioFile, textToSpeech);
    });
});
