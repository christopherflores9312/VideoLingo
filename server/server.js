const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./schemas/typedefs'); const app = express();
const PORT = process.env.PORT || 5001;
const resolvers = require('./schemas/resolvers');
const db = require('./config/connection'); // import connection.js

// enable CORS for all requests
app.use(cors());
app.use(express.json());

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true, // enables the Apollo Server's schema introspection
  playground: true, // enables the Apollo Server's GraphQL playground
});

const AWS = require('aws-sdk');

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_BUCKET_REGION
});

const s3 = new AWS.S3();

// Log incoming requests
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// route to download the video file from the server to the client
app.get('/download/:video', (req, res) => {
  const video = req.params.video;
  const videoPath = path.join(__dirname, 'output', video);

  // Check if the file exists before streaming
  if (!fs.existsSync(videoPath)) {
      console.error(`File not found: ${videoPath}`);
      return res.status(404).send('Video file not found.');
  }

  res.setHeader('Content-Disposition', 'attachment; filename=' + video);
  const stream = fs.createReadStream(videoPath);
  stream.on('error', function (err) {
      console.error(err);
      res.status(500).send('An error occurred while streaming the video file.');
  });

  stream.pipe(res);
});


// Serve static files from the React build
app.use(express.static(path.join(__dirname, '../client/build')));

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
// });

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// connect to MongoDB Atlas database using the connection.js
db.once('open', async function () {
  // Start the Apollo server before the Express server
  await server.start();
  server.applyMiddleware({ app });
  // Start the server after the database connection is established
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

db.on('error', console.error.bind(console, 'connection error:'));