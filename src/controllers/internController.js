const collegeModel = require("../models/collegeModel");
const internModel = require("../models/internModel");
const mongoose = require("mongoose");
const validator = require('../validator/validation');




const createIntern = async function(req,res)
{
    try{
        let data = req.body;
        let { name, mobile, email,collegeName ,isDeleted} = data;
    
      //Validation of  body field
    if (!validator.isValidReqBody(data))
    {
       return res.status(400).send({ status: false, msg: "Intern body should not be empty" });
    }
    //Validation of name field i.e checking isEmpty
      if (!validator.isValid(name)) 
      {
        return res.status(400).send({ status: false, msg: "Intern name is required" });
      }
    
     //Validation of mobile field i.e checking isEmpty
     if (!validator.isValid(mobile))
      {
        return res.status(400).send({ status: false, msg: "Mobile number is required" });
      }

    // Validation of mobile number i.e checking 0-9 and 10 digit numbers
     if (!validator.isValidMobile(mobile)) 
      {
        return res.status(400).send({ status: false, msg: 'The Valid Mobile number is required' })
      }
     
    //Validation of email field i.e checking isEmpty
     if (!validator.isValid(email)) 
      {
        return res.status(400).send({ status: false, msg: "email is required" });;
      }

    // Validation of Email i.e checking @ ,url field etc
     if (!validator.isValidEmail(email))
      {
        return res.status(400).send({ status: false, msg: "The Valid email id is required" });
      }
     // validate collegeName
     if(!collegeName) 
      {
        return res.status(400).send({ status: false, msg: "CollegeName is required" });
      }
    
      // Unique Validation of intern i.e Cheking  Entry Of Intern is unique or Not
      let interns = await internModel.find();
      let numberOfInterns = interns.length;

      if (numberOfInterns != 0) 
      {
       // Unique Validation of email i.e Cheking  Entry Of Email is unique or Not
       const isEmailExist = await internModel.find({ email: email });
       if (isEmailExist.length !== 0) 
       {
           return res.status(400).send({ status: false, msg: "email is already exist,please enter valid email" });
       }

      // Unique Validation of mobile i.e Cheking  Entry Of Mobile is unique or Not
        const isMobileExist= await internModel.findOne({ mobile: mobile });
        if (isMobileExist)
         {
            return res.status(400).send({ status: false, msg: "Mobile number is already exist,please enter valid mobile" });
         }
    }
     // isDeleted should be false       
       if (isDeleted === true) 
         {
           return res.status(404).send({ status: false, msg: "college is deleted" });
         }

         let collegeData = await collegeModel.findOne({ name: collegeName })
        if (!collegeData) 
        {
        return res.status(404).send({ status: false, msg: "college not found" })
        }

       const collegeId = collegeData._id

    // Finally after all validation create the Interns info
        let dataOfIntern = { name, mobile, email, collegeId, isDeleted }
       const internData = await internModel.create(dataOfIntern);

        res.status(201).send({ status: true, data: internData });
 }
      
    catch(err)
    {
        res.status(500).send({ status: false, msg: "Error", error: err.message });
    }
}

module.exports.createIntern = createIntern;