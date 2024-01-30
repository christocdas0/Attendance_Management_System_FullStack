const mongoose = require("mongoose");

const AttendanceSchema = new mongoose.Schema(
  {
    // userId: { type: String, required: true },
    // name: { type: String, required: true },
    // status: { type: String, required: true },
    date: { type: String, required: true },
    stdclass: { type: String},
    //students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }] 
    students: [{
       userId: { type: String},
       username: { type: String},
       name: { type: String},
       password: { type: String},
       status: { type: String},
       class: { type: String},
       flag: { type: String},
       date: { type: String},
       _id: { type: String},
       _v: { type: Number}
      }]
  }

);

AttendanceSchema.pre('save', async function(next) {
  try {
      // Check if a document with the same date already exists
      const existingAttendance = await this.constructor.findOne({ date: this.date, stdclass: this.stdclass });

      if (existingAttendance) {
          // If a document with the same date exists, inform the user and prevent saving
          throw new Error('Attendance with the same date and class already exists');
      }

      // If no document with the same date exists, proceed with saving
      next();
  } catch (error) {
      // Forward the error to the next middleware or error handler
      next(error);
  }
});

module.exports = mongoose.model("Attendance", AttendanceSchema);
