import Job from "../models/jobModel.js";
import CustomError from "../utils/customError.js";
import profile from "../models/profile.js";
import application from "../models/application.js";
export const jobServices = async ({ location, title, search, page = 1, limit = 10 }) => {
  const query = { isDeleted: false };

  if (location) {
    query.$or = [
      { "location.city": { $regex: location, $options: "i" } },
      { "location.state": { $regex: location, $options: "i" } },
      { "location.country": { $regex: location, $options: "i" } },
    ];
  }

 
  if (title) {
    query.title = { $regex: title, $options: "i" };
  }

 
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
    ];
  }

  const skip = (page - 1) * limit;
  const total = await Job.countDocuments(query);
  const jobs = await Job.find(query).skip(skip).limit(limit);

  return {
    jobs,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

//SINGLE JOB
export const singlejobServices=async(id)=>{
  const job = await Job.findOne({_id: id, isDeleted: false });

  if (!job) {
    throw new CustomError("job not found",401)
  }
  return job
}


//update profile
export const UpdateProfileServices=async(userId,data)=>{
  const existingProfile = await profile.findById(userId);

  if (!existingProfile) {
    throw new CustomError("Profile not found",401);
  }

  const mergedData = { ...existingProfile.toObject(), ...data };
  const updatedProfile = await profile.findByIdAndUpdate(
    userId,
    { $set: mergedData },
    { new: true, runValidators: true } 
  );

  return updatedProfile;
}

//apply a job
export const applyJobServices=async(userId,id)=>{
  console.log(userId,"userId")
  const existingUser= await profile.findById(userId)
  if(!existingUser)
    throw new CustomError("user is not exist",401)
  const newApply=new application({
    job_id:id,
    student_id:userId
  })
  newApply.save()
  return newApply
}

// job title and there count
export const JobTypeAndCountServices=async()=>{
  const jobCounts = await Job.aggregate([
    {
      $match: { isDeleted: false }, 
    },
    {
      $group: {
        _id: "$title", 
        count: { $sum: 1 }, 
      },
    },
    {
      $sort: { count: -1 }, 
    },
  ]);

  return jobCounts;
}


//provider job count........................................................................
export const providerCountServices=async()=>{
  
  const providersWithJobCounts = await Job.aggregate([
    { $match: { isDeleted: false } }, 
    {
      $group: {
        _id: "$provider_id", 
        jobCount: { $sum: 1 }, 
      },
    },
    {
      $lookup: {
        from: "profiles", 
        localField: "_id", 
        foreignField: "_id", 
        as: "providerDetails", 
      },
    },
    {
      $unwind: "$providerDetails", 
    },
    {
      $project: {
        _id: 0, 
        providerId: "$_id", 
        name: "$providerDetails.name", 
        email: "$providerDetails.email", 
        contact_number: "$providerDetails.contact_number", 
        profile_image: "$providerDetails.profile_image", 
        biodata:"$providerDetails.bio",
        jobCount: 1, 
      },
    },
    { $sort: { jobCount: -1 } }, 
  ]);

  return providersWithJobCounts;
}