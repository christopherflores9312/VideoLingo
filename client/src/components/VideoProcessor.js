import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField } from '@mui/material';
import { PROCESS_VIDEO } from '../utils/mutations';
import LinearProgress from '@mui/material/LinearProgress';
import YouTube from './YouTube';

function VideoProcessor({ onProcessVideo, video }) {  // Changed setVideoUrl to onProcessVideo
    const [url, setUrl] = useState('');
    const [loading, setLoading] = useState(false);

    const processVideo = () => {
        const variables = { url };
        setLoading(true);  // Start the loading
        
        axios.post('http://localhost:5001/graphql', { query: PROCESS_VIDEO, variables })
            .then(response => {
                const videoUrl = response.data.data.processVideo.url;
                onProcessVideo(videoUrl);  // Changed setVideoUrl to onProcessVideo
                setLoading(false);  // Stop the loading

            })
            .catch(error => {
                console.error(error);
                setLoading(false);  // Stop the loading in case of error
            });
    }

    return (
        <div>
            <YouTube /> 
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
                disabled={loading}  // Disable the button when loading
            >
                Process Video
            </Button>
            
            {video &&
                <Button
                    variant="contained"
                    color="secondary"
                    href={`http://localhost:5001/download/${video}`}
                    download
                >
                    Download Video
                </Button>
            }
            {loading && <LinearProgress />} {/* Show the loading bar if loading is true */}
        </div>
    );
}

export default VideoProcessor;
