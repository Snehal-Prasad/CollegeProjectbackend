const express = require("express");
const router = express.Router();
const Student = require("../models/studentModel");

// Student login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const student = await Student.findOne({ email, password });
    if (student) {
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

// Student signup route
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      res.status(400).json({ success: false, message: "Email already exists" });
    } else {
      const newStudent = new Student({ name, email, password });
      await newStudent.save();
      res.status(201).json({ success: true, message: "Signup successful" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

module.exports = router;