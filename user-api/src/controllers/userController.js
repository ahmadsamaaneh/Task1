const authService = require('../services/authService');
const UserRepository = require('../repositories/userRepository');

exports.register = async (req, res) => {
    try {
        const user = await authService.register(req.body);
        return res.status(201).json({ 
            status: 'success', 
            data: user 
        });
    } catch (err) {
        const message = err.code === 11000 ? 'Email already exists' : err.message;
        return res.status(400).json({ 
            status: 'error', 
            message: message 
        });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await authService.login(email, password);
        return res.status(200).json({ 
            status: 'success', 
            ...result 
        });
    } catch (err) {
        return res.status(401).json({ 
            status: 'error', 
            message: err.message || 'Invalid email or password' 
        });
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await UserRepository.findAll();
        return res.status(200).json({ 
            status: 'success', 
            results: users.length, 
            data: users 
        });
    } catch (err) {
        return res.status(500).json({ 
            status: 'error', 
            message: err.message 
        });
    }
};

exports.getUser = async (req, res) => {
    try {
        const user = await UserRepository.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ 
                status: 'error', 
                message: "User not found" 
            });
        }
        return res.status(200).json({ 
            status: 'success', 
            data: user 
        });
    } catch (err) {
        return res.status(500).json({ 
            status: 'error', 
            message: err.message 
        });
    }
};

exports.updateUser = async (req, res) => {
    try {
        const user = await UserRepository.update(req.params.id, req.body);
        if (!user) {
            return res.status(404).json({ 
                status: 'error', 
                message: "User not found" 
            });
        }
        return res.status(200).json({ 
            status: 'success', 
            data: user 
        });
    } catch (err) {
        return res.status(400).json({ 
            status: 'error', 
            message: err.message 
        });
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const user = await UserRepository.delete(req.params.id);
        if (!user) {
            return res.status(404).json({ 
                status: 'error', 
                message: "User not found" 
            });
        }
        return res.status(204).json({ 
            status: 'success', 
            data: null 
        });
    } catch (err) {
        return res.status(500).json({ 
            status: 'error', 
            message: err.message 
        });
    }
};