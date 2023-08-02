import React, { useState } from 'react';
import { Card, CardContent, CardHeader, TextField, Button } from '@mui/material';

function YouTubeCard() {
  const [youtubeUrl, setYoutubeUrl] = useState('');

  function getYoutubeVideoId(url) {
    const match = url.match(/v=([a-zA-Z0-9_-]{11})/);
    return match ? match[1] : null;
  }

  return (
    <Card>
      <CardHeader title="Search YouTube" />
      <CardContent>
        <Button 
          variant="contained" 
          color="primary" 
          style={{ marginBottom: 10 }}
          onClick={() => {
            window.open(`https://www.youtube.com/`, '_blank');
          }}
        >
          Open YouTube
        </Button>
        
        
        {youtubeUrl && 
          <iframe 
            width="100%" 
            height="315" 
            src={`https://www.youtube.com/embed/${getYoutubeVideoId(youtubeUrl)}`} 
            title="YouTube video player" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen>
          </iframe>
        }
      </CardContent>
    </Card>
  );
}

export default YouTubeCard;