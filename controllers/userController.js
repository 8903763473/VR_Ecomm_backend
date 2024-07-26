const userService = require('../services/userService');

// Create a new user
exports.createUser = async (req, res) => {
    try {
        const userData = req.body;
        const savedUser = await userService.createUser(userData);
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Login a user
exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { user, token } = await userService.loginUser(email, password);
        res.status(200).json({ user, token });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};