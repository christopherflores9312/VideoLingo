import React from 'react';
import logo from './logo.svg';
import Header from './components/Header';
import Navigation from './components/Navigation'; 
import Footer from './components/Footer';
import VideoProcessor from './components/VideoProcessor';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';

function App() {
  return (
  <Container component="main" maxWidth="lg">
      <CssBaseline />  {/* Normalize CSS */}
      <Header />
     
       
      <VideoProcessor />
      <Footer />
    </Container>
  );
}

export default App;