const express = require("express");
const router = express.Router();
const { createSession, getSessions } = require("../controllers/session.controller");

router.post("/", createSession);
router.get("/:childId", getSessions);

module.exports = router;
