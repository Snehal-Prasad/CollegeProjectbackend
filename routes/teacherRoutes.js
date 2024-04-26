const express = require("express");
const router = express.Router();
const Teacher = require("../models/teacherModel");

// Teacher login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const teacher = await Teacher.findOne({ email, password });
    if (teacher) {
      res.json({ success: true, message: "Login successful" });
    } else {
      res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// Teacher signup route
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingTeacher = await Teacher.findOne({ email });
    if (existingTeacher) {
      res.status(400).json({ success: false, message: "Email already exists" });
    } else {
      const newTeacher = new Teacher({ name, email, password });
      await newTeacher.save();
      res.status(201).json({ success: true, message: "Signup successful" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

module.exports = router;