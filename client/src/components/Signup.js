import React, { useState, useContext } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useFormik } from 'formik';
import { AuthContext } from './AuthContext';  // Import AuthContext
import { useNavigate } from 'react-router-dom';  // Import useNavigate
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

const SIGNUP_MUTATION = gql`
  mutation Signup($username: String!, $password: String!, $email: String!) {
    signup(username: $username, password: $password, email: $email) {
      token
      user {
        id
        username
      }
    }
  }
`;

const Signup = ({ handleClose }) => {
    const { signUp } = useContext(AuthContext);
    const [signupMutation, { data }] = useMutation(SIGNUP_MUTATION);
    const { signIn } = useContext(AuthContext);  // Get login function from AuthContext
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();  // Get navigate function

    const handleSignUp = async (username, password) => {
        const { success } = await signUp(username, password);
        if (success) {
          handleClose();
        }
      };

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
            email: '',
        },
        onSubmit: async (values) => {
            setLoading(true);  // Set loading to true before calling signIn
            try {
                const response = await signupMutation({ variables: values });
                console.log(response.data.signup);
                const { success } = await signIn(null, null, response.data.signup.token);  // Store JWT in AuthContext and local storage
                if (success) {
                    navigate('/');  // Navigate to /process after successful sign up
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
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            onChange={formik.handleChange}
            value={formik.values.email}
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

export default Signup;
