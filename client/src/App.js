import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import logo from './logo.svg';
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
          <Switch>
            <Route path="/login" component={Login} />  {/* Add a route for login */}
            <Route path="/signup" component={Signup} />  {/* Add a route for signup */}
            <ProtectedRoute path="/process">  {/* Add a protected route for processing the video */}
              <YouTubeCard />
              <br />
              <VideoProcessor onProcessVideo={setVideo} video={video} />
              {video && <VideoPlayerCard videoSrc={`http://localhost:5001/download/${video}`} />}
            </ProtectedRoute>
          </Switch>
        </div>
        <Footer />
      </Container>
    </Router>
  );
}

export default App;