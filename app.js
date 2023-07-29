var speechTranslation = require("./SpeechTranslation");
var textToSpeech = require("./Text2Speech");
var videoProcessor = require("./videoProcessor");

videoProcessor.downloadVideo('https://youtube.com/shorts/Ss9jt-e9lqA', function(videoFile) {
    videoProcessor.extractAudio(videoFile, function(audioFile) {
        speechTranslation(audioFile, textToSpeech);
    });
});
