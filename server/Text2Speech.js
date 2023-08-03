"use strict";

var sdk = require("microsoft-cognitiveservices-speech-sdk");

var subscriptionKey = process.env.SPEECH_KEY;
var serviceRegion = process.env.SPEECH_REGION;
var filename = "output/YourAudioFile.wav";

function textToSpeech(text) {
    return new Promise((resolve, reject) => {
        var audioConfig = sdk.AudioConfig.fromAudioFileOutput(filename);
        var speechConfig = sdk.SpeechConfig.fromSubscription(subscriptionKey, serviceRegion);
        
        // Set the language of the voice that speaks.
        speechConfig.speechSynthesisVoiceName = "es-MX-JorgeNeural"; 
        
        var synthesizer = new sdk.SpeechSynthesizer(speechConfig, audioConfig);
        synthesizer.speakTextAsync(text,
            function (result) {
                synthesizer.close();
                synthesizer = undefined;

                if (result.reason === sdk.ResultReason.SynthesizingAudioCompleted) {
                    console.log("synthesis finished.");
                    resolve(filename); // Resolve the promise with the name of the audio file
                } else {
                    console.error("Speech synthesis canceled, " + result.errorDetails +
                        "\nDid you update the subscription info?");
                    reject(new Error(result.errorDetails));
                }
            },
            function (err) {
                console.trace("err - " + err);
                synthesizer.close();
                synthesizer = undefined;
                reject(err); // Reject the promise with the error
            }
        );
        console.log("Now synthesizing to: " + filename);
    });
}

module.exports = textToSpeech;
