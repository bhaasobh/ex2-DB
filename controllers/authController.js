const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Students = require('../models/studentModel');
const Teachers = require('../models/teacherModel');

exports.registerUser = async (req, res) => {
    try {
        const { role, id, name, address, student_year, password } = req.body;

        if (!role || !['student', 'teacher'].includes(role)) {
            return res.status(400).json({ error: "Invalid role. Must be 'student' or 'teacher'." });
        }

        // Validate required fields
        if (!id || !name || !address || !password) {
            return res.status(400).json({ error: "Missing required fields, including password." });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        if (role === 'student') {
            const newStudent = new Students({
                id,
                name,
                role,
                address,
                student_year,
                password: hashedPassword,
            });
            await newStudent.save();
            return res.status(201).json({ message: "Student registered successfully", student: newStudent });
        }

        if (role === 'teacher') {
            const newTeacher = new Teachers({
                id,
                name,
                role,
                address,
                password: hashedPassword,
            });
            await newTeacher.save();
            return res.status(201).json({ message: "Teacher registered successfully", teacher: newTeacher });
        }
    } catch (err) {
        console.error("Error registering user:", err.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.login = async (req, res) => {
    try {
        const { role, id, password } = req.body;

        if (!role || !['student', 'teacher'].includes(role)) {
            return res.status(400).json({ error: "Invalid role. Must be 'student' or 'teacher'." });
        }

        // Find user by role
        const userModel = role === 'student' ? Students : Teachers;
        const user = await userModel.findOne({ id });
        if (!user) return res.status(404).json({ error: 'User not found' });

        // Validate password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log("Invalid credentials");
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Generate a 10-minute access token with role
        const token = jwt.sign(
            { id: user._id, role: role },
            process.env.SECRET_KEY,
            { expiresIn: '10m' }
        );
        console.log("Login successful");
        res.status(200).json({ token });
    } catch (err) {
        console.error("Failed to log in:", err.message);
        res.status(500).json({ error: "Internal server error" });
    }
};
