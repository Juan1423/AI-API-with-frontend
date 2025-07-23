const mongoose = require("mongoose");

const childSchema = new mongoose.Schema({
  name: String,
  age: Number,
});

module.exports = mongoose.model("Child", childSchema);