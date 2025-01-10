import asyncErrorResolver from "../utils/asyncErrorResolver.js";
import { STATUS } from "../utils/constants.js";
import { profileVerficationServices } from "../services/adminServices.js";


//verify the profile
export const profileVerfication=asyncErrorResolver(async(req,res)=>{
    const {profileId}=req.params
    const {role}=req.body
    const profile=await profileVerficationServices(profileId,role)
    res.status(200).json({status:STATUS.SUCCESS,message:"verification success",profile})
})