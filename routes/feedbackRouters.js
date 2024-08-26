const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');

router.post('/send', feedbackController.submitFeedback);
router.get('/getAllfeedbacks', feedbackController.listFeedbacks);

module.exports = router;