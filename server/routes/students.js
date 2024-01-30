const router = require("express").Router();

const Student = require("../models/Student");

// GET ALL STUDENTS ONLY ADMIN CAN ACCESS THIS URL

router.get("/", async (req, res) => {
  const query = req.query.new;
  try {
    const students = query
      ? await Student.find().sort({ _id: -1 }).limit(5)
      : await Student.find();
    res.status(200).json(students);
  } catch (err) {
    console.log("Student Get Operation failed.");
    res
      .status(401)
      .json("Sorry Student get operation failed, because you are not ADMIN. ");
  }
});

// ADD STUDENT

router.post("/addstudent", async (req, res) => {
  try {
    let studentToAdd = req.body;

    if (!Array.isArray(studentToAdd)) {
      studentToAdd = [studentToAdd];
    }

    const savedStudent = await Promise.all(
      studentToAdd.map(async (studentData) => {
        const newStudent = new Student(studentData);
        return await newStudent.save();
      })
    );

    res.status(200).json(savedStudent);
  } catch (err) {
    console.error("Save Student Failed", err);
    res.status(402).json("Student Save Failed.");
  }
});

//  UPDATE STUDENT

router.put("/updatestudent/:id", async (req, res) => {
  try {
    const newData = req.body;
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      { $set: newData },
      { new: true }
    );
    return res.status(200).json(updatedStudent);
  } catch (err) {
    console.log("Student Update Operation Failed:", err);
    return res.status(401).json("Student Update Operation Failed.");
  }
});

// DELETE STUDENT 

router.delete("/delete/:id", async (req, res) => {
    try {
      await Student.findByIdAndDelete(req.params.id);
      res.status(200).json("Student has been deleted.");
    } catch (err) {
      console.log("Student Delete Failed.");
      res.status(401).json("Student Not Deleted, Student delete Operation Failed.");
    }
  });

module.exports = router;
