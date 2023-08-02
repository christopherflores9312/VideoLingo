import React from 'react';
import logo from './logo.svg';
import Header from './components/Header';
import Navigation from './components/Navigation'; 
import Footer from './components/Footer';
import VideoProcessor from './components/VideoProcessor';  // Import VideoProcessor
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="App-content">
       
       
        <VideoProcessor />  {/* Include the VideoProcessor component here */}
      </div>
      <Footer />
    </div>
  );
}

export default App;