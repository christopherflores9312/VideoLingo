import React, { useState, useContext } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useFormik } from 'formik';
import { AuthContext } from './AuthContext';  // Import AuthContext
import { useNavigate } from 'react-router-dom';

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
                    navigate('/process');  // Navigate to /process after successful sign in
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);  // Set loading to false after signIn is done
            }
        },
    });


    return (
        <form onSubmit={formik.handleSubmit}>
            <label htmlFor="username">Username</label>
            <input
                id="username"
                name="username"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.username}
            />
            <label htmlFor="password">Password</label>
            <input
                id="password"
                name="password"
                type="password"
                onChange={formik.handleChange}
                value={formik.values.password}
            />
            <button type="submit" disabled={loading}>Submit</button>
        </form>
    );
};

export default Login;
