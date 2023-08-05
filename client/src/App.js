import React, { useState, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import VideoProcessor from './components/VideoProcessor';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import YouTubeCard from './components/YouTube';
import VideoPlayerCard from './components/VideoPlayerCard';
import Login from './components/Login';  // Import Login component
import Signup from './components/Signup';  // Import Signup component
import { AuthProvider, AuthContext } from './components/AuthContext';
import { ApolloProvider } from '@apollo/client';
import client from './apolloClient';
import DebugUser from './components/DebugUser';

function App() {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <Router>
          <Container component="main" maxWidth="lg">
            <CssBaseline />
            <Header />
            <div className="App-content">
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/process" element={<ProtectedContent />} />
              </Routes>
            </div>
            <Footer />
          </Container>
        </Router>
      </AuthProvider>
    </ApolloProvider>
  );
}

const ProtectedContent = () => {
  const context = useContext(AuthContext);
  console.log('Context in ProtectedContent:', context);

  const { user } = context;
  const [video, setVideo] = useState(null);


  return (
    <>
      <DebugUser /> {/* Add DebugUser here */}
      {user ? (
        <>
          <YouTubeCard />
          <br />
          <VideoProcessor onProcessVideo={setVideo} video={video} />
          {video && <VideoPlayerCard videoSrc={`http://localhost:5001/download/${video}`} />}
        </>
      ) : (
        <Navigate to="/login" replace />
      )}
    </>
  );
};

export default App;
