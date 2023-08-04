import React from 'react';
import { useMutation, gql } from '@apollo/client';
import { useFormik } from 'formik';

const SIGNUP_MUTATION = gql`
  mutation Signup($username: String!, $password: String!, $email: String!) {
    signup(username: $username, password: $password, email: $email) {
      id
      username
    }
  }
`;

const Signup = () => {
    const [signup, { data }] = useMutation(SIGNUP_MUTATION);

    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        onSubmit: async (values) => {
            try {
                const response = await signup({ variables: values });
                console.log(response.data.signup);  // This will log the returned user data
            } catch (error) {
                console.error(error);  // This will log any error from the mutation
            }
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <label htmlFor="username">Username</label>
            <input
                id="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                value={formik.values.email}
            />
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

export default Signup;
