import React, { useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';

const AuthModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const handleAuth = async () => {
    try {
      const endpoint = isLogin ? '/login' : '/signup';
      const response = await axios.post(endpoint, { email, password });
      // Handle successful authentication and JWT token storage
    } catch (error) {
      // Handle authentication error
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose}>
      <h2>{isLogin ? 'Login' : 'Signup'}</h2>
      <form>
        <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="button" onClick={handleAuth}>
          {isLogin ? 'Login' : 'Signup'}
        </button>
        <p onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Create an account' : 'Already have an account?'}
        </p>
      </form>
    </Modal>
  );
};

export default AuthModal;
