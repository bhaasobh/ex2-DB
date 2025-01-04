const {mongoose}= require('mongoose');

const courseSchema = new mongoose.Schema({
  
    courseName: { type: String, required: true },
    TeacherName: { type: String, required: true },
    point: { type: Number, required: true },
    maxStudents: { type: Number, required: true },
    currentStudentNumber : { type: Number, default: 0 }
},
{ collection: 'Courses'});


const Course = mongoose.model('Course', courseSchema);
module.exports = Course;
