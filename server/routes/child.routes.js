const express = require("express");
const router = express.Router();
const { createChild, getChildren } = require("../controllers/child.controller");

router.post("/", createChild);
router.get("/", getChildren);

module.exports = router;