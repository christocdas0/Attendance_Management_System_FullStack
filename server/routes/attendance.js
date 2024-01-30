const router = require("express").Router();

const Attendance = require("../models/Attendance");

// GET ALL STUDENTS ONLY ADMIN CAN ACCESS THIS URL

router.get("/", async (req, res) => {
  const query = req.query.new;
  try {
    const Attendances = query
      ? await Attendance.find().sort({ _id: -1 }).limit(5)
      : await Attendance.find();
    res.status(200).json(Attendances);
  } catch (err) {
    console.log("Attendance Get Operation failed.");
    res
      .status(401)
      .json("Sorry Attendance get operation failed, because you are not ADMIN. ");
  }
});

// Route handler for handling POST request
router.post('/addattendance', async (req, res) => {
  try {
      // Extract array values from the request body
     /// const { userId, name, status, date, students } = req.body;
      const { date, students,stdclass } = req.body;

      // Create a new Attendance document
      const newAttendance = new Attendance({
          date,
          stdclass,
          students
      });

      // Save the new Attendance document to the database
      await newAttendance.save();

      // Respond with success message
      res.status(201).json({ message: 'Attendance record created successfully' });
  } catch (error) {
      // Handle errors
      if (error.message.includes('duplicate key error')) {
          // If the error is due to duplicate date, inform the client
          return res.status(400).json({ error: 'Attendance with the same date already exists' });
      } else {
          console.error('Error creating attendance record:', error);
          res.status(500).json({ error: 'Attendance with the same date already exists' });
      }
  }
});

router.put("/updateattendance/:id", async (req, res) => {
  try {
    const newData = req.body;
    const updateAttendance = await Attendance.findByIdAndUpdate(
      req.params.id,
      { $set: newData },
      { new: true }
    );
    return res.status(200).json(updateAttendance);
  } catch (err) {
    console.log("Attendance Update Operation Failed:", err);
    return res.status(401).json("Attendance Update Operation Failed.");
  }
});

// DELETE STUDENT 

router.delete("/delete/:id", async (req, res) => {
  try {
    await Attendance.findByIdAndDelete(req.params.id);
    res.status(200).json("Attendance has been deleted.");
  } catch (err) {
    res.status(401).json("Attendance Not Deleted, Attendance delete Operation Failed.");
  }
});


module.exports = router;