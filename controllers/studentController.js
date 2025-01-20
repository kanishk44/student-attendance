const Student = require("../models/student");

exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.findAll();
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addStudent = async (req, res) => {
  try {
    const { name, rollNumber } = req.body;
    const student = await Student.create({ name, rollNumber });
    res.json(student);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
