import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { PROCESS_VIDEO } from '../utils/mutations';
import LinearProgress from '@mui/material/LinearProgress';
import { AuthContext } from './AuthContext'; // if you're using AuthContext.js
import {
    Button,
    TextField,
    CssBaseline,
    ThemeProvider,
    createTheme,
    Fade
} from '@mui/material';

const SERVER_URL = process.env.NODE_ENV === 'production'
    ? 'https://videolingo-4a86a4dabd29.herokuapp.com'
    : 'http://localhost:5001';

const refinedDarkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#90caf9',  // Soft blue
        },
        secondary: {
            main: '#f48fb1',  // Soft pink
        },
        background: {
            default: '#303030', // Dark grey, not black
            paper: '#424242',   // Slightly lighter grey
        },
        text: {
            primary: '#e0e0e0',  // Soft white
        },
    },
});


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
        <ThemeProvider theme={refinedDarkTheme}>
            <CssBaseline />
            <div style={{ padding: '20px' }}>
                <Fade in={true} timeout={500}>
                    <TextField
                        fullWidth
                        label="Video Name"
                        variant="outlined"
                        value={videoName}
                        onChange={e => setVideoName(e.target.value)}
                        style={{ marginBottom: 10 }}
                    />
                </Fade>
                <Fade in={true} timeout={1000}>
                    <TextField
                        fullWidth
                        label="Video URL"
                        variant="outlined"
                        value={url}
                        onChange={e => setUrl(e.target.value)}
                        style={{ marginBottom: 10 }}
                    />
                </Fade>
                <Fade in={true} timeout={1500}>
                    <Button
                        variant="contained"
                        color="primary"
                        style={{ marginRight: 10 }}
                        onClick={() => processVideo()}
                        disabled={loading}
                    >
                        Translate Video
                    </Button>
                </Fade>
                {video &&
                    <Fade in={true} timeout={2000}>
                        <Button
                            variant="contained"
                            color="secondary"
                            href={`${video}`}
                            download
                        >
                            Download Video
                        </Button>
                    </Fade>
                }
                {loading && <LinearProgress />}
            </div>
        </ThemeProvider>
    );
}


export default VideoProcessor;