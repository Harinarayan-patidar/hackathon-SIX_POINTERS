//import the require modules
const express = require("express");
const router = express.Router();

//course controllers import
const {createCourse, getAllCourses ,getCourseDetails} = require("../controllers/course");

// category Controller imports
const{createCategory,showAllCategory,categoryPageDetails } = require("../controllers/Category");

// section controller imports
const{createSection,updateSection ,deleteSection, } = require("../controllers/Section");

// subsection controllers imports
const {createSubsection, updateSubSection ,deleteSubsection } = require("../controllers/Subsection");

// rating controller imports

const{createRating, getAverageRating,getAllRating } = require("../controllers/RatingAndReview");

// importing middlewares
const {auth , isInstructor , isStudent ,isAdmin}= require("../middlewares/auth");

// define routes

//Course can only be created by instructor
router.post("/createCourse" , auth , isInstructor ,createCourse);

router.post("/deleteSection" , auth , isInstructor , deleteSection);

router.post("/createSection" , auth , isInstructor ,  createSection);

router.post("/updateSection" , auth , isInstructor , updateSection);

// instructor create update and  delete subsection

router.post("/deleteSubsection" , auth , isInstructor , deleteSubsection);

router.post("/createSubsection" , auth , isInstructor ,  createSubsection);

router.post("/updateSubsection" , auth , isInstructor , updateSubSection);

//rating and review
router.post("/createRating" ,auth , isStudent , createRating);
router.get("/getAverageRating", getAverageRating);
router.get("/getReviews", getAllRating);

// check them once
router.get("/showAllCategory" , showAllCategory);
router.get("/getCategoryPageDetails", categoryPageDetails);
router.get("/getAllCourses" , getAllCourses);
router.get("/getCourseDetails", getCourseDetails);

// by Admin 

router.post("/createCategory" , auth , isAdmin, createCategory);


module.exports = router ;




