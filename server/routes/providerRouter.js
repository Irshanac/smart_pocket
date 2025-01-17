import express from "express";
import { postJob ,requestForJob} from "../controllers/providerController.js";
import isProvider from "../middleware/isProvider.js";
import authenticate from "../middleware/authMiddleware.js";
import { updateStudentProfile } from "../controllers/studentController.js";
import Profile_Image from "../middleware/profile_imageMulter.js";
const router =express.Router()
router.post('/postJob',authenticate,isProvider,postJob)
router.post('/request',authenticate,isProvider,requestForJob)
router.post('/updateProfile',authenticate,isProvider, Profile_Image.single('profile_image'), updateStudentProfile);

export default router