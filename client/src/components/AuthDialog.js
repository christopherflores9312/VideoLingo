import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import Login from './Login';
import Signup from './Signup';

const AuthDialog = ({ open, handleClose, user }) => {
  const [isLogin, setIsLogin] = useState(true);

  const switchForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <Dialog open={open} onClose={user ? handleClose : null}>
      {isLogin ? <Login /> : <Signup />}
      <button onClick={switchForm}>
        Switch to {isLogin ? 'Signup' : 'Login'}
      </button>
    </Dialog>
  );
};


export default AuthDialog;
