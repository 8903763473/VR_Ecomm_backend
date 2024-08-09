
const Category = require('../models/categoryModel');

async function createCategory(categoryData) {
    const { category, image } = categoryData;
    try {
        const newCategory = new Category({ category, image });
        const savedCategory = await newCategory.save();
        return savedCategory;
    } catch (error) {
        throw new Error(error.message);
    }
}

async function getAllCategories() {
    try {
        return await Category.find();
    } catch (error) {
        throw new Error(error.message);
    }
}

module.exports = {
    createCategory,
    getAllCategories
};