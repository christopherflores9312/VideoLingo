import React, { useContext } from 'react';
import Button from '@mui/material/Button';
import { AuthContext } from './AuthContext';  // Import AuthContext

function Navigation({ setCurrentSection }) {
  const { logout } = useContext(AuthContext);  // Get signOut function from AuthContext

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
      <Button color="inherit" onClick={logout}>Logout</Button>  {/* Add Logout button */}
    </div>
  );
}

export default Navigation;