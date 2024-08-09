const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json({ limit: '10mb' })); // Parse JSON bodies
app.use(cors({
    origin: 'http://localhost:8100'
}));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected')) 
    .catch(err => console.error('Failed to connect to MongoDB', err));

// Routes
const userRoutes = require('./routes/userRouter');
const categoryRoutes = require('./routes/categoryRouter');
app.use('/api/user', userRoutes);
app.use('/api/category', categoryRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
