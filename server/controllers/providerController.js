import asyncErrorResolver from "../utils/asyncErrorResolver.js";
import { STATUS } from "../utils/constants.js";
import { postJobServices ,requestServices,updateProfile} from "../services/providerServices.js";

//post job
export const postJob=asyncErrorResolver(async(req,res)=>{
    const userId=req.user._id
    const data=req.body
    const newjob=await postJobServices(userId,data)
    res.status(200).json({status:STATUS.SUCCESS,message:"job posted success",job:newjob})
})

//request
export const requestForJob=asyncErrorResolver(async(req,res)=>{
    const userId=req.user._id
    const data=req.bosy
    const newRequst=await requestServices(data,userId)
    res.status(200).json({status:STATUS.SUCCESS,message:"Request success",request:newRequst})
})

//update there pofile
export const updateProfileController =asyncErrorResolver(async (req, res) => {
    const userId = req.user._id; 
    const updateData = req.body; 
    const updatedProfile = await updateProfile(userId, updateData);

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: updatedProfile,
    });
})