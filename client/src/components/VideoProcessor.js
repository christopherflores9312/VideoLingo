import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField } from '@mui/material';
import { PROCESS_VIDEO } from '../utils/mutations';

function VideoProcessor() {
    const [url, setUrl] = useState('');
    const [video, setVideo] = useState(null);

    const processVideo = () => {
        const variables = { url };

        axios.post('http://localhost:5000/graphql', { query: PROCESS_VIDEO, variables })
            .then(response => {
                const video = response.data.data.processVideo;
                setVideo(video.url);
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
                    color="secondary"
                    href={`http://localhost:5000/download/${video}`}
                    download
                >
                    Download Video
                </Button>
            }
        </div>
    );
}

export default VideoProcessor;