const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'videolingo';

// Create a new MongoClient
const client = new MongoClient(url);

// Use connect method to connect to the server
client.connect(function(err) {
  console.log("Connected successfully to server");

  const db = client.db(dbName);

  client.close();
});
