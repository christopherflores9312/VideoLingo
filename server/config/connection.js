const { MongoClient } = require('mongodb');

// Connection string
const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017';

// Create a new MongoClient
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = client;
