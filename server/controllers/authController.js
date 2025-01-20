import asyncErrorResolver from "../utils/asyncErrorResolver.js"
import { STATUS } from "../utils/constants.js"
import {RegistrationServices,loginServices} from '../services/authServices.js'
import CustomError from "../utils/customError.js";
import {
    generateAccessToken,
    generateRefreshToken,
    verifyToken,
  } from "../utils/jwt.js";

//register the user
export const register = asyncErrorResolver(async (req, res) => {
    const data = req.body;
    if (req.file && req.file.path) {
        data.id_proof = req.file.path;
    } else {
        return res.status(400).json({
            success: STATUS.ERROR,
            message: 'Image upload failed. Please include a valid image file.',
        });
    }

    const user = await RegistrationServices(data);
    res.status(200).json({
        status: STATUS.SUCCESS,
        message: "User registration successful",
        user,
    });
});

//login the user
export const login =asyncErrorResolver(async(req,res)=>{
   
    const {email,password}=req.body
    const user=await loginServices(email,password)
    console.log(user,"in login conroller")
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: true,
      maxAge:  1 * 60* 60 * 1000, 
      path: '/',
      sameSite: 'none'
    });
  
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, 
      path: '/',
      sameSite: 'none'
    });
    res.cookie('role', user.role, {
      httpOnly: true,
      secure: true,
      maxAge:  7*24 * 60* 60 * 1000, 
      path: '/',
      sameSite: 'none'
    });
    res.status(200)
    .json({
      status: STATUS.SUCCESS,
      message: " Login successful" ,
      user,
    });
})


export const refreshToken = asyncErrorResolver(async (req, res) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken) {
    throw new CustomError('Refresh token not found', 401);
  }

  try {
    const decoded = verifyToken(refreshToken, process.env.JWT_REFRESH_SECRET);  
   
    const newAccessToken = generateAccessToken({ _id: decoded.id, role: decoded.role, email: decoded.email});

    res.cookie('accessToken', newAccessToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 5 * 60 * 1000,
    });

    res.status(200).json({ message: 'Token refreshed successfully' });
  } catch (err) {
    throw new CustomError('Invalid or expired refresh token', 401);
  }
});


// Logout User
export const logoutUser = asyncErrorResolver(async (req, res) => {

    res.clearCookie('accessToken', {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: '/'
    });
    res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: true,
        sameSite: "none",
        path: '/'
    });

    res.status(200).json({ message: 'Logged out successfully' });
});