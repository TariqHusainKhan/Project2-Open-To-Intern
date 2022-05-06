const mongoose = require("mongoose");
const validator = require("validator");
const objectId =  mongoose.Schema.Types.ObjectId;

const internSchema = new mongoose.Schema({

     name: {type : String , required : true},

     email : {type : String , required : true , unique : true, validate:{
        validator: validator.isEmail,
        message: '{VALUE} is not a valid email',
        isAsync: false}
           },

     mobile: {type :String , required : true , unique : true},

     collegeId: {type : objectId , ref : "college" , required : true},
 
     isDeleted: {type:Boolean, default: false}
 
},{timestamps : true});


module.exports  = mongoose.model("interns",internSchema);