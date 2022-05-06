const express = require('express');
const router = express.Router();
const collegeController = require("../controllers/collegeController")
const internController = require("../controllers/internController.js")

// API #1 :- for college creation.

router.post('/functionup/colleges', collegeController.createCollege);

// API #2 :- for intern creation.

router.post('/functionup/interns', internController.createIntern);

// API #3 :- for get all interns data for each college.

router.get('/functionup/collegeDetails', collegeController.getCollegeAndInterns);

//router.get('/functionup/collegeDetails', collegeController.getInterns);


module.exports = router;
