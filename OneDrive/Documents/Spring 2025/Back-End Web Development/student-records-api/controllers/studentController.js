const mongoose = require('mongoose');
const Student = require('../models/Student');

// Get all students
exports.getAllStudents = async (req, res) => {
    try {
        const students = await Student.find();
        res.json(students);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get a student by ID
exports.getStudentById = async (req, res) => {
    const { id } = req.params;

    // Check if the ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid ID format' });
    }

    try {
        const student = await Student.findById(id);

        if (!student) return res.status(404).json({ message: 'Student not found' });

        res.json(student);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create a new student
exports.createStudent = async (req, res) => {
    const { name, age, major, email } = req.body;

    // Ensure that the necessary fields are provided
    if (!name || !age || !major || !email) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const student = new Student({
        name,
        age,
        major,
        email
    });

    try {
        const newStudent = await student.save();
        res.status(201).json(newStudent);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Update an existing student
exports.updateStudent = async (req, res) => {
    const { id } = req.params;

    // Check if the ID is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid ID format' });
    }

    try {
        const student = await Student.findById(id);
        if (!student) return res.status(404).json({ message: 'Student not found' });

        const { name, age, major, email } = req.body;
        if (name) student.name = name;
        if (age) student.age = age;
        if (major) student.major = major;
        if (email) student.email = email;

        const updatedStudent = await student.save();
        res.json(updatedStudent);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete a student
exports.deleteStudent = async (req, res) => {
    const { id } = req.params;

    // Check if the ID is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: 'Invalid ID format' });
    }

    try {
        const student = await Student.findById(id);
        if (!student) return res.status(404).json({ message: 'Student not found' });

        await student.deleteOne();
        res.json({ message: 'Student deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
