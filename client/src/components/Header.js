import React from 'react';
import Navigation from './Navigation';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';

const HeaderTitle = styled(Typography)({
  fontFamily: 'MuseoSansRounded1000',
  fontSize: '2.5rem',
  color: '#58cc02',
  margin: 0,
  padding: 0,
  textAlign: 'left',
  marginBottom: '1rem',
  flexGrow: 1,
});

function Header({ setCurrentSection }) {
  return (
    <AppBar position="static">
      <Toolbar>
        <HeaderTitle variant="h6">
          Video Lingo
        </HeaderTitle>
        <Navigation setCurrentSection={setCurrentSection} />
      </Toolbar>
    </AppBar>
  );
}

export default Header;
