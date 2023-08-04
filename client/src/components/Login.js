import React from 'react';
import { useMutation, gql } from '@apollo/client';
import { useFormik } from 'formik';

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

const Login = () => {
    const [login, { data }] = useMutation(LOGIN_MUTATION);  // Add this line

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        onSubmit: async (values) => {
            try {
                const response = await login({ variables: values });
                console.log(response.data.login);  // This will log the returned user data
                // Save the JWT to local storage
                localStorage.setItem('authToken', response.data.login.token);
            } catch (error) {
                console.error(error);  // This will log any error from the mutation
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
            <button type="submit">Submit</button>
        </form>
    );
};

export default Login;
