const Students = require('../models/studentModel');
const Course = require('../models/courseModel');

exports.getAll = async (req, res) => {
    try {
        const student = await Students.find();
        console.log("get all student");
        res.status(200).json(student);
    } catch (err) {
        console.log(err);
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
            console.log("Course not found");
            return res.status(404).json({ error: "Course not found" });
        }

      
        const student = await Students.findOne({ id: studentId });
        if (!student) {
            console.log("Student not found");
            return res.status(404).json({ error: "Student not found" });
        }

        // Check if the course is already registered
        if (student.registeredCourses.includes(courseId)) {
            console.log("Course already registered for this student");
            return res.status(400).json({ error: "Course already registered for this student" });
        }

        // Add the course to the student's registeredCourses
        student.pointsInSemester += course.point;
         course.currentStudentNumber +=1;

         if(course.currentStudentNumber > course.maxStudents)
         {
            console.log("this course is full");
            return res.status(400).json({ error: "this course is full" });
         }
        if(student.pointsInSemester >20 )
        {
            console.log("there is no enuph point , you need to delete some courses");
            return res.status(400).json({ error: "there is no enuph point , you need to delete some courses" });
        }else
        {
            
       

        student.registeredCourses.push(courseId);
        await student.save(); 
        await course.save();
        console.log("Course added successfully");
        res.status(200).json({ message: "Course added successfully", student });
        }
       
      

       
    } catch (err) {
        console.error("Error adding course to student:", err.message);
        res.status(500).json({ error: "Internal server error" });
    }
};


exports.removeCourseFromStudent = async (req, res) => {
    try {
        const { studentId } = req.params; // Student ID from URL
        const { courseId } = req.body;   // Course ID from request body

        // Validate the course ID
        const course = await Course.findById(courseId);
        if (!course) {
            console.log("Course not found");
            return res.status(404).json({ error: "Course not found" });
        }

        // Find the student
        const student = await Students.findOne({ id: studentId });
        if (!student) {
            console.log("Student not found");
            return res.status(404).json({ error: "Student not found" });
        }

        // Check if the course is registered
        if (!student.registeredCourses.includes(courseId)) {
            console.log("Course not registered for this student" );
            return res.status(400).json({ error: "Course not registered for this student" });
        }

        // Remove the course from the student's registeredCourses
        student.registeredCourses = student.registeredCourses.filter(id => id.toString() !== courseId);

      
        course.currentStudentNumber -=1;
        student.pointsInSemester -= course.point;

       
        await student.save();
        await course.save();
        console.log("Course removed successfully");
        res.status(200).json({ message: "Course removed successfully", student });
    } catch (err) {
        console.error("Error removing course from student:", err.message);
        res.status(500).json({ error: "Internal server error" });
    }
};
