import express from "express";
import { getJob,singleJob } from "../controllers/studentController.js";
import isStudent from "../middleware/isStudent.js";
import authenticate from "../middleware/authMiddleware.js";

const router =express.Router()
router.get('/job',authenticate,isStudent,getJob)
router.get('/job/:id',authenticate,isStudent,singleJob)
export default router