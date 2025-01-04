const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const port = process.env.PORT || 8080;
const authRoutes = require('./routers/authRoutes');
const CourseRoutes = require('./routers/courseRoutes');
const studentRoute = require('./routers/studentRoutes');

require('dotenv').config();


app.use(express.json());


app.get('/auth',async(req,res) => {
    const user = {id : 1};
    const token = jwt.sign(user,process.env.SECRET_KEY);

    res.json ({token});

});

app.use('/api/student',studentRoute)
app.use('/api/auth', authRoutes);
app.use('/api/courses', CourseRoutes);


app.listen(port, () => {
    console.log(`server running at port localhost:${port}`);
});
