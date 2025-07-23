const express = require("express");
const router = express.Router();
const { addProgress, getProgress } = require("../controllers/progress.controller");

router.post("/", addProgress);
router.get("/:childId", getProgress);

module.exports = router;