import React from 'react';
import Navigation from './Navigation';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

function Header({ setCurrentSection }) {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Video Lingo
        </Typography>
        <Navigation setCurrentSection={setCurrentSection} />
      </Toolbar>
    </AppBar>
  );
}

export default Header;