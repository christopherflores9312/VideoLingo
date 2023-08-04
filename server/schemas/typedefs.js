const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Video {
    url: String
  }

  type User {
    id: ID!
    username: String!
    email: String!
  }

  type Auth {
    token: String
    user: User
  }

  type Query {
    videos: [Video]
  }

  type Mutation {
    processVideo(url: String!): Video
    signup(username: String!, password: String!, email: String!): User  
    login(username: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
