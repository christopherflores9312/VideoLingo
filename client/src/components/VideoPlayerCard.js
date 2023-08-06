import React from 'react';
import { Card, CardContent, CardHeader } from '@mui/material';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';

function VideoPlayerCard({ videoSrc }) {
  return (
    <Card>
      <CardHeader
        title={
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            Translated Video
            <PlayCircleOutlineIcon style={{ marginLeft: '8px' }} />
          </div>
        }
      />

      <CardContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <video width="30%" controls>
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </CardContent>

    </Card>
  );
}

export default VideoPlayerCard;