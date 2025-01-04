const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const { authenticateToken ,authorizeTeacher} = require('../middlewares/authMiddleware');

// Authentication routes
router.post('/add', authenticateToken, authorizeTeacher, courseController.addCourse);
router.delete('/:courseId', authenticateToken, authorizeTeacher, courseController.deleteCourse);
router.put('/:courseId', authenticateToken, authorizeTeacher, courseController.editCourse);
router.get('/getall', courseController.getAllCourses);



module.exports = router;
