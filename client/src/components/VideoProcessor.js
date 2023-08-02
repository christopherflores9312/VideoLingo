import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField } from '@mui/material';
import { PROCESS_VIDEO } from '../utils/mutations';

function VideoProcessor({ onProcessVideo }) {  // Changed setVideoUrl to onProcessVideo
    const [url, setUrl] = useState('');

    const processVideo = () => {
        const variables = { url };

        axios.post('http://localhost:5000/graphql', { query: PROCESS_VIDEO, variables })
            .then(response => {
                const videoUrl = response.data.data.processVideo.url;
                onProcessVideo(videoUrl);  // Changed setVideoUrl to onProcessVideo
            })
            .catch(error => {
                console.error(error);
            });
    }

    return (
        <div>
            <TextField
                fullWidth
                label="Video URL"
                variant="outlined"
                value={url}
                onChange={e => setUrl(e.target.value)}
                style={{ marginBottom: 10 }}
            />

            <Button
                variant="contained"
                color="primary"
                style={{ marginRight: 10 }}
                onClick={processVideo}
            >
                Process Video
            </Button>
        </div>
    );
}

export default VideoProcessor;
