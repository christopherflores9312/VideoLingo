const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Video {
    url: String
    name: String
    processedUrl: String
    user: ID
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
    processVideo(url: String!, name: String!, userId: ID!): Video
    signup(username: String!, password: String!, email: String!): Auth
    login(username: String!, password: String!): Auth
}
`;

module.exports = typeDefs;
