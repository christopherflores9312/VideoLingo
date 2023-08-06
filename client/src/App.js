import React, { useEffect, useState, useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
import AuthDialog from './components/AuthDialog';  // Import AuthDialog component


function App() {
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);

  const handleClose = () => {
    setIsAuthDialogOpen(false);
  };

  return (
    <ApolloProvider client={client}>
      <AuthProvider handleClose={handleClose}>
        <Router>
          <Container component="main" maxWidth="lg">
            <CssBaseline />
            <Header />
            <AuthContext.Consumer>
              {({ user }) => (
                <AuthDialog open={isAuthDialogOpen} handleClose={handleClose} user={user} />
              )}
            </AuthContext.Consumer>
            <div className="App-content">
              <Routes>
                <Route path="/login" element={<Login handleClose={handleClose} />} />
                <Route path="/signup" element={<Signup handleClose={handleClose} />} />
                <Route path="/process" element={<ProtectedContent showDialog={setIsAuthDialogOpen} />} />
                <Route path="/" element={<ProtectedContent showDialog={setIsAuthDialogOpen} />} />
              </Routes>
            </div>
            <Footer />
          </Container>
        </Router>
      </AuthProvider>
    </ApolloProvider>
  );
}



const ProtectedContent = ({ showDialog }) => {
  const { user, loading } = useContext(AuthContext);
  const [video, setVideo] = useState(null);
  console.log('User in ProtectedContent:', user);

  useEffect(() => {
    // If user is null, open the authentication dialog
    if (!user) {
      showDialog(true);
    }
  }, [user, showDialog]);

  // If still loading, show a loading spinner or other placeholder
  if (loading) {
    return <div>Loading...</div>;
  }

  // If user is not null, show the protected content
  return (
    <>
      <YouTubeCard />
      <br />
      <VideoProcessor onProcessVideo={setVideo} video={video} />
      {video && <VideoPlayerCard videoSrc={`http://localhost:5001/download/${video}`} />}
    </>
  );
};


export default App;
