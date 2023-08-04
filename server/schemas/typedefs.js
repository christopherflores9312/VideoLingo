const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Video {
    url: String
  }

  type Query {
    videos: [Video]
  }

  type Mutation {
    processVideo(url: String!): Video
  }
`;

module.exports = typeDefs;
