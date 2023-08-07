// src/apolloClient.js
import { ApolloClient, InMemoryCache, createHttpLink, ApolloLink } from '@apollo/client';

const SERVER_URL = process.env.NODE_ENV === 'production' 
                   ? 'https://your-heroku-app-url.com/graphql' 
                   : 'http://localhost:5001/graphql';

const httpLink = createHttpLink({ uri: SERVER_URL });

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
