const mongoose = require('mongoose')
const collegeModel = require('../models/collegeModel')
const internModel = require('../models/internModel')
const validator = require('../validator/validation');

const createCollege = async function(req, res)
 {
    try
    {
    let data = req.body
    let { name, fullName, logoLink, isDeleted } = data;

    //Validation of  body field
    if (!validator.isValidReqBody(data))
     {
        return res.status(400).send({ status: false, msg: "College body should not be empty" });
     }
   
    //Validation of name field i.e checking isEmpty
      if (!validator.isValid(name)) 
      {
        return res.status(400).send({ status: false, msg: "College name is required" });
      }
   
    // Validation of name checking lowercase of name field
      if(!validator.isValidName(name)) 
      {
         return res.status(400).send({ status: false, msg: "name should be in the lower case"})
      }

     // Validation of fullname field i.e checking isEmpty
       if (!validator.isValid(fullName)) 
       {
          return res.status(400).send({ status: false, msg: "Full Name of college is required" });
       }

     //Validation of the logo link field i.e checking isEmpty
        if (!validator.isValid(logoLink))
        {
           return res.status(400).send({ status: false, msg: "Logo link is required" });
        }
     
     // Validation of the Logo Link i.e. Checking correct URL name of Logo Link
      if(!validator.isValidLink(logoLink))
      {
        return res.status(400).send({status: false, msg: "Valid Logo link is required" })
      }
     // Validation of name field ,checking name is single word or not
      if(name.split(" ").length > 1) {
        return res.status(400).send({ status: false, msg: "please provide the Valid Abbreviation for the name of college" });
    }
    
     // Unique Validation i.e Cheking  Entry Of College is unique or Not
     let colleges = await collegeModel.find();
     let numberOfColleges = colleges.length

     if (numberOfColleges != 0) 
          {
            // Checking college name is Unique or Not
            const isNameExist = await collegeModel.findOne({ name: name });
            if (isNameExist) 
            {
                return res.status(400).send({status: false, msg: "College  Name is already exists" });
            }

           // Checking fullName is Unique or Not 
           const isFullNameExist = await collegeModel.findOne({ fullName: fullName });
           if (isFullNameExist)
            {
               return res.status(400).send({status: false, msg: "College Full Name is  already exists" });
            }

          // Checking Logo Link is Unique or Not 
           const isLogoLinkExist = await collegeModel.findOne({ logoLink: logoLink })
           if (isLogoLinkExist)
            {
               return res.status(409).send({ status: false, msg: 'The logo link which you have entered belong to some other college' })
            }
       }
       // Checking isDeleted should be false
       if (isDeleted === true)
        {
           return res.status(400).send({ status: false, msg: "New entries can't be deleted" });
        }

       // Finally after all validation create the college info
       const collegeData = await collegeModel.create(data);
       res.status(201).send({ status: true, data: collegeData });
    }
    catch (err) {
        console.log("This is the internal Server error :", err.message)
        res.status(500).send({ msg: "Error", error: err.message })
    }
}


// API#3 :- GET /functionup/collegeDetails
// Returns the college details for the requested college (Expect a query parameter by the name collegeName. 
//This is anabbreviated college name. For example iith)
// Returns the list of all interns who have applied for internship at this college.

const getCollegeAndInterns = async function(req,res){
    try
     {
       const collegeName = req.query.name;

       if(!collegeName)
       {
           return res.status(400).send({status:false, msg: "collegeName Is Required"})
       }
      const collegeList = await collegeModel.findOne({name:collegeName})
      if(!collegeList)
       {
           return res.status(404).send({status:false, msg:  "College Not Found,  please give the  valid college name"}) 
       }
      if(collegeList.isDeleted == true)
      {
       return res.status(404).send({status:false,msg:"The college data might be deleted"})
      }
      const collegeId = collegeList._id;
      const internList = await internModel.findOne({collegeId:collegeId})
      if(internList.isDeleted==true)
      {
        return res.status(404).send({status:false,msg:"The Intern data might be deleted"})
      }
       const internDocs = await internModel.find({collegeId:collegeId}).select({name:1,email:1,mobile:1})
   
       if(internDocs.length == 0)
       {
         return res.status(404).send({status:false, msg:" No one applied for internship in this college"})  
       }
   
       const collegeWithAllInterns =
       {
          name: collegeList.name,
         fullName: collegeList.fullName,
         logoLink: collegeList.logoLink,
         interest: internDocs
       }
       return res.status(200).send({status:true, data: collegeWithAllInterns})
   
    } 
       catch (error)
        {
           console.log(error)
           return res.status(500).send({status:false, msg: error.message}) 
        }   
   }


module.exports.createCollege = createCollege;
module.exports.getCollegeAndInterns = getCollegeAndInterns;