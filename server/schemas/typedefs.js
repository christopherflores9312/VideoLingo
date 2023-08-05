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
    verifyUser(token: String!): User
  }

  type Mutation {
    processVideo(url: String!): Video
    signup(username: String!, password: String!, email: String!): Auth
    login(username: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
