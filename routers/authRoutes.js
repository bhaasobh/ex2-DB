const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticateToken, authorizeRoles } = require('../middlewares/authMiddleware');

// Authentication routes
router.post('/register', authController.register);
router.post('/login', authController.login);

// Protected route for students
router.get(
    '/student-only',
    authenticateToken,
    authorizeRoles('student'),
    (req, res) => {
        res.send('Welcome, Student!');
        console.log("welcome student")
    }
);

// Protected route for teachers
router.get(
    '/teacher-only',
    authenticateToken,
    authorizeRoles('teacher'),
    (req, res) => {
        res.send('Welcome, Teacher!');
        console.log("welcome teacher")
    }
);

module.exports = router;
