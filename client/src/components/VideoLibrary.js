import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { GET_VIDEOS } from '../utils/queries';
import { DELETE_VIDEO } from '../utils/mutations';
import { Card, CardContent, Typography, Button } from '@mui/material';

function VideoLibrary() {
    const [videos, setVideos] = useState([]);

    // Function to handle video deletion
    const handleDelete = async (videoId) => {
        try {
            console.log('Sending delete request for video ID:', videoId);
            const response = await axios.post('http://localhost:5001/graphql', {
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
        axios.post('http://localhost:5001/graphql', { query: GET_VIDEOS })
            .then(response => {
                setVideos(response.data.data.videos);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    return (
        <div>
            {videos.map(video => (
                <Card key={video.translatedVideo} style={{ margin: '10px' }}>
                    <CardContent>
                        <Typography variant="h5">{video.name}</Typography>
                        <Typography color="textSecondary">{video.url}</Typography> {/* Display the original YouTube URL */}

                        {/* Download button */}
                        <a href={`http://localhost:5001/download/${video.translatedVideo}`} download>
                            <Button variant="contained" color="primary">
                                Download
                            </Button>
                        </a>
                            <Button variant="contained" color="secondary" onClick={() => handleDelete(video._id)}>
                                Delete
                            </Button>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}

export default VideoLibrary;
