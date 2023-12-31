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
import VideoLibrary from './components/VideoLibrary';  // Import VideoLibrary component
import ContactUs from './components/ContactUs';
import About from './components/About';
import { styled } from '@mui/system';

const MainContainer = styled(Container)({
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
});

const ContentContainer = styled('div')({
  flex: 1,
});


function App() {
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);
  const [currentSection, setCurrentSection] = useState('Home'); // Define the new state variable and function here

  const handleClose = () => {
    setIsAuthDialogOpen(false);
  };

  return (
    <ApolloProvider client={client}>
      <AuthProvider handleClose={handleClose}>
        <Router>
          <Container component="main" maxWidth="lg">
            <MainContainer component="main" maxWidth="lg">

              <CssBaseline />
              <Header setCurrentSection={setCurrentSection} /> {/* Pass the function as a prop here */}
              <AuthContext.Consumer>
                {({ user }) => (
                  <AuthDialog open={isAuthDialogOpen} handleClose={handleClose} user={user} />
                )}
              </AuthContext.Consumer>
              <ContentContainer className="App-content">
                <Routes>
                  <Route path="/login" element={<Login handleClose={handleClose} />} />
                  <Route path="/signup" element={<Signup handleClose={handleClose} />} />
                  <Route path="/" element={<ProtectedContent showDialog={setIsAuthDialogOpen} currentSection={currentSection} />} />
                </Routes>
              </ContentContainer>
              <Footer />
            </MainContainer>
          </Container>
        </Router>
      </AuthProvider>
    </ApolloProvider>
  );
}



const ProtectedContent = ({ showDialog, currentSection }) => {
  const { user, loading } = useContext(AuthContext);
  const [video, setVideo] = useState(null);

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

  // Conditional rendering based on the currentSection
  if (currentSection === 'My Video Library') {
    return <VideoLibrary />;
  }
  if (currentSection === 'Contact Us') {
    return <ContactUs />;
  }

  if (currentSection === 'About Video Lingo') {
    return <About />;
  }
  // If user is not null, show the protected content
  return (
    <>
      <VideoProcessor onProcessVideo={setVideo} video={video} />
      {video && <VideoPlayerCard videoSrc={`${video}`} />}
      <br />
      <YouTubeCard />
    </>
  );
};


export default App;
