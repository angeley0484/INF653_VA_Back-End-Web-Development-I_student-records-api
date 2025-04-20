// Import mongoose library
const mongoose = require('mongoose');

// Import dotenv to read from .env file (for the MongoDB connection string)
require('dotenv').config();

// Import express
const express = require('express');

// Create an instance of the express app
const app = express();

// Set the port to use from the environment or default to 5000
const PORT = process.env.PORT || 5000;

// Check if the MONGO_URI is loaded correctly from the .env file
console.log('MongoDB URI:', process.env.MONGO_URI);

// Connect to MongoDB using Mongoose
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('MongoDB connected successfully');
    })
    .catch((error) => {
        console.error('MongoDB connection failed:', error);
    });

// Middleware: Parse incoming JSON data
app.use(express.json());

// Import routes
const studentRoutes = require('./routes/studentRoutes');
app.use('/students', studentRoutes);

// Test route to check if the server is running
app.get('/', (req, res) => {
    res.send('🎉 Student Records API is running!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
