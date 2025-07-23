const mongoose = require("mongoose");

const sessionSchema = new mongoose.Schema({
  childId: { type: mongoose.Schema.Types.ObjectId, ref: "Child" },
  therapistId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  startedAt: Date,
  endedAt: Date,
  summary: String
});

module.exports = mongoose.model("Session", sessionSchema);