import React from 'react';
import { Card, CardContent, CardHeader } from '@mui/material';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';

function VideoPlayerCard({ videoSrc }) {
  return (
    <Card>
      <CardHeader
        title="Processed Video"
        action={
          <PlayCircleOutlineIcon />
        }
      />
      <CardContent>
        <video width="100%" controls>
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </CardContent>
    </Card>
  );
}

export default VideoPlayerCard;