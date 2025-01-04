const {mongoose}= require('mongoose');

const studentSchema = new mongoose.Schema({
    student_id: { type: String, unique: true },
    courseName: { type: String, required: true },
    TeacherName: { type: String, required: true },
    point: { type: Number, required: true },
    maxStudents: { type: Number, required: true },
    currentStudentNumber : {type : Number , required : false}
},
{ collection: 'Courses'});

studentSchema.pre('save', function (next) {
    
    if (!this.student_id) {
        this.student_id = `C-${Date.now()}`;
    }
    next();
});

const Course = mongoose.model('Course', studentSchema);
module.exports = Course;
