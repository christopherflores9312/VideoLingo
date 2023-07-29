"use strict";

var sdk = require("microsoft-cognitiveservices-speech-sdk");

var subscriptionKey = process.env.SPEECH_KEY;
var serviceRegion = process.env.SPEECH_REGION;
var filename = "YourAudioFile.wav";

function textToSpeech(text, callback) {
    var audioConfig = sdk.AudioConfig.fromAudioFileOutput(filename);
    var speechConfig = sdk.SpeechConfig.fromSubscription(subscriptionKey, serviceRegion);
    
    // Set the language of the voice that speaks.
    speechConfig.speechSynthesisVoiceName = "es-MX-JorgeNeural"; 
    
    var synthesizer = new sdk.SpeechSynthesizer(speechConfig, audioConfig);
    synthesizer.speakTextAsync(text,
        function (result) {
            if (result.reason === sdk.ResultReason.SynthesizingAudioCompleted) {
                console.log("synthesis finished.");
                callback(filename); // Call the callback with the name of the audio file

            } else {
                console.error("Speech synthesis canceled, " + result.errorDetails +
                    "\nDid you update the subscription info?");
            }
            synthesizer.close();
            synthesizer = undefined;
        },
        function (err) {
            console.trace("err - " + err);
            synthesizer.close();
            synthesizer = undefined;
        }
    );
    console.log("Now synthesizing to: " + filename);
}

module.exports = textToSpeech;
