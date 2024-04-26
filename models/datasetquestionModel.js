// Import required modules
const mongoose = require('mongoose');

// Define the schema for MCQ questions
const datasetQuestion = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    options: {
        type: [String], // Array of strings for options
        required: true
    },
    correctAnswer: {
        type: String,
        required: true
    }
});

// Create a Mongoose model based on the schema
const DataSetQuestion = mongoose.model('DataSetQuestion', datasetQuestion);

// Export the model
module.exports = DataSetQuestion;
