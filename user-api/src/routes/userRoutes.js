const express = require('express');
const userController = require('../controllers/userController');
const { protect, restrictTo } = require('../middlewares/authMiddleware');

const router = express.Router();

// مسارات عامة (Public)
router.post('/register', userController.register);
router.post('/login', userController.login);

// حماية كل المسارات القادمة
router.use(protect);

// مسارات للمستخدمين المسجلين
router.get('/me', (req, res) => res.send(req.user)); 

// مسارات للمدراء فقط (Admin Only)
router.get('/', restrictTo('admin'), userController.getAllUsers);

router.route('/:id')
    .get(userController.getUser)
    .patch(restrictTo('admin'), userController.updateUser)
    .delete(restrictTo('admin'), userController.deleteUser);

module.exports = router;