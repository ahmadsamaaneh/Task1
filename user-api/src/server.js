const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const userRoutes = require('./routes/userRoutes'); 
const { protect } = require('./middlewares/authMiddleware');

dotenv.config();
const app = express();

app.use(express.json());

app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
    res.status(200).json({ message: 'API is working and secure!' });
});

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        status: 'error',
        message: err.message || 'Internal Server Error',
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
});

const startServer = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/user-api');
        
        console.log(` MongoDB Connected: ${conn.connection.host}`);
        
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => {
            console.log(` Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error(` Connection Error: ${error.message}`);
        process.exit(1);
    }
};

startServer();