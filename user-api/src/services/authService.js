const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const UserRepository = require('../repositories/userRepository');

const signToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || '15m'
    });
};

exports.register = async (userData) => {
    return await UserRepository.create(userData);
};

exports.login = async (email, password) => {
    if (!email || !password) throw new Error('Please provide email and password');

    const user = await UserRepository.findByEmail(email);
    
    if (!user || !(await bcrypt.compare(password, user.password))) {
        const error = new Error('Incorrect email or password');
        error.statusCode = 401;
        throw error;
    }

    const token = signToken(user._id, user.role);
    return { token, user: { id: user._id, name: user.name, role: user.role } };
};