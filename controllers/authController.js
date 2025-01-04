const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');



// Register a student or teacher
exports.register = async (req, res) => {
    try {
        const { username, password, role } = req.body;

        // Ensure the role is either student or teacher
        if (!['student', 'teacher'].includes(role)) {
            return res.status(400).json({ error: "Role must be 'student' or 'teacher'" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ username, password: hashedPassword, role });
        await newUser.save();

        res.status(201).json({ message: `${role} registered successfully` });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Login and generate a 10-minute access token
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });
        if (!user) return res.status(404).json({ error: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

        // Generate a 10-minute access token with role
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.SECRET_KEY,
            { expiresIn: '10m' }
        );

        res.status(200).json({ token });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
