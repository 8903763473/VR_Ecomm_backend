const express = require('express');
const { createCategory, getAllCategories } = require('../controllers/categoryController');

const router = express.Router();

router.post('/createCategory', createCategory);
router.get('/getAllCategories', getAllCategories);

module.exports = router;