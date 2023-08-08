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
    Fade,
    styled
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
            default: '#000', // Dark grey, not black
            paper: '#424242',   // Slightly lighter grey
        },
        text: {
            primary: '#e0e0e0',  // Soft white
        },
    },
});

const StyledDiv = styled('div')({
    backgroundColor: '#424242',
    color: '#e0e0e0',
    padding: '20px',
    borderRadius: '5px',
  });

const CustomTextField = styled(TextField)({
    marginBottom: '10px',
});

const TranslateButton = styled(Button)({
    marginRight: '10px',
    fontFamily: 'MuseoSansRounded1000',
    backgroundColor: '#58cc02',
    '&:hover': {
        backgroundColor: '#4aa902',
    }
});

const DownloadButton = styled(Button)({
    backgroundColor: '#1976d2',
    fontFamily: 'MuseoSansRounded1000',
    color: '#ffffff',
    '&:hover': {
        backgroundColor: '#222',
    }
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
            <StyledDiv>
            <div style={{ padding: '20px' }}>
                <Fade in={true} timeout={500}>
                    <CustomTextField
                        fullWidth
                        label="Video Name"
                        variant="outlined"
                        value={videoName}
                        onChange={e => setVideoName(e.target.value)}
                    />
                </Fade>
                <Fade in={true} timeout={1000}>
                    <CustomTextField
                        fullWidth
                        label="Video URL"
                        variant="outlined"
                        value={url}
                        onChange={e => setUrl(e.target.value)}
                    />
                </Fade>
                <Fade in={true} timeout={1500}>
                    <TranslateButton
                        variant="contained"
                        onClick={() => processVideo()}
                        disabled={loading}
                    >
                        Translate Video
                    </TranslateButton>
                </Fade>
                {video &&
                    <Fade in={true} timeout={2000}>
                        <DownloadButton
                            variant="contained"
                            href={`${video}`}
                            download
                        >
                            Download Video
                        </DownloadButton>
                    </Fade>
                }
                {loading && <LinearProgress />}
            </div>
            </StyledDiv>
        </ThemeProvider>
    );
}


export default VideoProcessor;