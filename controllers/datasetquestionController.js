const fs = require('fs');
const DataSetQuestion = require('../models/datasetquestionModel');

exports.uploadDataSet = async (req, res) => {
    try {
        if (!req.file) {
          console.error('something went wrong',req);
            return res.status(400).json({ error: 'No file uploaded' });
        }

        // Read the uploaded JSON file
        const fileContent = fs.readFileSync(req.file.path, 'utf8');

        // Parse the JSON data
        const jsonData = JSON.parse(fileContent);

        // Iterate over each item in the JSON data
        for (const item of jsonData) {
            const { question, options, correctAnswer } = item;

            // Create a new DataSetQuestion document
            const newQuestion = new DataSetQuestion({
                question,
                options,
                correctAnswer
            });

            // Save the new question to MongoDB
            await newQuestion.save();
        }

        // Delete the uploaded file after processing
        fs.unlinkSync(req.file.path);

        res.status(201).json({ message: 'Data uploaded and saved successfully' });
    } catch (error) {
        console.error('Error uploading and saving data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getAllDatasetQuestions = async (req, res) => {
    try {
        // Fetch all dataset questions from MongoDB
        const questions = await DataSetQuestion.find();
        res.json({ questions });
    } catch (error) {
        console.error('Error fetching dataset questions:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
