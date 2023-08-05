import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import Header from './components/Header';
import Navigation from './components/Navigation'; 
import Footer from './components/Footer';
import VideoProcessor from './components/VideoProcessor';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import YouTubeCard from './components/YouTube';
import VideoPlayerCard from './components/VideoPlayerCard';
import VideoLibrary from './components/VideoLibrary'; // New import

function App() {
  const [video, setVideo] = useState(null);
  const [currentSection, setCurrentSection] = useState("Home"); // Default to "Home"
  const [initialUrl, setInitialUrl] = useState(null);

  useEffect(() => {
    // Extract video URL from the path, if present
    const pathParts = window.location.pathname.split('/');
    if (pathParts[1] === 'home' && pathParts.length > 2) {
      setInitialUrl(decodeURIComponent(pathParts[2]));
      setCurrentSection('Home');
    }
  }, []);

  return (
    <Container component="main" maxWidth="lg">
        <CssBaseline />  {/* Normalize CSS */}
        <Header setCurrentSection={setCurrentSection} />
       
        <div className="App-content">
        
            {
                currentSection === "Home" && (
                    <>
                        <YouTubeCard />
                        <br />
                        <VideoProcessor onProcessVideo={setVideo} video={video} initialUrl={initialUrl} />
                        {video && <VideoPlayerCard videoSrc={`http://localhost:5001/download/${video}`} />}
                    </>
                )
            }

            {
                currentSection === "My Video Library" && <VideoLibrary />
            }

        </div>
        <Footer />
    </Container>
  );
}

export default App;