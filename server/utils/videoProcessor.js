const youtubedl = require('youtube-dl-exec');
const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

function downloadVideo(url) {
    return new Promise((resolve, reject) => {
        const uniqueId = uuidv4();
        const videoPath = `output/${uniqueId}_video.mp4`;

        youtubedl(url, {
            'output': videoPath,
            'format': 'best'
        })
            .then(() => {
                console.log('Finished downloading!');
                resolve({ path: videoPath, id: uniqueId });
            })
            .catch(error => {
                console.error(error);
                reject(error);
            });
    });
}

function extractAudio(videoData) {
    return new Promise((resolve, reject) => {
        const audioOutput = `output/${videoData.id}_audio.wav`;

        ffmpeg(videoData.path)
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

function addAudioToVideo(videoData, audioFile, filename) {
    return new Promise((resolve, reject) => {
        ffmpeg(videoData.path)
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
