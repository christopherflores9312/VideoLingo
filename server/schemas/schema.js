const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type Video {
    url: String
    name: String  # New field for video name
  }

  type Mutation {
    processVideo(url: String, name: String): Video
  }

  type Query {
    videos: [Video]
  }
`);

module.exports = schema;