import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { GET_VIDEOS } from '../utils/queries';
import { Card, CardContent, Typography, Button } from '@mui/material';

function VideoLibrary() {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        axios.post('http://localhost:5001/graphql', { query: GET_VIDEOS })
            .then(response => {
                setVideos(response.data.data.videos);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const viewVideo = (translatedVideo) => {
        const videoPath = `http://localhost:5001/download/${translatedVideo}`;
        window.location.href = `/home/${encodeURIComponent(videoPath)}`;
    };

    return (
        <div>
            {videos.map(video => (
                <Card key={video.translatedVideo} style={{ margin: '10px' }}>
                    <CardContent>
                        <Typography variant="h5">{video.name}</Typography>
                        <Typography color="textSecondary">{video.url}</Typography> {/* Display the original YouTube URL */}
                        <Button onClick={() => viewVideo(video.translatedVideo)}>View</Button>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}

export default VideoLibrary;
