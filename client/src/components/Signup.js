import React, { useContext } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useFormik } from 'formik';
import { AuthContext } from './AuthContext';  // Import AuthContext

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
    const { login } = useContext(AuthContext);  // Get login function from AuthContext

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
            email: '',
        },
        onSubmit: async (values) => {
            try {
                const response = await signupMutation({ variables: values });
                console.log(response.data.signup);
                login(response.data.signup.token);  // Store JWT in AuthContext and local storage
            } catch (error) {
                console.error(error);
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
            <button type="submit">Submit</button>
        </form>
    );
};

export default Signup;
