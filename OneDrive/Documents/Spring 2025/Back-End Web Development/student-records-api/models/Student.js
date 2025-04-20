// models/Student.js

const mongoose = require('mongoose'); // Import mongoose

// Define the student schema
const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    major: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
});

// Create and export the model
const Student = mongoose.model('Student', studentSchema);
module.exports = Student;
