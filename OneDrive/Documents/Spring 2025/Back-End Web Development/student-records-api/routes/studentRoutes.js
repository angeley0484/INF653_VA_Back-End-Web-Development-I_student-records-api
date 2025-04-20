const express = require('express');
const router = express.Router();

// Import controller functions
const studentController = require('../controllers/studentController');

// @route   GET /students
// @desc    Get all students
router.get('/', studentController.getAllStudents);

// @route   GET /students/:id
// @desc    Get a student by ID
router.get('/:id', studentController.getStudentById);

// @route   POST /students
// @desc    Create a new student
router.post('/', studentController.createStudent);

// @route   PUT /students/:id
// @desc    Update an existing student
router.put('/:id', studentController.updateStudent);

// @route   DELETE /students/:id
// @desc    Delete a student
router.delete('/:id', studentController.deleteStudent);

module.exports = router;
