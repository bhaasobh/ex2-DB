const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const { authenticateToken, authorizeRoles } = require('../middlewares/authMiddleware');

// Authentication routes
router.post('/add',authenticateToken, authorizeRoles('teacher'), courseController.addCourse);
router.get('/getall', courseController.getAllCourses);



module.exports = router;
