const Activity = require("../models/activity");

exports.createActivity = async (req, res) => {
  const { childId, type, content } = req.body;
  const activity = new Activity({ childId, type, content });
  await activity.save();
  res.status(201).json(activity);
};

exports.getActivities = async (req, res) => {
  const { childId } = req.params;
  const activities = await Activity.find({ childId });
  res.json(activities);
};