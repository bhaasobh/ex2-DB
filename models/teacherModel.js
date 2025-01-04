const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const teacherSchema = new mongoose.Schema({
    id: { type: String, unique: true,required:true },
    Name: { type: String, required: true },
    address: { type: String, required: true },
    password: { type: String, required: true }
}, 
{ collection: 'Teachers' });



const Teachers = mongoose.model('Teachers', teacherSchema);
module.exports = Teachers;
