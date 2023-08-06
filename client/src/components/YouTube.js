import React, { useState } from 'react';
import { Card, CardContent, CardHeader, TextField, Button } from '@mui/material';

function YouTubeCard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [videoList, setVideoList] = useState([]);

  const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

  console.log("API_KEY Hello:", API_KEY);

  const handleSearch = async () => {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=9&q=${searchTerm}&type=video&videoDuration=short&key=${API_KEY}`
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
        <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between'}}>
  {videoList && videoList.map((video, index) => (
    <div key={video.id.videoId || index} style={{flexBasis: '30%', height: '0', paddingBottom: '15%', position: 'relative', marginBottom: '2%'}}>
      <iframe
        key={video.id.videoId}
        style={{position: 'absolute', top: '0', left: '0', width: '100%', height: '100%'}}
        src={`https://www.youtube.com/embed/${video.id.videoId}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen>
      </iframe>
    </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
  
}

export default YouTubeCard;
