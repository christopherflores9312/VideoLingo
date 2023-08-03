const { MongoClient } = require('mongodb');

// Connection string
const uri = 'mongodb+srv://cflores:Titan9312@cluster0.hiwdvce.mongodb.net/videolingo?retryWrites=true&w=majority';

// Create a new MongoClient
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

module.exports = client;
