const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const { graphqlHTTP } = require('express-graphql');
const app = express();
const PORT = process.env.PORT || 5000;
const schema = require('./schemas/schema'); // import the schema
const resolvers = require('./schemas/resolvers');
const db = require('./config/connection'); // import connection.js

// enable CORS for all requests
app.use(cors());
app.use(express.json());
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: resolvers,
  graphiql: true, // Set to false if you don't want graphiql enabled
}));

// route to download the video file from the server to the client
app.get('/download/:video', (req, res) => {
  const video = req.params.video;
  const videoPath = path.join(__dirname, 'output', video);
  res.setHeader('Content-Disposition', 'attachment; filename=' + video);
  
  const stream = fs.createReadStream(videoPath);
  
  stream.on('error', function(err) {
    console.error(err);
    res.status(500).send('An error occurred while streaming the video file.');
  });
  
  stream.pipe(res);
});

// connect to MongoDB Atlas database using the connection.js
db.once('open', function () {  
  // Start the server after the database connection is established
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

db.on('error', console.error.bind(console, 'connection error:'));