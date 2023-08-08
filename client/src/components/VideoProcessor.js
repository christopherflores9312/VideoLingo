import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Button, TextField } from '@mui/material';
import { PROCESS_VIDEO } from '../utils/mutations';
import LinearProgress from '@mui/material/LinearProgress';
import { AuthContext } from './AuthContext'; // if you're using AuthContext.js

const SERVER_URL = process.env.NODE_ENV === 'production' 
                   ? 'https://videolingo-4a86a4dabd29.herokuapp.com' 
                   : 'http://localhost:5001';

function VideoProcessor({ onProcessVideo, video, initialUrl }) {
    const [url, setUrl] = useState('');
    const [videoName, setVideoName] = useState(''); // New state for video name
    const [loading, setLoading] = useState(false);

    const { user } = useContext(AuthContext); // get the user from AuthContext

    useEffect(() => {
        if (initialUrl) {
            setUrl(initialUrl);
            processVideo(initialUrl);
        }
    }, [initialUrl]);

    const processVideo = (videoUrl = url) => {
        const variables = { url: videoUrl, name: videoName, userId: user.id };  // Include userId
        setLoading(true);
        console.log('Sending video processing request with variables:', variables); //remember to remove
        axios.post(`${SERVER_URL}/graphql`, { query: PROCESS_VIDEO, variables })
            .then(response => {
                const videoUrl = response.data.data.processVideo.url;
                console.log('Received server response:', response.data); //remember to remove
                onProcessVideo(videoUrl);
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setLoading(false);
            });
    }

    return (
        <div>
            <TextField
                fullWidth
                label="Video Name"
                variant="outlined"
                value={videoName}
                onChange={e => setVideoName(e.target.value)}
                style={{ marginBottom: 10 }}
            />
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
                onClick={() => processVideo()}
                disabled={loading}
            >
                Translate Video
            </Button>
            
            {video &&
                <Button
                    variant="contained"
                    color="secondary"
                    href={`${SERVER_URL}/download/${video}`}
                    download
                >
                    Download Video
                </Button>
            }
            {loading && <LinearProgress />}
        </div>
    );
}

export default VideoProcessor;