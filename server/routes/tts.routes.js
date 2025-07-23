const express = require("express");
const router = express.Router();
const { synthesizeSpeech } = require("../controllers/tts.controller");

router.post("/speak", synthesizeSpeech);

module.exports = router;
