const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const port = process.env.PORT || 8080;

app.get('/auth',async(req,res) => {
    const user = {id : 1};
    const token = jwt.sign(user,"secret_key");

    res.json ({token});

});

app.listen(port, () => {
    console.log(`server running at port localhost:${port}`);
});
