const categoryService = require('../services/categoryService');

// Create a new category
exports.createCategory = async (req, res) => {
    try {
        const categoryData = req.body;
        const savedCategory = await categoryService.createCategory(categoryData);
        res.status(201).json(savedCategory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all categories
exports.getAllCategories = async (req, res) => {
    try {
        const categories = await categoryService.getAllCategories();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};