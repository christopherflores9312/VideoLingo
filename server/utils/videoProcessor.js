const youtubedl = require('youtube-dl-exec');
const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const outputDir = 'output';  // Assuming 'output' is the directory you save files to
const AWS = require('aws-sdk');

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_BUCKET_REGION
});

const s3 = new AWS.S3();

function uploadToS3(filePath, key) {
    return new Promise((resolve, reject) => {
        const fileStream = fs.createReadStream(filePath);
        const params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: key,
            Body: fileStream
        };

        s3.upload(params, (err, data) => {
            if (err) {
                console.error('Error uploading file to S3:', err);
                reject(err);
            } else {
                resolve(data.Location);  // Return the URL of the uploaded file
            }
        });
    });
}


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
        const outputPath = `output/${filename}`;
        const s3Key = `videos/${filename}`;  // Adjust as needed

        ffmpeg(videoData.path)
            .input(audioFile)
            .outputOptions(['-map 0:v', '-map 1:a', '-c:v copy'])
            .save(outputPath)
            .on('end', function () {
                console.log('Finished processing video!');

                // Upload to S3
                uploadToS3(outputPath, s3Key)
                    .then(s3Url => {
                        // Delete local files if necessary
                        fs.unlinkSync(outputPath);
                        fs.unlinkSync(videoData.path);
                        fs.unlinkSync(audioFile);

                        resolve(s3Url);  // Return the S3 URL
                    })
                    .catch(err => {
                        console.error('Error occurred while uploading to S3:', err);
                        reject(err);
                    });
            })
            .on('error', function (err) {
                console.error('Error occurred:', err.message);
                reject(err);
            });
    });
}



module.exports = {
    downloadVideo: downloadVideo,
    extractAudio: extractAudio,
    addAudioToVideo: addAudioToVideo
};
