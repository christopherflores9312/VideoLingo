import React from 'react';
import { Card, CardContent, CardHeader, styled } from '@mui/material';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';

const StyledCard = styled(Card)({
  backgroundColor: '#424242',
  fontFamily: 'MuseoSansRounded1000',
  color: '#58cc02',
  marginTop: '20px',
});

const StyledCardHeader = styled(CardHeader)({
  backgroundColor: '#303030',
  '& .MuiCardHeader-title': {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const StyledIcon = styled(PlayCircleOutlineIcon)({
  marginLeft: '8px',
  color: '#58cc02',
});

function VideoPlayerCard({ videoSrc }) {
  return (
    <StyledCard>
      <StyledCardHeader
        title={
          <span style={{ fontFamily: 'MuseoSansRounded1000' }}>
            Translated Video
            <StyledIcon />
          </span>
        }
      />


      <CardContent sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <video width="50%" controls>
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </CardContent>

    </StyledCard>
  );
}

export default VideoPlayerCard;
