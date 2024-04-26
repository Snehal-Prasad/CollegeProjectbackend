const express = require('express');
const router = express.Router();
const datasetQuestionController = require('../controllers/datasetquestionController');

// Routes related to dataset questions
router.post('/', datasetQuestionController.uploadDataSet);
router.get('/', datasetQuestionController.getAllDatasetQuestions);

module.exports = router;
