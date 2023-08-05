import React, { createContext, useState, useEffect, useCallback } from 'react';
import { useMutation, useQuery, gql } from '@apollo/client';
import { useApolloClient } from '@apollo/client';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(() => localStorage.getItem('authToken'));
  const [user, setUser] = useState(null);

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

  const VERIFY_USER_QUERY = gql`
    query VerifyUser($token: String!) {
      verifyUser(token: $token) {
        id
        username
      }
    }
  `;

  const [login] = useMutation(LOGIN_MUTATION);
  const { loading, data, error } = useQuery(VERIFY_USER_QUERY, {
    variables: { token: authToken },
    skip: !authToken,
  });

  const client = useApolloClient();
  const signIn = useCallback(async (username, password, token) => {
    if (token) {
      // Store the token directly
      setAuthToken(token);
      localStorage.setItem('authToken', token);
      // Fetch the user info using the token
      const { data } = await client.query({
        query: VERIFY_USER_QUERY,
        variables: { token },
      });
      setUser(data.verifyUser);
    } else {
      // Perform the login mutation
      try {
        const { data } = await login({ variables: { username, password } });
        const { token, user } = data.login;
    
        setUser(user);
        setAuthToken(token);
        localStorage.setItem('authToken', token);
    
        return { success: true };
      } catch (error) {
        return { success: false, message: error.message };
      }
    }
  }, [login, client]);
  

  const logout = () => {
    setAuthToken(null);
    setUser(null);
    localStorage.removeItem('authToken');
  };

  const initializeAuth = useCallback(() => {
    if (!loading && data && !error) {
      setUser(data.verifyUser);
    }
  }, [loading, data, error]);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  return (
    <AuthContext.Provider value={{ authToken, user, signIn, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
