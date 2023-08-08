import React, { useState } from 'react';
import { Card, CardContent, CardHeader, TextField, Button, styled } from '@mui/material';

const StyledCard = styled(Card)({
    backgroundColor: '#424242',
    color: '#e0e0e0',
    marginTop: '20px',
    marginBottom: '20px',
});

const SearchButton = styled(Button)({
    backgroundColor: '#58cc02',
    fontFamily: 'MuseoSansRounded1000',
    color: '#000',
    '&:hover': {
        backgroundColor: '#4aa902',
    }
});

const StyledTextField = styled(TextField)({
  '& label.Mui-focused': {
      color: 'black',
  },
  '& .MuiInput-underline:after': {
      borderBottomColor: 'black',
  },
  '& .MuiOutlinedInput-root': {
      '& fieldset': {
          borderColor: 'black',
      },
      '&:hover fieldset': {
          borderColor: 'black',
      },
      '&.Mui-focused fieldset': {
          borderColor: 'black',
      },
      backgroundColor: '#c3c3c3',
  },
  '& .MuiInputBase-input': {
      color: 'black',
      fontFamily: 'MuseoSansRounded1000',
  },
});

function YouTubeCard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [videoList, setVideoList] = useState([]);

  const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

  const handleSearch = async () => {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=9&q=${searchTerm}&type=video&videoDuration=short&key=${API_KEY}`
    );
    const data = await response.json();
    setVideoList(data.items);
  };

  return (
    <StyledCard>
      <CardHeader title="Search YouTube" />
      <CardContent>
        <StyledTextField
          label="Search"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}          
          style={{ marginBottom: 10 }}
        />
        <br />
        <SearchButton style={{ marginBottom: 10 }} variant="contained" onClick={handleSearch}>
          Search
        </SearchButton>
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
    </StyledCard>
  );
}

export default YouTubeCard;
