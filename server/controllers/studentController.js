import asyncErrorResolver from "../utils/asyncErrorResolver.js";
import { jobServices,singlejobServices } from "../services/studentServices.js";
import { STATUS } from "../utils/constants.js";

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

//get single job
export const singleJob=asyncErrorResolver(async(req,res)=>{
  const {id}=req.params
  const job=await singlejobServices(id)
  res.status(200).json({
    status:STATUS.SUCCESS,
    job,
  });
})