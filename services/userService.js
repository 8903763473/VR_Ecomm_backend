const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Encrypt = require('../encrypt/encrypt');


// Create a new user
exports.createUser = async (userData) => {
    const { name, image, email, mobile, password } = userData;
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({ name, image, email, mobile, password: hashedPassword });
        const savedUser = await newUser.save();
        return Encrypt.encrypt(JSON.stringify(savedUser));
    } catch (error) {
        throw new Error(error.message);
    }
};

// Login a user
exports.loginUser = async (email, password) => {
    try {
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('Invalid email or password');
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new Error('Invalid email or password');
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        const userObject = JSON.stringify(user.toObject());
        const UserData = Encrypt.encrypt(userObject);
        return { user: UserData, token };
    } catch (error) {
        throw new Error(error.message);
    }
};