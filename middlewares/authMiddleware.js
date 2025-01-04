const jwt = require('jsonwebtoken');


exports.authenticateToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Access denied' });

    try {
        const verified = jwt.verify(token, process.env.SECRET_KEY);
        req.user = verified; 
        console.log("token verified")
        next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            console.log("Token has expired");
            return res.status(401).json({ error: 'Token has expired' });
        }
        console.log("Invalid token");
        res.status(400).json({ error: 'Invalid token' });
    }
};


exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            console.log("Access forbidden");
            return res.status(403).json({ error: 'Access forbidden' });
        }
        next();
    };
};
