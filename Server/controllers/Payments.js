const { default: mongoose } = require('mongoose');
const{instance}= require('../config/razorpay')
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");



// Capture the payment and initiate the Razorpay Order
exports.capturePayment =  async(req , res)=>{
    try {
        // get CourseId and UserID
        const {course_id}= req.body;
        const userId = req.user.id;
        // validation
        if(!course_id){
            return res.json({
                success:false,
                message:"please provide valid course ID",
            })
        }
        // valid Course id
        let course;
         try {
            course = await Course.findById(course_id);
            if(!course){
                return res.json({
                    success:false,
                    message:"Could not find the course",
                })
            }

            // if user already enrolled
            const uid = new mongoose.Types.ObjectId(userId);
            if(course.studentsEnrolled.includes(uid)){
                return res.status(403).json({
                    success:false,
                    message:'Student is Already Enrolled',
                })
            }
            
         } catch (error) {
            return res.status(400).json({
                success:false,
                message:error.message,
            })

        }
        // order create 
        const amount = course.price ;
        const currency = "INR";
        const Options = {
            amount : amount *100,
            currency,
            receipt : Math.random(Date.now()).toString(),
            notes:{
                courseId : course_id,
                userId,
            }
        }

        try {
            // initiate the payment using RazorPay
            const paymentResponse = await instance.orders.create(Options);
            console.log(paymentResponse);

        } catch (error) {
            console.log(error),
            res.json({
                success:false,
                message:"could not initiate the order"
            })
        }
        // return response
        return res.status(200).json({
            success:true,
            courseName:course.courseName,
            courseDescription: course.courseDescription,
            thumbnail: course.thumbnail,
            orderId: paymentResponse.id,
            currency:paymentResponse.currency,
            amount:paymentResponse.amount,
        })

        
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:error.message,
        })
    }
}

// varify Signature of Rozerpay And Server
exports.verifySignature = async (req , res)=>{
    const webhookSecret ="12345678";
    const signature = req.headers["x-razorpay-signature"];

   const shasum = crypto.createHmac("sha256", webhookSecret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest("hex");

    if(signature === digest){
        console.log("Payment is Authorized");

        const {courseId , userId} = req.body.payload.payment.entity.notes;

        try {
            // fullfill the action
            //find the course and eroll the student in it
            const enrolledCourse = await Course.findOneAndUpdate(
                {_id:courseId},
                {$push:{
                    studentsEnrolled:userId,
                }},
                {new:true}
            );

            if(!enrolledCourse){
                return res.status(500).json({
                    success:false,
                    message:'Course not found'
                });
            }
            
            console.log(enrolledCourse);

            //find the student and update the course  to the list of enrolled course
            const enrolledStudent =  await User.findOneAndUpdate({_id:userId},
                                                                {$push:{courses:courseId}},
                                                                {new:true},
            );

            console.log(enrolledStudent);

            // mail send karo
                 const emailResponse = await mailSender(
                      enrolledStudent.email,
                      "HAPPY JOURNEY BY SANDEEP",
                      "Congratulation , you enrolled in a new course",
                      
                 )
                 console.log(emailResponse);
                 return res.status(200).json({
                    success:true,
                    message:"congratulation payment verify successful"
                 })


        } catch (error) {
            console.log(error);
            return res.status(500).json({
                success:false,
                message:error.message,
            })
        }
    }
   
    else{
        return res.status(400).json({
            success:false,
            message:"Invalid request",
        })
    }

}
 