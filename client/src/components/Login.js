import React, { useState, useContext } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useFormik } from 'formik';
import { AuthContext } from './AuthContext';  // Import AuthContext
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

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

const Login = ({ handleClose }) => {
    const [loginMutation, { data }] = useMutation(LOGIN_MUTATION);
    const { signIn } = useContext(AuthContext);  // Get signIn function from AuthContext
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (username, password) => {
        const { success } = await signIn(username, password);
        if (success) {
          handleClose();
        }
      };

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        onSubmit: async (values) => {
            setLoading(true);  // Set loading to true before calling signIn
            try {
                const response = await loginMutation({ variables: values });
                console.log(response.data.login);
                const { success } = await signIn(null, null, response.data.login.token);  // Store JWT in AuthContext and local storage
                if (success) {
                    navigate('/');  // Navigate to /process after successful sign in
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);  // Set loading to false after signIn is done
            }
        },
    });


    return (
        <Box component="form" onSubmit={formik.handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoFocus
            onChange={formik.handleChange}
            value={formik.values.username}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            onChange={formik.handleChange}
            value={formik.values.password}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Submit'}
          </Button>
        </Box>
      );
    };

export default Login;
