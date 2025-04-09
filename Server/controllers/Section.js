const  Section = require("../models/Section");
const Course = require("../models/Course");
// create section
   
exports.createSection = async (req, res)=>{
    try {
        // data fetch
         const {sectionName , courseId} = req.body;
        //data validation
           if(!sectionName || !courseId){
            return res.status(400).json({
                success:false,
                message:"Missing Properties",
            });
           }

        // create section
             const newSection = await Section.create({sectionName});
        // update section in course schema
               const updatedCourseDetails = await Course.findByIdAndUpdate(courseId,{
                $push:{
                    courseContent:newSection._id,
                }
               }, {new:true})
               .populate({
                 path:"courseContent",
                 populate:{
                    path:"subSection",
                 },
               }).exec();


    // how to use populate their to replace sections , sub section both in updated course details
  return res.status(200).json({
    success:true,
    message:"Section created successfully",
    updatedCourseDetails,
  })
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"issue while creating section",
            error:error.message, 
        })
    }
}

// update section
exports.updateSection = async (req , res)=>{
    try {
        // data input
        const {sectionName , sectionId} =  req.body;
        // data validation
        if(!sectionName || !sectionId){
            return res.status(400).json({
                success:false,
                message:"Missing Properties",
            });
           }
        // update data
        const section = await Section.findByIdAndUpdate(sectionId, {
            $set:{
                sectionName,
            }
        }, {new:true});


        // return response
        return res.status(200).json({
            success:true,
            message:"Section updated succesfully",
            updatedSection: section, 
        })

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"issue while updating section",
            error:error.message, 
        })
    }
}

// delete section

exports.deleteSection = async (req, res) => {
    try {
        // get sectionId from params
        const { sectionId } = req.params;

        // find the section by ID and delete
        const section = await Section.findByIdAndDelete(sectionId);

        // check if section was found and deleted
        if (!section) {
            return res.status(404).json({
                success: false,
                message: "Section not found",
            });
        }

        // return success response
        return res.status(200).json({
            success: true,
            message: "Section deleted successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Issue while deleting section",
            error: error.message,
        });
    }
};
