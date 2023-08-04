import React, { useState } from 'react';
import { Card, CardContent, CardHeader, TextField, Button } from '@mui/material';

function YouTubeCard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [videoList, setVideoList] = useState([]);

  const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

  const handleSearch = async () => {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=${searchTerm}&key=${API_KEY}`
    );
    const data = await response.json();
    setVideoList(data.items);
  };

  return (
    <Card>
      <CardHeader title="Search YouTube" />
      <CardContent>
        <TextField
          label="Search"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleSearch}>
          Search
        </Button>
        {videoList.map((video) => (
          <iframe
            key={video.id.videoId}
            width="100%"
            height="315"
            src={`https://www.youtube.com/embed/${video.id.videoId}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen>
          </iframe>
        ))}
      </CardContent>
    </Card>
  );
}

export default YouTubeCard;
