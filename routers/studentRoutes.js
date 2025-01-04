const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');
const { authenticateToken ,authorizeTeacher , authorizeStudent} = require('../middlewares/authMiddleware');

// Authentication routes

router.get('/getall',studentController.getAll);
router.post('/:studentId/addCourse', authenticateToken, studentController.addCourseToStudent);
router.delete('/:studentId/removeCourse', authenticateToken, studentController.removeCourseFromStudent);



module.exports = router;
