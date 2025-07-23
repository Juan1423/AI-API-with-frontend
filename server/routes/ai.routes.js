const express = require("express");
const router = express.Router();
const { generateStory } = require("../controllers/ai.controller");

router.post("/story", generateStory);

module.exports = router;