import React, { useContext } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useFormik } from 'formik';
import { AuthContext } from './AuthContext';  // Import AuthContext

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
    const [loginMutation, { data }] = useMutation(LOGIN_MUTATION);
    const { signIn } = useContext(AuthContext);  // Get signIn function from AuthContext

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        onSubmit: async (values) => {
            try {
                const response = await loginMutation({ variables: values });
                console.log(response.data.login);
                signIn(null, null, response.data.login.token);  // Store JWT in AuthContext and local storage
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
