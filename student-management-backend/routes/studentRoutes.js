const express = require("express");
const router = express.Router();
const Student = require("../models/Student");
const Joi = require("joi");

// Validation Schema
const studentSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  age: Joi.number().integer().required(),
  course: Joi.string().required(),
});

// @route POST /api/students
router.post("/", async (req, res) => {
  const { error } = studentSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const newStudent = new Student(req.body);
    await newStudent.save();
    res.status(201).json({ message: "Student registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

// 🟢 Get All Students API
router.get("/", async (req, res) => {
    try {
      const students = await Student.find();
      res.json(students);
    } catch (error) {
      res.status(500).json({ message: "Server Error" });
    }
  });

// 🟢 Search Students by Name
router.get("/search/:name", async (req, res) => {
    try {
      const searchQuery = req.params.name;
      const students = await Student.find({
        name: { $regex: searchQuery, $options: "i" }, // Case-insensitive search
      });
  
      res.json(students);
    } catch (error) {
      res.status(500).json({ message: "Server Error" });
    }
  });
  
  
// 🟢 Get Single Student by ID
router.get("/:id", async (req, res) => {
    try {
      const student = await Student.findById(req.params.id);
      if (!student) {
        return res.status(404).json({ message: "Student Not Found" });
      }
      res.json(student);
    } catch (error) {
      res.status(500).json({ message: "Server Error" });
    }
  });
  
module.exports = router;

// 🗑️ Delete Student by ID
router.delete("/:id", async (req, res) => {
    try {
      const student = await Student.findByIdAndDelete(req.params.id);
  
      if (!student) {
        return res.status(404).json({ message: "Student not found" });
      }
  
      res.json({ message: "Student deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server Error" });
    }
  });
  