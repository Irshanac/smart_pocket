import asyncErrorResolver from "../utils/asyncErrorResolver.js"
import { STATUS } from "../utils/constants.js"
import {RegistrationServices,loginServices} from '../services/authServices.js'
import {
    generateAccessToken,
    generateRefreshToken,
    verifyToken,
  } from "../utils/jwt.js";

//register the user
export const register = asyncErrorResolver(async (req, res) => {
    const data = req.body;
    console.log(req.file, "files...");
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
    res
    .cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true, 
      maxAge: 15 * 60 * 1000, 
    })
    .cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true, 
      maxAge: 7 * 24 * 60 * 60 * 1000, 
    })
    .status(200)
    .json({
      status: STATUS.SUCCESS,
      message: user.isAdmin ? "Admin Login successful" : "Login successful",
      user,
    });
})