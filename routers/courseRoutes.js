const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');
const { authenticateToken ,authorizeTeacher} = require('../middlewares/authMiddleware');

router.post('/add', authenticateToken, authorizeTeacher, courseController.addCourse);
router.delete('/:courseId', authenticateToken, authorizeTeacher, courseController.deleteCourse);
router.put('/:courseId', authenticateToken, authorizeTeacher, courseController.editCourse);
router.get('/allWithDetails', authenticateToken, authorizeTeacher, courseController.getAllCoursesDetails);

module.exports = router;
