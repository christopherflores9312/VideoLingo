const videoProcessor = require('../utils/videoProcessor');
const speechTranslation = require('../utils/SpeechTranslation');
const textToSpeech = require('../utils/Text2Speech');
const { v4: uuidv4 } = require('uuid');
const Video = require('../models/Video'); // Import the Video model
const cleanupFiles = require('../utils/cleanupFiles');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/Users'); // Import the User model
const fs = require('fs');
const AWS = require('aws-sdk');
const s3 = new AWS.S3();

const currentDate = new Date().toISOString().slice(0, 10);

const resolvers = {
    Query: {
        videos: async () => {
            return await Video.find();
        },
        verifyUser: async (_, { token }) => {
            try {
                // Verify the JWT token
                const decoded = jwt.verify(token, '9312');  // '9312' should be your secret key
                console.log('Decoded JWT:', decoded);  // Log the decoded JWT

                
                // Find the user
                const user = await User.findById(decoded.id);
                console.log('User fetched from DB:', user);  // Log the fetched user


                // If user not found, throw an error
                if (!user) {
                    throw new Error('Invalid token');
                }

                return user;
            } catch (err) {
                console.error(err);
                throw err;
            }
        }
    },
    Mutation: {
        processVideo: async (_, { url, name, userId }) => {
            try {
                console.log('Received processVideo request with arguments:', { url, name, userId });

                const videoFile = await videoProcessor.downloadVideo(url);
                console.log('Video downloaded:', videoFile.path);

                const audioFile = await videoProcessor.extractAudio(videoFile);
                console.log('Audio extracted:', audioFile);

                const translatedText = await speechTranslation(audioFile);
                console.log('Speech translated:', translatedText);

                const translatedAudio = await textToSpeech(translatedText);
                console.log('Text to speech done:', translatedAudio);

                const uniqueFilename = `${(name || 'video').replace(/[^a-z0-9]/gi, '_')}_${uuidv4()}_${currentDate}.mp4`;
                const finalVideo = await videoProcessor.addAudioToVideo(videoFile, translatedAudio, uniqueFilename);
                console.log('Final video:', finalVideo);

                const videoUrl = `https://videolingo.s3.us-west-1.amazonaws.com/videos/${uniqueFilename}`;


                const video = new Video({ url: url, name: name, user: userId, translatedVideo: videoUrl });
                console.log('Saving video document:', video);
                await video.save();

                await cleanupFiles([videoFile.path, audioFile, translatedAudio]);

                const returnData = { url: videoUrl, name: name, processedUrl: url };
                console.log('Returning data:', returnData);
                return returnData;
            } catch (err) {
                console.error(err);
                throw err;
            }
        },
        signup: async (_, { username, password, email }) => {
            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);
          
            // Create a new user
            const user = new User({ username, password: hashedPassword, email });
            await user.save();
          
            // Create a JWT
            const token = jwt.sign({ id: user.id }, '9312');
          
            return { token, user };
          },    
        login: async (_, { username, password }) => {
            // Find the user
            const user = await User.findOne({ username });
            if (!user) {
                throw new Error('Invalid login credentials');
            }

            // Check the password
            const valid = await bcrypt.compare(password, user.password);
            if (!valid) {
                throw new Error('Invalid login credentials');
            }

            // Create a JWT
            const token = jwt.sign({ id: user.id }, '9312');

            return { token, user };
        },
        deleteVideo: async (_, { id }) => {
            try {
                const videoToDelete = await Video.findById(id);
                
                if (!videoToDelete) {
                    throw new Error("Video not found");
                }
                
                // Construct the S3 key (filename) for the video
                const videoS3Key = videoToDelete.translatedVideo;
                
                // Delete the video from S3
                const params = {
                    Bucket: 'videolingo', // Your S3 bucket name
                    Key: videoS3Key
                };

                await s3.deleteObject(params).promise();
                console.log('Video deleted from S3:', videoS3Key);
                
                // Delete the video entry from the database
                await Video.findByIdAndDelete(id);
                
                return { _id: videoToDelete._id };
        
            } catch (err) {
                console.error(err);
                throw err;
            }
        }    
    }
};

module.exports = resolvers;
