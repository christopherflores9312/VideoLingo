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
                console.log('Received processVideo request with arguments:', { url, name, userId }); // Log received arguments
    
                const videoFile = await videoProcessor.downloadVideo(url);
                const audioFile = await videoProcessor.extractAudio(videoFile);
                const translatedText = await speechTranslation(audioFile);
                const translatedAudio = await textToSpeech(translatedText);
    
                const uniqueFilename = `${name.replace(/[^a-z0-9]/gi, '_')}_${uuidv4()}_${currentDate}.mp4`; // Use UUID to generate a unique filename
                const finalVideo = await videoProcessor.addAudioToVideo(videoFile, translatedAudio, uniqueFilename); // pass uniqueFilename to addAudioToVideo function
    
                const videoUrl = `${uniqueFilename}`;
    
                // Create a new Video document and save it to MongoDB
                const video = new Video({ url: url, name: name, user: userId, translatedVideo: uniqueFilename });
                console.log('Saving video document:', video); // Log the video document before saving it
                await video.save();
    
                // Cleanup intermediate files
                await cleanupFiles([videoFile.path, audioFile, translatedAudio]);
    
                return { url: videoUrl, name: name, processedUrl: url  };
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
                
                // Construct the path to the video file
                const videoPath = `output/${videoToDelete.translatedVideo}`;
                
                // Delete the video file from the filesystem
                fs.unlinkSync(videoPath);  // Using synchronous unlink for simplicity
        
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
