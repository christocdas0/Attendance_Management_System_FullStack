const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema(
  {
    userId: { type: String, },
    username: { type: String,  },
    name: { type: String},
    password: { type: String},
    status: { type: String},
    class: { type: String},
    flag: { type: String},
    date: { type: String}
  },
//   { timestamps: true }
);

module.exports = mongoose.model("Student", StudentSchema);
