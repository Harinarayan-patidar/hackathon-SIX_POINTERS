const SubSection = require("../models/SubSection");
const Section = require("../models/Section");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
require("dotenv").config();
// create subSection

exports.createSubsection = async (req , res) =>{
    try {
        // fetch data
         const {sectionId , title , timeDuration , description} = req.body;
        // extract file/ video
         const video = req.files.video;
        // validation
         if(!sectionId || !title || !timeDuration || !description || !video){
            return res.status(400).json({
                success:false,
                message:'All field are required',
            })
         }
         console.log(video)
         console.log("validation checked")
        // upload video to cloudinary
              const uploadDetails = await uploadImageToCloudinary(video ,process.env.FOLDER_NAME );
              console.log("uploaded video:-", uploadDetails)
        //create a subsection
           const subSectionDetails = await SubSection.create({
             title:title,
             timeDuration:timeDuration,
             description:description,
             videoUrl: uploadDetails.secure_url,

           })
        // push sebsection id in section
           const updatedSection = await Section.findByIdAndUpdate({_id : sectionId} ,{
             $push:{
                subSection:subSectionDetails._id,
             }
           } , {new:true});
        // return response
           return res.status(200).json({
            success:true,
            message:"subsection created successfully",
            updatedSection,
           })

        
    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Internal server error",
            error:error.message,
        })
    }
}

// update subSection // ye mene kiya hai
  
exports.updateSubSection = async (req, res)=>{
    try {
        // fetch the updated data
        const {title , timeDuration , description , subsectionId } = req.body;
        // extract file/ video
        const video = req.files.videoFile ;

        // validation
        if(!title || !timeDuration || !description  || !subsectionId ||!video){
            return res.status(400).json({
                success:false,
                message:"Missing Properties",
            });
           }
        // upload video to cloudinary
              const uploadDetails = await uploadImageToCloudinary(video ,process.env.FOLDER_NAME );
        
              // update data
                const subSection = await SubSection.findByIdAndUpdate(subsectionId, {
                    
                        title : title,
                        timeDuration:timeDuration,
                        description:description,
                        videoUrl:uploadDetails.secure_url,
                    
                }, {new:true});
        
        // return response

        return res.status(200).json({
            success:true,
            message:"Subsection updated succesfully",
        })

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"issue while updating Subsection",
            error:error.message, 
        })
    }

}

// delete subSection

exports.deleteSubsection = async (req, res) => {
    try {
        // Fetch the subsectionId from params
        const { subSectionId } = req.params;

        // delete from section : kya ye mujhe karna chahiye agar karna hai to frtch karo section id kaha se karoge??
        

        // Delete subsection
        await SubSection.findByIdAndDelete(subSectionId);

        // Return response
        return res.status(200).json({
            success: true,
            message: "Subsection deleted successfully",
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Issue while deleting subsection",
            error: error.message,
        });
    }
}
