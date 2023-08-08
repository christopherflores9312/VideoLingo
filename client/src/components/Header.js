import React from 'react';
import Navigation from './Navigation';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import styles from '../styles/header.module.css';  // Import the CSS module

function Header({ setCurrentSection }) {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" className={styles.headerTitle}>
          Video Lingo
        </Typography>
        <Navigation setCurrentSection={setCurrentSection} />
      </Toolbar>
    </AppBar>
  );
}

export default Header;
