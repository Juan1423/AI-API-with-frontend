const Progress = require("../models/progress");

exports.addProgress = async (req, res) => {
  const { childId, activityId, metricName, value } = req.body;
  const progress = new Progress({ childId, activityId, metricName, value });
  await progress.save();
  res.status(201).json(progress);
};

exports.getProgress = async (req, res) => {
  const { childId } = req.params;
  const progress = await Progress.find({ childId });
  res.json(progress);
};
