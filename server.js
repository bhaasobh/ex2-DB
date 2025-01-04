const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const port = process.env.PORT || 8080;
const uri = "mongodb+srv://bahaasobeh:pZSlSdqy649gsib9@cluster0.osvp3.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const resturantRoutes = require('./routers/resturantsRouter');
const authRoutes = require('./routers/authRoutes');
require('dotenv').config();


app.use(express.json());


app.get('/auth',async(req,res) => {
    const user = {id : 1};
    const token = jwt.sign(user,process.env.SECRET_KEY);

    res.json ({token});

});


app.use('/api/auth', authRoutes);

app.use('/api/resturants', resturantRoutes);


app.listen(port, () => {
    console.log(`server running at port localhost:${port}`);
});
