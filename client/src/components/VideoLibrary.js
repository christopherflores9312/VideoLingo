import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { GET_VIDEOS } from '../utils/queries';
import { DELETE_VIDEO } from '../utils/mutations';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Card, CssBaseline, CardContent, Typography, Button, styled } from '@mui/material';
import VideoPlayerCard from './VideoPlayerCard';  // Adjust the path accordingly

// Define the S3 bucket URL
const S3_BUCKET_URL = "https://videolingo.s3.us-west-1.amazonaws.com/videos/";

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


const StyledCard = styled(Card)({
    margin: '10px',
    padding: '10px',
    backgroundColor: '#424242',
    color: '#ffffff',
    '&:hover': {
        backgroundColor: '#303030',
    }
});

const DownloadButton = styled(Button)({
    backgroundColor: '#58cc02',
    fontFamily: 'MuseoSansRounded1000',
    color: '#000',
    marginRight: '10px',
    '&:hover': {
        backgroundColor: '#4aa902',
    }
});

const DeleteButton = styled(Button)({
    backgroundColor: '#d32f2f',
    fontFamily: 'MuseoSansRounded1000',
    color: '#ffffff',
    '&:hover': {
        backgroundColor: '#b71c1c',
    }
});

const ButtonContainer = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '1rem',  // To provide a little spacing between buttons
    marginTop: '1rem',
});


function VideoLibrary() {
    const [videos, setVideos] = useState([]);

    // Function to handle video deletion
    const handleDelete = async (videoId) => {
        try {
            const response = await axios.post(`${SERVER_URL}/graphql`, {
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
        axios.post(`${SERVER_URL}/graphql`, { query: GET_VIDEOS })
            .then(response => {
                setVideos(response.data.data.videos);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    return (
        <ThemeProvider theme={refinedDarkTheme}>
            <CssBaseline />

            <div>
                {videos.map(video => {
                    // Construct the full S3 URL for the video
                    const videoS3Url = `${video.translatedVideo}`;

                    return (
                        <StyledCard key={video._id}>
                            <CardContent>
                                <Typography variant="h5">{video.name}</Typography>
                                <Typography color="textSecondary">{video.url}</Typography>

                                {/* Video Playback */}
                                <VideoPlayerCard videoSrc={videoS3Url} />
                                <ButtonContainer>
                                    {/* Download button */}
                                    <a href={videoS3Url} download style={{ textDecoration: 'none' }}>
                                        <DownloadButton variant="contained">
                                            Download
                                        </DownloadButton>
                                    </a>

                                    {/* Delete button */}
                                    <DeleteButton variant="contained" onClick={() => handleDelete(video._id)}>
                                        Delete
                                    </DeleteButton>
                                </ButtonContainer>
                            </CardContent>
                        </StyledCard>
                    );
                })}
            </div>
        </ThemeProvider>
    );
}

export default VideoLibrary;
