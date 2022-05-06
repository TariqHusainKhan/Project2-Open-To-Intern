const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const route = require("../src/routes/route");
const app = express();


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

mongoose.connect("mongodb+srv://functionup-cohort580:WwiSjumsqAyT4pPC@cluster0.hxlgz.mongodb.net/group16Database",{
    useNewUrlParser : true
})
.then(() => console.log("MongoDB is connected..!"))
.catch(err => console.log(err))

app.use('/',route);


app.listen(process.env.PORT || 3000 , function(){
    console.log("Express app is running on port : ",(process.env.PORT || 3000))
});