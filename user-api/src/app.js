const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');

dotenv.config();
const app = express();
app.use(express.json());

// Routes
app.use('/api/v1/users', userRoutes);

// Centralized Error Handler
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message || 'Internal Server Error'
    });
});

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('DB Connected!');
    app.listen(process.env.PORT, () => console.log('Server running...'));
});