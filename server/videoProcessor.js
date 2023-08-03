const youtubedl = require('youtube-dl-exec');
const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');

function downloadVideo(url) {
    return new Promise((resolve, reject) => {
        const videoPath = 'output/myvideo.mp4';

        youtubedl(url, {
            'output': videoPath,
            'format': 'best'
        })
            .then(() => {
                console.log('Finished downloading!');
                resolve(videoPath);
            })
            .catch(error => {
                console.error(error);
                reject(error);
            });
    });
}

function extractAudio(videoFile) {
    return new Promise((resolve, reject) => {
        const audioOutput = 'output/audio.wav';

        ffmpeg(videoFile)
            .output(audioOutput)
            .on('end', function () {
                console.log('Finished extracting audio!');
                resolve(audioOutput);
            })
            .on('error', function (err) {
                console.error('Error occurred: ' + err.message);
                reject(err);
            })
            .run();
    });
}

function addAudioToVideo(videoFile, audioFile, filename) {
    return new Promise((resolve, reject) => {
        ffmpeg(videoFile)
            .input(audioFile)
            .outputOptions(['-map 0:v', '-map 1:a', '-c:v copy'])
            .save(`output/${filename}`)
            .on('end', function () {
                console.log('Finished processing video!');
                resolve(`output/${filename}`);
            })
            .on('error', function (err) {
                console.error('Error occurred: ' + err.message);
                reject(err);
            });
    });
}

module.exports = {
    downloadVideo: downloadVideo,
    extractAudio: extractAudio,
    addAudioToVideo: addAudioToVideo
};
