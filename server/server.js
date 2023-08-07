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

// Serve static files from the React build
app.use(express.static(path.join(__dirname, '../client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

// route to download the video file from the server to the client
app.get('/download/:video', (req, res) => {
  const video = req.params.video;
  const videoPath = path.join(__dirname, 'output', video);
  res.setHeader('Content-Disposition', 'attachment; filename=' + video);

  const stream = fs.createReadStream(videoPath);

  stream.on('error', function (err) {
    console.error(err);
    res.status(500).send('An error occurred while streaming the video file.');
  });

  stream.pipe(res);
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