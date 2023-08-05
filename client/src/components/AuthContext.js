import React, { createContext, useState, useEffect, useCallback } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useApolloClient } from '@apollo/client';

export const AuthContext = createContext();

const VERIFY_USER_QUERY = gql`
  query VerifyUser($token: String!) {
    verifyUser(token: $token) {
      id
      username
    }
  }
`;

const LOGIN_MUTATION = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        id
        username
      }
    }
  }
`;

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(() => localStorage.getItem('authToken'));
  const [user, setUser] = useState(null);
  const client = useApolloClient();
  const [login] = useMutation(LOGIN_MUTATION);

  const initializeAuth = useCallback(async () => {
    if (authToken) {
      try {
        const { data } = await client.query({
          query: VERIFY_USER_QUERY,
          variables: { token: authToken },
        });
        setUser(data.verifyUser);
        console.log('User set in initializeAuth:', data.verifyUser);
      } catch (error) {
        console.error('Error in initializeAuth:', error.message);
        // Clear the token if it's invalid
        setAuthToken(null);
        localStorage.removeItem('authToken');
      }
    }
  }, [authToken, client]);
  

  const signIn = useCallback(async (username, password, token) => {
    if (token) {
      setAuthToken(token);
      localStorage.setItem('authToken', token);
    } else {
      try {
        const { data } = await login({ variables: { username, password } });
        const { token } = data.login;
        setAuthToken(token);
        localStorage.setItem('authToken', token);
      } catch (error) {
        console.error(error);
        return { success: false, message: error.message };
      }
    }
    await initializeAuth(); // Call initializeAuth after signIn
    return { success: true };
  }, [login, initializeAuth]); // Add initializeAuth as dependency

  const logout = () => {
    setAuthToken(null);
    setUser(null);
    localStorage.removeItem('authToken');
  };

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  return (
    <AuthContext.Provider value={{ authToken, user, signIn, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
