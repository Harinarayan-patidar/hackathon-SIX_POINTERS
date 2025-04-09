const Course = require("../models/Course");

// we use Tag in place of Category for whole course controller

const Category = require("../models/Category");
const User = require("../models/User");
const {uploadImageToCloudinary}= require("../utils/imageUploader");
require("dotenv").config();

// createCourse
 exports.createCourse = async(req , res)=>{
    try {
       // fetch all data
       const {courseName , courseDescription , whatYouWillLearn ,price, category , tag} = req.body;
        
        console.log("details fetched succesfully ")
       //get thumbnail
       const thumbnail = req.files.thumbnailImage;
       console.log("thumnail image fetched")
       //validation
       if(!courseName || !courseDescription  || !whatYouWillLearn || !price || !category){
         return res.status(400).json({
            success:false,
            message:"All fields are required",
         });
        
       }
       console.log("validation checked")

       // check for instructor
       const userId = req.user.id;
       const instructorDetails = await User.findById(userId);
       console.log("instructor details is:-",instructorDetails);

       // TODO: that user id and instructor id are same or different ?

       if(!instructorDetails){
        return res.status(404).json({
            success:false,
            message:"Instructor details not found",
        });
       }

       // check given category  is valid or not
       console.log("step-1 cheched 1")
       const categoryDetails = await Category.findById(category);
       if(!categoryDetails){
        return res.status(404).json({
            success:false,
            message:"Tag details not found",
        });
       }
        console.log("this step 2 checked")
       // upload image to cloudinary
       const thumbnailImage = await uploadImageToCloudinary(thumbnail ,process.env.FOLDER_NAME);
       console.log("image uploaded successfully")
       // create an entry for new course
       const newCourse = await Course.create({
        courseName,
        courseDescription,
        instructor:instructorDetails._id,
        whatYouWillLearn,
        price,
        tag,
        category:categoryDetails._id,
        thumbnail:thumbnailImage.secure_url,
       
       })
       console.log("entyr added in data-base")

       // update User:- add new course in instructor user schema
          await User.findByIdAndUpdate({_id:instructorDetails._id},{
            $push:{
              courses: newCourse._id,
            },
          },
          {
            new:true
         });
         
         console.log("instructor User schema updated")

    // update the Category ka schema
    await Category.findByIdAndUpdate({_id:categoryDetails._id},{
        $push:{
            course:newCourse._id,
        }
    }, {new:true})

    console.log("tag schema updated")

    // return response
    return res.status(200).json({
        success:true,
        message:"Course Created successfully",
        data:newCourse,
    })
 
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"failed to create course",
            error:error.message,
           
        });
    }
 }


//getAllCourses

exports.getAllCourses = async(req , res)=>{
    try {
        // change the below statemnet incrimently
        const allCourses = await Course.find({})
        return res.status(200).json({
            success:true,
            message:"data for all courses are fetched successfuly",
            data:allCourses,
        })
        
    } catch (error) {
        return res.status(403).json({
            success:false,
            message:"failed to get All course",
            error:error.message,
        });
    }
}

// get course details

exports.getCourseDetails = async (req , res)=>{
    try {
        //get id
        const{courseId} = req.body;
        // find course details
        const courseDetails = await Course.find({_id:courseId})
                                               .populate({
                                                 path:"instructor",
                                                 populate:{
                                                     path:"additionalDetails"
                                                 },
                                               }) 
                                               .populate("category")
                                               .populate("ratingAndReviews")
                                               .populate({
                                                  path:"courseContent",
                                                  populate:{
                                                      path:"subSection"
                                                  },
                                               })
                                                .exec();
       // thodi si validation
       if(!courseDetails){ return res.status(400).json({
           success:false,
           message:`not found the course Details with this ${courseId} id`,
       });
      };
      // return response

      return res.status(200).json({
        success:true,
        message:"successfully get all details of course",
         data: courseDetails,
      })

    } catch (error) {
        console.log(error)
        return res.status(404).json({
            success:false,
            message:error.message,
        })
    }
}

