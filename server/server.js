// import express from 'express'
// import dotenv from "dotenv"
// import cors from 'cors'
// import cookieParser from 'cookie-parser'
// import connectDB from './config/db.js'
// import errorHandler from './middleware/errorHandler.js'

// import authRouter from './routes/authRouter.js'
// import adminRouter from './routes/adminRouter.js'
// import providerRouter from './routes/providerRouter.js'
// import studentRouter from './routes/studentRouter.js'
// dotenv.config();
// const app=express()
// //connect DB
// connectDB()

// //middlewareSetup
// app.use(express.json())
// app.use(cookieParser()); 

// app.use(cors({
//   origin: process.env.CLIENT_URL, 
//   methods: ['GET', 'POST', 'PUT', 'DELETE','PATCH'], 
//   credentials: true 
// }));

// //routing
// app.use("/api/users",authRouter)
// app.use("/api/admin",adminRouter)
// app.use("/api/provider",providerRouter)
// app.use("/api/student",studentRouter)

// //error handler
// app.use(errorHandler)
// const PORT=process.env.PORT
// app.listen(PORT,()=>{
//     console.log(`server running on the port ${PORT}`)
// })


import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import errorHandler from './middleware/errorHandler.js';

import authRouter from './routes/authRouter.js';
import adminRouter from './routes/adminRouter.js';
import providerRouter from './routes/providerRouter.js';
import studentRouter from './routes/studentRouter.js';

// Initialize environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Connect to the database
connectDB();

// Middleware setup
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.CLIENT_URL, // Ensure CLIENT_URL is set in your .env
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true, // Allow sending cookies
  })
);

// Route configuration
app.use('/api/users', authRouter);
app.use('/api/admin', adminRouter);
app.use('/api/provider', providerRouter);
app.use('/api/student', studentRouter);

// Error handler middleware
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 5000; // Fallback to port 5000 if PORT is not set
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
