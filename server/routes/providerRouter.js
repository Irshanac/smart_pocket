import express from "express";
import { postJob ,requestForJob,updateProfileController} from "../controllers/providerController.js";
import isProvider from "../middleware/isProvider.js";
import authenticate from "../middleware/authMiddleware.js";

const router =express.Router()
router.post('/postJob',authenticate,isProvider,postJob)
router.post('/request',authenticate,isProvider,requestForJob)
router.post('/updateProfile',authenticate,isProvider,updateProfileController)
export default router