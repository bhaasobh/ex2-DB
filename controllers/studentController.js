const Students = require('../models/studentModel');
const Course = require('../models/courseModel');

exports.getAll = async (req, res) => {
    try {
        const student = await Student.find();
      
        res.status(200).json(student);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.addCourseToStudent = async (req, res) => {
    try {
        const { studentId } = req.params; // Student ID from URL
        const { courseId } = req.body;   // Course ID from request body

        // Validate the course ID
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ error: "Course not found" });
        }

        // Find the student
        const student = await Students.findById(studentId);
        if (!student) {
            return res.status(404).json({ error: "Student not found" });
        }

        // Check if the course is already registered
        if (student.registeredCourses.includes(courseId)) {
            return res.status(400).json({ error: "Course already registered for this student" });
        }

        // Add the course to the student's registeredCourses
        
        student.registeredCourses.push(courseId);
        await student.save();

        res.status(200).json({ message: "Course added successfully", student });
    } catch (err) {
        console.error("Error adding course to student:", err.message);
        res.status(500).json({ error: "Internal server error" });
    }
};