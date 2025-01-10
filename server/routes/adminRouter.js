import express from 'express'
import { profileVerfication } from '../controllers/adminctroller.js'
import isAdmin from '../middleware/isAdmin.js'
import authenticate from '../middleware/authMiddleware.js'
const router =express.Router()
router.patch('/verifyUser/:profileId',authenticate,isAdmin,profileVerfication)
export default router