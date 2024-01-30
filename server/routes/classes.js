const router = require("express").Router();

const Class = require("../models/Class");

// GET ALL STUDENTS ONLY ADMIN CAN ACCESS THIS URL

router.get("/", async (req, res) => {
  const query = req.query.new;
  try {
    const classes = query
      ? await Class.find().sort({ _id: -1 }).limit(5)
      : await Class.find();
    res.status(200).json(classes);
  } catch (err) {
    console.log("Class Get Operation failed.");
    res
      .status(401)
      .json("Sorry Class get operation failed, because you are not ADMIN. ");
  }
});

// ADD CLASS

router.post("/addclass", async (req, res) => {
  try {
    let classesToAdd = req.body;

    if (!Array.isArray(classesToAdd)) {
      classesToAdd = [classesToAdd];
    }

    const savedClass = await Promise.all(
      classesToAdd.map(async (classData) => {
        const newStudent = new Class(classData);
        return await newStudent.save();
      })
    );

    res.status(200).json(savedClass);
  } catch (err) {
    console.error("Save Class Failed", err);
    res.status(402).json("Class Save Failed.");
  }
});

//  UPDATE CLASS

router.put("/updateclass/:id", async (req, res) => {
  try {
    const newData = req.body;
    const updateClass = await Class.findByIdAndUpdate(
      req.params.id,
      { $set: newData },
      { new: true }
    );
    return res.status(200).json(updateClass);
  } catch (err) {
    console.log("Class Update Operation Failed:", err);
    return res.status(401).json("Class Update Operation Failed.");
  }
});

// DELETE CLASS

router.delete("/delete/:id", async (req, res) => {
    try {
      await Class.findByIdAndDelete(req.params.id);
      res.status(200).json("Class has been deleted.");
    } catch (err) {
      console.log("Class Delete Failed.");
      res.status(401).json("Class Not Deleted, Class delete Operation Failed.");
    }
  });

module.exports = router;
