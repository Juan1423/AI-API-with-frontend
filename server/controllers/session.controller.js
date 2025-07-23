const Session = require("../models/session");

exports.createSession = async (req, res) => {
  const { childId, therapistId, startedAt, endedAt, summary } = req.body;
  const session = new Session({ childId, therapistId, startedAt, endedAt, summary });
  await session.save();
  res.status(201).json(session);
};

exports.getSessions = async (req, res) => {
  const { childId } = req.params;
  const sessions = await Session.find({ childId });
  res.json(sessions);
};