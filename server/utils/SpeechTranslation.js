const fs = require("fs");
const sdk = require("microsoft-cognitiveservices-speech-sdk");

const speechTranslationConfig = sdk.SpeechTranslationConfig.fromSubscription(process.env.SPEECH_KEY, process.env.SPEECH_REGION);
speechTranslationConfig.speechRecognitionLanguage = "en-US";

var language = "es"; // Modify to Spanish
speechTranslationConfig.addTargetLanguage(language);

function fromFile(audioFile) {
    return new Promise((resolve, reject) => {
        let audioConfig = sdk.AudioConfig.fromWavFileInput(fs.readFileSync(audioFile));
        let translationRecognizer = new sdk.TranslationRecognizer(speechTranslationConfig, audioConfig);

        translationRecognizer.recognizeOnceAsync(result => {
            translationRecognizer.close();
            
            switch (result.reason) {
                case sdk.ResultReason.TranslatedSpeech:
                    resolve(result.translations.get(language));
                    break;
                case sdk.ResultReason.NoMatch:
                    console.log("NOMATCH: Speech could not be recognized.");
                    reject(new Error("Speech could not be recognized."));
                    break;
                case sdk.ResultReason.Canceled:
                    const cancellation = sdk.CancellationDetails.fromResult(result);
                    console.log(`CANCELED: Reason=${cancellation.reason}`);

                    if (cancellation.reason == sdk.CancellationReason.Error) {
                        console.log(`CANCELED: ErrorCode=${cancellation.ErrorCode}`);
                        console.log(`CANCELED: ErrorDetails=${cancellation.errorDetails}`);
                        console.log("CANCELED: Did you set the speech resource key and region values?");
                    }
                    reject(new Error(`Speech translation canceled: ${cancellation.reason}`));
                    break;
            }
        });
    });
}

module.exports = fromFile;
