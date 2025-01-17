import express from "express";
import { getJob,singleJob,updateStudentProfile ,applyJob,JobTypeAndCount,providerAndCount} from "../controllers/studentController.js";
import isStudent from "../middleware/isStudent.js";
import authenticate from "../middleware/authMiddleware.js";
import Profile_Image from '../middleware/profile_imageMulter.js'
const router =express.Router()
router.get('/job',authenticate,isStudent,getJob)
router.get('/job/:id',authenticate,isStudent,singleJob)
router.post('/apply/:id',authenticate,isStudent,applyJob)
router.patch('/updateProfile',authenticate,isStudent, Profile_Image.single('profile_image'), updateStudentProfile);
router.get('/JobTypeAndCount',authenticate,isStudent,JobTypeAndCount)
router.get('/providerCount',authenticate,isStudent,providerAndCount)
export default router