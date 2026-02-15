const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./routes/user.routes');

dotenv.config();
const app = express();

// Middleware
app.use(express.json());

// التوجيهات
app.use('/api/users', userRoutes);

// رسالة ترحيبية للتأكد من عمل السيرفر
app.get('/', (req, res) => {
    res.send('API is working ');
});

// الاتصال بـ MongoDB Local وتشغيل السيرفر
const startServer = async () => {
    try {
        // نستخدم 127.0.0.1 لضمان استقرار الاتصال المحلي
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