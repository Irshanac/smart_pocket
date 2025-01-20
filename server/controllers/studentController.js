import asyncErrorResolver from "../utils/asyncErrorResolver.js";
import { jobServices,singlejobServices,UpdateProfileServices ,applyJobServices,JobTypeAndCountServices,providerCountServices} from "../services/studentServices.js";
import { STATUS } from "../utils/constants.js";

//get all jobs--------------------------------------------------------------------
export const getJob = asyncErrorResolver(async (req, res) => {
  const { location, title, search, page } = req.query;

  const parsedPage = parseInt(page, 10) || 1;

  const { jobs, pagination } = await jobServices({
    location,
    title,
    search,
    page: parsedPage,
    limit: 12, 
  });

  if (!jobs.length) {
    return res.status(200).json({
      status: "SUCCESS",
      message: "No jobs found",
      jobs: [],
      pagination: {
        total: 0,
        page: 0,
        limit: 0,
        totalPages: 0,
      },
    });
  }

  res.status(200).json({
    status: STATUS.SUCCESS,
    jobs,
    pagination,
  });
});

//get single job-----------------------------------------------------------------------------------
export const singleJob=asyncErrorResolver(async(req,res)=>{
  const {id}=req.params
  const job=await singlejobServices(id)
  res.status(200).json({
    status:STATUS.SUCCESS,
    job,
  });
})


//get profile update----------------------------------------------------------------------------
export const updateStudentProfile=asyncErrorResolver(async(req,res)=>{
  const data = req.body;
  const userId=req.user._id
    if (req.file && req.file.path) {
        data.profile_image = req.file.path;
    } else {
        return res.status(400).json({
            success: STATUS.ERROR,
            message: 'Image upload failed. Please include a valid image file.',
        });
    }

    const user = await UpdateProfileServices(userId,data);
    res.status(200).json({
        status: STATUS.SUCCESS,
        message: "profile update successful",
        user,
    });
})

//apply for job ----------------------------------------------------------------------------------
export const applyJob=asyncErrorResolver(async(req,res)=>{
  const userId=req.user._id
  const {id}=req.params
  const job=await applyJobServices(userId,id)
  res.status(200).json({
    status: STATUS.SUCCESS,
    message: "application successful",
    job,
});
})


//job type and count--------------------------------------------------------------------
export const JobTypeAndCount=asyncErrorResolver(async(req,res)=>{
  const jobCounts=await JobTypeAndCountServices()
  res.status(200).json({
    status: STATUS.SUCCESS,
    message: "job count ",
    jobCounts
});
  
})


//provider and count----------------------------------------------------------------------------------
export const providerAndCount=asyncErrorResolver(async(req,res)=>{
  const providerCount=await providerCountServices()
  
  res.status(200).json({status:STATUS.SUCCESS,message:"provider count",providerCount})
})  