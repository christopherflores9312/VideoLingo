import React from 'react';
import Button from '@mui/material/Button';

function Navigation({ setCurrentSection }) {
  return (
    <div>
      {['Home', 'About Video Lingo', 'My Video Library', 'Contact Us'].map(section => (
        <Button 
          key={section}
          onClick={() => setCurrentSection(section)}
          color="inherit"
        >
          {section}
        </Button>
      ))}
    </div>
  );
}

export default Navigation;