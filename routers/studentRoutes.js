const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const { authenticateToken, authorizeRoles } = require('../middlewares/authMiddleware');

// Authentication routes
router.post('/addstudent',authenticateToken, authorizeRoles('teacher'), studentController.add);
router.get('/getall',studentController.getAll);
router.post('/addcourse', authenticateToken, studentController.addCourseToStudent);


module.exports = router;
