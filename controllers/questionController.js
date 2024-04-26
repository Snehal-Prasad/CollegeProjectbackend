const Question = require("../models/questionModel");

exports.createQuestion = async (req, res) => {
  try {
    const { question, options, correctAnswer } = req.body;
    const newQuestion = new Question({
      question,
      options,
      correctAnswer
    });
    await newQuestion.save();
    res.status(201).json({ message: 'Question added successfully' });
  } catch (error) {
    console.error('Error adding question:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find();
    res.json({ questions });
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
