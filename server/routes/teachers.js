const router = require("express").Router();

const Teacher = require("../models/Teacher");

// GET ALL STUDENTS ONLY ADMIN CAN ACCESS THIS URL

router.get("/", async (req, res) => {
  const query = req.query.new;
  try {
    const teachers = query
      ? await Teacher.find().sort({ _id: -1 }).limit(5)
      : await Teacher.find();
    res.status(200).json(teachers);
  } catch (err) {
    console.log("Teacher Get Operation failed.");
    res
      .status(401)
      .json("Sorry Teacher get operation failed, because you are not ADMIN. ");
  }
});

// ADD STUDENT

router.post("/addteacher", async (req, res) => {
  try {
    let teacherToAdd = req.body;

    if (!Array.isArray(teacherToAdd)) {
      teacherToAdd = [teacherToAdd];
    }

    const savedTeacher = await Promise.all(
      teacherToAdd.map(async (studentData) => {
        const newStudent = new Teacher(studentData);
        return await newStudent.save();
      })
    );

    res.status(200).json(savedTeacher);
  } catch (err) {
    console.error("Save Teacher Failed", err);
    res.status(402).json("Teacher Save Failed.");
  }
});

//  UPDATE STUDENT

router.put("/updateteacher/:id", async (req, res) => {
  try {
    const newData = req.body;
    const updateTeacher = await Teacher.findByIdAndUpdate(
      req.params.id,
      { $set: newData },
      { new: true }
    );
    return res.status(200).json(updateTeacher);
  } catch (err) {
    console.log("Teacher Update Operation Failed:", err);
    return res.status(401).json("Teacher Update Operation Failed.");
  }
});

// DELETE STUDENT 

router.delete("/delete/:id", async (req, res) => {
    try {
      await Teacher.findByIdAndDelete(req.params.id);
      res.status(200).json("Teacher has been deleted.");
    } catch (err) {
      console.log("Teacher Delete Failed.");
      res.status(401).json("Teacher Not Deleted, Teacher delete Operation Failed.");
    }
  });

module.exports = router;
