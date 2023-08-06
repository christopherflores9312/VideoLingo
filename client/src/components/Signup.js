import React, { useState, useContext } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useFormik } from 'formik';
import { AuthContext } from './AuthContext';  // Import AuthContext
import { useNavigate } from 'react-router-dom';  // Import useNavigate


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

const Signup = () => {
    const [signupMutation, { data }] = useMutation(SIGNUP_MUTATION);
    const { signIn } = useContext(AuthContext);  // Get login function from AuthContext
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();  // Get navigate function

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
                    navigate('/process');  // Navigate to /process after successful sign up
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
            <label htmlFor="email">Email</label>
            <input
                id="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                value={formik.values.email}
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

export default Signup;
