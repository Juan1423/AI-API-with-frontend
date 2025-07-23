const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema({
  childId: { type: mongoose.Schema.Types.ObjectId, ref: "Child" },
  type: String, // e.g., "story", "game"
  content: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Activity", activitySchema);