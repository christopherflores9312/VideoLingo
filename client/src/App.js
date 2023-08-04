import React, { useState } from 'react';
import logo from './logo.svg';
import Header from './components/Header';
import Navigation from './components/Navigation'; 
import Footer from './components/Footer';
import VideoProcessor from './components/VideoProcessor';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import YouTubeCard from './components/YouTube';
import VideoPlayerCard from './components/VideoPlayerCard';

function App() {
  const [video, setVideo] = useState(null);

  return (
    <Container component="main" maxWidth="lg">
        <CssBaseline />  {/* Normalize CSS */}
        <Header />
        <div className="App-content">
        
        
        <YouTubeCard />
        <br />
        <VideoProcessor onProcessVideo={setVideo} video={video} />
        {video && <VideoPlayerCard videoSrc={`http://localhost:5001/download/${video}`} />}

        </div>

        <Footer />
      </Container>
  );
}

export default App;