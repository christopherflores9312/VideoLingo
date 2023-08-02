const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const { graphqlHTTP } = require('express-graphql');
const app = express();
const PORT = process.env.PORT || 5000;
const schema = require('./schemas/schema'); // import the schema
const resolvers = require('./schemas/resolvers');


app.use(cors());
app.use(express.json());
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: resolvers,
  graphiql: true, // Set to false if you don't want graphiql enabled
}));

app.get('/download/:video', (req, res) => {
  const video = req.params.video;
  const videoPath = path.join(__dirname, 'output', video);
  res.setHeader('Content-Disposition', 'attachment; filename=' + video);
  fs.createReadStream(videoPath).pipe(res);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
