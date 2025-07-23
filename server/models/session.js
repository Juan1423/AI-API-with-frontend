const mongoose = require("mongoose");
const progress = require("./progress");

const sessionSchema = new mongoose.Schema({
  childId: { type: mongoose.Schema.Types.ObjectId, ref: "Child" },
  therapistId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  startedAt: Date,
  progress: [progress.schema], // Array of progress entries
  endedAt: Date,
  summary: String
});

module.exports = mongoose.model("Session", sessionSchema);