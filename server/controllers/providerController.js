import asyncErrorResolver from "../utils/asyncErrorResolver.js";
import { STATUS } from "../utils/constants.js";
import { postJobServices } from "../services/providerServices.js";

//post job
export const postJob=asyncErrorResolver(async(req,res)=>{
    const userId=req.user._id
    const data=req.body
    const newjob=await postJobServices(userId,data)
    res.status(200).json({status:STATUS.SUCCESS,message:"job posted success",job:newjob})
})