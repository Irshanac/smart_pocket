import express from "express";
import { postJob } from "../controllers/providerController.js";
import isProvider from "../middleware/isProvider.js";
import authenticate from "../middleware/authMiddleware.js";

const router =express.Router()
router.post('/postJob',authenticate,isProvider,postJob)
export default router