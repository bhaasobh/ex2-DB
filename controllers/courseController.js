const Course = require('../models/courseModel');


exports.getAllCourses = async (req, res) => {
    try {
        const course = await Course.find();
      
        res.status(200).json(course);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.addCourse = async (req, res) => {
    try {
        const {  
            courseName,
            TeacherName,
            point,
            maxStudents 
        } = req.body;

        // Create a new course instance
        const newCourse = new Course({ courseName, TeacherName, point, maxStudents });
        await newCourse.save();

        console.log("Course added successfully");
        res.status(201).json({ message: "Course added successfully", course: newCourse });
    } catch (err) {
        console.error("Failed to add course:", err.message);
        res.status(400).json({ error: err.message });
    }
};