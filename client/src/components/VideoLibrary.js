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

    const viewVideo = (processedUrl) => {
        window.location.href = `/home/${encodeURIComponent(processedUrl)}`;
    };

    return (
        <div>
            {videos.map(video => (
                <Card key={video.processedUrl} style={{ margin: '10px' }}>
                    <CardContent>
                        <Typography variant="h5">{video.name}</Typography>
                        <Typography color="textSecondary">{video.processedUrl}</Typography>
                        <Button onClick={() => viewVideo(video.processedUrl)}>View</Button>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}

export default VideoLibrary;