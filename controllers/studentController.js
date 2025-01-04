const Student = require('../models/studentModel');
const Course = require('../models/courseModel');

exports.getAll = async (req, res) => {
    try {
        const student = await Student.find();
      
        res.status(200).json(student);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.add = async (req, res) => {
    try {
        const {  
            Name,
            address,
            student_year
        } = req.body;

        const newCourse = new Course({ Name,address,student_year});
        await newCourse.save();

        console.log("Course added successfully");
        res.status(201).json({ message: "Course added successfully", course: newCourse });
    } catch (err) {
        console.error("Failed to add course:", err.message);
        res.status(400).json({ error: err.message });
    }
};

exports.addCourseToStudent = async (req, res) => {
    try {
        const { studentId, courseId } = req.body;

        if (!studentId || !courseId) {
            return res.status(400).json({ error: "Student ID and Course ID are required" });
        }

        const student = await Students.findById(studentId);
        if (!student) {
            return res.status(404).json({ error: "Student not found" });
        }

        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ error: "Course not found" });
        }

        if (student.registeredCourses.includes(courseId)) {
            return res.status(400).json({ error: "Student is already registered for this course" });
        }

        student.registeredCourses.push(courseId);
        await student.save();

        res.status(200).json({ message: "Course added successfully", student });
    } catch (err) {
        console.error("Error adding course:", err.message);
        res.status(500).json({ error: "Internal server error" });
    }
};