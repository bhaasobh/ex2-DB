const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticateToken, authorizeStudent , authorizeTeacher } = require('../middlewares/authMiddleware');

// Authentication routes
router.post('/register', authController.registerUser);
router.post('/login', authController.login);

// Protected route for students
router.get(
    '/student-only',
    authenticateToken,
    authorizeStudent,
    (req, res) => {
        res.send('Welcome, Student!');
        console.log("welcome student")
    }
);

authenticateToken, authorizeTeacher,

// Protected route for teachers
router.get(
    '/teacher-only',
    authenticateToken,
    authorizeTeacher,
    (req, res) => {
        res.send('Welcome, Teacher!');
        console.log("welcome teacher")
    }
);

module.exports = router;
