import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { GET_VIDEOS } from '../utils/queries';
import { DELETE_VIDEO } from '../utils/mutations';
import { Card, CardContent, Typography, Button } from '@mui/material';
import VideoPlayerCard from './VideoPlayerCard';  // Adjust the path accordingly

// Define the S3 bucket URL
const S3_BUCKET_URL = "https://videolingo.s3.us-west-1.amazonaws.com/videos/";

const SERVER_URL = process.env.NODE_ENV === 'production' 
                   ? 'https://videolingo-4a86a4dabd29.herokuapp.com' 
                   : 'http://localhost:5001';

function VideoLibrary() {
    const [videos, setVideos] = useState([]);

    // Function to handle video deletion
    const handleDelete = async (videoId) => {
        try {
            console.log('Sending delete request for video ID:', videoId);
            const response = await axios.post(`${SERVER_URL}/graphql`, {
                query: DELETE_VIDEO,
                variables: { id: videoId }
            });

            if (response.data.data.deleteVideo._id) {
                setVideos(prevVideos => prevVideos.filter(video => video._id !== videoId));
            }
        } catch (error) {
            console.error('Failed to delete video:', error);
        }
    };


    useEffect(() => {
        axios.post(`${SERVER_URL}/graphql`, { query: GET_VIDEOS })
            .then(response => {
                setVideos(response.data.data.videos);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    return (
        <div>
            {videos.map(video => {
                // Construct the full S3 URL for the video
                const videoS3Url = `${video.translatedVideo}`;
    
                return (
                    <Card key={video._id} style={{ margin: '10px' }}>
                        <CardContent>
                            <Typography variant="h5">{video.name}</Typography>
                            <Typography color="textSecondary">{video.url}</Typography> {/* Display the original YouTube URL */}
                            
                            {/* Video Playback */}
                            <VideoPlayerCard videoSrc={videoS3Url} />
    
                            {/* Download button */}
                            <a href={videoS3Url} download>
                                <Button variant="contained" color="primary">
                                    Download
                                </Button>
                            </a>
    
                            {/* Delete button */}
                            <Button variant="contained" color="secondary" onClick={() => handleDelete(video._id)}>
                                Delete
                            </Button>
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
}

export default VideoLibrary;
