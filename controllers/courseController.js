const Course = require('../models/courseModel');
const Students = require('../models/studentModel'); // Adjust the path if necessary



exports.addCourse = async (req, res) => {
    try {
        const {  
            courseName,
            TeacherName,
            point,
            maxStudents 
        } = req.body;

        const newCourse = new Course({ courseName, TeacherName, point, maxStudents });
        await newCourse.save();

        console.log("Course added successfully");
        res.status(201).json({ message: "Course added successfully", course: newCourse });
    } catch (err) {
        console.error("Failed to add course:", err.message);
        res.status(400).json({ error: err.message });
    }
};
exports.deleteCourse = async (req, res) => {
    try {
        const { courseId } = req.params;

        const deletedCourse = await Course.findByIdAndDelete(courseId);
        if (!deletedCourse) {
            return res.status(404).json({ error: "Course not found" });
        }

        await Students.updateMany(
            { registeredCourses: courseId },
            { $pull: { registeredCourses: courseId } }
        );

        res.status(200).json({ message: "Course deleted successfully", course: deletedCourse });
    } catch (err) {
        console.error("Error deleting course:", err.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

exports.editCourse = async (req, res) => {
    try {
        const { courseId } = req.params;
        const updates = req.body;

        const updatedCourse = await Course.findByIdAndUpdate(courseId, updates, { new: true });
        if (!updatedCourse) {
            return res.status(404).json({ error: 'Course not found' });
        }

        res.status(200).json({ message: 'Course updated successfully', course: updatedCourse });
    } catch (err) {
        console.error("Error editing course:", err.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};


exports.getAllCoursesDetails = async (req, res) => {
    try {
       
        const courses = await Course.find();

        if (!courses || courses.length === 0) {
            return res.status(404).json({ error: "No courses found" });
        }

        const coursesWithDetails = await Promise.all(
            courses.map(async (course) => {
                const students = await Students.find({ registeredCourses: course._id }).select("name");
                return {
                    courseName: course.courseName,
                    TeacherName: course.TeacherName,
                    point: course.point,
                    maxStudents: course.maxStudents,
                    currentStudentNumber: students.length,
                    students: students.map(student => student.name) 
                };
            })
        );

        res.status(200).json({ courses: coursesWithDetails });
    } catch (err) {
        console.error("Error fetching courses with Details:", err.message);
        res.status(500).json({ error: "Internal server error" });
    }
};
