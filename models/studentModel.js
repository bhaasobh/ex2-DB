const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const studentSchema = new mongoose.Schema({
    id: { type: String, unique: true , required:true },
    name: { type: String, required: true },
    role: { type: String, required: true },
    address: { type: String, required: true },
    student_year: { type: Number, default:1 },
    pointsInSemester: { type: Number, default: 0 },
    registeredCourses: [{ type: String, ref: 'Course', default: [] }],
    password: { type: String, required: true }
}, 
{ collection: 'Students' });

const Students = mongoose.model('Students', studentSchema);
module.exports = Students;
