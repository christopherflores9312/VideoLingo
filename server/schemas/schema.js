// schema.js
const { buildSchema } = require('graphql');

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type Video {
    url: String
  }

  type Mutation {
    processVideo(url: String): Video
  }

  type Query {
    videos: [Video]
  }
`);

module.exports = schema;
