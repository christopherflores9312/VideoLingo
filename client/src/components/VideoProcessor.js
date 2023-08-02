import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField } from '@mui/material';

function VideoProcessor() {
    const [url, setUrl] = useState('');
    const [video, setVideo] = useState(null);

    const processVideo = () => {
        axios.post('http://localhost:5000/video/process', { url })
            .then(response => {
                setVideo(response.data.video);
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

            {video && 
                <Button 
                    variant="contained" 
                    color="default"
                    href="http://localhost:5000/download" 
                    download
                >
                    Download Video
                </Button>
            }
        </div>
    );
}

export default VideoProcessor;