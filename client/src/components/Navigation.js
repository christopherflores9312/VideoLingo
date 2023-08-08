import React, { useContext } from 'react';
import Button from '@mui/material/Button';
import { AuthContext } from './AuthContext';  // Import AuthContext
import { styled } from '@mui/system';


const PrimaryButton = styled(Button)({
  fontFamily: 'MuseoSansRounded1000',
  backgroundColor: '#58cc02',
  color: '#000',
  border: 'solid 1px #ffffff',
  padding: '10px 20px',
  borderRadius: '5px',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease-in-out',
  '&:hover': {
    backgroundColor: '#4aa902',
  },
});

const SecondaryButton = styled(Button)({
  fontFamily: 'MuseoSansRounded1000',
  backgroundColor: '#333',
  color: '#ffffff',
  border: 'solid 1px #ffffff',
  padding: '10px 20px',
  borderRadius: '5px',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease-in-out',
  '&:hover': {
    backgroundColor: '#222',
  },
});


function Navigation({ setCurrentSection }) {
  const auth = useContext(AuthContext);
  
  const isAuthenticated = auth.user && auth.user.id && auth.user.username;

  const handleAuthClick = () => {
    if (isAuthenticated) {
      auth.logout();
    } else {
      // You might want to navigate to the login page or handle the login action here
    }
  };

  return (
    <div>
      {['Home', 'About Video Lingo', 'My Video Library', 'Contact Us'].map(section => (
        <PrimaryButton
          key={section}
          onClick={() => setCurrentSection(section)}
          color="inherit"
        >
          {section}
        </PrimaryButton>
      ))}
      <SecondaryButton color="inherit" onClick={handleAuthClick}>
        {isAuthenticated ? 'Logout' : 'Login'}
      </SecondaryButton>
    </div>
  );
}


export default Navigation;