const mongoose = require("mongoose");

const ClassSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, unique: true },
    name: { type: String, required: true }
  },

);

module.exports = mongoose.model("Class", ClassSchema);
