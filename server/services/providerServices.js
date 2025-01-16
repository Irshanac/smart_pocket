import job from "../models/jobModel.js";
import profile from "../models/profile.js";
import customError from "../utils/customError.js";
import request from "../models/requestModel.js";
import CustomError from "../utils/customError.js";
//post new job
export const postJobServices = async (userId, data) => {
  const existingUser = await profile.findById(userId);
  if (!existingUser) {
    throw new customError("Provider not found", 401);
  }
  if(!existingUser.description)
  {
    throw new customError("Please fill the details...", 401);
  }
  if (
    !data.title ||
    !data.description ||
    !data.location ||
    !data.salary ||
    !data.openings
  ) {
    throw new customError("Missing required fields for job creation", 400);
  }

  const newJob = new job({
    title: data.title,
    description: data.description,
    location: data.location,
    salary: data.salary,
    openings: data.openings,
    provider_id: userId,
  });

  await newJob.save();

  return newJob;
};

//request
export const requestServices=async(data,userId)=>{
  const existingUser = await profile.findById(userId);
  if (!existingUser) {
    throw new customError("Provider not found", 401);
  }
  if(!existingUser.description)
  {
    throw new customError("Please fill the details...", 401);
  }
  if (
    !data.service_id ||
    !data.student_id 
  ) {
    throw new customError("Missing required fields for job creation", 400);
  }
  const newRequst = new request({
    service_id: data.service_id,
    student_id: data.student_id,
    provider_id: userId,
  });

  await newJob.save();

  return newJob;
}

//update profile
export const updateProfile = async (profileId, updateData) => {
  const existingProfile = await profile.findById(profileId);

    if (!existingProfile) {
      throw new CustomError("Profile not found",401);
    }

    const mergedData = { ...existingProfile.toObject(), ...updateData };
    const updatedProfile = await profile.findByIdAndUpdate(
      profileId,
      { $set: mergedData },
      { new: true, runValidators: true } 
    );

    return updatedProfile;

};
