const youtubedl = require('youtube-dl-exec');
const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');

function downloadVideo(url, callback) {
    const videoPath = 'output/myvideo.mp4';

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
        .output('output/audio.wav')
        .on('end', function() {
            console.log('Finished extracting audio!');
            callback('output/audio.wav');
        })
        .run();
}

function addAudioToVideo(videoFile, audioFile, callback) {
    const outputPath = 'output/output.mp4';
  
    ffmpeg(videoFile)
        .input(audioFile)
        .outputOptions(['-map 0:v', '-map 1:a', '-c:v copy'])
        .save(outputPath)
        .on('end', function() {
            console.log('Finished processing video!');
            callback(outputPath);
        });
}



module.exports = {
    downloadVideo: downloadVideo,
    extractAudio: extractAudio,
    addAudioToVideo: addAudioToVideo
};
