import express from 'express'
import dotenv from "dotenv"
import cors from 'cors'
import cookieParser from 'cookie-parser'
import connectDB from './config/db.js'
import errorHandler from './middleware/errorHandler.js'

import authRouter from './routes/authRouter.js'
import adminRouter from './routes/adminRouter.js'
dotenv.config();
const app=express()
//connect DB
connectDB()

//middlewareSetup
app.use(express.json())
app.use(cookieParser()); 

//routing
app.use("/api/users",authRouter)
app.use("/api/admin",adminRouter)

//error handler
app.use(errorHandler)
const PORT=process.env.PORT
app.listen(PORT,()=>{
    console.log(`server running on the port ${PORT}`)
})
