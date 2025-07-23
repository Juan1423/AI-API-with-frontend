const Child = require("../models/child");

exports.createChild = async (req, res) => {
  const { name, age } = req.body;
  const child = new Child({ name, age });
  await child.save();
  res.status(201).json(child);
};

exports.getChildren = async (req, res) => {
  const children = await Child.find();
  res.json(children);
};
