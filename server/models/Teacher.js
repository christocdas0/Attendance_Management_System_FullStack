const mongoose = require("mongoose");

const TeacherSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },
    flag: { type: String}
  },

);

module.exports = mongoose.model("Teacher", TeacherSchema);
