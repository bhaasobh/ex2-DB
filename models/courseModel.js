const {mongoose}= require('mongoose');

const courseSchema = new mongoose.Schema({
    course_id: { type: String, unique: true },
    courseName: { type: String, required: true },
    TeacherName: { type: String, required: true },
    point: { type: Number, required: true },
    maxStudents: { type: Number, required: true },
    currentStudentNumber : {type : Number , required : false}
},
{ collection: 'Courses'});

courseSchema.pre('save', function (next) {
    this.currentStudentNumber = 0 ;
    if (!this.course_id) {
        this.course_id = `C-${Date.now()}`;
    }
    next();
});

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;
