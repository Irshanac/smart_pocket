import job from "../models/jobModel.js";
import profile from "../models/profile.js";
import customError from "../utils/customError.js";

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
