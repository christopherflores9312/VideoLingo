const express = require('express');
const router = express.Router();
const videoController = require('../controllers/videoController');

router.post('/process', videoController.processVideo);

module.exports = router;
