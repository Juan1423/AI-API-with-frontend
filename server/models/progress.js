const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema({
  childId: { type: mongoose.Schema.Types.ObjectId, ref: "Child" },
  activityId: { type: mongoose.Schema.Types.ObjectId, ref: "Activity" },
  metricName: String,
  value: Number,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Progress", progressSchema);