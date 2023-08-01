const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;
const videoRoutes = require('./routes/video');
// const schema = require('./schema'); // import the schema


app.use(cors());
app.use(express.json());
app.use('/video', videoRoutes);

app.get('/download', function(req, res){
    const file = `./output/output.mp4`;
    res.download(file); // Set disposition and send it.
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
