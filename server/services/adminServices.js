import profile from "../models/profile.js"
import CustomError from "../utils/customError.js"

//verify the user
export const profileVerficationServices=async(profileId,role)=>{
    const findProfile=await profile.findById(profileId)
    if(!findProfile)
        throw new CustomError("the user is not exist",401)
    findProfile.role=role
   await  findProfile.save()
    return findProfile
}