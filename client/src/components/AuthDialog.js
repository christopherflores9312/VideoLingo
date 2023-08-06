import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Login from './Login';
import Signup from './Signup';
import Button from '@mui/material/Button';

const AuthDialog = ({ open, handleClose, user }) => {
  const [isLogin, setIsLogin] = useState(true);

  const switchForm = () => {
    setIsLogin(!isLogin);
  };

  return (
    <Dialog open={open} onClose={user ? handleClose : null}>
      <DialogTitle>{isLogin ? 'Login' : 'Sign Up'}</DialogTitle>
      <DialogContent>
        {isLogin ? <Login handleClose={handleClose} /> : <Signup handleClose={handleClose} />}
      </DialogContent>
      <Button color="primary" onClick={switchForm}>
        Switch to {isLogin ? 'Sign Up' : 'Login'}
      </Button>
    </Dialog>
  );
};

export default AuthDialog;
