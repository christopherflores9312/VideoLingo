// src/apolloClient.js
import { ApolloClient, InMemoryCache, createHttpLink, ApolloLink } from '@apollo/client';

const httpLink = createHttpLink({ uri: 'http://localhost:5001/graphql' });

const authLink = new ApolloLink((operation, forward) => {
    const token = localStorage.getItem('authToken');
    operation.setContext({
        headers: {
            Authorization: token ? `Bearer ${token}` : '',
        }
    });
    return forward(operation);
});

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
});

export default client;
