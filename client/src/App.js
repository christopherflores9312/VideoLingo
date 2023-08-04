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
import AuthModal from './components/AuthModal'; // Import the AuthModal component

function App() {
  const [video, setVideo] = useState(null);
  const [isAuthModalOpen, setAuthModalOpen] = useState(false); // Add state for modal visibility

  const openAuthModal = () => {
    setAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setAuthModalOpen(false);
  };

  const handleLogin = (email, password) => {
    // Handle login logic here (you can call your API to authenticate with JWT)
    console.log('Email:', email);
    console.log('Password:', password);
    // Once logged in, you can close the modal
    closeAuthModal();
  };

  const handleSignup = (email, password) => {
    // Handle signup logic here (you can call your API to register the user with JWT)
    console.log('Email:', email);
    console.log('Password:', password);
    // Once signed up, you can close the modal
    closeAuthModal();
  };

  return (
    <Container component="main" maxWidth="lg">
        <CssBaseline />  {/* Normalize CSS */}
        <Header />
        <div className="App-content">
        
        {/* Your existing content */}
        <YouTubeCard />
        <br />
        <VideoProcessor onProcessVideo={setVideo} video={video} />
        {video && <VideoPlayerCard videoSrc={`http://localhost:5000/download/${video}`} />}
        {/* End of existing content */}
        
        {/* Add the login/signup button */}
        <button onClick={openAuthModal}>Login/Signup</button>
        
        {/* Add the AuthModal component */}
        <AuthModal isOpen={isAuthModalOpen} onClose={closeAuthModal} onLogin={handleLogin} onSignup={handleSignup} />

        </div>

        <Footer />
      </Container>
  );
}

export default App;
