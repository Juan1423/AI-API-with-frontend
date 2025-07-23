const express = require('express');
const router = express.Router();
const { generateSpeech } = require('../controllers/ttsController');

router.post('/tts', generateSpeech);

module.exports = router;