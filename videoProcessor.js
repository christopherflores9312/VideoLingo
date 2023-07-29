const youtubedl = require('youtube-dl-exec');
const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');

function downloadVideo(url, callback) {
    const videoPath = 'myvideo.mp4';

    youtubedl(url, {
        'output': videoPath,
        'format': 'best'
    })
    .then(() => {
        console.log('Finished downloading!');
        callback(videoPath);
    })
    .catch(error => {
        console.error(error);
    });
}

function extractAudio(videoFile, callback) {
    ffmpeg(videoFile)
        .output('audio.wav')
        .on('end', function() {
            console.log('Finished extracting audio!');
            callback('audio.wav');
        })
        .run();
}

module.exports = {
    downloadVideo: downloadVideo,
    extractAudio: extractAudio
};
