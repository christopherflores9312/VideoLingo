import React, { createContext, useState, useEffect, useCallback } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(() => localStorage.getItem('authToken'));
  const [user, setUser] = useState(null);

  const signIn = useCallback(async (username, password) => {
    // Here should be your authentication logic.
    // For now, let's suppose that it's a success and set the user.
    setUser({ username });
  }, []);

  const logout = () => {
    setAuthToken(null);
    setUser(null);
    localStorage.removeItem('authToken');
  };

  const initializeAuth = useCallback(() => {
    // Check for a valid token in local storage
    const token = localStorage.getItem('authToken');
    if (token) {
      // Here you need to verify the token and fetch the user info
      // For now, let's suppose that it's a success and set the user.
      setUser({ username: 'test' });
    }
  }, []);

  // Initialize auth when the application loads
  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  return (
    <AuthContext.Provider value={{ authToken, user, signIn, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
