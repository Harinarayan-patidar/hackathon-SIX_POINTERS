const RatingAndReviews = require("../models/RatingAndReview");
const Course = require("../models/Course");
const mongoose = require("mongoose");

// createRating + review
exports.createRating = async (req, res)=>{
 try {
    // fetch data
    const {rating , review , courseId} = req.body;
    // get user id    
      userId = req.user.id;
    // validation on user is he buy or not
      const courseDetails = await Course.findOne({
                                                  _id:courseId,
                                                  studentsEnrolled:{$eleMatch: {$eq : userId}},
                                                 });

         if(!courseDetails){
            return res.status(404).json({
                success:false,
                message:"Student does not enrolled the course",
            })
         }                                        
    // check if user already revies the course
          const alreadyReviewed = await RatingAndReviews.findOne({
            user:userId,
            course:courseId,
          })

          if(alreadyReviewed){
            return res.status(403).json(
                {
                    success:false,
                    message:"course is already reviewed by the user",
                }
            )
          }

    // create review and rating    
      
        const ratingReview = await RatingAndReviews.create({
                            rating , review ,
                            course:courseId,
                            user:userId,
        })
     
    // update the course with this rating and review    
      
        await Course.findByIdAndUpdate({_id: courseId},{
                 $push:{
                      ratingAndReviews:ratingReview._id,
                 }
        },{new:true});
    
    // return  response
   return res.status(200).json({
    success:true,
    message:" rating and reviews are created successfully",
    ratingReview,
   }) 
    
 } catch (error) {
    console.log(error)
    return res.status(500).json({
        success:false,
        message:error.message,
    })
 }
}

//getAverageRating
exports.getAverageRating = async(req , res)=>{
    try {
        // get course id
       const courseId = req.body.courseId;
        // calculate average rating
        const result = await RatingAndReviews.aggregate([
            {
                 $match:{
                     course : new mongoose.Types.ObjectId.createFromTime(courseId),
                 },
             },
             {
                $group:{
                    _id:null,
                    averageRating:{$avg:"$rating"}
                }
             }
        ])
        // return rating
       if(result.length>0){
        return res.status(200).json({
            success:true,
            averageRating:result[0].averageRating,
        })
       }

       // if no rating review exists
       return result.status(200).json({
        success:true,
        message:"Average rating is zero, No rating given till now",
        averageRating:0,
       })

        
    } catch (error) {
         console.log(error)
        return res.status(500).json({
        success:false,
        message:error.message,
    })
    }
}

//getAllRating + 

exports.getAllRating = async (req , res) =>{
    try {
         const allReviews = await RatingAndReviews.find({})
                                   .sort({rating:"desc"})
                                   .populate({path:"user",
                                              select:"firstName lastName email image",
                                   })
                                   .populate({
                                    path:"course",
                                    select:"courseName",
                                   })
                                   .exec();
         return res.status(200).json({
             success:true,
             message:"All reviews fetch successfuly",
             data: allReviews,
         })                          
        
    } catch (error) {
        
    }
}

// get All course rating according to course id