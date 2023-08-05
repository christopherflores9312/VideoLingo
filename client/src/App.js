import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import VideoProcessor from './components/VideoProcessor';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import YouTubeCard from './components/YouTube';
import VideoPlayerCard from './components/VideoPlayerCard';
import ProtectedRoute from './components/ProtectedRoute';  // Import ProtectedRoute
import Login from './components/Login';  // Import Login component
import Signup from './components/Signup';  // Import Signup component

function App() {
  const [video, setVideo] = useState(null);

  return (
    <Router>
      <Container component="main" maxWidth="lg">
        <CssBaseline />  {/* Normalize CSS */}
        <Header />
        <div className="App-content">
          <Routes>
            <Route path="/login" element={<Login />} />  {/* Add a route for login */}
            <Route path="/signup" element={<Signup />} />  {/* Add a route for signup */}
            <Route path="/process" element={
              <ProtectedRoute>
                <YouTubeCard />
                <br />
                <VideoProcessor onProcessVideo={setVideo} video={video} />
                {video && <VideoPlayerCard videoSrc={`http://localhost:5001/download/${video}`} />}
              </ProtectedRoute>
            } />
          </Routes>
        </div>
        <Footer />
      </Container>
    </Router>
  );
}

export default App;
