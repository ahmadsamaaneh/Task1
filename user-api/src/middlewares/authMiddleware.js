const jwt = require('jsonwebtoken');

exports.protect = (req, res, next) => {
    let token = req.headers.authorization?.startsWith('Bearer') 
                ? req.headers.authorization.split(' ')[1] : null;

    if (!token) {
        return res.status(401).json({ 
            status: 'fail', 
            message: 'You are not logged in. Please login to get access.' 
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        req.user = decoded;
        
        next(); 
    } catch (err) {
        return res.status(401).json({ 
            status: 'fail', 
            message: 'Invalid or expired token' 
        });
    }
};

exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ 
                status: 'fail', 
                message: 'Forbidden: You do not have permission to perform this action' 
            });
        }
        
        next();
    };
};