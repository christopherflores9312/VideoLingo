import React from 'react';
import { Typography, styled, ThemeProvider, createTheme, CssBaseline } from '@mui/material';

const refinedDarkTheme = createTheme({
  palette: {
    // ... other properties
    background: {
      default: '#000', // This is white
    },
  },
});

const StyledDiv = styled('div')({
  backgroundColor: '#424242',
  color: '#e0e0e0',
  padding: '20px',
  borderRadius: '5px',
});

const StyledHeader = styled(Typography)({
  fontFamily: 'MuseoSansRounded1000',
  fontSize: '2.5rem',
  color: '#58cc02',
  marginBottom: '1rem',
});

const StyledParagraph = styled(Typography)({
  marginBottom: '1rem',
});

const StyledList = styled('ul')({
  paddingLeft: '20px',
  '& li': {
    marginBottom: '0.5rem',
  },
});

function About() {
  return (
    <ThemeProvider theme={refinedDarkTheme}>
      <CssBaseline />
      <StyledDiv>
        <StyledHeader variant="h1">About Video Lingo</StyledHeader>
        <StyledParagraph>
          Video Lingo is a cutting-edge platform that enables users to translate YouTube videos to Spanish. By leveraging advanced video processing and speech-to-text technologies, Video Lingo offers seamless video translation that enhances accessibility and engagement.
        </StyledParagraph>
        <StyledParagraph>With Video Lingo, you can:</StyledParagraph>
        <StyledList>
          <li>Translate videos into multiple languages.</li>
          <li>Access your translated videos in the Video Library.</li>
          <li>Share translated content with a global audience.</li>
          <li>Download your translated videos for unlimited viewing.</li>
          <li>Maintain your personal Video Library with the ability to delete videos no longer needed.</li>
        </StyledList>
        <StyledParagraph>
          Join us today and explore the new dimensions of video communication with Video Lingo!
        </StyledParagraph>
      </StyledDiv>
    </ThemeProvider>
  );
}

export default About;
