import Job from "../models/jobModel.js";
import CustomError from "../utils/customError.js";

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