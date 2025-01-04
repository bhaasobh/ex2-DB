const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authenticateToken, authorizeStudent , authorizeTeacher } = require('../middlewares/authMiddleware');

router.post('/register', authController.registerUser);
router.post('/login', authController.login);

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
