const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const { graphqlHTTP } = require('express-graphql');
const jwt = require('jsonwebtoken'); // Add JWT library
const app = express();
const PORT = process.env.PORT || 5001;
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

// Login route
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  
  // Replace this with your actual database or user storage
  const users = [
    {
      id: 1,
      email: 'user1@example.com',
      password: '$2b$10$Jfz1cS5ZX3MObNkwe9/0NODxR1tCX6bBp6nJbjsjyl9A1Dfm62YmC', // hashed password: 'password1'
    },
    {
      id: 2,
      email: 'user2@example.com',
      password: '$2b$10$Jfz1cS5ZX3MObNkwe9/0NODxR1tCX6bBp6nJbjsjyl9A1Dfm62YmC', // hashed password: 'password2'
    },
  ];

  const user = users.find((user) => user.email === email);

  if (!user) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // Compare the provided password with the hashed password
  bcrypt.compare(password, user.password, (err, result) => {
    if (err || !result) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // If the password matches, create and send the JWT token
    const token = jwt.sign({ id: user.id, email: user.email }, 'secret');
    res.json({ token });
  });
});

// Signup route
app.post('/signup', (req, res) => {
  const { email, password } = req.body;
  // Replace this with your actual user registration logic
  // For simplicity, we'll just add the user to the sample users array

  const newUser = {
    id: users.length + 1,
    email,
    password: bcrypt.hashSync(password, 10), // Hash the password before storing
  };

  users.push(newUser);

  const token = jwt.sign({ id: newUser.id, email: newUser.email }, 'secret');
  res.json({ token });
});

// ... Other routes ...

// connect to MongoDB Atlas database using the connection.js
db.once('open', function () {  
  // Start the server after the database connection is established
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});

db.on('error', console.error.bind(console, 'connection error:'));
