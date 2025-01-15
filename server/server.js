import express from 'express'
import dotenv from "dotenv"
import cors from 'cors'
import cookieParser from 'cookie-parser'
import connectDB from './config/db.js'
import errorHandler from './middleware/errorHandler.js'

import authRouter from './routes/authRouter.js'
import adminRouter from './routes/adminRouter.js'
import providerRouter from './routes/providerRouter.js'
dotenv.config();
const app=express()
//connect DB
connectDB()

//middlewareSetup
app.use(express.json())
app.use(cookieParser()); 

app.use(cors({
  origin: process.env.CLIENT_URL, 
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  credentials: true 
}));

//routing
app.use("/api/users",authRouter)
app.use("/api/admin",adminRouter)
app.use("/api/provider",providerRouter)

//error handler
app.use(errorHandler)
const PORT=process.env.PORT
app.listen(PORT,()=>{
    console.log(`server running on the port ${PORT}`)
})
