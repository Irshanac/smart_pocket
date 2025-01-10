import asyncErrorResolver from "../utils/asyncErrorResolver";
import { STATUS } from "../utils/constants";

//post job
export const postJob=asyncErrorResolver(async(req,res)=>{
    const userId=req.user._id
    const data=req.body
    const newjob=await postJobServices(userId,data)
    res.status(200).json({status:STATUS.SUCCESS,message:"job posted success",job:newjob})
})