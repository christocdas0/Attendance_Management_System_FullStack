const router = require("express").Router();

const Admin = require("../models/Admin");

// GET ALL USERS ONLY ADMIN CAN ACCESS THIS URL

router.get("/", async (req, res) => {
  const query = req.query.new;
  try {
    const users = query
      ? await Admin.find().sort({ _id: -1 }).limit(5)
      : await Admin.find();
    res.status(200).json(users);
  } catch (err) {
    console.log("Admin Get Operation failed.");
    res
      .status(401)
      .json("Sorry Admin get operation failed, because you are not ADMIN. ");
  }
});

// ADD USER

router.post("/adduser", async (req, res) => {
  try {
    let adminToAdd = req.body;

    if (!Array.isArray(adminToAdd)) {
      adminToAdd = [adminToAdd];
    }

    const savedAdminUser = await Promise.all(
      adminToAdd.map(async (adminData) => {
        const newAdminData = new Admin(adminData);
        return await newAdminData.save();
      })
    );

    res.status(200).json(savedAdminUser);
  } catch (err) {
    console.error("Save New User Failed", err);
    res.status(402).json("Save New user Failed.");
  }
});

//  UPDATE USER

router.put("/updateuser/:id", async (req, res) => {
  try {
    const newData = req.body;
    const updateUser = await Admin.findByIdAndUpdate(
      req.params.id,
      { $set: newData },
      { new: true }
    );
    return res.status(200).json(updateUser);
  } catch (err) {
    console.log("Admin Update Operation Failed:", err);
    return res.status(401).json("Admin Update Operation Failed.");
  }
});

// DELETE USER

router.delete("/delete/:id", async (req, res) => {
    try {
      await Admin.findByIdAndDelete(req.params.id);
      res.status(200).json("User has been deleted.");
    } catch (err) {
      console.log("User detetion failed.");
      res.status(401).json("User Not Deleted, User delete Operation Failed.");
    }
  });

module.exports = router;
